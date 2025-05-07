window.R = {},
R.iLerp = (t, s, e) => R.Clamp((e - t) / (s - t), 0, 1),
R.Lerp = (t, s, e) => t * (1 - e) + s * e,
R.Damp = (t, s, e) => R.Lerp(t, s, 1 - Math.exp(Math.log(1 - e) * RD)),
R.Remap = (t, s, e, i, r) => R.Lerp(e, i, R.iLerp(t, s, r)),
R.M = class {
    constructor(t) {
        R.BM(this, ["gRaf", "run", "uSvg", "uLine", "uProp"]),
        this.v = this.vInit(t),
        this.r = new R.RafR(this.run)
    }
    vInit(s) {
        let r = {
            el: R.Select.el(s.el),
            e: {
                curve: s.e || "linear"
            },
            d: {
                origin: s.d || 0,
                curr: 0
            },
            delay: s.delay || 0,
            cb: s.cb || !1,
            r: s.r || 2,
            prog: 0,
            progE: 0,
            elapsed: 0
        };
        r.elL = r.el.length,
        R.Has(s, "update") ? r.up = t => {
            s.update(r)
        }
        : R.Has(s, "svg") ? r.up = this.uSvg : R.Has(s, "line") ? r.up = this.uLine : r.up = this.uProp;
        var e = s.p || !1
          , t = s.svg || !1
          , a = s.line || !1;
        let i = !1;
        if (e) {
            r.prop = {},
            r.propI = [];
            var n = Object.keys(e);
            r.propL = n.length;
            let t = r.propL;
            for (; t--; ) {
                var o = n[t]
                  , o = (r.prop[t] = {
                    name: o,
                    origin: {
                        start: e[o][0],
                        end: e[o][1]
                    },
                    curr: e[o][0],
                    start: e[o][0],
                    end: e[o][1],
                    unit: e[o][2] || "%"
                },
                o.charAt(0))
                  , h = "r" === o && i ? "r2" : o;
                i = "r" === o,
                r.propI[h] = t
            }
        } else if (t)
            r.svg = {
                type: t.type,
                attr: "polygon" === t.type ? "points" : "d",
                end: t.end,
                originArr: {},
                arr: {},
                val: []
            },
            r.svg.start = t.start || R.Ga(r.el[0], r.svg.attr),
            r.svg.curr = r.svg.start,
            r.svg.originArr.start = R.Svg.split(r.svg.start),
            r.svg.originArr.end = R.Svg.split(r.svg.end),
            r.svg.arr.start = r.svg.originArr.start,
            r.svg.arr.end = r.svg.originArr.end,
            r.svg.arrL = r.svg.arr.start.length;
        else if (a) {
            r.line = {
                dashed: a.dashed,
                coeff: {
                    start: R.Is.def(a.start) ? (100 - a.start) / 100 : 1,
                    end: R.Is.def(a.end) ? (100 - a.end) / 100 : 0
                },
                shapeL: [],
                origin: {
                    start: [],
                    end: []
                },
                curr: [],
                start: [],
                end: []
            };
            for (let i = 0; i < r.elL; i++) {
                var l = a.elWL || r.el[i];
                r.line.shapeL[i] = R.Svg.shapeL(l);
                let t;
                if (r.line.dashed) {
                    var d = r.line.dashed;
                    let s = 0;
                    var c = d.split(/[\s,]/)
                      , p = c.length;
                    for (let t = 0; t < p; t++)
                        s += parseFloat(c[t]) || 0;
                    let e = "";
                    var u = Math.ceil(r.line.shapeL[i] / s);
                    for (let t = 0; t < u; t++)
                        e += d + " ";
                    t = e + "0 " + r.line.shapeL[i]
                } else
                    t = r.line.shapeL[i];
                r.el[i].style.strokeDasharray = t,
                r.line.origin.start[i] = r.line.coeff.start * r.line.shapeL[i],
                r.line.origin.end[i] = r.line.coeff.end * r.line.shapeL[i],
                r.line.curr[i] = r.line.origin.start[i],
                r.line.start[i] = r.line.origin.start[i],
                r.line.end[i] = r.line.origin.end[i]
            }
        }
        return r
    }
    play(t) {
        this.pause(),
        this.vUpd(t),
        this.delay.run()
    }
    pause() {
        this.r.stop(),
        this.delay && this.delay.stop()
    }
    vUpd(t) {
        var s = t || {}
          , e = R.Has(s, "reverse") ? "start" : "end";
        if (R.Has(this.v, "prop")) {
            let t = this.v.propL;
            for (; t--; )
                this.v.prop[t].end = this.v.prop[t].origin[e],
                this.v.prop[t].start = this.v.prop[t].curr,
                R.Has(s, "p") && R.Has(s.p, this.v.prop[t].name) && (R.Has(s.p[this.v.prop[t].name], "newEnd") && (this.v.prop[t].end = s.p[this.v.prop[t].name].newEnd),
                R.Has(s.p[this.v.prop[t].name], "newStart")) && (this.v.prop[t].start = s.p[this.v.prop[t].name].newStart)
        } else if (R.Has(this.v, "svg"))
            R.Has(s, "svg") && R.Has(s.svg, "start") ? this.v.svg.arr.start = s.svg.start : this.v.svg.arr.start = R.Svg.split(this.v.svg.curr),
            R.Has(s, "svg") && R.Has(s.svg, "end") ? this.v.svg.arr.end = s.svg.end : this.v.svg.arr.end = this.v.svg.originArr[e];
        else if (R.Has(this.v, "line")) {
            for (let t = 0; t < this.v.elL; t++)
                this.v.line.start[t] = this.v.line.curr[t];
            if (R.Has(s, "line") && R.Has(s.line, "end")) {
                this.v.line.coeff.end = (100 - s.line.end) / 100;
                for (let t = 0; t < this.v.elL; t++)
                    this.v.line.end[t] = this.v.line.coeff.end * this.v.line.shapeL[t]
            } else
                for (let t = 0; t < this.v.elL; t++)
                    this.v.line.end[t] = this.v.line.origin[e][t]
        }
        this.v.d.curr = R.Has(s, "d") ? s.d : R.R(this.v.d.origin - this.v.d.curr + this.v.elapsed),
        this.v.e.curve = s.e || this.v.e.curve,
        this.v.e.calc = R.Is.str(this.v.e.curve) ? R.Ease[this.v.e.curve] : R.Ease4(this.v.e.curve),
        this.v.delay = (R.Has(s, "delay") ? s : this.v).delay,
        this.v.cb = (R.Has(s, "cb") ? s : this.v).cb,
        this.v.prog = this.v.progE = 0 === this.v.d.curr ? 1 : 0,
        this.delay = new R.Delay(this.gRaf,this.v.delay)
    }
    gRaf() {
        this.r.run()
    }
    run(t) {
        1 === this.v.prog ? (this.pause(),
        this.v.up(),
        this.v.cb && this.v.cb()) : (this.v.elapsed = R.Clamp(t, 0, this.v.d.curr),
        this.v.prog = R.Clamp(this.v.elapsed / this.v.d.curr, 0, 1),
        this.v.progE = this.v.e.calc(this.v.prog),
        this.v.up())
    }
    uProp() {
        var t = this.v.prop
          , s = this.v.propI;
        let e = this.v.propL;
        for (; e--; )
            t[e].curr = this.lerp(t[e].start, t[e].end);
        var i = R.Has(s, "x") ? t[s.x].curr + t[s.x].unit : 0
          , r = R.Has(s, "y") ? t[s.y].curr + t[s.y].unit : 0
          , i = i + r === 0 ? 0 : "translate3d(" + i + "," + r + ",0)"
          , r = R.Has(s, "r") ? t[s.r].name + "(" + t[s.r].curr + "deg)" : 0
          , a = R.Has(s, "r2") ? t[s.r2].name + "(" + t[s.r2].curr + "deg)" : 0
          , n = R.Has(s, "s") ? t[s.s].name + "(" + t[s.s].curr + ")" : 0
          , o = i + r + a + n === 0 ? 0 : [i, r, a, n].filter(t => 0 !== t).join(" ")
          , h = R.Has(s, "o") ? t[s.o].curr : -1;
        let l = this.v.elL;
        for (; l-- && !R.Is.und(this.v.el[l]); )
            0 !== o && (this.v.el[l].style.transform = o),
            0 <= h && (this.v.el[l].style.opacity = h)
    }
    uSvg() {
        var s = this.v.svg;
        s.currTemp = "";
        for (let t = 0; t < s.arrL; t++)
            s.val[t] = isNaN(s.arr.start[t]) ? s.arr.start[t] : this.lerp(s.arr.start[t], s.arr.end[t]),
            s.currTemp += s.val[t] + " ",
            s.curr = s.currTemp.trim();
        for (let t = 0; t < this.v.elL && !R.Is.und(this.v.el[t]); t++)
            this.v.el[t].setAttribute(s.attr, s.curr)
    }
    uLine() {
        var s = this.v.line;
        for (let t = 0; t < this.v.elL; t++) {
            var e = this.v.el[t].style;
            s.curr[t] = this.lerp(s.start[t], s.end[t]),
            e.strokeDashoffset = s.curr[t],
            0 === this.v.prog && (e.opacity = 1)
        }
    }
    lerp(t, s) {
        return R.R(R.Lerp(t, s, this.v.progE), this.v.r)
    }
}
,
R.TL = class {
    constructor() {
        this._ = [],
        this.d = 0
    }
    from(t) {
        this.d += R.Has(t, "delay") ? t.delay : 0,
        t.delay = this.d,
        this._.push(new R.M(t))
    }
    play(t) {
        this.run("play", t)
    }
    pause() {
        this.run("pause")
    }
    run(t, s) {
        let e = 0;
        for (var i = this._.length, r = s || void 0; e < i; )
            this._[e][t](r),
            e++
    }
}
,
R.BM = (t, s) => {
    let e = s.length;
    for (; e--; )
        t[s[e]] = t[s[e]].bind(t)
}
,
R.Clamp = (t, s, e) => t < s ? s : e < t ? e : t,
R.Clone = t => JSON.parse(JSON.stringify(t)),
R.Delay = class {
    constructor(t, s) {
        this.cb = t,
        this.d = s,
        R.BM(this, ["loop"]),
        this.r = new R.RafR(this.loop)
    }
    run() {
        0 === this.d ? this.cb() : this.r.run()
    }
    stop() {
        this.r.stop()
    }
    loop(t) {
        t = R.Clamp(t, 0, this.d);
        1 === R.Clamp(t / this.d, 0, 1) && (this.stop(),
        this.cb())
    }
}
,
R.Dist = (t, s) => Math.sqrt(t * t + s * s),
R.Ease = {
    linear: t => t,
    i1: t => 1 - Math.cos(t * (.5 * Math.PI)),
    o1: t => Math.sin(t * (.5 * Math.PI)),
    io1: t => -.5 * (Math.cos(Math.PI * t) - 1),
    i2: t => t * t,
    o2: t => t * (2 - t),
    io2: t => t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
    i3: t => t * t * t,
    o3: t => --t * t * t + 1,
    io3: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    i4: t => t * t * t * t,
    o4: t => 1 - --t * t * t * t,
    io4: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    i5: t => t * t * t * t * t,
    o5: t => 1 + --t * t * t * t * t,
    io5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    i6: t => 0 === t ? 0 : 2 ** (10 * (t - 1)),
    o6: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
    io6: t => 0 === t || 1 === t ? t : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t))
},
R.r0 = (t, s) => 1 - 3 * s + 3 * t,
R.r1 = (t, s) => 3 * s - 6 * t,
R.r2 = (t, s, e) => ((R.r0(s, e) * t + R.r1(s, e)) * t + 3 * s) * t,
R.r3 = (t, s, e) => 3 * R.r0(s, e) * t * t + 2 * R.r1(s, e) * t + 3 * s,
R.r4 = (t, s, e, i, r) => {
    let a, n, o = 0;
    for (; n = s + .5 * (e - s),
    0 < (a = R.r2(n, i, r) - t) ? e = n : s = n,
    1e-7 < Math.abs(a) && ++o < 10; )
        ;
    return n
}
,
R.r5 = (s, e, i, r) => {
    for (let t = 0; t < 4; ++t) {
        var a = R.r3(e, i, r);
        if (0 === a)
            return e;
        e -= (R.r2(e, i, r) - s) / a
    }
    return e
}
,
R.Ease4 = t => {
    let a = t[0]
      , s = t[1]
      , n = t[2]
      , e = t[3]
      , o = new Float32Array(11);
    if (a !== s || n !== e)
        for (let t = 0; t < 11; ++t)
            o[t] = R.r2(.1 * t, a, n);
    return t => a === s && n === e || 0 === t || 1 === t ? t : R.r2((t => {
        let s = 0;
        for (var e = 1; 10 !== e && o[e] <= t; ++e)
            s += .1;
        --e;
        var i = (t - o[e]) / (o[e + 1] - o[e])
          , i = s + .1 * i
          , r = R.r3(i, a, n);
        return .001 <= r ? R.r5(t, i, a, n) : 0 === r ? i : R.r4(t, r, r + .1, a, n)
    }
    )(t), s, e)
}
,
R.Fetch = s => {
    var t = "json" === s.type;
    let e = t ? "json" : "text";
    var i = {
        method: t ? "POST" : "GET",
        headers: new Headers({
            "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
        }),
        mode: "same-origin"
    };
    t && (i.body = s.body),
    fetch(s.url, i).then(t => {
        if (t.ok)
            return t[e]();
        s.error && s.error()
    }
    ).then(t => {
        s.success(t)
    }
    )
}
,
R.Has = (t, s) => t.hasOwnProperty(s),
R.Is = {
    str: t => "string" == typeof t,
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    def: t => void 0 !== t,
    und: t => void 0 === t
},
R.Mod = (t, s) => (t % s + s) % s,
R.Pad = (t, s) => ("000" + t).slice(-s),
R.PCurve = (t, s, e) => (s + e) ** (s + e) / (s ** s * e ** e) * t ** s * (1 - t) ** e,
R.R = (t, s) => {
    s = R.Is.und(s) ? 100 : 10 ** s;
    return Math.round(t * s) / s
}
,
R.Select = {
    el: t => {
        let s = [];
        var e;
        return R.Is.str(t) ? (e = t.substring(1),
        "#" === t.charAt(0) ? s[0] = R.G.id(e) : s = R.G.class(e)) : s[0] = t,
        s
    }
    ,
    type: t => "#" === t.charAt(0) ? "id" : "class",
    name: t => t.substring(1)
},
R.L = (t, s, e, i) => {
    var r = R.Select.el(t)
      , a = r.length;
    let n = !1;
    var t = e.substring(0, 3)
      , o = ("whe" !== t && "mou" !== t && "tou" !== t && "poi" !== t || (n = {
        passive: !1
    }),
    "a" === s ? "add" : "remove");
    for (let t = 0; t < a; t++)
        r[t][o + "EventListener"](e, i, n)
}
;
let Tab = class {
    constructor() {
        this._ = [],
        this.pause = 0,
        R.BM(this, ["v"]),
        R.L(document, "a", "visibilitychange", this.v)
    }
    add(t) {
        this._.push(t)
    }
    v() {
        var t = performance.now();
        let s, e, i = (e = document.hidden ? (this.pause = t,
        "stop") : (s = t - this.pause,
        "start"),
        this._.length);
        for (; i--; )
            this._[i][e](s)
    }
}
  , RD = (R.Tab = new Tab,
0)
  , FR = 1e3 / 60
  , Raf = (R.Raf = class {
    constructor() {
        this._ = [],
        this.on = !0,
        R.BM(this, ["loop", "tOff", "tOn"]),
        R.Tab.add({
            stop: this.tOff,
            start: this.tOn
        }),
        this.raf()
    }
    tOff() {
        this.on = !1
    }
    tOn(t) {
        this.t = null;
        let s = this.l();
        for (; s--; )
            this._[s].sT += t;
        this.on = !0
    }
    add(t) {
        this._.push(t)
    }
    remove(t) {
        let s = this.l();
        for (; s--; )
            if (this._[s].id === t)
                return void this._.splice(s, 1)
    }
    loop(s) {
        if (this.on) {
            this.t || (this.t = s),
            RD = (s - this.t) / FR,
            this.t = s;
            let t = this.l();
            for (; t--; ) {
                var e, i = this._[t];
                R.Is.def(i) && (i.sT || (i.sT = s),
                e = s - i.sT,
                i.cb(e))
            }
        }
        this.raf()
    }
    raf() {
        requestAnimationFrame(this.loop)
    }
    l() {
        return this._.length
    }
}
,
new R.Raf)
  , RafId = 0
  , Ro = (R.RafR = class {
    constructor(t) {
        this.cb = t,
        this.on = !1,
        this.id = RafId,
        RafId++
    }
    run() {
        this.on || (Raf.add({
            id: this.id,
            cb: this.cb
        }),
        this.on = !0)
    }
    stop() {
        this.on && (Raf.remove(this.id),
        this.on = !1)
    }
}
,
R.Rand = {
    range: (t, s, e) => R.R(Math.random() * (s - t) + t, e),
    uniq: s => {
        var e = [];
        for (let t = 0; t < s; t++)
            e[t] = t;
        let t = s;
        for (var i, r; t--; )
            i = ~~(Math.random() * (t + 1)),
            r = e[t],
            e[t] = e[i],
            e[i] = r;
        return e
    }
},
R.Snif = {
    uA: navigator.userAgent.toLowerCase(),
    get iPadIOS13() {
        return "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
    },
    get isMobile() {
        return /mobi|android|tablet|ipad|iphone/.test(this.uA) || this.iPadIOS13
    },
    get isFirefox() {
        return -1 < this.uA.indexOf("firefox")
    }
},
R.Svg = {
    shapeL: i => {
        var t, s, e, r;
        if ("circle" === i.tagName)
            return 2 * R.Ga(i, "r") * Math.PI;
        if ("line" === i.tagName)
            return t = R.Ga(i, "x1"),
            s = R.Ga(i, "x2"),
            e = R.Ga(i, "y1"),
            r = R.Ga(i, "y2"),
            Math.sqrt((s -= t) * s + (r -= e) * r);
        if ("polyline" !== i.tagName)
            return i.getTotalLength();
        {
            let s = 0
              , e = 0;
            var a = i.points.numberOfItems;
            for (let t = 0; t < a; t++) {
                var n = i.points.getItem(t);
                0 < t && (s += R.Dist(n.x - e.x, n.y - e.y)),
                e = n
            }
            return s
        }
    }
    ,
    split: t => {
        var s = []
          , e = t.split(" ")
          , i = e.length;
        for (let t = 0; t < i; t++) {
            var r = e[t].split(",")
              , a = r.length;
            for (let t = 0; t < a; t++) {
                var n = r[t]
                  , n = isNaN(n) ? n : +n;
                s.push(n)
            }
        }
        return s
    }
},
R.Timer = class {
    constructor(t) {
        this._ = new R.Delay(t.cb,t.delay)
    }
    run() {
        this._.stop(),
        this._.run()
    }
}
,
R.Une = (t, s, e) => 0 !== R.R(Math.abs(t - s), e),
R.Cr = t => document.createElement(t),
R.g = (t, s, e) => (t || document)["getElement" + s](e),
R.G = {
    id: (t, s) => R.g(s, "ById", t),
    class: (t, s) => R.g(s, "sByClassName", t),
    tag: (t, s) => R.g(s, "sByTagName", t)
},
R.Ga = (t, s) => t.getAttribute(s),
R.index = (s, e) => {
    var i = e.length;
    for (let t = 0; t < i; t++)
        if (s === e[t])
            return t;
    return -1
}
,
R.Index = {
    list: t => R.index(t, t.parentNode.children),
    class: (t, s, e) => R.index(t, R.G.class(s, e))
},
R.PD = t => {
    t.cancelable && t.preventDefault()
}
,
R.RO = class {
    constructor() {
        this.eT = R.Snif.isMobile ? "orientationchange" : "resize",
        this.tick = !1,
        this._ = [],
        R.BM(this, ["fn", "gRaf", "run"]),
        this.t = new R.Timer({
            delay: 40,
            cb: this.gRaf
        }),
        this.r = new R.RafR(this.run),
        R.L(window, "a", this.eT, this.fn)
    }
    add(t) {
        this._.push(t)
    }
    remove(t) {
        let s = this._.length;
        for (; s--; )
            if (this._[s].id === t)
                return void this._.splice(s, 1)
    }
    fn(t) {
        this.e = t,
        this.t.run()
    }
    gRaf() {
        this.tick || (this.tick = !0,
        this.r.run())
    }
    run() {
        let t = 0;
        for (var s = this._.length; t < s; )
            this._[t].cb(this.e),
            t++;
        this.r.stop(),
        this.tick = !1
    }
}
,
new R.RO)
  , RoId = 0;
