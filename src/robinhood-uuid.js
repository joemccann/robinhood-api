function i () {
  var randoms = new Array(16)
  for (let random, t = 0; t < 16; t++) {
    if ((3 & t) === 0) {
      (random = 4294967296 * Math.random())
    }
    randoms[t] = random >>> ((3 & t) << 3) & 255
  }
  return randoms
}

const a = (e, t) => {
  for (var n = [], r = 0; r < 256; ++r) { n[r] = (r + 256).toString(16).substr(1) }
  var r = t || 0
  var o = n
  return [o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], '-', o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]], o[e[r++]]].join('')
}

var r; var o; var n; var s = 1; var u = 1
function v1 (e, t, n) {
  var c = t && n || 0
  var l = t || []
  var f = (e = e || {}).node || r
  var d = void 0 !== e.clockseq ? e.clockseq : o
  if (f == null || d == null) {
    var p = i()
    f == null && (f = r = [1 | p[0], p[1], p[2], p[3], p[4], p[5]]),
    d == null && (d = o = 16383 & (p[6] << 8 | p[7]))
  }
  var h = void 0 !== e.msecs ? e.msecs : (new Date()).getTime()
  var m = void 0 !== e.nsecs ? e.nsecs : u + 1
  var g = h - s + (m - u) / 1e4
  if (g < 0 && void 0 === e.clockseq && (d = d + 1 & 16383),
  (g < 0 || h > s) && void 0 === e.nsecs && (m = 0),
  m >= 1e4) { throw new Error("uuid.v1(): Can't create more than 10M uuids/sec") }
  s = h,
  u = m,
  o = d
  var y = (1e4 * (268435455 & (h += 122192928e5)) + m) % 4294967296
  l[c++] = y >>> 24 & 255,
  l[c++] = y >>> 16 & 255,
  l[c++] = y >>> 8 & 255,
  l[c++] = 255 & y
  var v = h / 4294967296 * 1e4 & 268435455
  l[c++] = v >>> 8 & 255,
  l[c++] = 255 & v,
  l[c++] = v >>> 24 & 15 | 16,
  l[c++] = v >>> 16 & 255,
  l[c++] = d >>> 8 | 128,
  l[c++] = 255 & d
  for (var b = 0; b < 6; ++b) { l[c + b] = f[b] }
  return t || a(l)
}

module.exports = v1
