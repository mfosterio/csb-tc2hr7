function h(a, b) {
  return [a * b[0], a * b[1]];
}
function l(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}
function m(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}
function n(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function r(a, b) {
  return l(h(b[0], a[0]), h(b[1], a[1]));
}
function t(a, b) {
  this.c = a;
  this.g = b;
}
var u = new t(
  [
    [1, 0],
    [0, 1]
  ],
  [0, 0]
);
function v(a) {
  var b = { pan: !1, rotate: !0 },
    c = {};
  a = void 0 == a ? c : a;
  for (k in b) (c = a[k]), (a[k] = void 0 == c ? b[k] : c);
  return a;
}
function w(a, b, c) {
  function p(b) {
    var q = b[0].pageX - a.offsetLeft;
    b = b[0].pageY - a.offsetTop;
    return [
      [q, b],
      [q + 1, b + 1]
    ];
  }
  function f(b) {
    var q = a.offsetLeft,
      c = a.offsetTop;
    return [
      [b[0].pageX - q, b[0].pageY - c],
      [b[1].pageX - q, b[1].pageY - c]
    ];
  }
  this.m = a;
  this.b = !1;
  this.a = this.f = u;
  this.l = [0, 0];
  var d = this,
    e = !1;
  this.j = v(b);
  this.h = c || window;
  a.style["transform-origin"] = "0 0";
  a.parentNode.addEventListener("touchstart", function (b) {
    var a = b.touches;
    if (!a) return !1;
    var c = !1;
    2 === a.length
      ? (d.b = !0)
      : 1 === a.length &&
        (e
          ? ((e = !1), (c = !0))
          : ((e = !0),
            d.h.setTimeout(function () {
              e = !1;
            }, 300),
            d.j.pan && (d.b = !0)));
    (d.b || e || c) && b.preventDefault();
    d.b && (d.l = 1 < a.length ? f(a) : p(a));
    c && d.i();
  });
  a.parentNode.addEventListener("touchmove", function (a) {
    var b = a.touches;
    if (!b || !d.b) return !1;
    a.preventDefault();
    a = d.l;
    var b = 1 < b.length ? f(b) : p(b),
      c = m(a[1], a[0]),
      e = m(b[1], b[0]),
      g;
    if (d.j.rotate) {
      var x = n(c, c);
      g = n(c, e) / x;
      c = (c[0] * e[1] - c[1] * e[0]) / x;
      g = [
        [g, c],
        [-c, g]
      ];
    } else
      (g = Math.sqrt(n(e, e)) / Math.sqrt(n(c, c))),
        (g = [
          [g, 0],
          [-0, g]
        ]);
    a = new t(g, m(b[0], r(g, a[0])));
    b = d.f;
    g = a.c;
    c = b.c;
    d.a = new t([r(g, c[0]), r(g, c[1])], l(r(a.c, b.g), a.g));
    y(d);
  });
  a.parentNode.addEventListener("touchend", function (a) {
    d.b && ((d.b = !1), (d.f = d.a), a.preventDefault());
  });
}
function y(a) {
  var b = a.a,
    c = b.c,
    b = b.g;
  a.m.style.transform =
    "matrix(" +
    c[0][0] +
    "," +
    c[0][1] +
    "," +
    c[1][0] +
    "," +
    c[1][1] +
    "," +
    b[0] +
    "," +
    b[1] +
    ")";
}
w.prototype.i = function () {
  if (this.h.requestAnimationFrame) {
    var a = this.f,
      b = null,
      c = this,
      p = function (f) {
        b || (b = f);
        f = (f - b) / 100;
        if (1 <= f) (c.a = u), (c.f = c.a), y(c);
        else {
          var d = a.c,
            e = u.c;
          c.a = new t(
            [l(h(1 - f, d[0]), h(f, e[0])), l(h(1 - f, d[1]), h(f, e[1]))],
            l(h(1 - f, a.g), h(f, u.g))
          );
          c.f = c.a;
          y(c);
          c.h.requestAnimationFrame(p);
        }
      };
    this.h.requestAnimationFrame(p);
  } else (this.f = this.a = u), y(this);
};
w.prototype.reset = w.prototype.i;
"undefined" === typeof exports ? (window.Zoom = w) : (exports.Zoom = w);