function Router(t) {
    var s = _A
      , e = s.config.routes[t].page
      , i = s.route.new
      , r = s.route.old;
    s.route.old = i,
    s.route.new = {
        url: t,
        page: e
    },
    s.is[i.page] = !1,
    s.is[e] = !0,
    r.page && (s.was[r.page] = !1),
    s.was[i.page] = !0
}
R.ROR = class {
    constructor(t) {
        this.cb = t,
        this.id = RoId,
        RoId++
    }
    on() {
        Ro.add({
            id: this.id,
            cb: this.cb
        })
    }
    off() {
        Ro.remove(this.id)
    }
}
,
R.O = (t, s) => {
    t.style.opacity = s
}
,
R.pe = (t, s) => {
    t.style.pointerEvents = s
}
,
R.PE = {
    all: t => {
        R.pe(t, "all")
    }
    ,
    none: t => {
        R.pe(t, "none")
    }
},
R.T = (t, s, e, i) => {
    i = R.Is.und(i) ? "%" : i;
    t.style.transform = "translate3d(" + s + i + "," + e + i + ",0)"
}
;
class Win {
    constructor(t) {
        _A.win = {
            w: 0,
            h: 0
        },
        this.d = t,
        R.BM(this, ["resize"]),
        new R.ROR(this.resize).on(),
        this.resize()
    }
    resize() {
        var t = _A
          , s = innerWidth
          , e = innerHeight
          , i = (t.win = {
            w: s,
            h: e
        },
        t.winSemi = {
            w: .5 * s,
            h: .5 * e
        },
        t.winRatio = {
            wh: s / e
        },
        t.isOver169 = t.winRatio.wh > 16 / 9,
        t.config.psd[this.d]);
        t.psd = {
            h: i.h,
            w: i.w
        },
        t.winWpsdW = s / t.psd.w,
        t.winHpsdH = e / t.psd.h,
        t.sFxS = .9 * t.win.h
    }
}
class Rotate {
    constructor() {
        this.inDom = !1,
        R.BM(this, ["resize"]),
        new R.ROR(this.resize).on(),
        this.resize()
    }
    resize() {
        var t = 1 < _A.winRatio.wh;
        t && !this.inDom ? this.a() : !t && this.inDom && this.r()
    }
    a() {
        this.issW = R.Cr("div"),
        this.issW.className = "iss-w";
        var t = R.Cr("div");
        t.className = "iss",
        t.textContent = "Please rotate your device.",
        this.issW.appendChild(t),
        document.body.prepend(this.issW),
        this.inDom = !0
    }
    r() {
        this.issW.parentNode.removeChild(this.issW),
        this.inDom = !1
    }
}
class Controller {
    constructor(t) {
        var s = _A;
        s.is[404] || (s.mutating = !0,
        s.page = {},
        s.fromBack = !1,
        this.transitionM = t.transition.mutation,
        this.device = t.device,
        R.BM(this, ["eD"]),
        new Win(this.device),
        "m" === this.device && new Rotate,
        s.e = new t.engine,
        this.onPopstate(),
        R.L(document.body, "a", "click", this.eD),
        new t.transition.intro(t => {
            this.intro(t)
        }
        ))
    }
    onPopstate() {
        let s = document
          , e = "complete"
          , i = s.readyState !== e;
        onload = t => {
            setTimeout(t => {
                i = !1
            }
            , 0)
        }
        ,
        onpopstate = t => {
            i && s.readyState === e && (R.PD(t),
            t.stopImmediatePropagation());
            t = _A;
            R.Is.und(t.config.routes) || (t.mutating ? this.hPS() : (t.mutating = !0,
            this.out(location.pathname, "back")))
        }
    }
    eD(t) {
        var s, e, i = _A;
        let r = t.target
          , a = !1
          , n = !1;
        for (; r; ) {
            var o = r.tagName;
            if ("A" === o) {
                a = !0;
                break
            }
            if (("INPUT" === o || "BUTTON" === o) && "submit" === r.type) {
                n = !0;
                break
            }
            r = r.parentNode
        }
        a ? (e = (s = r.href).substring(0, 3),
        r.hasAttribute("target") || "mai" === e || "tel" === e || (R.PD(t),
        i.mutating) || ((e = s.replace(/^.*\/\/[^/]+/, "")) !== i.route.new.url ? (i.mutating = !0,
        this.out(e, r)) : "nav-logo" === r.id && (location.href = "/"))) : n && R.PD(t)
    }
    intro(s) {
        let e = _A;
        R.Fetch({
            url: e.route.new.url + "?webp=" + e.webp + "&device=" + this.device,
            type: "html",
            success: t => {
                t = JSON.parse(t);
                e.config.routes = t.routes,
                e.data = t.data,
                this.cache = t.cache,
                this.add(document.body, "afterbegin", t.body),
                this.main = R.G.id("main"),
                this.transitionM = new this.transitionM,
                s()
            }
        })
    }
    out(t, s) {
        Router(t);
        t = _A;
        t.target = s,
        t.fromBack = "back" === s,
        t.page.update = t => {
            this.in()
        }
        ,
        this.transitionM.out()
    }
    in() {
        var t = _A;
        let s = this.cache[t.route.new.url];
        document.title = s.title,
        "back" !== t.target && this.hPS(),
        t.page.insertNew = t => {
            this.add(this.main, "beforeend", s.html)
        }
        ,
        t.page.removeOld = t => {
            var s = this.main.children[0];
            s.parentNode.removeChild(s)
        }
        ,
        this.transitionM.in()
    }
    add(t, s, e) {
        t.insertAdjacentHTML(s, e)
    }
    hPS() {
        var t = _A.route.new.url;
        history.pushState({
            page: t
        }, "", t)
    }
}
class SNative {
    constructor(t) {
        t = t.cb;
        this.cbY = t.y,
        R.BM(this, ["run"])
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
    l(t) {
        R.L(window, t, "scroll", this.run)
    }
    run() {
        this.cbY(pageYOffset)
    }
}
class Scroll {
    constructor() {
        R.BM(this, ["sY"]),
        this.scroll = new SNative({
            cb: {
                y: this.sY
            }
        })
    }
    init() {
        this._ = 0
    }
    on() {
        this.scroll.on()
    }
    off() {
        this.scroll.off()
    }
    sY(t) {
        this._ = t
    }
}
class STo {
    constructor(s) {
        var t = document
          , e = "scrollingElement"
          , e = t[e] || t.body;
        let i = R.Snif.isFirefox ? t.documentElement : e
          , r = pageYOffset
          , a = s.dest;
        t = Math.abs(a - r),
        e = 0 === t ? 0 : R.Lerp(300, 1500, R.Clamp(t / 3e3, 0, 1)),
        t = "io" + R.Clamp(Math.ceil(t / 500), 1, 6);
        this.a = new R.M({
            d: e,
            e: t,
            update: t => {
                i.scrollTop = R.R(R.Lerp(r, a, t.progE))
            }
            ,
            cb: t => {
                s.cb && s.cb()
            }
        })
    }
    play() {
        this.a.play()
    }
    pause() {
        this.a.pause()
    }
}
class ScrollTo {
    constructor() {
        R.BM(this, ["fn"])
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
    l(t) {
        R.L(".footer-top", t, "click", this.fn)
    }
    fn() {
        new STo({
            dest: 0,
            cb: !1
        }).play()
    }
}
class Footer {
    constructor() {
        R.BM(this, ["fn"])
    }
    init() {
        this.open = !1
    }
    fn() {
        var t = this.open ? "remove" : "add";
        R.G.class("footer")[0].classList[t]("on"),
        this.open = !this.open
    }
    l(t) {
        R.L(".footer-list-touch", t, "click", this.fn)
    }
    on() {
        this.l("a")
    }
    off() {
        this.l("r")
    }
}
class LZ {
    init() {
        this.img = [],
        this.imgI = [];
        var s = R.G.class("_lz");
        this.lzL = s.length;
        for (let t = 0; t < this.lzL; t++) {
            var e = s[t];
            this.img[t] = {
                src: e.dataset.src,
                dom: e
            }
        }
        for (let t = 0; t < this.lzL; t++)
            this.img[t].decode = !1;
        this.resize()
    }
    resize() {
        var t = _A
          , s = t.e.s._
          , e = t.win.h;
        for (let t = 0; t < this.lzL; t++) {
            var i = this.img[t].dom;
            R.Is.def(i) && (i = i.getBoundingClientRect().top + s,
            this.img[t].limit = {
                decode: Math.max(i - 2 * e, 0)
            })
        }
    }
    loop() {
        var s = _A.e.s._;
        for (let t = 0; t < this.lzL; t++) {
            var e = this.img[t];
            s > e.limit.decode && !e.decode && (this.img[t].decode = !0,
            this.decode(t))
        }
    }
    decode(t) {
        let s = this.img[t].dom
          , e = this.img[t].src;
        this.imgI[t] = new Image,
        this.imgI[t].src = e,
        this.imgI[t].decode().then(t => {
            R.Is.def(s) && (s.src = e,
            delete s.dataset.src)
        }
        )
    }
    off() {
        var s = this.imgI.length;
        for (let t = 0; t < s; t++)
            R.Is.def(this.imgI[t]) && (this.imgI[t].src = "data:,")
    }
}
class E {
    constructor() {
        R.BM(this, ["resize", "loop"]),
        this.raf = new R.RafR(this.loop),
        this.s = new Scroll,
        this.sTo = new ScrollTo,
        this.lz = new LZ,
        this.footer = new Footer
    }
    init() {
        this.footer.init(),
        this.s.init(),
        this.lz.init()
    }
    resize() {
        this.lz.resize()
    }
    run() {
        new R.ROR(this.resize).on(),
        this.raf.run()
    }
    on() {
        this.footer.on(),
        this.sTo.on(),
        this.s.on()
    }
    loop() {
        this.lz.loop()
    }
    off() {
        this.footer.off(),
        this.sTo.off(),
        this.s.off(),
        this.lz.off()
    }
}
let Fx$1 = class {
    constructor() {
        this.loadBg = R.G.id("load-bg")
    }
    run(t) {
        var s = _A.config.isLocal
          , e = s ? 0 : 100
          , s = s ? 0 : 700
          , i = new R.TL;
        i.from({
            el: this.loadBg,
            p: {
                opacity: [1, 0]
            },
            d: s,
            e: "linear",
            delay: e,
            cb: t
        }),
        i.play()
    }
}
;
class Intro {
    constructor(t) {
        let s = _A
          , e = new Fx$1;
        t(t => {
            e.run(t => {
                s.e.init(),
                s.e.run(),
                s.e.on(),
                s.mutating = !1,
                R.PE.none(R.G.id("load"))
            }
            )
        }
        )
    }
}
class Fx {
    constructor() {
        var t = R.G.id("sail");
        this.m = new R.M({
            el: t,
            p: {
                opacity: [0, 1]
            }
        })
    }
    out(t) {
        this.m.play({
            d: t.d,
            e: t.e,
            cb: t.cb
        })
    }
    in(t) {
        this.m.play({
            reverse: !0,
            d: t.d,
            e: t.e,
            cb: !1
        })
    }
}
class Mutation {
    constructor() {
        this.mutationFx = new Fx
    }
    out() {
        let s = _A;
        s.e.off();
        var t = s.fromBack ? 0 : 200;
        this.mutationFx.out({
            d: t,
            e: "linear",
            cb: t => {
                s.page.update()
            }
        })
    }
    in() {
        let s = _A;
        s.page.removeOld(),
        s.page.insertNew(),
        window.scrollTo(0, 0);
        var t = s.fromBack ? 0 : 300;
        s.e.init(),
        this.mutationFx.in({
            d: t,
            e: "linear"
        }),
        new R.Delay(t => {
            s.e.on(),
            s.mutating = !1
        }
        ,t).run()
    }
}
new Controller({
    device: "m",
    engine: E,
    transition: {
        intro: Intro,
        mutation: Mutation
    }
});
