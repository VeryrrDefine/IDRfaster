var page = 1;
var subpage = 1;
var sbc = [255, 255, 255];
var sbct = [-3, -2, -1];

function cnw(type)
{
	cnw_now = type;
}

var nowpage = 1;
var subpage = 1;
var get_PL1info = new Decimal(0);
var player;

function N(num)
{
	return new Decimal(num);
}

function init()
{
	player =
	{
		//start
		data: N(10),
		buyjd: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		jdnum: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		boost: N(0),
		boost2: N(0),
		
		//world
		PL1info: N(0),
		PL1unlock: false,
		PL1upg: [false, false, false, false, false, false, false, false],
		autobuyjd: [false, false, false, false, false, false, false, false],
		autoboost: false,
		autoboost2: false,
		slice: N(0),
		sliceupg_rep: [N(0), N(0), N(0), N(0)],
		sliceupg: [false, false, false, false],
		unlock_origin: false,
		origin_data: N(0),
		origin_upg: [N(0), N(0), N(0), N(0), N(0)],
		
		//universe
		PL2info: N(0),
		PL2unlock: false,
		PL2tms: N(0),
		buysn: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		star_node: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		star: N(0),
		dimension: N(0),
		boost3: N(0),
		autoboost3: false,
		entropy: [N(0), N(0), N(0), N(0)],
		openentropy: false,
		PL2upg: [false, false, false, false],
		godstar: N(0),
		godnode: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		buygn: [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)],
		gnunlock: [false, false, false, false, false, false, false, false],
		permupg: [],
		chalcomp: N(0),
		chalcomp_temp: N(0),
		openchal: false,
		chalpara: [false],
		algor: N(0),
		algordata: N(0),
		hidenode: false,
		algorrebuy: [N(0), N(0)],
		
		//chaos
		PL3info: N(0),
		PL3infottl: N(0),
		PL3unlock: false,
		PL3tms: N(0),
		chaosshard: N(0),
		chaosmass: N(0),
		reactpara: [N(0), N(0), N(0), N(0)],
		openelements: false,
		elements: 0,
		autochaos: false,
		autochaosgoal: N(0),
		blackhole: N(0),
		openbh: false,
		sing: N(0),
		exchal: [],
		openexchal: 0,
		colldata: N(0),
		opensupp: false,
		suppdata: N(0),
		suppupg: [],
		
		//void
		PL4tms: N(0),
		
		//theorem
		
		//reality
		
		//beyond
		
		//otherwise
		ach: [],
		last_update: Date.now(),
		offlinetime: 0,
		openoffline: false,
	};
}

var PL1upgcost = [N(1), N(2), N(6), N(40), N(2500), N(10000), N(30000), N(50000)];
var PL2upgcost = [N(1e12), N(1e13), N(1e32), N(1e75)];
var sliceupgcost = [N(5), N(6), N(7), N(8), N(300), N(15000), N(1e10), N(1e111)];
var insupgcostb = [N(300), N(50), N(300), N(50), N(300), N(50)];
var insupgcostx = [N(100), N(6), N(100), N(6), N(100), N(6)];

function chpage(p)
{
	page = p;
	subpage = 1;
}

function chspage(p)
{
	subpage = p;
}

function hard_reset()
{
	init();
	data_print();
}

//NOTATION ------------------------------------------------------------------------------------------------------------------------------------
//NOTATION ------------------------------------------------------------------------------------------------------------------------------------
var decimalOne = N(1);
var decimalZero = N(0);
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e6) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    //portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = 3, small) {
    small = small || 0
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "f" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "f" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 2, false)
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 2)
    else if (decimal.gte(1e6)) return exponentialFormat(decimal, 3)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")){
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else   
        return format(decimal, precision) + "⁻¹"

}

function notation(decimal, precision = 3)
{
	return format(decimal, precision);
}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}

//NOTATION ------------------------------------------------------------------------------------------------------------------------------------
//NOTATION ------------------------------------------------------------------------------------------------------------------------------------

var formatsave = {
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  startString: 'IncrementalDataRewrittenSaveFormat',
  endString: 'EndOfSaveFile',
  steps: [{
      encode: JSON.stringify,
      decode: JSON.parse
    },
    {
      encode: x => formatsave.encoder.encode(x),
      decode: x => formatsave.decoder.decode(x)
    },
    {
      encode: x => pako.deflate(x),
      decode: x => pako.inflate(x)
    },
    {
      encode: x => Array.from(x).map(i => String.fromCharCode(i)).join(""),
      decode: x => Uint8Array.from(Array.from(x).map(i => i.charCodeAt(0)))
    },
    {
      encode: x => btoa(x),
      decode: x => atob(x)
    },
    {
      encode: x => x.replace(/=+$/g, "").replace(/0/g, "0a").replace(/\+/g, "0b").replace(/\//g, "0c"),
      decode: x => x.replace(/0b/g, "+").replace(/0c/g, "/").replace(/0a/g, "0")
    },
    {
      encode: x => formatsave.startString + x + formatsave.endString,
      decode: x => x.slice(formatsave.startString.length, -formatsave.endString.length),
    }
  ],
  encode(s) {
    return this.steps.reduce((x, f) => f.encode(x), s);
  },
  decode(s) {
    return this.steps.reduceRight((x, f) => f.decode(x), s);
  },
}

function transformToDecimal(object)
{
	for (i in object) {
		if (typeof (object[i]) == "string" && !isNaN(new Decimal(object[i]).mag)) object[i] = new Decimal(object[i]);
		if (typeof (object[i]) == "object" && !isNaN(new Decimal(object[i]).mag)) transformToDecimal(object[i]);
		if (new Decimal(object[i]).gte("F1e308")) object[i] = new Decimal(1);
	}
}

function data_print()
{
	localStorage.IDRgamesave = formatsave.encode(JSON.stringify(player));
}

function data_input()
{
	if (!localStorage.IDRgamesave) return;
	if(localStorage.IDRgamesave[0] == 'e') player = JSON.parse(atob(localStorage.IDRgamesave));
	else player = JSON.parse(formatsave.decode(localStorage.IDRgamesave));
	transformToDecimal(player);
}

async function jtb(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function export_save()
{
	jtb(formatsave.encode(JSON.stringify(player)));
}

function import_save()
{
	let userInput = prompt("导入：", "输入存档");
	if (userInput != null && userInput !== "") {
		if(userInput[0] == 'e') player = JSON.parse(atob(userInput));
		else player = JSON.parse(formatsave.decode(userInput));
		transformToDecimal(player);
		data_print();
		location.reload();
	} else {
	}
}

function getjdscs(i)
{
	let base = [N(1024), N(1e10), N(1e50), N('e400'), N(180000), N(1e7), N(2e8), N(2e10)];
	if(getexchalopen().includes(6)) return base;
	
	if(player.boost.gte(55)) base[2] = base[2].pow(1.5);
	if(player.boost.gte(315)) base[3] = base[3].pow(1.25);
	if(player.boost2.gte(250)) base[3] = base[3].pow(2);
	if(player.PL1upg[6]) for(let j = 0;j < 2;j++) base[j] = base[j].pow(1.5);
	if(player.sliceupg[2]) for(let j = 0;j < 3;j++) base[j] = base[j].pow(1.5);
	if(player.permupg.includes(15)) base[4] = base[4].mul(1.1);
	if(player.godstar.gte(3e6)) base[4] = base[4].pow(N(1).add(player.godstar.div(3e6).add(1).log10().add(10).log10().log10().min(0.025)));
	//delete
	if(player.boost3.gte(3)) {base[0] = N(Infinity); base[0].layer = Infinity;}
	if(player.boost3.gte(12)) {base[1] = N(Infinity); base[1].layer = Infinity;}
	if(player.boost3.gte(13)) {base[2] = N(Infinity); base[2].layer = Infinity;}
	if(player.boost3.gte(80)) {base[3] = N(Infinity); base[3].layer = Infinity;}
	return base;
}

function getjdscx(i)
{
	let base = [N(1), N(4), N(99), N(999), N(1 / 9), N(1 / 6), N(1 / 3), N(1 / 7)];
	if(getexchalopen().includes(6))
	{
		for(let i = 0;i < 8;i++) base[i] = N(1).div(base[i].add(1));
		return base;
	}
	
	if(player.boost.gte(15)) base[0] = base[0].mul(0.75);
	if(player.boost.gte(20)) base[0] = base[0].mul(0.4);
	if(player.boost.gte(21)) base[1] = base[1].mul(N(1).div(player.boost.add(1).root(15)));
	if(player.boost2.gte(2)) base[0] = base[0].mul(N(1).div(player.boost.add(1).root(5)));
	if(player.boost2.gte(48)) for(let j = 0;j < 3;j++) base[j] = base[j].mul(N(1).div(player.boost2.root(10)));
	if(player.boost2.gte(119)) for(let j = 1;j < 4;j++) base[j] = base[j].mul(0.3);
	if(player.PL1upg[1]) base[0] = base[0].mul(0.6);
	if(player.PL1upg[5]) base[0] = base[0].mul(0.5);
	if(player.PL1upg[5]) base[1] = base[1].mul(0.6);
	if(player.PL1upg[5]) base[2] = base[2].mul(0.6);
	if(player.permupg.includes(1)) base[4] = base[4].mul(0.8);
	if(player.boost2.gte(470)) base[3] = base[3].mul(0.7);
	if(player.permupg.includes(28)) base[3] = base[3].mul(0.5);
	if(player.permupg.includes(40)) base[6] = base[6].mul(0.6);
	if(hassuppupg(91)) base[6] = base[6].mul(suppupgeffect(91));
	//delete
	if(player.permupg.includes(51)) {base[4] = N(0);}
	if(player.exchal[6].gte(17)) {base[5] = N(0);}
	for(let i = 0;i < 8;i++) base[i] = N(1).div(base[i].add(1));
	return base;
}

function getjdprice()
{
	let base = [N(10), N(1000), N(1e5), N(1e7), N(1e9), N(1e11), N(1e13), N(1e15)];
	let basex = [N(10), N(100), N(1000), N(1e4), N(1e5), N(1e6), N(1e7), N(1e8)];
	let jdprice = base;
	for(let i = 0;i < 8;i++) jdprice[i] = jdprice[i].mul(basex[i].pow(player.buyjd[i]));
	return jdprice;
}

function getbuyjdeffect()
{
	let base = N(2);
	if(getexchalopen().includes(7)) return N(1);
	//mul
	if(player.PL2unlock && !player.permupg.includes(17)) base = base.mul(player.star.add(10).log10().pow(0.5));
	else if(player.PL2unlock && player.permupg.includes(17)) base = base.mul(player.star.add(2).log(2));
	if(player.permupg.includes(2)) base = base.mul(player.PL2info.add(1).log10().mul(1.5).root(1.75).max(1));
	if(player.godstar.gte(1e21)) base = base.mul(player.godstar.div(1e15).sub(999999).root(5).max(1).min(30000));
	if(player.permupg.includes(21)) base = base.mul(player.dimension.add(2).div(2).root(1.2));
	if(player.PL3info.gte(250000)) base = base.mul(player.PL3infottl.sub(250000).add(1).root(2));
	//pow
	if(player.permupg.includes(29)) base = base.pow(N(1).add(player.algorrebuy[0].add(player.permupg.includes(57) ? player.algorrebuy[1].mul(0.5) : 0).mul(0.05)));
	if(player.exchal[5].gte(1)) base = base.pow(exchal[5].effect());
	//dil
	return base;
}

function getjdx()
{
	let base = [N(1), N(1), N(1), N(1), N(1), N(1), N(1), N(1)];
	for(let i = 0;i < 8;i++)
	{
		let scs = getjdscs(i);
		let scx = getjdscx(i);
		base[i] = base[i].mul(getbuyjdeffect().pow(player.buyjd[i].add(player.permupg.includes(24) ? getalgoreffect() : 0)));
		for(let j = 0;j < 4;j++)
		{
			if(base[i].gte(scs[j]))
			{
				base[i] = scs[j].mul(base[i].div(scs[j]).pow(scx[j]));
			}
		}
		//mult
		if(player.boost2.gte(1)) base[i] = base[i].mul(3);
		if(player.boost2.gte(3)) base[i] = base[i].mul(player.boost2.add(1).mul(1.25).pow(3.5));
		if(player.boost2.gte(12)) base[i] = base[i].mul(player.PL1info.add(1).mul(0.5).pow(0.25).min('e100000'));
		if(player.boost.gte(3) && !player.boost.gte(52)) base[i] = base[i].mul(player.boost);
		if(player.boost.gte(52)) base[i] = base[i].mul(player.boost.pow(2));
		if(player.boost3.gte(8)) base[i] = base[i].mul(N(2).pow(player.boost.pow(1.35)).min('e5000'));
		if(player.boost3.gte(9)) base[i] = base[i].mul(player.PL2info.add(1).pow(45));
		if(player.PL1upg[2]) base[i] = base[i].mul(player.boost.add(1).pow(1.5));
		if(player.PL1upg[7]) base[i] = base[i].mul(getsliceeffect());
		if(player.origin_data.gte(1e5) && !(player.openchal && player.chalpara.includes(2))) base[i] = base[i].mul(player.origin_data.div(100).sub(1000).max(1).pow(20));
		if(player.entropy[2].gte(1)) base[i] = base[i].mul(N(100).pow(player.entropy[2].add(3).pow(4)).min('e8192'));
		if(player.PL2upg[2] && !player.permupg.includes(11)) base[i] = base[i].mul(N(10).pow(player.godstar.mul(60).root(1.8).min(N(2000).add(player.godstar.root(2.1))).min(N(10000).add(player.godstar.root(4))).min(N(20000).add(player.godstar.log10().mul(45)))).min('e1e12'));
		if(player.PL3infottl.gte(6.666)) base[i] = base[i].mul(player.PL3infottl.pow(100));
		//pow
		if(player.boost.gte(65)) base[i] = base[i].pow(N(1).add(player.boost.root(10).div(15)));
		if(player.boost3.gte(4))
		{
			let power = player.PL2info.add(1).log10().div(40).add(1);
			if(power.gte(1.1)) power = N(1.1).mul(power.div(1.1).pow(0.4));
			base[i] = base[i].pow(power.min(1.3));
		}
		if(player.PL1upg[7]) base[i] = base[i].pow(N(1).add(player.sliceupg_rep[0].mul(0.005)));
		if(player.permupg.includes(8)) base[i] = base[i].pow(player.PL2info.add(1).log10().add(10).log10().root(4).min(1.4));
		if(player.PL2upg[2] && player.permupg.includes(11)) base[i] = base[i].pow(player.godstar.add(10).log10().add(10).log10().root(3));
		if(player.permupg.includes(12)) base[i] = base[i].pow(player.star.add(10).log10().add(10).log10().root(6));
		if(player.chalcomp.gte(1.5)) base[i] = base[i].pow(N(1).add(player.chalcomp.log(1.5).root(7).log(2)));
		if(player.PL3unlock) base[i] = base[i].pow(player.PL3infottl.add(10).log10().root(2));
		if(player.boost3.gte(52)) base[i] = base[i].pow(player.boost.add(1).log10().div(3).add(1).root(2));
		if(player.elements >= 5) base[i] = base[i].pow(1.9 - 0.1 * i);
		if(player.exchal[1].gte(1)) base[i] = base[i].pow(exchal[1].effect());
		if(player.colldata.gte(1e18)) base[i] = base[i].pow(player.colldata.div(1e18).root(1.5).iteratedlog(10, 0.75).add(0.75));
		if(player.colldata.gte(1e54)) base[i] = base[i].pow(player.colldata.mul(player.star.add(1).root(1000)).div(1e54).add(9).log10());
		if(hassuppupg(4)) base[i] = base[i].pow(suppupgeffect(4));
		if(hassuppupg(80)) base[i] = base[i].pow(suppupgeffect(80));
		if(hassuppupg(97)) base[i] = base[i].pow(suppupgeffect(97));
		//dil
		if(player.openentropy)
		{
			base[i] = N(10).pow(base[i].log10().pow(0.9)).max(1);
		}
		if(player.openchal && player.chalpara.includes(0)) base[i] = N(10).pow(base[i].log10().pow(0.4)).max(1);
		if(player.openchal && player.chalpara.includes(4)) base[i] = N(10).pow(base[i].log10().pow(1.7)).max(1);
		if(player.openchal && player.chalpara.includes(5)) base[i] = N(10).pow(base[i].log10().pow(1.3)).max(1);
		if(getexchalopen().includes(3)) base[i] = N(10).pow(base[i].log10().pow(0.5)).max(1);
		if(player.opensupp) base[i] = N(10).pow(base[i].log10().pow(1.5)).max(1);
		if(hassuppupg(84)) base[i] = N(10).pow(base[i].log10().pow(suppupgeffect(84))).max(1);
		if(hassuppupg(24)) base[i] = N(10).pow(base[i].log10().pow(suppupgeffect(24))).max(1);
		if(player.colldata.gte(1e160)) base[i] = N(10).pow(base[i].log10().pow(player.colldata.div(1e160).root(40).mul(1e11).iteratedlog(10, 2).root(3))).max(1);
		for(let j = 4;j < 8;j++)
		{
			if(base[i].gte(N(10).pow(scs[j])))
			{
				base[i] = (N(10).pow(scs[j])).mul(N(10).pow(base[i].log10().sub(scs[j]).pow(scx[j])));
			}
		}
	}
	return base;
}

function getdataspillstart()
{
	let base = N(10).pow(N(2).pow(1024));
	return base;
}

function getdataspillroot(gen)
{
	let start = getdataspillstart();
	if(start.gte(gen)) return;
	return gen.log10().div(start.log10()).root(1.01);
};

function buyjd(num)
{
	num = num - 1;
	let costlist = getjdprice();
	let cost = costlist[num];
	if(player.data.gte(cost))
	{
		if(!player.PL1upg[0]) player.data = player.data.sub(cost);
		player.buyjd[num] = player.buyjd[num].add(1);
		player.jdnum[num] = player.jdnum[num].add(10);
	}
}

function buymaxjd(num)
{
	let jdunlock = [N(1), N(2), N(4), N(5), N(11), N(12), N(13), N(14)];
	num = num - 1;
	let base = [N(1), N(100), N(1e4), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14)];
	let basex = [N(10), N(100), N(1000), N(1e4), N(1e5), N(1e6), N(1e7), N(1e8)];
	let cost = getjdprice();
	if(player.data.gte(cost[num]) && player.boost.gte(jdunlock[num]))
	{
		let ans = player.data.div(base[num]).log(basex[num]).floor().add(1);
		if(!player.PL1upg[0]) player.data = player.data.sub(cost[num]);
		player.jdnum[num] = player.jdnum[num].add(ans.sub(player.buyjd[num]).mul(10));
		player.buyjd[num] = ans;
	}
}

function chautobuyjd(num)
{
	num = num - 1;
	player.autobuyjd[num] = !player.autobuyjd[num];
}

function allmaxjd()
{
	for(let i = 0;i < 8;i++) buymaxjd(i + 1);
}

function getboostzs1x()
{
	let base = N(1);
	if(player.boost.gte(16)) base = base.mul(0.5);
	if(player.boost2.gte(5)) base = base.mul(0.5);
	if(player.boost2.gte(11)) base = base.mul(0.9);
	if(player.boost2.gte(90)) base = base.mul(!player.boost2.gte(370) ? N(1).div(player.boost2.add(2).root(11)) : N(1).div(player.boost2.add(1).mul(2).root(10)));
	if(player.boost3.gte(1)) base = base.mul(0.7);
	if(player.PL1upg[3]) base = base.mul(0.5);
	if(player.PL2tms.gte(10)) base = base.mul(0.75);
	if(player.entropy[0].gte(1.75)) base = base.mul(N(1).div(player.entropy[0].root(2)));
	if(player.permupg.includes(3)) base = base.mul(0.75);
	base = base.add(1);
	return base;
}

function getboostzs2x()
{
	let base = N(3);
	return base;
}

function getboostcost()
{
	let base = N(10).pow(player.boost);
	if(player.boost.gte(10))
	{
		let zsx = getboostzs1x();
		base = N(10).pow(10).mul(N(10).pow(N(zsx).pow(player.boost.sub(10))));
	}
	if(player.boost.gte(20000))
	{
		let zsx1 = getboostzs1x();
		let zsx2 = getboostzs2x();
		base = N(10).pow(10).mul(N(10).pow(N(zsx1).pow(N(20000).add(player.boost.sub(20000).pow(zsx2)).sub(10))));
	}
	return base;
}

function getboost2cost()
{
	let base = player.boost2.mul(4).add(16);
	if(player.PL1upg[7]) base = base.sub(player.sliceupg_rep[2]);
	if(player.boost3.gte(2)) base = base.sub(player.boost3.add(1).mul(2).pow(1.25));
	if(player.permupg.includes(16)) base = base.sub(player.godstar.add(1).log10().min(10000));
	return base;
}

function getboost3cost()
{
	let base = player.boost3.add(8).pow(2);
	return base;
}

var boosteffectlist = [N(1), N(2), N(3), N(4), N(5), N(11), N(12), N(13)
, N(14), N(15), N(16), N(20), N(21), N(52), N(55), N(65)
, N(67), N(95), N(120), N(315), N(888)];
var boosteffectnum = 21;

function getboosteffect(b)
{
	if(!b.gte(1))
	{
		return '在1跃迁，解锁1号传输节点。';
	}
	else if(!b.gte(2))
	{
		return '在2跃迁，解锁2号传输节点。';
	}
	else if(!b.gte(3))
	{
		return '在3跃迁，节点产能增加等同于跃迁数量的倍数。';
	}
	else if(!b.gte(4))
	{
		return '在4跃迁，解锁3号传输节点。';
	}
	else if(!b.gte(5))
	{
		return '在5跃迁，解锁4号传输节点。';
	}
	else if(!b.gte(11))
	{
		return '在11跃迁，解锁5号传输节点。';
	}
	else if(!b.gte(12))
	{
		return '在12跃迁，解锁6号传输节点。';
	}
	else if(!b.gte(13))
	{
		return '在13跃迁，解锁7号传输节点。';
	}
	else if(!b.gte(14))
	{
		return '在14跃迁，解锁8号传输节点。';
	}
	else if(!b.gte(15))
	{
		return '在15跃迁，传输节点的一阶软上限弱化25%。';
	}
	else if(!b.gte(16))
	{
		return '在16跃迁，使跃迁超级折算弱化50%。';
	}
	else if(!b.gte(20))
	{
		return '在20跃迁，传输节点的一阶软上限弱化60%。';
	}
	else if(!b.gte(21))
	{
		return '在21跃迁，跃迁弱化传输节点的二阶软上限，当前：×' + notation(N(1).div(player.boost.add(1).root(15)));
	}
	else if(!b.gte(52))
	{
		return '在52跃迁，3跃迁的效果改为增加等同于跃迁数量的平方的倍数';
	}
	else if(!b.gte(55))
	{
		return '在55跃迁，节点三阶软上限延迟1.5次方出现。';
	}
	else if(!b.gte(65))
	{
		return '在65跃迁，跃迁提高传输节点的指数。当前：+' + notation(player.boost.root(10).div(15));
	}
	else if(!b.gte(67))
	{
		return '在67跃迁，世界信息增幅位面切片获取量。当前：×' + notation(player.PL1info.add(10).log(2).root(1.5));
	}
	else if(!b.gte(95))
	{
		return '在95跃迁，位面切片增幅指数增加0.2。';
	}
	else if(!b.gte(120))
	{
		return '在120跃迁，本源数据产能×5。';
	}
	else if(!b.gte(315))
	{
		return '在315跃迁，节点四阶软上限延迟1.25次方出现。';
	}
	else if(!b.gte(888))
	{
		return '在888跃迁，位面切片增幅指数×1.125';
	}
	else return '';
}

var boost2effectlist = [N(1), N(2), N(3), N(5), N(10), N(11), N(12), N(25)
, N(34), N(48), N(90), N(119), N(250), N(370), N(470)];
var boost2effectnum = 15;

function getboost2effect(b)
{
	if(!b.gte(1))
	{
		return '在1二重跃迁，节点产能增加3倍。';
	}
	else if(!b.gte(2))
	{
		return '在2二重跃迁，跃迁弱化传输节点的一阶软上限。当前：×' + notation(N(1).div(player.boost.add(1).root(5)));
	}
	else if(!b.gte(3))
	{
		return '在3二重跃迁，二重跃迁增幅节点产能。当前：×' + notation(player.boost2.add(1).mul(1.25).pow(3.5));
	}
	else if(!b.gte(5))
	{
		return '在5二重跃迁，使跃迁超级折算弱化50%。';
	}
	else if(!b.gte(10))
	{
		return '在10二重跃迁，跃迁数量加成世界信息获取量。当前：×' + notation(player.boost.add(1).mul(1.5).pow(0.75));
	}
	else if(!b.gte(11))
	{
		return '在11二重跃迁，使跃迁超级折算弱化10%。';
	}
	else if(!b.gte(12))
	{
		return '在12二重跃迁，世界信息增幅节点产能。当前：×' + notation(player.PL1info.add(1).mul(0.5).pow(0.25).min('e100000'));
	}
	else if(!b.gte(25))
	{
		return '在25二重跃迁，位面切片产能×5000。';
	}
	else if(!b.gte(34))
	{
		return '在34二重跃迁，位面切片数量增幅本源数据获取。当前：×' + notation(N(1).add(player.slice.log(2).div(30)));
	}
	else if(!b.gte(48))
	{
		return '在48二重跃迁，二重跃迁弱化节点一至三阶软上限。当前：×' + notation(N(1).div(player.boost2.root(10)));
	}
	else if(!b.gte(90))
	{
		return '在90二重跃迁，二重跃迁弱化跃迁超级折算。当前：×' + notation(!player.boost2.gte(370) ? N(1).div(player.boost2.add(2).root(11)) : N(1).div(player.boost2.add(1).mul(2).root(10)));
	}
	else if(!b.gte(119))
	{
		return '在119二重跃迁，节点二至四阶软上限弱化70%。';
	}
	else if(!b.gte(250))
	{
		return '在250二重跃迁，节点四阶软上限延迟2次方出现。';
	}
	else if(!b.gte(370))
	{
		return '在370二重跃迁，90二重跃迁的效果公式变得更好。';
	}
	else if(!b.gte(470))
	{
		return '在470二重跃迁，节点四阶软上限弱化30%。';
	}
	else return '';
}

var boost3effectlist = [N(1), N(2), N(3), N(4), N(8), N(9), N(12), N(13)
, N(52), N(80)];
var boost3effectnum = 10;

function getboost3effect(b)
{
	if(!b.gte(1))
	{
		return '在1三重跃迁，跃迁超级折算弱化30%。';
	}
	else if(!b.gte(2))
	{
		return '在2三重跃迁，三重跃迁减少二重跃迁成本。当前：-' + notation(player.boost3.add(1).mul(2).pow(1.25));
	}
	else if(!b.gte(3))
	{
		return '在3三重跃迁，移除节点一阶软上限。';
	}
	else if(!b.gte(4))
	{
		return '在4三重跃迁，宇宙信息以指数增幅节点产能。当前：^' + notation(player.PL2info.add(1).log10().div(40).add(1).min(1.3));
	}
	else if(!b.gte(8))
	{
		return '在8三重跃迁，跃迁倍增节点产能。当前：×' + notation(N(2).pow(player.boost.pow(1.35)).min('e5000'));
	}
	else if(!b.gte(9))
	{
		return '在9三重跃迁，宇宙信息倍增节点产能。当前：×' + notation(player.PL2info.add(1).pow(45));
	}
	else if(!b.gte(12))
	{
		return '在12三重跃迁，移除节点二阶软上限。';
	}
	else if(!b.gte(13))
	{
		return '在13三重跃迁，移除节点三阶软上限。';
	}
	else if(!b.gte(52))
	{
		return '在52三重跃迁，跃迁以指数增幅节点产能。当前：^' + notation(player.boost.add(1).log10().div(3).add(1).root(2));
	}
	else if(!b.gte(80))
	{
		return '在80三重跃迁，移除节点四阶软上限。';
	}
	else return '';
}

function boostreset()
{
	player.data = N(10);
	for(let i = 0;i < 8;i++)
	{
		player.buyjd[i] = N(0);
		player.jdnum[i] = N(0);
	}
}

function boost2reset()
{
	boostreset();
	player.boost = N(0);
}

function boost3reset()
{
	boost2reset();
	player.boost2 = N(0);
}

function PL1reset()
{
	boost2reset();
	player.boost2 = N(0);
}

function PL2reset()
{
	PL1reset();
	player.PL1info = N(0);
	player.PL1upg = [true, false, false, false, true, false, false, true];
	player.slice = N(0);
	player.sliceupg = [true, false, false, true];
	player.sliceupg_rep = [N(0), N(0), N(0), N(0)];
	player.unlock_origin = false;
	player.origin_data = N(0);
	player.origin_upg = [N(0), N(0), N(0), N(0), N(0)];
	player.boost3 = N(0);
}

function PL3reset()
{
	PL2reset();
	player.PL2info = N(0);
	player.PL2tms = N(0);
	player.PL1upg = [false, false, false, false, false, false, false, false];
	player.sliceupg = [false, false, false, true];
	player.PL2upg = [false, false, false, true];
	player.star = N(0);
	player.star_node = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	player.buysn = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	player.dimension = N(0);
	player.entropy = [N(0), N(0), N(0), N(0)];
	player.godstar = N(0);
	player.godnode = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	player.buygn = [N(0), N(0), N(0), N(0), N(0), N(0), N(0), N(0)];
	let keep = [N(29)];
	if(player.permupg.includes(31)) {keep.push(10);keep.push(13);keep.push(14);keep.push(18);keep.push(21);keep.push(23);keep.push(24);keep.push(27);keep.push(29);}
	for(let i = 0;i < 30;i++) if(!keep.includes(i)) player.permupg = player.permupg.filter(item => item !== i);
	player.algor = N(0);
	player.algordata = N(0);
	player.algorrebuy = [N(0), N(0)];
	player.hidenode = false;
}

function buyboost()
{
	if(getexchalopen().includes(1)) return;
	let cost = getboostcost();
	if(player.data.gte(cost))
	{
		if(!player.PL1upg[4]) boostreset();
		player.boost = player.boost.add(N(1));
	}
}

function buymaxboost()
{
	if(getexchalopen().includes(1)) return;
	if(!player.PL1upg[4]) return;
	let zs1x = getboostzs1x();
	let ans = N(0);
	if(!player.data.gte(1e10))
	{
		ans = player.data.log(10).floor().add(1);
	}
	else
	{
		ans = ((player.data.div(1e10)).log10().log(zs1x)).floor().add(11);
		if(ans.gte(20000)) ans = N(20000).add(ans.sub(20000).root(getboostzs2x())).floor().add(1);
	}
	
	if(ans.gte(player.boost))
	{
		player.boost = ans;
	}
}

function buyboost2()
{
	if(getexchalopen().includes(1)) return;
	let cost = getboost2cost();
	if(player.boost.gte(cost))
	{
		if(!player.sliceupg[0]) boost2reset();
		player.boost2 = player.boost2.add(N(1));
	}
}

function buymaxboost2()
{
	if(getexchalopen().includes(1)) return;
	let cost_sub = N(0);
	if(player.PL1upg[7]) cost_sub = cost_sub.add(player.sliceupg_rep[2]);
	if(player.boost3.gte(2)) cost_sub = cost_sub.add(player.boost3.add(1).mul(2).pow(1.25));
	if(player.permupg.includes(16)) cost_sub = cost_sub.add(player.godstar.add(1).log10().min(10000));
	let ans = player.boost.add(cost_sub).sub(16).div(4).floor().add(1);
	if(ans.gte(player.boost2))
	{
		player.boost2 = ans;
	}
}

function buyboost3()
{
	if(getexchalopen().includes(1)) return;
	let cost = getboost3cost();
	if(player.boost2.gte(cost))
	{
		if(!player.PL2upg[0]) boost3reset();
		player.boost3 = player.boost3.add(N(1));
	}
}

function buymaxboost3()
{
	if(getexchalopen().includes(1)) return;
	let ans = player.boost2.sqrt().sub(7).floor();
	if(ans.gte(player.boost3))
	{
		player.boost3 = ans;
	}
}

function chautoboost()
{
	if(player.PL1upg[4]) player.autoboost = !player.autoboost;
}

function chautoboost2()
{
	if(player.sliceupg[0]) player.autoboost2 = !player.autoboost2;
}

function chautoboost3()
{
	if(player.PL2upg[1]) player.autoboost3 = !player.autoboost3;
}

var PL1infoget = N(0), PL2infoget = N(0), PL3infoget = N(0);
function updatePLinfoget()
{
	if(player.data.gte(1e80))
	{
		if(player.sliceupg[1]) PL1infoget = player.data.root(8).div(1e10);
		else if(player.PL1upg[7]) PL1infoget = player.data.root(10).div(1e8);
		else PL1infoget = player.data.root(80).sub(9);
	}
	else PL1infoget = N(0);
	
	//mul
	if(player.boost2.gte(10)) PL1infoget = PL1infoget.mul(player.boost.add(1).mul(1.5).pow(0.75));
	if(player.permupg.includes(0)) PL1infoget = PL1infoget.mul(getsliceeffect().pow(0.4));
	if(player.origin_data.gte(1e90) && !(player.openchal && player.chalpara.includes(2))) PL1infoget = PL1infoget.mul(player.origin_data.div(1e80).pow(540).min('e220000'));
	//pow
	if(player.permupg.includes(22) && player.openentropy) PL1infoget = PL1infoget.mul(player.PL1info.add(1).pow(5).min('e35000'));
	if(player.permupg.includes(23)) PL1infoget = PL1infoget.pow(1.02);
	//dil
	if(player.openchal && player.chalpara.includes(3)) PL1infoget = N(10).pow(PL1infoget.add(1).log10().pow(0.4)).max(1);
	if(player.openchal && player.chalpara.includes(5)) PL1infoget = N(10).pow(PL1infoget.add(1).log10().pow(1.3)).max(1);
	if(player.openchal && player.chalpara.includes(6)) PL1infoget = N(10).pow(PL1infoget.add(1).log10().pow(1.7)).max(1);
	PL1infoget = PL1infoget.floor();
	
	if(player.PL1info.gte('e7000'))
	{
		if(player.permupg.includes(26)) PL2infoget = player.PL1info.root(3300).div(132.19);
		else PL2infoget = player.PL1info.root(3500).div(100);
	}
	else PL2infoget = N(0);
	if(player.permupg.includes(53)) PL2infoget = PL2infoget.pow(2);
	
	PL2infoget = PL2infoget.floor();
	
	if(player.PL2info.gte('e10000'))
	{
		if(player.elements >= 4) PL3infoget = player.PL2info.log10().root(2).div(10).sub(9);
		else PL3infoget = player.PL2info.log10().root(4).div(5).sub(1);
	}
	else PL3infoget = N(0);
	if(player.exchal[7].gte(1)) PL3infoget = PL3infoget.mul(exchal[7].effect());
	
	PL3infoget = PL3infoget.floor();
}

function buyPL1()
{
	if(player.data.gte(1e80))
	{
		if(!player.PL2tms.gte(7)) PL1reset();
		player.PL1info = player.PL1info.add(PL1infoget);
		player.PL1unlock = true;
	}
}

function buyPL2()
{
	if(player.PL1info.gte('e7000'))
	{
		PL2reset();
		let gettms = N(1);
		if(player.permupg.includes(30)) gettms = gettms.mul(5);
		player.PL2info = player.PL2info.add(PL2infoget);
		player.PL2unlock = true;
		player.PL2tms = player.PL2tms.add(gettms);
		
		if(player.PL2tms.gte(2)) player.PL1upg = [true, true, true, true, true, true, true, true];
		if(player.PL2tms.gte(4)) player.sliceupg = [true, true, true, true], player.unlock_origin = true;
	}
}

function buyPL3()
{
	if(player.PL2info.gte('e10000'))
	{
		PL3reset();
		player.PL3info = player.PL3info.add(PL3infoget);
		player.PL3infottl = player.PL3infottl.add(PL3infoget);
		player.PL3unlock = true;
		player.PL3tms = player.PL3tms.add(1);
		
		if(player.permupg.includes(32))
		{
			player.PL2tms = N(35);
			player.PL1upg = [true, true, true, true, true, true, true, true];
			player.sliceupg = [true, true, true, true], player.unlock_origin = true;
		}
		if(player.permupg.includes(41))
		{
			player.PL2upg = [true, true, true, true];
		}
	}
}

function buyPL1ug(i)
{
	i = i - 1;
	if(player.PL1info.gte(PL1upgcost[i]) && !player.PL1upg[i])
	{
		player.PL1info = player.PL1info.sub(PL1upgcost[i]);
		player.PL1upg[i] = true;
	}
}

function getsliceeffect()
{
	let p = N(0.5);
	//add
	if(player.PL1upg[7]) p = p.add(player.sliceupg_rep[1].mul(0.05));
	if(player.boost.gte(95)) p = p.add(0.2);
	if(player.origin_data.gte(1e45) && !(player.openchal && player.chalpara.includes(2))) p = p.add(player.origin_data.div(1e40).max(1).log10().div(10));
	//mult
	if(player.star.gte(1e70)) p = p.mul(player.star.add(10).div(1e70).max(1).root(7).min(3.5));
	if(player.boost.gte(888)) p = p.mul(1.125);
	if(player.origin_data.gte(1e56) && !(player.openchal && player.chalpara.includes(2))) p = p.mul(player.origin_data.log10().sub(55).root(2).max(1).min(2));
	if(player.permupg.includes(9)) p = p.mul(1.5);
	if(player.permupg.includes(42)) p = p.mul(player.algordata.add(10).log(10).mul(3).min(1000));
	if(player.chaosmass.gte(2e8)) p = p.mul(player.chaosmass.div(2).log10().sub(7).mul(50).sub(49));
	if(player.permupg.includes(44)) p = p.mul(player.slice.add(10).log10().mul(2).sub(1).root(6));
	if(player.star.gte('e730')) p = p.mul(player.star.div('e730').add(10).log10().root(4));
	//pow
	//delete
	if(getexchalopen().includes(3)) p = N(0.001);
	
	let effect = player.slice.pow(p).max(1);
	if(player.openchal && player.chalpara.includes(1)) effect = N(1);
	return effect;
}

function buysliceupg(num)
{
	num = num - 1;
	if(num < 4)
	{
		if(player.sliceupg_rep[num].gte(200)) return;
		let cost = sliceupgcost[num].pow(player.sliceupg_rep[num].add(1));
		if(player.slice.gte(cost))
		{
			player.slice = player.slice.sub(cost);
			player.sliceupg_rep[num] = player.sliceupg_rep[num].add(1);
		}
	}
	else
	{
		let cost = sliceupgcost[num];
		if(player.slice.gte(cost) && !player.sliceupg[num - 4])
		{
			player.slice = player.slice.sub(cost);
			player.sliceupg[num - 4] = true;
		}
	}
}

function unlock_origin()
{
	if(player.PL1info.gte(1e130) && !player.unlock_origin)
	{
		player.PL1info = player.PL1info.sub(1e130);
		player.unlock_origin = true;
	}
}

function getorigineffect()
{
	let e = '';
	if(player.openchal && player.chalpara.includes(2)) return '到达 Infinity 本源数据解锁本源第一效果<br>';
	if(player.origin_data.gte(100)) e = e + "位面切片获取速度×" + notation(player.origin_data.sub(100).max(1).pow(N(1.15).add(player.origin_data.gte(1e56) ? player.origin_data.log10().sub(55).root(3).sub(1).max(0) : 0)).div(100).max(1)) + "<br>";
	if(player.origin_data.gte(100000)) e = e + "传输节点产能×" + notation(player.origin_data.div(100).sub(1000).max(1).pow(20)) + "<br>";
	if(player.origin_data.gte(5e12)) e = e + "本源数据获取速度×" + notation(player.origin_data.div(1.25e12).log(4).max(1)) + "<br>";
	if(player.origin_data.gte(1e45)) e = e + '位面切片效果指数+' + notation(player.origin_data.div(1e40).max(1).log10().div(10)) + '<br>';
	if(player.origin_data.gte(1e56)) e = e + '位面切片效果指数×' + notation(player.origin_data.log10().sub(55).root(2).max(1).min(2)) + ', 本源第一效果公式中的指数+' + notation(player.origin_data.log10().sub(55).root(3).sub(1).max(0)) + '<br>';
	if(player.origin_data.gte(1e90)) e = e + '世界信息获取×' + notation(player.origin_data.div(1e80).pow(540).min('e220000')) + '<br>';
	
	if(!player.origin_data.gte(100)) e = e + "到达 100 本源数据解锁本源第一效果<br>";
	else if(!player.origin_data.gte(100000)) e = e + "到达 1.000e5 本源数据解锁本源第二效果<br>";
	else if(!player.origin_data.gte(5e12)) e = e + "到达 5.000e12 本源数据解锁本源第三效果<br>";
	else if(!player.origin_data.gte(1e45)) e = e + '到达 1.000e45 本源数据解锁本源第四效果<br>';
	else if(!player.origin_data.gte(1e56)) e = e + '到达 1.000e56 本源数据解锁本源第五效果<br>';
	else if(!player.origin_data.gte(1e90)) e = e + '到达 1.000e90 本源数据解锁本源第六效果<br>';
	
	return e;
}

function getoriginupgcost(num)
{
	let base = [N(1), N(10), N(100), N(1e4), N(1e6)];
	let basex = [N(1.15), N(1.35), N(8), N(20), N(30)];
	if(num == 0) return base[0].mul(basex[0].pow(player.origin_upg[0])).sub(1);
	else return base[num].mul(basex[num].pow(player.origin_upg[num]));
}

function buyoriginupg(num)
{
	num = num - 1;
	let cap = [N(100), N(100), N(30), N(30)];
	if(num != 4 && player.origin_upg[num].gte(cap[num])) return;
	if(player.origin_data.gte(getoriginupgcost(num)))
	{
		player.origin_data = player.origin_data.sub(getoriginupgcost(num));
		player.origin_upg[num] = player.origin_upg[num].add(1);
	}
}

function getdimscalx()
{
	let base = N(1);
	if(player.permupg.includes(5)) base = base.mul(0.7);
	if(player.permupg.includes(45)) base = base.mul(N(1).div(player.chaosmass.add(100).log(100).root(5)));
	if(player.elements >= 2) base = base.mul(N(1).div(player.algordata.add(10).log10().root(2)));
	base = base.add(1);
	return base;
}

function getdimcost()
{
	let cost = (N(10).pow(getdimscalx().pow(player.dimension))).div(10);
	return cost;
}

function buydim()
{
	if(player.PL2info.gte(getdimcost()))
	{
		player.PL2info = player.PL2info.sub(getdimcost());
		player.dimension = player.dimension.add(1);
		player.star = player.star.add(1);
	}
}

function buymaxdim()
{
	if(player.PL2info.gte(1))
	{
		let ans = player.PL2info.mul(10).log10().log(getdimscalx()).floor().add(1);
		if(ans.gte(player.dimension))
		{
			player.dimension = ans;
			player.star = player.star.add(ans);
		}
	}
}

function getstareffect()
{
	let e = '';
	if(!player.permupg.includes(17)) e = e + "节点升级效果×" + notation(player.star.add(10).log10().pow(0.5)) + "<br>";
	else e = e + '节点升级效果×' + notation(player.star.add(2).log(2)) + '<br>';
	if(player.star.gte(1e50)) e = e + '位面切片获取速度×' + notation(player.permupg.includes(6) ? player.star.add(1).root(4.5) : player.star.add(10).log10().pow(1.75)) + '<br>';
	if(player.star.gte(1e70)) e = e + '位面切片增幅指数×' + notation(player.star.add(10).div(1e70).max(1).root(7).min(3.5)) + '<br>';
	if(player.star.gte('e370')) e = e + '位面切片增幅指数×' + notation(player.star.div('e730').add(10).log10().root(4)) + '<br>';
	if(!player.star.gte(1e50)) e = e + '到达 1.000e50 星辰解锁星辰第二效果' + '<br>';
	else if(!player.star.gte(1e70)) e = e + '到达 1.000e70 星辰解锁星辰第三效果' + '<br>';
	else if(!player.star.gte('e730')) e = e + '到达 1.000e730 星辰解锁星辰第四效果' + '<br>';
	return e;
}

function getsnscs()
{
	let base = [N(16384), N(1e100), N('e1000'), N('e10000')];
	return base;
}

function getsnscx()
{
	let base = [N(4), N(24), N(1e5 - 1), N(1e25)];
	if(player.elements >= 8) base[2] = base[2].mul(0.002);
	for(let i = 0;i < 4;i++) base[i] = N(1).div(base[i].add(1));
	return base;
}

function getsncost(num)
{
	let base = [N(1), N(1e4), N(1e8), N(1e12), N(1e16), N(1e20), N(1e24), N(1e28)];
	let basex = [N(100), N(10000), N(1e6), N(1e10), N(1e16), N(1e25), N(1e36), N(1e50)];
	return base[num].mul(basex[num].pow(player.buysn[num]));
}

function buysn(num)
{
	num = num - 1;
	let cost = getsncost(num);
	if(player.star.gte(cost))
	{
		if(!player.permupg.includes(27))player.star = player.star.sub(cost);
		player.buysn[num] = player.buysn[num].add(1);
		player.star_node[num] = player.star_node[num].add(1);
	}
}

function buymaxsn()
{
	if(!player.star.gte(0.1)) return;
	let base = [N(1), N(1e4), N(1e8), N(1e12), N(1e16), N(1e20), N(1e24), N(1e28)];
	let basex = [N(100), N(10000), N(1e6), N(1e10), N(1e16), N(1e25), N(1e36), N(1e50)];
	for(let i = 0;i < 8;i++)
	{
		let ans = player.star.div(base[i]).log(basex[i]).floor().add(1);
		if(ans.gte(player.buysn[i]))
		{
			player.star_node[i] = player.star_node[i].add(ans.sub(player.buysn[i]));
			player.buysn[i] = ans;
		}
	}
}

function getsnx()
{
	let scs = getsnscs();
	let scx = getsnscx();
	let snx = [N(1), N(1), N(1), N(1), N(1), N(1), N(1), N(1)];
	for(let i = 0;i < 8;i++)
	{
		snx[i] = snx[i].mul(N(2).pow(player.buysn[i])).pow(player.dimension);
		//mult
		if(player.entropy[1].gte(1.4)) snx[i] = snx[i].mul(N(100).pow(player.entropy[1]));
		if(player.chaosmass.gte(100000)) snx[i] = snx[i].mul(player.chaosmass.sub(99999.99).mul(100).root(2));
		//pow
		if(player.colldata.gte(1e54)) snx[i] = snx[i].pow(player.colldata.mul(player.star.add(1).root(1000)).div(1e54).add(9).log10());
		//sc
		for(let j = 0;j < 4;j++)
		{
			if(snx[i].gte(scs[j]))
			{
				snx[i] = scs[j].mul(snx[i].div(scs[j]).pow(scx[j]));
			}
		}
	}
	return snx;
}

function openentropy()
{
	if(player.PL1info.gte('e7000'))
	{
		player.PL2info = player.PL2info.add(PL2infoget);
		player.PL2unlock = true;
		player.PL2tms = player.PL2tms.add(1);
	}
	PL2reset();
	if(player.PL2tms.gte(2)) player.PL1upg = [true, true, true, true, true, true, true, true];
	if(player.PL2tms.gte(4)) player.sliceupg = [true, true, true, true], player.unlock_origin = true;
	player.openentropy = !player.openentropy;
}

function getentropy()
{
	if(player.openentropy || player.permupg.includes(33))
	{
		player.entropy[0] = player.entropy[0].max(player.PL1info.add(1).log10().div(100).sub(25).pow(0.5)).min(N(5).add(player.entropy[2].gte(4) ? player.entropy[2].sub(4).mul(2) : 0));
		player.entropy[1] = player.entropy[1].max(player.boost.add(1).log(N(10).mul(
			player.entropy[2].gte(1.014) ? N(1).sub(player.entropy[2].mul(0.1)) : 1)).div(2)).min(5);
		player.entropy[2] = player.entropy[2].max(player.slice.add(1).log10().sub(3).div(140)).min(5);
		player.entropy[3] = player.entropy[3].max(player.data.add(1).log(N(10).mul(
			player.entropy[1].gte(1.5) ? N(1).sub(player.entropy[1].mul(0.18)) : 1)).add(1).log(N(10).mul(
			player.entropy[1].gte(1.5) ? N(1).sub(player.entropy[1].mul(0.18)) : 1)).pow(0.5).div(2)).min(5);
	}
}

function getentropyeffect(i)
{
	let e = '';
	if(i == 0)
	{
		if(player.entropy[0].gte(1.75)) e = e + '跃迁超级折算强度×' + notation(N(1).div(player.entropy[0].root(2))) + '<br>';
		if(!player.entropy[0].gte(1.75)) e = e + '到达 1.75 熵_I解锁熵_I第一效果<br>';
		return e;
	}
	if(i == 1)
	{
		if(player.entropy[1].gte(1.4)) e = e + '星辰节点产能×' + notation(N(100).pow(player.entropy[1])) + '<br>';
		if(player.entropy[1].gte(1.5)) e = e + '熵_IV获取公式中的对数×' + notation(N(1).sub(player.entropy[1].mul(0.1))) + '<br>';
		if(!player.entropy[1].gte(1.4)) e = e + '到达 1.40 熵_II解锁熵_II第一效果<br>';
		else if(!player.entropy[1].gte(1.5)) e = e + '到达 1.50 熵_II解锁熵_II第二效果<br>';
		return e;
	}
	if(i == 2)
	{
		if(player.entropy[2].gte(1)) e = e + '传输节点产能×' + notation(N(100).pow(player.entropy[2].add(3).pow(4)).min('e8192')) + '<br>';
		if(player.entropy[2].gte(1.014)) e = e + '熵_II获取公式中的对数×' + notation(N(1).sub(player.entropy[2].mul(0.18))) + '<br>';
		if(player.entropy[2].gte(4)) e = e + '熵_I获取上限+' + notation(player.entropy[2].sub(4).mul(2)) + '<br>';
		if(!player.entropy[2].gte(1)) e = e + '到达 1.00 熵_III解锁熵_III第一效果<br>';
		else if(!player.entropy[2].gte(1.014)) e = e + '到达 1.014 熵_III解锁熵_III第二效果<br>';
		else if(!player.entropy[2].gte(4)) e = e + '到达 4.00 熵_III解锁熵_III第三效果<br>';
		return e;
	}
	if(i == 3)
	{
		if(player.entropy[3].gte(1)) e = e + '本源数据获取速度×' + notation(N(1000).pow(player.entropy[3].pow(1.25))) + '<br>';
		if(player.entropy[3].gte(1.062)) e = e + '位面切片在 1.000e135 的软上限强度×' + notation(N(1).sub(player.entropy[3].mul(0.16)).max(0.2)) + '<br>';
		if(!player.entropy[3].gte(1)) e = e + '到达 1.00 熵_IV解锁熵_IV第一效果<br>';
		else if(!player.entropy[3].gte(1.062)) e = e + '到达 1.062 熵_IV解锁熵_IV第二效果<br>';
		return e;
	}
}

function buyPL2upg(i)
{
	i = i - 1;
	if(player.PL2info.gte(PL2upgcost[i]) && !player.PL2upg[i])
	{
		player.PL2info = player.PL2info.sub(PL2upgcost[i]);
		player.PL2upg[i] = true;
	}
}

function getgodstareffect()
{
	let e = '';
	if(!player.permupg.includes(11)) e = e + '传输节点产能×' + notation(N(10).pow(player.godstar.mul(60).root(1.8).min(N(2000).add(player.godstar.root(2.1))).min(N(10000).add(player.godstar.root(4))).min(N(20000).add(player.godstar.log10().mul(45)))).min('e1e12')) + '<br>';
	else e = e + '传输节点产能^' + notation(player.godstar.add(10).log10().add(10).log10().root(3)) + '<br>';
	if(player.godstar.gte(3e6)) e = e + '节点五阶软上限指数延迟^' + notation(N(1).add(player.godstar.div(3e6).add(1).log10().add(10).log10().log10().min(0.025))) + '<br>';
	if(player.godstar.gte(1e13)) e = e + '本源数据获取速度×' + notation(player.godstar.div(1e9).sub(9999).root(1.25).max(1).min('e1800')) + '<br>';
	if(player.godstar.gte(1e21)) e = e + '传输节点升级效果×' + notation(player.godstar.div(1e15).sub(999999).root(5).max(1).min(30000)) + '<br>';
	if(player.godstar.gte(1e140)) e = e + '位面切片获取速度×' + notation(player.godstar.div(1e120).root(4).div(100).sub(999).min(N(1e50).add(player.permupg.includes(50) ? player.godstar.log(1.0001).pow(1000) : 0))) + '<br>';
	if(!player.godstar.gte(3e6)) e = e + '到达 3.000e6 神星解锁神星第二效果<br>';
	else if(!player.godstar.gte(1e13)) e = e + '到达 1.000e13 神星解锁神星第三效果<br>';
	else if(!player.godstar.gte(1e21)) e = e + '到达 1.000e21 神星解锁神星第四效果<br>';
	else if(!player.godstar.gte(1e140)) e = e + '到达 1.000e140 神星解锁神星第五效果<br>';
	return e;
}

function unlockgn(num)
{
	num = num - 1;
	let cost = [N('e1e6'), N('e2e6'), N('e3e6'), N('e4e6'), N('e5e6'), N('e6e6'), N('e7e6'), N('e8e6')];
	if(player.data.gte(cost[num]))
	{
		player.data = player.data.sub(cost[num]);
		player.gnunlock[num] = true;
	}
}

function getbuygnx()
{
	let base = N(3);
	if(player.exchal[4].gte(1)) base = base.mul(exchal[4].effect());
	return base;
}

function getgnx()
{
	let base = [N(1), N(1), N(1), N(1), N(1), N(1), N(1), N(1)];
	for(let i = 0;i < 8;i++)
	{
		base[i] = base[i].mul(getbuygnx().pow(player.buygn[i]));
		if(player.permupg.includes(4)) base[i] = base[i].mul(player.PL2info.div(1e40).add(10).log10().max(1));
		if(player.permupg.includes(13)) base[i] = base[i].mul(N(1.1).pow(player.boost3));
		if(getexchalopen().includes(5)) base[i] = N(10).pow(base[i].log10().pow(0.25));
		if(player.openchal && player.chalpara.includes(8)) base[i] = N(0);
	}
	return base;
}

function getgnc()
{
	let x = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
	let base = [N(1e35), N(1e70), N(1e110), N(1e170), N(1e210), N(1e240), N(1e300), N('e370')];
	let basex = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
	for(let i = 0;i < 8;i++)
	{
		x[i] = (base[i].mul(basex[i].pow(player.buygn[i])));
	}
	return x;
}

function buygn(num)
{
	num = num - 1;
	let c = getgnc();
	c = c[num];
	if(player.PL2info.gte(c))
	{
		player.PL2info = player.PL2info.sub(c);
		player.buygn[num] = player.buygn[num].add(1);
		player.godnode[num] = player.godnode[num].add(1);
	}
}

function buymaxgn()
{
	if(!player.PL2info.gte(0.1)) return;
	for(let i = 0;i < 8;i++)
	{
		if(!player.gnunlock[i]) continue;
		let x = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
		let base = [N(1e35), N(1e70), N(1e110), N(1e170), N(1e210), N(1e240), N(1e300), N('e370')];
		let basex = [N(100), N(10000), N(1e6), N(1e8), N(1e10), N(1e12), N(1e14), N(1e16)];
		let ans = player.PL2info.div(base[i]).log(basex[i]).floor().add(1);
		if(ans.gte(player.buygn[i]))
		{
			player.godnode[i] = player.godnode[i].add(ans.sub(player.buygn[i]));
			player.buygn[i] = ans;
		}
	}
}

function getfreepermupg()
{
	let e = 0;
	if(player.PL3unlock) e += player.PL3tms.min(15) * 2;
	return e;
}

function getdisablepermupg(i)
{
	if(getexchalopen().includes(4))
	{
		if(i == 0 || i == 1 || i == 3 || i == 7 || i == 8 || i == 11 || i == 12 || i == 15 || i == 17 || i == 23 || i == 25 || i == 28) return true;
	}
	return false;
}

function getpermupgeffect(num)
{
	if(num == 0) return '位面切片效果增幅世界信息。当前：×' + notation(getsliceeffect().pow(0.4));
	else if(num == 1) return '节点五阶软上限弱化20%。';
	else if(num == 2) return '宇宙信息增幅节点升级效果。当前：×' + notation(player.PL2info.add(1).log10().mul(1.5).root(1.75).max(1));
	else if(num == 3) return '跃迁超级折算弱化25%。';
	else if(num == 4) return '宇宙信息增幅神子产能。当前：×' + notation(player.PL2info.div(1e40).add(10).log10().max(1));
	else if(num == 5) return '维度折算弱化30%。';
	else if(num == 6) return '重写星辰第二效果的公式。当前：×' + notation(player.star.add(1).root(4.5).div(player.star.add(10).log10().pow(1.75)));
	else if(num == 7) return '世界信息增幅本源数据产能。当前：×' + notation(player.PL1info.pow(25).add(1.05).log(1.05).pow(1.15));
	else if(num == 8) return '宇宙信息以指数增幅节点产能。当前：^' + notation(player.PL2info.add(1).log10().add(10).log10().root(4).min(1.4));
	else if(num == 9) return '位面切片增幅指数×1.5。';
	else if(num == 10) return '你可以最大化购买神子。';
	else if(num == 11) return '神星第一效果改为对指数加成。当前：^' + notation(player.godstar.add(10).log10().add(10).log10().root(3));
	else if(num == 12) return '星辰增幅传输节点。当前：^' + notation(player.star.add(10).log10().add(10).log10().root(6));
	else if(num == 13) return '每个三重跃迁使神子×1.1。当前：×' + notation(N(1.1).pow(player.boost3));
	else if(num == 14) return '解锁挑战。(在层级选项卡内)';
	else if(num == 15) return '节点五阶软上限延迟1.1次方出现。';
	else if(num == 16) return '神星减少二重跃迁成本。当前：-' + notation(player.godstar.add(1).log10().min(10000));
	else if(num == 17) return '重写星辰第一效果的公式。当前：×' + notation(player.star.add(2).log(2).div(player.star.add(10).log10().pow(0.5)));
	else if(num == 18) return '被动获得宇宙信息的比率×100。';
	else if(num == 19) return '解锁阶层4挑战参数。';
	else if(num == 20) return '阶层4挑战参数的复杂度权重增加0.2';
	else if(num == 21) return '维度倍增传输节点升级效果。当前：×' + notation(player.dimension.add(2).div(2).root(1.2));
	else if(num == 22) return '收集熵时世界信息获取量^6，但上限在×1e35000。';
	else if(num == 23) return '世界信息获取量^1.02。';
	else if(num == 24) return '解锁算法。(在传输节点子选项卡内)';
	else if(num == 25) return '算法底数+1。';
	else if(num == 26) return '宇宙信息获取公式变得更好。';
	else if(num == 27) return '你自动购买星辰节点和神子，它们不消耗任何东西。';
	else if(num == 28) return '节点四阶软上限弱化50%。';
	else if(num == 29) return '解锁两个新的算法可购买。解锁混沌重置。';
	else if(num == 30) return '获得5倍宇宙重置次数。';
	else if(num == 31) return '混沌重置后保留永久升级11、14、15、19、22、24、25、28。';
	else if(num == 32) return '混沌重置后有35次宇宙重置。';
	else if(num == 33) return '你在任何环境下都能获得熵。';
	else if(num == 34) return '基于当前游戏进度，可以免费购买永久升级。当前：免费自动购买前' + getfreepermupg() + '个永久升级。';
	else if(num == 35) return '大幅降低算法价格。';
	else if(num == 36) return '你自动购买维度和算法，它们不消耗任何东西。';
	else if(num == 37) return '数据增强算法数据获取。当前：×' + notation(player.data.add(10).log10().add(9).log10().div(2));
	else if(num == 38) return '你自动购买算法可购买，它们不消耗任何东西。';
	else if(num == 39) return '解锁自动混沌重置。';
	else if(num == 40) return '节点七阶软上限弱化40%。';
	else if(num == 41) return '混沌重置后保留宇宙升级。';
	else if(num == 42) return '算法数据增强位面切片增幅指数。当前：×' + notation(player.algordata.add(10).log(10).mul(3).min(1000));
	else if(num == 43) return '解锁反应堆。(在混沌选项卡内)';
	else if(num == 44) return '位面切片增强位面切片增幅指数。当前：×' + notation(player.slice.add(10).log10().mul(2).sub(1).root(6));
	else if(num == 45) return '混沌质量弱化维度折算。当前：×' + notation(N(1).div(player.chaosmass.add(100).log(100).root(5)));
	else if(num == 46) return '数据延迟算法数据溢出。当前：×' + notation(player.data.add(10).log10().add(9).log10().root(5));
	else if(num == 47) return '解锁阶层5挑战参数。';
	else if(num == 48) return '你可以用反应堆压缩元素。';
	else if(num == 49) return '位面切片获取量（软上限后）^1.5。';
	else if(num == 50) return '神星第五效果的上限变为软上限。';
	else if(num == 51) return '移除节点五阶软上限。';
	else if(num == 52) return '算法数据增幅算法底数。当前：+' + notation(player.algordata.add(1).log10().root(5).div(3));
	else if(num == 53) return '宇宙信息获取量^2。';
	else if(num == 54) return '算法底数+0.5。';
	else if(num == 55) return '释放黑洞(在混沌选项卡内)。';
	else if(num == 56) return '八重神子增幅算法底数。当前：+' + notation(player.godnode[7].add(1).log10().add(1).log10().root(4));
	else if(num == 57) return '每2个宇宙折叠使真空衰变+1。当前：+' + notation(player.algorrebuy[1].mul(0.5)) + '；每4个真空衰变使算法+1。当前：+' + notation(player.algorrebuy[0].mul(0.25));
	else if(num == 58) return '解锁奇异挑战1(在层级选项卡内)。';
	else if(num == 59) return '开启黑洞不消耗黑洞，关闭黑洞时黑洞的充能变得更强。';
	else return '无效升级';
}

var permupgnum = 60;
var permupgcost = [N(1e75), N(1e78), N(1e19), N(1e82), N(1e85), N(3e23), N(1e88), N(4.5e25), N(5e95), N(1e40)
, N(1e42), N(1e124), N(2e46), N(1e50), N(1e150), N(1e70), N(1e190), N(1e92), N(1e240), N(1e127)
, N(1e255), N(4.65), N(1e270), N(7), N(1e146), N(1e162), N('1.797e308'), N('e400'), N('e3680'), N('e5300')
, N(1), N(1), N(2), N(2), N(3), N(4), N(5), N(6), N(7), N(10000)
, N('e70000'), N('e120000'), N('e4.6e6'), N(9.7), N(4e9), N('e9.4e6'), N(400), N('e1.18e7'), N('e2.18e7'), N('e2.7e7')
, N('e1e8'), N('e2.5e8'), N(1e13), N('e6e8'), N('e2.1e9'), N(1e6), N('e5e9'), N('e2e10'), N('e3e11'), N(1e14)];
var permupgcosttype = [0, 0, 1, 0, 0, 1, 0, 1, 0, 1
, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1
, 0, 2, 0, 2, 1, 1, 0, 0, 0, 0
, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
, 0, 1, 0, 2, 4, 0, 3, 1, 0, 1
, 0, 0, 4, 1, 1, 3, 0, 1, 1, 3];
var permupgcosttypename = ['宇宙信息', '神星', '挑战复杂度纪录', '混沌信息', '混沌质量'];
var permupgcosttypeinternal = ['PL2info', 'godstar', 'chalcomp_temp', 'PL3info', 'chaosmass'];

function buypermupg(num)
{
	if(getdisablepermupg(num)) return;
	if(player.permupg.includes(num)) return;
	if(player[permupgcosttypeinternal[permupgcosttype[num]]].gte(permupgcost[num]))
	{
		player[permupgcosttypeinternal[permupgcosttype[num]]] = player[permupgcosttypeinternal[permupgcosttype[num]]].sub(permupgcost[num]);
		player.permupg.push(num);
	}
}

function permupgcanblock(num)
{
	if(num >= 15 && num < 29 && !player.permupg.includes(14)) return false;
	if(num == 29 && (!player.permupg.includes(14) && !player.PL3unlock)) return false;
	if(num >= 30 && !player.PL3unlock) return false;
	return true;
}

var mouseenterpermupg = -1;

function build_permupgui()
{
	let ui = '';
	if(mouseenterpermupg != -1)
	{
		ui = ui + '<span class="ftsz2">永久升级' + (mouseenterpermupg + 1) + '</span><br>';
		if(getdisablepermupg(mouseenterpermupg)) ui = ui + '<span style="color: red"><strike>';
		ui = ui + '<span style="color: lightblue">' + getpermupgeffect(mouseenterpermupg) + '</span><br>';
		if(getdisablepermupg(mouseenterpermupg)) ui = ui + '</strike></span>';
		ui = ui + '<span class="ftsz2">价格：' + notation(permupgcost[mouseenterpermupg]) + permupgcosttypename[permupgcosttype[mouseenterpermupg]] + '</span><br><br>';
	}
	else ui = ui + '<br><br><br><br>';
	document.getElementById('permupgeffect').innerHTML = ui;
	
	for(let i = 0;i < permupgnum;i++)
	{
		if(permupgcanblock(i)) document.getElementById('permupg' + i).style.display = 'block';
		else document.getElementById('permupg' + i).style.display = 'none';
		
		if(player.permupg.includes(i))
		{
			if(permupgcosttype[i] == 0) document.getElementById('permupg' + i).style['background-color'] = 'purple';
			else if(permupgcosttype[i] == 1) document.getElementById('permupg' + i).style['background-color'] = 'orange';
			else if(permupgcosttype[i] == 2) document.getElementById('permupg' + i).style['background-color'] = 'red';
			else if(permupgcosttype[i] == 3) document.getElementById('permupg' + i).style['background-color'] = 'gold';
			else if(permupgcosttype[i] == 4) document.getElementById('permupg' + i).style['background-color'] = '#ffcc00';
		}
		else if(player[permupgcosttypeinternal[permupgcosttype[i]]].gte(permupgcost[i]))
		{
			document.getElementById('permupg' + i).style['background-color'] = '#666666';
		}
		else
		{
			document.getElementById('permupg' + i).style['background-color'] = 'black';
		}
		
		
		if(getdisablepermupg(i))
		{
			document.getElementById('permupg' + i).style['border-color'] = 'white';
			document.getElementById('permupg' + i).style['background-color'] = 'black';
			document.getElementById('permupg' + i).style['color'] = 'black';
		}
		else
		{
			document.getElementById('permupg' + i).style['border-color'] = 'white';
			document.getElementById('permupg' + i).style['color'] = 'white';
		}
	}
}

function dis_permupgui()
{
	let ui = '';
	ui = ui + '<table>';
	for(let i = 0;i < permupgnum;i++)
	{
		ui = ui + '<td><button id=\"permupg' + i + '\" class=\"permupg\" onclick="buypermupg(' + i + ');" onmouseenter=\"mouseenterpermupg = ' + i + ';\"';
		
		ui = ui + '>' + (i + 1);
		ui = ui + '</button></td>';
		if(i % 10 == 9)
		{
			ui = ui + '<tr>';
		}
		
	}
	ui = ui + '</table>';
	document.getElementById('permupg').innerHTML = ui;
}

function getchallayerunlock()
{
	let base = N(0);
	if(player.permupg.includes(14))
	{
		base = N(3);
	}
	if(player.permupg.includes(19))
	{
		base = N(4);
	}
	if(player.permupg.includes(47))
	{
		base = N(5);
	}
	return base;
}

var chalparanum = 9;
var challayernum = 5;
var challayerhaspara = [1, 2, 1, 3, 2];

function canchangechalpara(num)
{
	if(num < challayerhaspara[0]) return true;
	else
	{
		//获取参数阶层
		let n = 0;
		let layer;
		for(let i = 0;i < getchallayerunlock();i++)
		{
			n += challayerhaspara[i];
			if(num >= n) layer = i + 1;
		}
		let first, end;
		//获取上一个阶层起始点
		n = 0;
		for(let i = 0;i < layer - 1;i++)
		{
			n += challayerhaspara[i];
		}
		first = n;
		//获取上一个阶层终点
		n = 0;
		for(let i = 0;i < layer;i++)
		{
			n += challayerhaspara[i];
		}
		end = n - 1;
		//查找任何一个
		for(let i = first;i <= end;i++)
		{
			if(player.chalpara.includes(i)) return true;
		}
		return false;
	}
}

function getchalparatext(num)
{
	if(num == 0) return '节点产能指数^0.4';
	else if(num == 1) return '位面切片失去效果';
	else if(num == 2) return '本源数据失去效果';
	else if(num == 3) return '世界信息获取量指数^0.4';
	else if(num == 4) return '节点产能指数^1.7';
	else if(num == 5) return '节点产能与世界信息获取量指数^1.3';
	else if(num == 6) return '世界信息获取量指数^1.7';
	else if(num == 7) return '算法数据的溢出起点^0.25<br>挑战开始和结束都为混沌重置<br>完成需求为1e2000宇宙信息';
	else if(num == 8) return '禁用神子生产<br>挑战开始和结束都为混沌重置<br>完成需求为1e2000宇宙信息';
	else return '暂时没有这个参数';
}

function changechalpara(num)
{
	if(!player.openchal)
	{
		if(canchangechalpara(num) && !player.chalpara.includes(num)) player.chalpara.push(num);
	}
	else
	{
		alert('挑战时无法修改参数');
	}
}

function resetchalpara(num)
{
	if(!player.openchal)
	{
		player.chalpara = [];
	}
	else
	{
		alert('挑战时无法重置参数');
	}
}

function openchal()
{
	if(!player.openchal && !player.chalpara.includes(0))
	{
		alert('您必须将阶层1参数加入参数表中！');
		return;
	}
	if(player.PL1info.gte('e7000'))
	{
		player.PL2info = player.PL2info.add(PL2infoget);
		player.PL2unlock = true;
		player.PL2tms = player.PL2tms.add(1);
		if(player.openchal && getchalparacomp().gte(player.chalcomp)
		&& !(player.chalpara.includes(7) || player.chalpara.includes(8)))
		{
			player.chalcomp = getchalparacomp();
		}
	}
	PL2reset();
	if(player.PL2tms.gte(2)) player.PL1upg = [true, true, true, true, true, true, true, true];
	if(player.PL2tms.gte(4)) player.sliceupg = [true, true, true, true], player.unlock_origin = true;
	if(player.chalpara.includes(7) || player.chalpara.includes(8))
	{
		if(player.PL2info.gte('e10000'))
		{
			player.PL3info = player.PL3info.add(PL3infoget);
			player.PL3infottl = player.PL3infottl.add(PL3infoget);
			player.PL3unlock = true;
			player.PL3tms = player.PL3tms.add(1);
		}
		if(player.PL2info.gte('e2000'))
		{
			if(player.openchal && getchalparacomp().gte(player.chalcomp))
			{
				player.chalcomp = getchalparacomp();
			}
		}
		PL3reset();
		if(player.permupg.includes(32))
		{
			player.PL2tms = N(35);
			player.PL1upg = [true, true, true, true, true, true, true, true];
			player.sliceupg = [true, true, true, true], player.unlock_origin = true;
		}
		if(player.permupg.includes(41))
		{
			player.PL2upg = [true, true, true, true];
		}
	}
	player.openchal = !player.openchal;
}

function getchalparacomp()
{
	let base = N(1);
	let qz = [N(1), N(1), N(1.5), N(-1), N(1.5)];
	let nowid = 0;
	if(player.permupg.includes(20)) qz[3] = qz[3].add(0.2);
	for(let i = 0;i < getchallayerunlock();i++)
	{
		let lbase = N(1);
		for(let j = 0;j < challayerhaspara[i];j++)
		{
			if(player.chalpara.includes(nowid)) lbase = lbase.add(1);
			nowid++;
		}
		base = base.mul(lbase.pow(qz[i]));
	}
	return base;
}

function getchalcompeffect()
{
	let e = '';
	if(player.chalcomp.gte(1.5)) e = e + '传输节点^' + notation(N(1).add(player.chalcomp.log(1.5).root(7).log(2))) + '<br>';
	if(player.chalcomp.gte(10)) e = e + '算法数据的溢出延迟×' + notation(player.chalcomp.mul(50).sub(499).root(2)) + '<br>';
	if(!player.chalcomp.gte(1.5)) e = e + '到达 1.5 复杂度纪录解锁挑战第一效果<br>';
	if(!player.chalcomp.gte(10)) e = e + '到达 10 复杂度纪录解锁挑战第二效果<br>';
	return e;
}


function build_chalui()
{
	for(let i = 0;i < chalparanum;i++)
	{
		if(player.chalpara.includes(i) && player.openchal) document.getElementById('chalpara' + i).style['background-color'] = 'green';
		else if(player.chalpara.includes(i)) document.getElementById('chalpara' + i).style['background-color'] = 'blue';
		else document.getElementById('chalpara' + i).style['background-color'] = 'darkred';
		document.getElementById('chalpara' + i).innerHTML = getchalparatext(i);
	}
	for(let i = 0;i < getchallayerunlock();i++)
	{
		document.getElementById('challayer' + i).style.display = 'block';
		document.getElementById('challayert' + i).style.display = 'block';
	}
	for(let i = getchallayerunlock();i < challayernum;i++)
	{
		document.getElementById('challayer' + i).style.display = 'none';
		document.getElementById('challayert' + i).style.display = 'none';
	}
	if(player.openchal) document.getElementById('openchal').style['background-color'] = 'red';
	else document.getElementById('openchal').style['background-color'] = 'black';
}

function dis_chalui()
{
	let ui = '';
	ui = ui + '<table>';
	let nowparaid = 0;
	for(let i = 0;i < challayernum;i++)
	{
		ui = ui + '<td style="width: 50px;"><span class="ftsz2" id="challayert' + i + '">阶层' + (i + 1) + '</td>';
		ui = ui + '<td align="center" id="challayer' + i + '"><table>';
		for(let j = 0;j < challayerhaspara[i];j++)
		{
			ui = ui + '<td><button class="chalpara" id="chalpara' + nowparaid + '" onclick="changechalpara(' + nowparaid +')"></button></td>';
			nowparaid++;
		}
		ui = ui + '</table></td><tr>';
	}
	document.getElementById('challenge_detail').innerHTML = ui;
}

function getalgoreffect()
{
	if(getexchalopen().includes(2)) return N(0);
	let power = N(1);
	if(player.permupg.includes(29)) power = power.add(player.algorrebuy[1].mul(0.02));
	if(player.colldata.gte(1e9)) power = power.add(player.colldata.div(1e9).log10().root(5).div(10).min(N(0.12).add(player.colldata.log10().root(50).div(1000))));
	if(getexchalopen().includes(5)) power = N(1);
	let freelevel = player.algordata.pow(power);
	return freelevel;
}

function getalgorscalx()
{
	let sx = N(1);
	if(player.exchal[2].gte(1)) sx = sx.mul(exchal[2].effect());
	if(player.elements >= 7) sx = sx.mul(0.8);
	sx = sx.add(1);
	return sx;
}

function getalgorcost()
{
	if(player.permupg.includes(35)) return N('e14000').mul(N('e1e4').pow(getalgorscalx().mul(0.97).pow(player.algor).sub(1)));
	else return N('e1e6').mul(N('e2e4').pow(getalgorscalx().pow(player.algor).sub(1)));
}

function getalgorbase()
{
	let base = N(2);
	if(player.permupg.includes(25)) base = base.add(1);
	if(player.permupg.includes(52)) base = base.add(player.algordata.add(1).log10().root(5).div(3));
	if(player.permupg.includes(54)) base = base.add(0.5);
	if(player.permupg.includes(56)) base = base.add(player.godnode[7].add(1).log10().add(1).log10().root(4));
	if(hassuppupg(14)) base = base.add(suppupgeffect(14));
	return base;
}

function buyalgor()
{
	if(player.PL1info.gte(getalgorcost()))
	{
		player.PL1info = player.PL1info.sub(getalgorcost());
		player.algor = player.algor.add(1);
	}
}

function buymaxalgor()
{
	if(!player.PL1info.gte('e14000')) return;
	let ans = N(0);
	if(player.permupg.includes(35)) ans = player.PL1info.div('e14000').log('e1e4').log(getalgorscalx().mul(0.97)).floor().add(1);
	else ans = player.PL1info.div('e1e6').log('e2e4').log(getalgorscalx()).floor().add(1);
	if(ans.gte(player.algor)) player.algor = ans;
}

function getalgorrebuyscalx()
{
	let base = N(1.05);
	return base;
}

function getalgorrebuycost(num)
{
	if(num == 0 && player.algorrebuy[0].gte(50))
	{
		return N('e1.7e7').mul(N('e4e5').pow(N(2.5).pow(N(50).add(player.algorrebuy[0].sub(50).pow(getalgorrebuyscalx()))).sub(1)));
	}
	else if(num == 1 && player.algorrebuy[1].gte(25))
	{
		return N('e1.8e7').mul(N('e1e6').pow(N(6).pow(N(25).add(player.algorrebuy[1].sub(25).pow(getalgorrebuyscalx()))).sub(1)));
	}
	else if(num == 0) return N('e1.7e7').mul(N('e4e5').pow(N(2.5).pow(player.algorrebuy[0]).sub(1)));
	else return N('e1.8e7').mul(N('e1e6').pow(N(6).pow(player.algorrebuy[1]).sub(1)));
}

function buyalgorrebuy(num)
{
	num = num - 1;
	if(player.PL1info.gte(getalgorrebuycost(num)))
	{
		player.PL1info = player.PL1info.sub(getalgorrebuycost(num));
		player.algorrebuy[num] = player.algorrebuy[num].add(1);
	}
}

function buymaxalgorrebuy()
{
	if(player.PL1info.gte('e1.7e7'))
	{
		let ans = player.PL1info.div('e1.7e7').log('e4e5').log(2.5).floor().add(1);
		if(ans.gte(50))
		{
			ans = N(50).add(ans.sub(50).root(getalgorrebuyscalx()).add(1).floor());
		}
		if(ans.gte(player.algorrebuy[0])) player.algorrebuy[0] = ans;;
	}
	if(player.PL1info.gte('e1.8e7'))
	{
		let ans = player.PL1info.div('e1.8e7').log('e1e6').log(6).floor().add(1);
		if(ans.gte(25))
		{
			ans = N(25).add(ans.sub(25).root(getalgorrebuyscalx()).add(1).floor());
		}
		if(ans.gte(player.algorrebuy[1])) player.algorrebuy[1] = ans;
	}
}

function getalgordataspillstart()
{
	let base = N(1e13);
	//mul
	if(player.permupg.includes(46)) base = base.mul(player.data.add(10).log10().add(9).log10().root(5));
	if(player.chalcomp.gte(10)) base = base.mul(player.chalcomp.mul(50).sub(499).root(2));
	if(hassuppupg(95)) base = base.mul(suppupgeffect(95));
	if(hassuppupg(96)) base = base.mul(suppupgeffect(96));
	if(player.colldata.gte(1e210)) base = base.mul(player.colldata.div(1e210).pow(2).add(9).iteratedlog(10, 1.5).add(0.5).pow(2));
	//pow
	if(player.openchal && player.chalpara.includes(7)) base = base.pow(0.25);
	return base;
}

function getalgordataspillroot(gen)
{
	let start = getalgordataspillstart();
	if(player.exchal[1].gte(1)) return gen.add(10).log10().div(start.add(10).log10()).root(1.1);
	return player.algordata.add(10).log10().div(2).sub(start.log10().div(2).sub(1));
};

function getalgordatagen()
{
	let adg = N(0);
	adg = adg.add(getalgorbase().pow(player.algor.add(player.permupg.includes(57) ? player.algorrebuy[0].mul(0.25) : 0)).sub(1));
	if(player.permupg.includes(37)) adg = adg.mul(player.data.add(10).log10().add(9).log10().max(2).div(2));
	if(player.colldata.gte(10)) adg = adg.mul(player.colldata.log10().pow(2));
	return adg;
}


function getPL3infoeffect()
{
	let e = '';
	e = e + '传输节点产能^' + notation(player.PL3infottl.add(10).log10().root(2)) + '<br>';
	if(player.PL3infottl.gte(6.666)) e = e + '传输节点产能×' + notation(player.PL3infottl.pow(1000)) + '<br>';
	if(player.PL3infottl.gte(250000)) e = e + '传输节点购买倍数×' + notation(player.PL3infottl.sub(250000).add(1).root(2)) + '<br>';
	if(player.PL3infottl.gte(1e14)) e = e + '压制数据获取速度×' + notation(player.PL3infottl.log10().mul(14).sub(195)) + '<br>';
	if(!player.PL3infottl.gte(6.666)) e = e + '到达 6.666 累计混沌信息解锁混沌第二效果<br>';
	if(!player.PL3infottl.gte(250000)) e = e + '到达 250000 累计混沌信息解锁混沌第三效果<br>';
	if(!player.PL3infottl.gte(1e14)) e = e + '到达 1.000e14 累计混沌信息解锁混沌第四效果<br>';
	return e;
}

function getreactparalim()
{
	let base = [N(1), N(10), N(20), N(1000).add(player.chaosshard.pow(2).mul(200))];
	if(player.chaosshard.gte(7)) base[3] = N(8200).mul(player.chaosshard.sub(5).pow(3));
	if(player.chaosshard.gte(15)) base[3] = N(1e7).mul(N(1.5).pow(N(1.25).pow(player.chaosshard.sub(15))));
	if(player.openelements) base[3] = elementsgoal[player.elements + 1];
	return base;
}

function addacce()
{
	let lim = getreactparalim();
	player.reactpara[0] = player.reactpara[0].add(lim[0].div(20)).min(lim[0]);
}

function subacce()
{
	let lim = getreactparalim();
	player.reactpara[0] = player.reactpara[0].sub(lim[0].div(20)).max(0);
}

function getchaosmasseffect()
{
	let e = '';
	if(player.chaosmass.gte(100000)) e = e + '星辰节点产能×' + notation(player.chaosmass.sub(99999.99).mul(100).root(2)) + '<br>';
	if(player.chaosmass.gte(2e8)) e = e + '位面切片增幅指数×' + notation(player.chaosmass.div(2).log10().sub(7).mul(50).sub(49)) + '<br>';
	if(!player.chaosmass.gte(100000)) e = e + '达到 100000 混沌质量解锁混沌质量第一效果<br>';
	if(!player.chaosmass.gte(2e8)) e = e + '达到 2.000e8 混沌质量解锁混沌质量第二效果<br>';
	return e;
}

var elementsname = ['', 'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'];
var elementsgoal = [N(0), N(1e6), N(2e6), N(5e6), N(6e7), N(1e8), N(1e8), N(2e11), N(1e12), N('10^^10')];

function startelements()
{
	player.openelements = !player.openelements;
	player.reactpara = [N(0), N(0), N(0), N(0)];
	if(player.openelements) page = 6, subpage = 2;
}

function getelementseffect()
{
	let e = '<br>';
	for(let i = 1;i <= 118;i++)
	{
		if(player.elements >= i)
		{
			e = e + '[' + elementsname[i] + ' ' + i + ']: ' + geteachelementseffect(i) + '<br>';
		}
	}
	return e;
}

function geteachelementseffect(x)
{
	if(x == 1) return '混沌信息增强反应速度。当前：×' + notation(player.PL3info.add(1).log(2).add(1));
	else if(x == 2) return '算法数据弱化维度折算。当前：×' + notation(N(1).div(player.algordata.add(10).log10().root(2)));
	else if(x == 3) return '数据增强反应速度。当前：×' + notation(player.data.add(10).log(10).add(10).log(10));
	else if(x == 4) return '混沌信息的公式变得更好。';
	else if(x == 5) return '已知1<=X<=8，X号传输节点^(1.9-0.1×X)。';
	else if(x == 6) return '混沌以前全局速度增幅反应速度。当前：×' + notation(getPL3globalspeed().root(1.5));
	else if(x == 7) return '算法折算弱化20%。';
	else if(x == 8) return '星辰节点三阶软上限弱化99.8%。';
	return '元素过大';
}

function getsingcap()
{
	let scale = N(2);
	let ans = N(2).pow(1024).pow(scale.pow(player.PL4tms));
	return ans;
}

function getbheffect()
{
	let e = '';
	if(player.openbh) e = e + '(加成已获得)<br>';
	else e = e + '(开启黑洞以获得加成)<br>';
	e = e + '基于黑洞和奇点，混沌以前全局速度×' + notation(player.blackhole.mul(player.sing.add(10).log10())) + '<br>';
	return e;
}

function getPL3globalspeed()
{
	let s = N(1);
	if(!player.PL3unlock) return N(1);
	else
	{
		if(player.openbh) s = s.mul(player.blackhole.mul(player.sing.add(10).log10()));
	}
	if(player.exchal[6].gte(1)) s = s.mul(exchal[6].effect());
	return s;
}

function cbh()
{
	player.openbh = !player.openbh;
	if(player.openbh && !player.blackhole.gte(1)) player.openbh = false;
	if(player.opensupp) player.openbh = false;
}

var exchal = [
	null,
	{
		name: '区域限定',
		layer: 'chaos',
		description: '跃迁锁定为1，二重跃迁、三重跃迁锁定为0。<br>',
		effectdisplay(){return '增幅一号传输节点产能。当前：^' + notation(this.effect()) + '。<br>第1次完成本挑战时，算法数据的溢出改为基于算法数据获取速度而不是总量。<br>第1次完成本挑战时，解锁奇异挑战2。';},
		effect()
		{
			if(player.exchal[1].gte(1)) return player.exchal[1].add(1).mul(2).root(4);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(2).pow(num).mul(5e10));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[1]))) return player.data.log10().div(5e10).log(2).add(1).floor().sub(player.exchal[1]).min(this.maxcancomp().sub(player.exchal[1])); 
			else return N(0);
		},
	},
	{
		name: '计算失误',
		layer: 'chaos',
		description: '算法数据失去效果。<br>',
		effectdisplay(){return '弱化算法折算。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战3。';},
		effect()
		{
			if(player.exchal[2].gte(1)) return N(1).div(player.exchal[2].root(1.6).add(1).root(3));
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(9).pow(num).mul(5e10));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[2]))) return player.data.log10().div(5e10).log(9).add(1).floor().sub(player.exchal[2]).min(this.maxcancomp().sub(player.exchal[2])); 
			else return N(0);
		}
	},
	{
		name: '位面冲击',
		layer: 'chaos',
		description: '位面切片增幅指数锁定为0.001，且传输节点产能指数^0.5。<br>',
		effectdisplay(){return '算法数据倍增本源数据获取。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战4。';},
		effect()
		{
			if(player.exchal[3].gte(1)) return player.algordata.add(1).mul(player.exchal[3].add(1).mul(40)).pow(45).pow(player.exchal[3]);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(4).pow(num).mul(2000));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[3]))) return player.data.log10().div(2000).log(4).add(1).floor().sub(player.exchal[3]).min(this.maxcancomp().sub(player.exchal[3])); 
			else return N(0);
		}
	},
	{
		name: '升级破坏',
		layer: 'chaos',
		description: '第30号之前的部分永久升级被禁用。<br>',
		effectdisplay(){return '增幅神星升级倍数。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战5。';},
		effect()
		{
			if(player.exchal[4].gte(1)) return player.exchal[4].pow(3).add(10).pow(2).log10();
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(10).pow(num).mul(1e15));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[4]))) return player.data.log10().div(1e15).log(10).add(1).floor().sub(player.exchal[4]).min(this.maxcancomp().sub(player.exchal[4])); 
			else return N(0);
		}
	},
	{
		name: '压力陡增',
		layer: 'chaos',
		description: '神子产能指数^0.25，算法数据指数始终为1。<br>',
		effectdisplay(){return '增幅节点升级效果。当前：^' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战6。<br>第2次完成本挑战时，解锁数据压制(在混沌选项卡内)。';},
		effect()
		{
			if(player.exchal[5].gte(1)) return player.exchal[5].add(1).root(10);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(5).pow(num).mul(5e13));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[5]))) return player.data.log10().div(5e13).log(5).add(1).floor().sub(player.exchal[5]).min(this.maxcancomp().sub(player.exchal[5])); 
			else return N(0);
		}
	},
	{
		name: '极端折算',
		layer: 'chaos',
		description: '节点所有软上限不可削弱或移除。<br>',
		effectdisplay(){return '增幅混沌以前全局速度。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战7。<br>第17次完成本挑战时，移除节点六阶软上限。';},
		effect()
		{
			if(player.exchal[6].gte(1)) return player.exchal[6].add(1).mul(2).pow(1.5);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(5).pow(num).mul(1e13));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[6]))) return player.data.log10().div(1e13).log(5).add(1).floor().sub(player.exchal[6]).min(this.maxcancomp().sub(player.exchal[6])); 
			else return N(0);
		}
	},
	{
		name: '水泄不通',
		layer: 'chaos',
		description: '节点升级效果锁定为×1。<br>',
		effectdisplay(){return '增幅混沌信息获取量。当前：×' + notation(this.effect()) + '。<br>第1次完成本挑战时，解锁奇异挑战8。';},
		effect()
		{
			if(player.exchal[7].gte(1)) return player.exchal[7].add(1).pow(2).mul(3);
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(4).pow(num).mul(1e11));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[7]))) return player.data.log10().div(1e11).log(4).add(1).floor().sub(player.exchal[7]).min(this.maxcancomp().sub(player.exchal[7])); 
			else return N(0);
		}
	},
	{
		name: '混沌终章',
		layer: 'chaos',
		description: '同时开启奇异挑战1~7。<br>',
		effectdisplay(){return '数据增幅折叠数据获取量。当前：×' + notation(this.effect()) + '。<br>第25次完成本挑战时，解锁<span style="color: white;">虚空</span>重置。';},
		effect()
		{
			if(player.exchal[8].gte(1)) return player.data.add(1e10).log10().log10().root(1.5).pow(player.exchal[8].mul(2).root(2));
			else return N(1);
		},
		maxcancomp()
		{
			let max = N(100);
			return max;
		},
		goal(num)
		{
			return N(10).pow(N(2).pow(num).mul(10000));
		},
		cancomp()
		{
			if(player.data.gte(this.goal(player.exchal[8]))) return player.data.log10().div(10000).log(2).add(1).floor().sub(player.exchal[8]).min(this.maxcancomp().sub(player.exchal[8])); 
			else return N(0);
		}
	},
];

function getexchalunlock(i)
{
	if(i == 1) return player.permupg.includes(58);
	else if(i >= 2 && i <= 8) return player.exchal[i - 1].gte(1);
}

function getexchalopen()
{
	let open = [];
	if(player.openexchal != 0) open.push(player.openexchal);
	if(player.opensupp) open.push(1), open.push(2), open.push(3), open.push(4);
	if(player.openexchal == 8)
	{
		for(let i = 1;i <= 7;i++) open.push(i);
	}
	let uni = [...new Set(open)];
	return uni;
}

var nowclickexchal = 0;

function build_exchalui()
{
	let exchaltext = '';
	if(nowclickexchal != 0)
	{
		exchaltext += '奇异挑战' + nowclickexchal + ': ' + exchal[nowclickexchal].name + '(' + player.exchal[nowclickexchal] + '/' + exchal[nowclickexchal].maxcancomp() + ')';
		if(getexchalopen().includes(nowclickexchal)) exchaltext += '[+' + exchal[nowclickexchal].cancomp() + ']';
		exchaltext += '<br><span style="color: green">内容：' + exchal[nowclickexchal].description + '</span><br>';
		exchaltext += '<span style="color: gold">目标：' + notation(exchal[nowclickexchal].goal(player.exchal[nowclickexchal])) + '数据</span><br>';
		exchaltext += '<span style="color: ' + (player.exchal[nowclickexchal] >= 1 ? 'green' : 'grey') + '">奖励：<br>' + exchal[nowclickexchal].effectdisplay() + '</span><br>';
	}
	document.getElementById('exchaltext').innerHTML = exchaltext;
	for(let i = 1;i < exchal.length;i++) document.getElementById('exchal' + i).style['box-shadow'] = '';
	let o = getexchalopen();
	for(let i = 0;i < o.length;i++)  document.getElementById('exchal' + o[i]).style['box-shadow'] = '0px 0px 10px white';
	for(let i = 1;i < exchal.length;i++)
	{
		document.getElementById('exchalcompinfo' + i).innerHTML = player.exchal[i] + '/' + exchal[i].maxcancomp();
		if(getexchalunlock(i)) document.getElementById('exchalcompinfo' + i).style.display = 'block';
		else document.getElementById('exchalcompinfo' + i).style.display = 'none';
	}
	for(let i = 1;i < exchal.length;i++)
	{
		if(getexchalunlock(i)) document.getElementById('exchal' + i).style.display = 'block';
		else document.getElementById('exchal' + i).style.display = 'none';
	}
	if(player.openexchal != 0) document.getElementById('closeexchal').style['opacity'] = '1';
	else document.getElementById('closeexchal').style['opacity'] = '0.3';
}

function dis_exchalui()
{
	let ui = '<table align="center">';
	for(let i = 1;i < exchal.length;i++)
	{
		let bgc, bdc;
		if(exchal[i].layer == 'chaos') bgc = '#770', bdc = '#990';
		ui += '<td><button id="exchal' + i + '"class="exchal" onclick="if(nowclickexchal != ' + i + ') {nowclickexchal = ' + i + ';} else {openexchal(' + i + ')}"style="background-color: ' + bgc + '; border-color: ' + bdc + '">Ex' + i + '</button>';
		ui += '<p align="center"><span class="ftsz2" id="exchalcompinfo' + i + '"></span></p></td>';
		if(i >= 2 && exchal[i].layer != exchal[i - 1].layer)
		{
			ui += '<tr>';
		}
	}
	ui += '</table><br><span style="font-size: 20px; color: white;" id="exchaltext"></span>';
	document.getElementById('exchal_detail').innerHTML = ui;
}

function openexchal(i)
{
	if(player.openexchal != 0)
	{
		closeexchal();
	}
	switch(exchal[i].layer)
	{
		case 'chaos':
			if(player.PL2info.gte('e10000'))
			{
				player.PL3info = player.PL3info.add(PL3infoget);
				player.PL3infottl = player.PL3infottl.add(PL3infoget);
				player.PL3unlock = true;
				player.PL3tms = player.PL3tms.add(1);
			}
			PL3reset();
			if(player.permupg.includes(32))
			{
				player.PL2tms = N(35);
				player.PL1upg = [true, true, true, true, true, true, true, true];
				player.sliceupg = [true, true, true, true], player.unlock_origin = true;
			}
			if(player.permupg.includes(41))
			{
				player.PL2upg = [true, true, true, true];
			}
			break;
	}
	player.openexchal = i;
}

function closeexchal()
{
	if(player.openexchal != 0)
	{
		player.exchal[player.openexchal] = player.exchal[player.openexchal].add(exchal[player.openexchal].cancomp());
		switch(exchal[player.openexchal].layer)
		{
			case 'chaos':
				if(player.PL2info.gte('e10000'))
				{
					player.PL3info = player.PL3info.add(PL3infoget);
					player.PL3infottl = player.PL3infottl.add(PL3infoget);
					player.PL3unlock = true;
					player.PL3tms = player.PL3tms.add(1);
				}
				PL3reset();
				if(player.permupg.includes(32))
				{
					player.PL2tms = N(35);
					player.PL1upg = [true, true, true, true, true, true, true, true];
					player.sliceupg = [true, true, true, true], player.unlock_origin = true;
				}
				if(player.permupg.includes(41))
				{
					player.PL2upg = [true, true, true, true];
				}
				break;
		}
		player.openexchal = 0;
	}
}

function getcolleffect()
{
	let e = '';
	if(player.colldata.gte(10)) e += '算法数据获取速度×' + notation(player.colldata.log10().pow(2)) + '<br>';
	if(player.colldata.gte(1e6)) e += '(非连续)压制数据获取速度×' + notation(N(2).pow(player.colldata.div(2e5).log(5).floor()))
	+ '，在' + notation(N(2e5).mul(N(5).pow(player.colldata.div(2e5).log(5).floor().add(1)))) + '使效果×2。<br>';
	if(player.colldata.gte(1e9)) e += '算法数据加成指数+' + notation(player.colldata.div(1e9).log10().root(5).div(10).min(N(0.12).add(player.colldata.log10().root(50).div(1000)))) + '<br>';
	if(player.colldata.gte(1e18)) e += '传输节点产能^' + notation(player.colldata.div(1e18).root(1.5).iteratedlog(10, 0.75).add(0.75)) + '<br>';
	if(player.colldata.gte(1e54)) e += '基于折叠数据和星辰，传输节点和星辰节点产能^' + notation(player.colldata.mul(player.star.add(1).root(1000)).div(1e54).add(9).log10()) + '<br>';
	if(player.colldata.gte(1e160)) e += '传输节点产能指数^' + notation(player.colldata.div(1e160).root(40).mul(1e11).iteratedlog(10, 2).root(3)) + '<br>';
	if(player.colldata.gte(1e210)) e += '延迟算法数据溢出×' + notation(player.colldata.div(1e210).pow(2).add(9).iteratedlog(10, 1.5).add(0.5).pow(2)) + '<br>';
	
	if(!player.colldata.gte(10)) e += '到达 10.00 折叠数据解锁折叠第一效果<br>';
	else if(!player.colldata.gte(1e6)) e += '到达 1.000e6 折叠数据解锁折叠第二效果<br>';
	else if(!player.colldata.gte(1e9)) e += '到达 1.000e9 折叠数据解锁折叠第三效果<br>';
	else if(!player.colldata.gte(1e18)) e += '到达 1.000e18 折叠数据解锁折叠第四效果<br>';
	else if(!player.colldata.gte(1e54)) e += '到达 1.000e54 折叠数据解锁折叠第五效果<br>';
	else if(!player.colldata.gte(1e160)) e += '到达 1.000e160 折叠数据解锁折叠第六效果<br>';
	else if(!player.colldata.gte(1e210)) e += '到达 1.000e210 折叠数据解锁折叠第七效果<br>';
	
	e += '<span style="color: red">到达 1.000e20 压制数据后触发软上限。强度：^0.8</span><br>';
	if(player.suppdata.gte(1e20)) e += '<span style="color: orange">到达 1.000e75 压制数据后触发二阶软上限。强度：^0.4</span><br>';
	return e;
}

function getcollget()
{
	let get = N(0);
	get = player.data.add(10).log10().root(2);
	if(player.colldata.gte(1e6)) get = get.mul(N(2).pow(player.colldata.div(2e5).log(5).floor()));
	if(player.PL3info.gte(1e14)) get = get.mul(player.PL3infottl.log10().mul(14).sub(195));
	if(get.gte(1e20)) get = N(1e20).mul(get.div(1e20).pow(0.8));
	if(get.gte(1e75)) get = N(1e75).mul(get.div(1e75).pow(0.4));
	return get.sub(player.suppdata).max(0);
}

function opensupp()
{
	if(player.opensupp && getcollget().gte(0))
	{
		player.suppdata = player.suppdata.add(getcollget());
	}
	if(player.PL2info.gte('e10000'))
	{
		player.PL3info = player.PL3info.add(PL3infoget);
		player.PL3infottl = player.PL3infottl.add(PL3infoget);
		player.PL3unlock = true;
		player.PL3tms = player.PL3tms.add(1);
	}
	PL3reset();
	if(player.permupg.includes(32))
	{
		player.PL2tms = N(35);
		player.PL1upg = [true, true, true, true, true, true, true, true];
		player.sliceupg = [true, true, true, true], player.unlock_origin = true;
	}
	if(player.permupg.includes(41))
	{
		player.PL2upg = [true, true, true, true];
	}
	player.opensupp = !player.opensupp;
}

var suppupg = [
	/*
	{
		id: 0,
		name: '',
		color: '',
		type: 0,
		gain()
		{
		},
		unlocked() {},
	},
	{
		id: 0,
		name: '',
		color: '',
		type: 1,
		cost: N(0),
		effect()
		{
		},
		money: '',
		moneyname: '',
		description(){},
		unlocked() {},
	},
	{
		id: 0,
		name: '',
		color: '';
		type: 2,
		basecost: N(0),
		scal: N(0),
		effect(x)
		{
		},
		description(){},
		money: '',
		moneyname: '',
		extralevel()
		{
		},
		autobuy(){},
		unlocked() {},
	},
	*/
	{
		id: 0,
		name: '基础物质',
		color: '#333333',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.data.add(10).log10().add(10).log10().sub(37).max(0);
			if(hassuppupg(1)) base = base.mul(suppupgeffect(1));
			if(hassuppupg(3)) base = base.mul(suppupgeffect(3));
			if(hassuppupg(6)) base = base.mul(suppupgeffect(6));
			if(hassuppupg(11)) base = base.mul(suppupgeffect(11));
			if(hassuppupg(13)) base = base.mul(suppupgeffect(13));
			if(hassuppupg(18)) base = base.mul(suppupgeffect(18));
			if(hassuppupg(85)) base = base.mul(suppupgeffect(85));
			if(hassuppupg(86)) base = base.mul(player.suppupg[5].pow(0.5));
			if(hassuppupg(88)) base = base.mul(suppupgeffect(88));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(92)) base = base.mul(suppupgeffect(92));
			if(hassuppupg(99)) base = base.mul(suppupgeffect(99));
			if(hassuppupg(2)) base = base.pow(suppupgeffect(2));
			if(hassuppupg(34)) base = base.pow(suppupgeffect(34));
			return base;
		},
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 1,
		name: '基础物质收集器',
		color: '#333333',
		type: 2,
		basecost: N(10),
		scal: N(5),
		effect(x)
		{
			let base = N(2);
			if(hassuppupg(9)) base = base.add(suppupgeffect(9));
			let ans = N(base).pow(x);
			if(ans.gte(1e15)) ans = N(1e15).mul(ans.div(1e15).root(4));
			if(ans.gte(1e35)) ans = N(1e34).mul(N(10).pow(ans.div(1e34).log10().pow(0.6)));
			return ans;
		},
		description()
		{
			return '倍增基础物质获取。当前：×'
			+ notation(this.effect(suppupglevel(this.id)))
			+ (this.effect(suppupglevel(this.id)).gte(1e15) ? (this.effect(suppupglevel(this.id)).gte(1e35) ? '(受二重软上限限制)' : '(受软上限限制)') : '');
		},
		money: 0,
		moneyname: '基础物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 2,
		name: '基础物质增幅器',
		color: '#333333',
		type: 2,
		basecost: N(1000),
		scal: N(50),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.1));},
		description(){return '指数增幅基础物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 0,
		moneyname: '基础物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 3,
		name: '物质绽放',
		color: '#333333',
		type: 1,
		cost: N(2500),
		effect(){return player.suppupg[0].add(10).log10();},
		description(){return '基础物质倍增基础物质获取。当前：×' + notation(this.effect());},
		money: 0,
		moneyname: '基础物质',
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 4,
		name: '物质扫描',
		color: '#333333',
		type: 1,
		cost: N(10000),
		effect()
		{
			let base = player.suppupg[0].add(10).log10();
			if(hassuppupg(83)) base = base.pow(suppupgeffect(83));
			return base;
		},
		description(){return '基础物质增幅传输节点产能。当前：^' + notation(this.effect());},
		money: 0,
		moneyname: '基础物质',
		unlocked(){return player.data.gte('ee38') || player.suppupg[0].gte(0.01);},
	},
	{
		id: 5,
		name: '暗物质',
		color: '#222222',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].div(10000).max(1).iteratedlog(10, 0.5).add(0.5).max(0);
			if(hassuppupg(6)) base = base.mul(suppupgeffect(6));
			if(hassuppupg(13)) base = base.mul(suppupgeffect(13));
			if(hassuppupg(18)) base = base.mul(suppupgeffect(18));
			if(hassuppupg(86)) base = base.mul(player.suppupg[0].pow(0.1));
			if(hassuppupg(86)) base = base.mul(player.suppupg[10].pow(0.5));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(7)) base = base.pow(suppupgeffect(7));
			return base;
		},
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 6,
		name: '暗物质收集器',
		color: '#222222',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1.75).pow(x);
			if(base.gte(1e20)) base = N(1e19).mul(N(10).pow(base.div(1e19).log10().pow(0.2)));
			return base;
		},
		description(){return '倍增暗物质和基础物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e20) ? '(受软上限限制)' : '');},
		money: 5,
		moneyname: '暗物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 7,
		name: '暗物质增幅器',
		color: '#222222',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.09));},
		description(){return '指数增幅暗物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 5,
		moneyname: '暗物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 8,
		name: '时间洪流怀表',
		color: '#222222',
		type: 1,
		cost: N(5000),
		effect(){return N(0);},
		description(){return '开始积累离线时间。游戏会消耗离线时间增幅超越以前全局速度。';},
		money: 5,
		moneyname: '暗物质',
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 9,
		name: '扫描重构',
		color: '#222222',
		type: 1,
		cost: N(1e8),
		effect(){return player.suppupg[5].add(10).log10().div(9).root(1.5);},
		description(){return '暗物质增幅基础物质收集器底数。当前：+' + notation(this.effect());},
		money: 5,
		moneyname: '暗物质',
		unlocked(){return player.suppupg[0].gte(10000) || player.suppupg[5].gte(0.01);},
	},
	{
		id: 10,
		name: '红物质',
		color: '#440000',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].div(1e8).max(1).pow(2).iteratedlog(10, 0.5).add(0.5).max(0);
			if(hassuppupg(11)) base = base.mul(suppupgeffect(11));
			if(hassuppupg(13)) base = base.mul(suppupgeffect(13));
			if(hassuppupg(86)) base = base.mul(player.suppupg[5].pow(0.1));
			if(hassuppupg(86)) base = base.mul(player.suppupg[15].pow(0.5));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(12)) base = base.pow(suppupgeffect(12));
			return base;
		},
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 11,
		name: '红物质收集器',
		color: '#440000',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1.6).pow(x);
			if(base.gte(1e20)) base = N(1e19).mul(N(10).pow(base.div(1e19).log10().pow(0.2)));
			return base;
		},
		description(){return '倍增红物质和基础物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e20) ? '(受软上限限制)' : '');},
		money: 10,
		moneyname: '红物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 12,
		name: '红物质增幅器',
		color: '#440000',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.085));},
		description(){return '指数增幅红物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 10,
		moneyname: '红物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 13,
		name: '高压转化',
		color: '#440000',
		type: 1,
		cost: N(2e7),
		effect(){return player.colldata.add(10).log10().mul(3).root(1.25);},
		description(){return '折叠数据增幅基础物质、暗物质和红物质获取。当前：×' + notation(this.effect());},
		money: 10,
		moneyname: '红物质',
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 14,
		name: '算力增长',
		color: '#440000',
		type: 1,
		cost: N(1e12),
		effect(){return player.suppupg[10].add(10).log10().root(1.5).div(2);},
		description(){return '红物质增幅算法底数。当前：+' + notation(this.effect());},
		money: 10,
		moneyname: '红物质',
		unlocked(){return player.suppupg[5].gte(1e8) || player.suppupg[10].gte(0.01);},
	},
	{
		id: 15,
		name: '品红物质',
		color: '#8b008b',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].div(1e12).max(1).iteratedlog(10, 0.5).add(0.5).max(0);
			if(hassuppupg(11)) base = base.mul(suppupgeffect(16));
			if(hassuppupg(86)) base = base.mul(player.suppupg[10].pow(0.1));
			if(hassuppupg(21)) base = base.mul(suppupgeffect(21));
			if(hassuppupg(12)) base = base.pow(suppupgeffect(17));
			return base;
		},
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 16,
		name: '品红物质收集器',
		color: '#8b008b',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1.5).pow(x);
			if(base.gte(1e20)) base = N(1e19).mul(N(10).pow(base.div(1e19).log10().pow(0.2)));
			return base;
		},
		description(){return '倍增品红物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e20) ? '(受软上限限制)' : '');},
		money: 15,
		moneyname: '品红物质',
		extralevel()
		{
			let base = N(0);
			if(hassuppupg(19)) base = base.add(suppupgeffect(19));
			if(hassuppupg(81)) base = base.add(suppupgeffect(81));
			return base;
		},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 17,
		name: '品红物质增幅器',
		color: '#8b008b',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.08));},
		description(){return '指数增幅品红物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 15,
		moneyname: '品红物质',
		extralevel(){return N(0);},
		autobuy(){return hassuppupg(87);},
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 18,
		name: '黑暗助推',
		color: '#8b008b',
		type: 1,
		cost: N(1e8),
		effect()
		{
			let base = player.suppdata.root(1.25).add(1).iteratedlog(10, 0.5).add(0.5);
			if(hassuppupg(23)) base = base.pow(suppupgeffect(23));
			return base;
		},
		description(){return '压制数据增幅基础物质和暗物质获取。当前：×' + notation(this.effect());},
		money: 15,
		moneyname: '品红物质',
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 19,
		name: '全面增幅',
		color: '#8b008b',
		type: 1,
		cost: N(6e9),
		effect(x){return player.suppupg[15].add(1).log10().root(2).mul(3);},
		description(){return '品红物质增加前四个物质收集器等级。当前：+' + notation(this.effect());},
		money: 15,
		moneyname: '品红物质',
		unlocked(){return player.suppupg[10].gte(1e12) || player.suppupg[15].gte(0.01);},
	},
	{
		id: 20,
		name: '粉物质',
		color: '#ffaaaa',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[0].mul(player.suppupg[5]).mul(player.suppupg[10]).mul(player.suppupg[15]).root(8).add(1).log10();
			if(hassuppupg(90)) base = base.mul(suppupgeffect(90));
			if(hassuppupg(28)) base = base.mul(suppupgeffect(28));
			if(hassuppupg(93)) base = base.mul(suppupgeffect(93));
			if(hassuppupg(98)) base = base.mul(suppupgeffect(98));
			if(hassuppupg(22)) base = base.pow(suppupgeffect(22));
			return base;
		},
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 21,
		name: '粉物质收集器',
		color: '#ffaaaa',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(10);
			if(hassuppupg(26)) base = base.mul(suppupgeffect(26));
			if(hassuppupg(31)) base = base.mul(suppupgeffect(31));
			let ans = base.pow(x);
			if(ans.gte(1e50)) ans = N(10).pow(ans.div(1e49).log10().pow(0.75)).mul(1e49);
			return ans;
		},
		description(){return '倍增前四种物质获取。当前：×' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(1e50) ? '(受软上限限制)' : '');},
		money: 20,
		moneyname: '粉物质',
		extralevel()
		{
			let base = N(0);
			return base;
		},
		autobuy(){return false;},
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 22,
		name: '粉物质增幅器',
		color: '#ffaaaa',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.075));},
		description(){return '指数增幅粉物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 20,
		moneyname: '粉物质',
		extralevel(){return N(0);},
		autobuy(){return false;},
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 23,
		name: '强化助推',
		color: '#ffaaaa',
		type: 1,
		cost: N(40000),
		effect(){return player.suppupg[5].add(1).log10().div(200).root(2).mul(2.3).add(1);},
		description(){return '暗物质增幅 黑暗助推 效果。当前：^' + notation(this.effect());},
		money: 20,
		moneyname: '粉物质',
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 24,
		name: '指数指数',
		color: '#ffaaaa',
		type: 1,
		cost: N(80000),
		effect()
		{
			let base = player.suppupg[5].add(1).log10().add(1).iteratedlog(10, 0.5).sub(0.5).div(100).add(1).root(4).add(0.01);
			if(hassuppupg(29)) base = base.mul(suppupgeffect(29));
			return base;
		},
		description(){return '暗物质增幅传输节点产能指数。当前：^' + notation(this.effect());},
		money: 20,
		moneyname: '粉物质',
		unlocked(){return hassuppupg(89);},
	},
	{
		id: 25,
		name: '紫物质',
		color: '#440044',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[20].div(50000).mul(suppupg[20].gain().div(100)).root(5);
			if(hassuppupg(27)) base = base.pow(suppupgeffect(27));
			return base;
		},
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 26,
		name: '紫物质收集器',
		color: '#440044',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1).add(x.mul(2));
			return base;
		},
		description(){return '增加粉物质收集器底数。当前：×' + notation(this.effect(suppupglevel(this.id)));},
		money: 25,
		moneyname: '紫物质',
		extralevel()
		{
			let base = N(0);
			return base;
		},
		autobuy(){return false;},
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 27,
		name: '紫物质增幅器',
		color: '#440044',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.07));},
		description(){return '指数增幅紫物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 25,
		moneyname: '紫物质',
		extralevel(){return N(0);},
		autobuy(){return false;},
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 28,
		name: '色彩转化',
		color: '#440044',
		type: 1,
		cost: N(5000),
		effect(){return player.suppupg[25].add(1).root(1.5);},
		description(){return '紫物质增幅粉物质获取。当前：×' + notation(this.effect());},
		money: 25,
		moneyname: '紫物质',
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 29,
		name: '高能差异',
		color: '#440044',
		type: 1,
		cost: N(90000),
		effect(){return player.suppupg[25].add(10).log10().add(1).log10().add(1).root(10);},
		description(){return '紫物质增幅 指数指数 效果。当前：×' + notation(this.effect())},
		money: 25,
		moneyname: '紫物质',
		unlocked(){return player.suppupg[20].gte(50000) || player.suppupg[25].gte(0.01);},
	},
	{
		id: 30,
		name: '淡紫物质',
		color: '#880088',
		type: 0, //0为不可操作，1为单次购买，2为多次购买
		gain()
		{
			let base = player.suppupg[25].div(1e6).mul(suppupg[25].gain().div(1000)).root(5);
			if(hassuppupg(32)) base = base.pow(suppupgeffect(32));
			return base;
		},
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 31,
		name: '淡紫物质收集器',
		color: '#880088',
		type: 2,
		basecost: N(10),
		scal: N(10),
		effect(x)
		{
			let base = N(1).add(x.mul(1.8));
			return base;
		},
		description(){return '增加粉物质收集器底数。当前：×' + notation(this.effect(suppupglevel(this.id)));},
		money: 30,
		moneyname: '淡紫物质',
		extralevel()
		{
			let base = N(0);
			return base;
		},
		autobuy(){return false;},
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 32,
		name: '淡紫物质增幅器',
		color: '#880088',
		type: 2,
		basecost: N(1000),
		scal: N(100),
		effect(x){return N(1).add(x.mul(10).max(1).log10().mul(0.065));},
		description(){return '指数增幅淡紫物质获取。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		money: 30,
		moneyname: '淡紫物质',
		extralevel(){return N(0);},
		autobuy(){return false;},
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 33,
		name: '黑暗吞没',
		color: '#880088',
		type: 1,
		cost: N(10000),
		effect(){return player.suppupg[5].add(10).log10().add(9).log10();},
		description(){return '暗物质增幅奇点获取。当前：^' + notation(this.effect());},
		money: 30,
		moneyname: '淡紫物质',
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
	{
		id: 34,
		name: '物质扩张',
		color: '#880088',
		type: 1,
		cost: N(1e7),
		effect(){return N(1.075);},
		description(){return '基础物质获取量^1.075。';},
		money: 30,
		moneyname: '淡紫物质',
		unlocked(){return player.suppupg[25].gte(1e6) || player.suppupg[30].gte(0.01);},
	},
];

suppupg.length = 80;

var extra = [
	{
		id: 80,
		name: '数据压制 I',
		type: 2,
		basecost: N(1e60),
		scal: N(1e30),
		effect(x)
		{
			let base = N(2).pow(x.add(1).iteratedlog(10, 0.5).add(0.5)).pow(1.5).mul(2).sub(2);
			if(hassuppupg(94)) base = base.mul(suppupgeffect(94));
			return base;
		},
		description(){return '增幅传输节点产能。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 81,
		name: '数据压制 II',
		type: 2,
		basecost: N(1e100),
		scal: N(1e50),
		effect(x)
		{
			let base = x.mul(10);
			if(base.gte(30)) base = N(29).add(base.sub(29).log10().add(1).pow(2).sub(1));
			return base;
		},
		description(){return '增幅前四种收集器等级。当前：+' + notation(this.effect(suppupglevel(this.id)))
		+ (this.effect(suppupglevel(this.id)).gte(30) ? '(受软上限限制)' : '');},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 82,
		name: '数据压制 III',
		type: 2,
		basecost: N(1e240),
		scal: N(1e120),
		effect(x){return N(1e5).pow(x);},
		description(){return '增幅折叠数据获取。当前：×' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 83,
		name: '数据压制 IV',
		type: 2,
		basecost: N(1e300),
		scal: N(1e150),
		effect(x){return N(1).add(x.mul(0.05));},
		description(){return '增幅 物质扫描 效果。当前：^' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 84,
		name: '数据压制 V',
		type: 2,
		basecost: N('e320'),
		scal: N('e160'),
		effect(x){return N(1).add(x.add(1).log10().add(1).log10().div(6)).root(1.5);},
		description(){return '增幅传输节点产能的指数。当前：指数^' + notation(this.effect(suppupglevel(this.id)));},
		extralevel(){return N(0);},
		autobuy(){return false;},
	},
	{
		id: 85,
		name: '数据压制 VI',
		type: 1,
		cost: N(1e69),
		effect(x){return player.suppupg[0].mul(player.suppupg[5]).mul(player.suppupg[10]).mul(player.suppupg[15]).add(1).iteratedlog(10, 0.25).add(0.25);},
		description(){return '基于前四种物质的乘积，增幅基础物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 86,
		name: '数据压制 VII',
		type: 1,
		cost: N(5.14e114),
		effect(x){return N(0);},
		description(){return '对于前四种物质，每种物质^0.5增幅上一种物质获取，^0.1增幅下一种物质获取。';},
	},
	{
		id: 87,
		name: '数据压制 VIII',
		type: 1,
		cost: N(1e250),
		effect(x){return N(0);},
		description(){return '自动购买前四种物质的收集器和增幅器。';},
	},
	{
		id: 88,
		name: '数据压制 IX',
		type: 1,
		cost: N(1e260),
		effect(x){return player.data.add(10).log10().root(2.75);},
		description(){return '基于数据增幅基础物质产量。当前：×' + notation(this.effect());},
	},
	{
		id: 89,
		name: '数据压制 X',
		type: 1,
		cost: N(1e300),
		effect(x){return N(0);},
		description(){return '解锁新的物质。';},
	},
	{
		id: 90,
		name: '数据压制 XI',
		type: 1,
		cost: N('e380'),
		effect(x){return N(1000);},
		description(){return '粉物质获取速度×1000。';},
	},
	{
		id: 91,
		name: '数据压制 XII',
		type: 1,
		cost: N('e410'),
		effect(x){return N(0.85);},
		description(){return '节点七阶软上限弱化15%';},
	},
	{
		id: 92,
		name: '数据压制 XIII',
		type: 1,
		cost: N('e530'),
		effect(x){return player.suppupg[30].add(1).pow(10);},
		description(){return '淡紫物质增幅基础物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 93,
		name: '数据压制 XIV',
		type: 1,
		cost: N(2).pow(2048),
		effect(x){return player.exchal[8].sub(15).max(1).pow(8);},
		description(){return '完成奇异挑战8的次数≥16次后倍增粉物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 94,
		name: '数据压制 XV',
		type: 1,
		cost: N('e750'),
		effect(x){return player.suppupg[80];},
		description(){return '数据压制 I 的数量增幅 数据压制 I 效果。当前：×' + notation(this.effect());},
	},
	{
		id: 95,
		name: '数据压制 XVI',
		type: 1,
		cost: N('e790'),
		effect(x){return player.suppupg[20].add(10).log10().pow(2);},
		description(){return '粉物质延迟算法数据溢出。当前：×' + notation(this.effect());},
	},
	{
		id: 96,
		name: '数据压制 XVII',
		type: 1,
		cost: N('e830'),
		effect(x){return player.suppupg[5].add(10).log10().pow(2).add(10).log10().pow(2);},
		description(){return '暗物质延迟算法数据溢出。当前：×' + notation(this.effect());},
	},
	{
		id: 97,
		name: '数据压制 XVIII',
		type: 1,
		cost: N('e870'),
		effect(x){return player.suppupg[0].add(10).log10();},
		description(){return '基础物质增幅传输节点产能。当前：^' + notation(this.effect());},
	},
	{
		id: 98,
		name: '数据压制 XIX',
		type: 1,
		cost: N('e900'),
		effect(x){return player.suppupg[30].add(1).iteratedlog(10, 0.5).add(0.5).pow(1.25);},
		description(){return '淡紫物质增幅粉物质获取。当前：×' + notation(this.effect());},
	},
	{
		id: 99,
		name: '数据压制 XX',
		type: 1,
		cost: N('e960'),
		effect(x){return player.PL3info.root(5).div(1e6).add(1).iteratedlog(10, 0.3).add(0.3).min(1e100);},
		description(){return '混沌信息增幅基础物质产量。当前：×' + notation(this.effect());},
	},
];

for(let i = 0;i < extra.length;i++)
{
	suppupg[80 + i] = extra[i];
	suppupg[80 + i].color = '#333333';
	suppupg[80 + i].money = 0;
	suppupg[80 + i].moneyname = '基础物质';
	if(i <= 9) suppupg[80 + i].unlocked = (function(){return player.suppupg[0].gte(0.01);});
	else suppupg[80 + i].unlocked = (function(){return hassuppupg(89);});
}

function hassuppupg(id)
{
	if(suppupg[id].type == 0) return false;
	else if(suppupg[id].type == 1) return player.suppupg[id];
	else return suppupglevel(id).gte(1);
}

function suppupglevel(id)
{
	if(suppupg[id].type == 0) return N(0);
	else if(suppupg[id].type == 1) return player.suppupg[id];
	else return player.suppupg[id].add(suppupg[id].extralevel());
}

function suppupgeffect(id)
{
	if(suppupg[id].type == 0) return N(0);
	else if(suppupg[id].type == 1) return suppupg[id].effect();
	else return suppupg[id].effect(player.suppupg[id].add(suppupg[id].extralevel()));
}

function suppupgcost(id)
{
	if(suppupg[id].type == 0) return N(0);
	else if(suppupg[id].type == 1) return suppupg[id].cost;
	else return suppupg[id].basecost.mul(suppupg[id].scal.pow(player.suppupg[id]));
}

function suppupgcanbuy(id)
{
	if(suppupg[id].type == 0) return false;
	else if(suppupg[id].type == 1)
	{
		if(!player.suppupg[id] && player.suppupg[suppupg[id].money].gte(suppupgcost(id))) return true;
		else return false;
	}
	else
	{
		if(player.suppupg[suppupg[id].money].gte(suppupg[id].basecost)) return player.suppupg[suppupg[id].money].div(suppupg[id].basecost).log(suppupg[id].scal).add(1).floor();
		else return N(0);
	}
}

function buysuppupg(id)
{
	if(suppupg[id].type == 0) return;
	else if(suppupg[id].type == 1)
	{
		if(player.suppupg[suppupg[id].money].gte(suppupgcost(id)) && !player.suppupg[id])
		{
			player.suppupg[suppupg[id].money] = player.suppupg[suppupg[id].money].sub(suppupgcost(id));
			player.suppupg[id] = true;
		}
	}
	else
	{
		if(suppupgcanbuy(id).sub(player.suppupg[id]).gte(1))
		{
			let canbuy = suppupgcanbuy(id);
			player.suppupg[suppupg[id].money] = player.suppupg[suppupg[id].money].sub(suppupgcost(id));
			player.suppupg[id] = player.suppupg[id].add(1);
		}
	}
}

function buymaxsuppupg(id)
{
	if(suppupg[id].type < 2) return;
	else if(player.suppupg[suppupg[id].money].gte(suppupg[id].basecost))
	{
		let ans = player.suppupg[suppupg[id].money].div(suppupg[id].basecost).log(suppupg[id].scal).add(1).floor();
		if(ans.gte(player.suppupg[id])) player.suppupg[id] = ans;
	}
}

function dis_suppui()
{
	let ui = '<table>';
	for(let i = 0;i < suppupg.length;i++)
	{
		if(suppupg[i] != undefined)
		{
			ui += '<td id="suppupgtd' + i + '"><button class="suppupgbt" id="suppupg' + i + '" onclick="buysuppupg(' + i + ')" style="border-color: ' + (suppupg[i].color == 'black' ? 'white' : suppupg[i].color) + '">';
			ui += '</button></td>';
			
			if(player.suppupg[i] == undefined)
			{
				if(suppupg[i].type == 0 || suppupg[i].type == 2) player.suppupg[i] = N(0);
				else player.suppupg[i] = false;
			}
		}
		if(i % 5 == 4)
		{
			let flag = false;
			for(let j = 1;j <= 5;j++)
			{
				if(suppupg[i + j] != undefined) flag = true;
			}
			if(flag) ui += '<tr>';
		}
	}
	ui += '</table>';
	document.getElementById('suppupg_detail').innerHTML = ui;
}

function build_suppui()
{
	for(let i = 0;i < suppupg.length;i++)
	{
		if(suppupg[i] != undefined)
		{
			if(suppupg[i].unlocked()) document.getElementById('suppupgtd' + i).style.display = 'inline-block';
			else document.getElementById('suppupgtd' + i).style.display = 'none';
			document.getElementById('suppupg' + i).style['background-color'] = (!hassuppupg(i)
			? (suppupg[i].type == 2 ? (suppupgcanbuy(i).sub(player.suppupg[i]).gte(1) ? 'grey' : 'black') : (suppupgcanbuy(i) ? 'grey' : 'black'))
			: (suppupg[i].type == 2 ? (suppupgcanbuy(i).sub(player.suppupg[i]).gte(1) ? 'grey' : 'black') : suppupg[i].color));
			if(document.getElementById('suppupg' + i).style['background-color'] == 'white') document.getElementById('suppupg' + i).style['color'] = 'black';
			else document.getElementById('suppupg' + i).style['color'] = 'white';
			if(suppupg[i].type == 2) document.getElementById('suppupg' + i).innerHTML = (suppupg[i].name + '<br>' + suppupg[i].description()
			+ '<br>等级' + notation(suppupglevel(i), 0) + (suppupg[i].extralevel().gte(0.01) ? ('+' + notation(suppupg[i].extralevel())) : '') + '<br>价格 ' + notation(suppupgcost(i)) + suppupg[i].moneyname);
			else if(suppupg[i].type == 1) document.getElementById('suppupg' + i).innerHTML = (suppupg[i].name + '<br>' + suppupg[i].description()
			+ '<br>价格 ' + notation(suppupgcost(i)) + suppupg[i].moneyname);
			else document.getElementById('suppupg' + i).innerHTML = (suppupg[i].name + '<br>' + notation(player.suppupg[i]) + '<br>+' + notation(suppupg[i].gain()) + '/s');
			if(suppupg[i].type == 2 && suppupg[i].autobuy())
			{
				buymaxsuppupg(i);
			}
		}
	}
}

function automation()
{
	if(player.PL1upg[0])
	{
		for(let i = 0;i < 8;i++)
		{
			if(player.autobuyjd[i]) buymaxjd(i + 1);
		}
	}
	if(player.PL1upg[4])
	{
		if(player.autoboost) buymaxboost();
	}
	if(player.sliceupg[0])
	{
		if(player.autoboost2) buymaxboost2();
	}
	if(player.PL2upg[1])
	{
		if(player.autoboost3) buymaxboost3();
	}
	
	if(player.slice.gte(1e64) || player.PL2tms.gte(1))
	{
		player.sliceupg_rep[0] = player.slice.log(sliceupgcost[0]).floor();
		player.sliceupg_rep[1] = player.slice.log(sliceupgcost[1]).floor();
		player.sliceupg_rep[2] = player.slice.log(sliceupgcost[2]).floor();
		player.sliceupg_rep[3] = player.slice.log(sliceupgcost[3]).floor();
		for(let i = 0;i <= 3;i++) if(player.sliceupg_rep[i].gte(200)) player.sliceupg_rep[i] = N(200);
	}
	
	if(player.PL2tms.gte(4))
	{
		let base = [N(1), N(10), N(100), N(1e4), N(1e6)];
		let basex = [N(1.15), N(1.35), N(8), N(20), N(30)];
		player.origin_upg[0] = player.origin_upg[0].max(player.origin_data.add(1).div(base[0]).log(basex[0]).floor().add(1));
		for(let i = 1;i < 5;i++) player.origin_upg[i] = player.origin_upg[i].max(player.origin_data.div(base[i]).log(basex[i]).floor().add(1));
		let cap = [N(100), N(100), N(30), N(30)];
		for(let i = 0;i < 4;i++) player.origin_upg[i] = player.origin_upg[i].min(cap[i]);
	}
	
	if(player.permupg.includes(27))
	{
		buymaxgn();
		buymaxsn();
	}
	
	if(player.permupg.includes(34))
	{
		for(let i = 0;i < getfreepermupg();i++)
		{
			if(!player.permupg.includes(i) && !getdisablepermupg(i)) player.permupg.push(i);
		}
	}
	
	if(player.permupg.includes(36))
	{
		buymaxdim();
		buymaxalgor();
	}
	
	if(player.permupg.includes(38)) buymaxalgorrebuy();
	
	if(player.PL2upg[0])
	{
		player.PL1info = player.PL1info.add(PL1infoget);
	}
	if(player.PL2upg[2])
	{
		updatePLinfoget();
		player.PL2info = player.PL2info.add(PL2infoget.div(player.permupg.includes(18) ? 100 : 10000));
	}
	
	if(player.permupg.includes(39) && player.autochaos && PL3infoget.gte(player.autochaosgoal)) buyPL3();
}

function produce()
{
	if(getexchalopen().includes(1)) player.boost = N(1), player.boost2 = N(0), player.boost3 = N(0);
	for(let i = 0;i < player.permupg.length;i++)
	{
		if(getdisablepermupg(player.permupg[i])) player.permupg[i] = undefined;
	}
	if(player.opensupp)
	{
		player.openbh = false;
	}
	
	let tickmult = (Date.now() - player.last_update);

	if(getofflinelimit() > 0)
	{
		if(Date.now() >= player.last_update + 10000)
		{
			if(player.openoffline) player.offlinetime += (Date.now() - player.last_update);
			player.last_update = Date.now();
			if(player.offlinetime > getofflinelimit()) player.offlinetime = getofflinelimit();
			return;
		}
	}
	
	if(tickmult > 0) player.last_update = Date.now();
	if(tickmult < 0)
	{
		tickmult = 0;
	}
	
	if(player.offlinetime >= 1000 && player.openoffline)
	{
		let otickmult = tickmult;
		tickmult += (player.offlinetime * (1 - Math.pow(0.99488380310817629886, tickmult)) + otickmult * 100) / 100;
		player.offlinetime *= Math.pow(0.99488380310817629886, tickmult);
		player.offlinetime -= otickmult * 100;
	}
	else player.offlinetime = 0;
	
	updatePLinfoget();
	
	let jdprice = getjdprice();
	let jdx = getjdx();
	let jdunlock = [N(1), N(2), N(4), N(5), N(11), N(12), N(13), N(14)];
	
	let PL3globalspeed = getPL3globalspeed();
	
	for(let i = 7;i >= 1;i--)
	{
		if(player.boost.gte(jdunlock[i]))
		{
			player.jdnum[i - 1] = player.jdnum[i - 1].add(player.jdnum[i].mul(jdx[i]).div(10).mul(PL3globalspeed).mul(tickmult));
		}
	}
	if(player.boost.gte(jdunlock[0]))
	{
		let datagen = player.jdnum[0].mul(jdx[0]);
		if(datagen.gte(getdataspillstart())) datagen = datagen.root(getdataspillroot(datagen));
		player.data = player.data.add(datagen.div(10).mul(PL3globalspeed).mul(tickmult));
	}
	if(player.PL2unlock)
	{
		let snx = getsnx();
		for(let i = 7;i >= 1;i--)
		{
			player.star_node[i - 1] = player.star_node[i - 1].add(player.star_node[i].mul(snx[i]).div(10).mul(PL3globalspeed).mul(tickmult));
		}
		player.star = player.star.add(player.star_node[0].mul(snx[0]).div(10).mul(PL3globalspeed).mul(tickmult));
	}
	if(player.PL2upg[2])
	{
		let gnx = getgnx();
		for(let i = 7;i >= 1;i--)
		{
			player.godnode[i - 1] = player.godnode[i - 1].add(player.godnode[i].mul(gnx[i]).div(10).mul(PL3globalspeed).mul(tickmult));
		}
		player.godstar = player.godstar.add(player.godnode[0].mul(gnx[0]).div(10).mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.PL1upg[7])
	{
		let slice_gen = N(0.05);
		if(!player.slice.gte(1e7)) slice_gen = slice_gen.mul(player.slice.div(600).root(1.25).max(1));
		else slice_gen = slice_gen.mul(player.slice.min('ee6').div(1e7).pow(0.8).mul(1e7).div(600).root(1.25).max(1));
		
		//mul
		if(player.boost.gte(67)) slice_gen = slice_gen.mul(player.PL1info.add(10).log(2).root(1.5));
		if(player.boost2.gte(25)) slice_gen = slice_gen.mul(5000);
		slice_gen = slice_gen.mul(N(1.5).pow(player.sliceupg_rep[0]));
		if(player.origin_data.gte(100) && !(player.openchal && player.chalpara.includes(2))) slice_gen = slice_gen.mul(player.origin_data.sub(100).max(1).pow(1.15).div(100).max(1));
		if(player.star.gte(1e50)) slice_gen = slice_gen.mul(player.permupg.includes(6) ? player.star.add(1).root(4.5) : player.star.add(10).log10().pow(1.75));
		if(player.godstar.gte(1e140)) slice_gen = slice_gen.mul(player.godstar.div(1e120).root(4).div(100).sub(999).min(N(1e50).add(player.permupg.includes(50) ? player.godstar.log(1.0001).pow(1000) : 0)));
		//pow
		
		if(slice_gen.gte(5e8) && !player.PL2tms.gte(15)) slice_gen = N(5e8).mul(slice_gen.div(5e8).pow(0.75));
		if(slice_gen.gte(1e130)) slice_gen = N(1e130).mul(N(10).pow(slice_gen.div(1e130).log10().pow(N(1).div(N(2).mul(player.entropy[3].gte(1.062) ? N(1).sub(player.entropy[3].mul(0.16)).max(0.2) : 1)))));
		//beforesoftcap
		if(player.permupg.includes(49)) slice_gen = slice_gen.pow(1.5);
		
		player.slice = player.slice.add(slice_gen.mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.unlock_origin)
	{
		let odg = N(0);
		odg = odg.add(player.origin_upg[0].mul(0.1));
		odg = odg.add(player.origin_upg[1].mul(3));
		odg = odg.mul(N(1.5).pow(player.origin_upg[2]));
		odg = odg.mul(N(2.5).pow(player.origin_upg[3]));
		odg = odg.mul(N(5).pow(player.origin_upg[4]));
		if(player.boost.gte(120)) odg = odg.mul(5);
		if(player.boost2.gte(34)) odg = odg.mul(N(1).add(player.slice.log(2).div(30)));
		if(player.origin_data.gte(5e12) && !(player.openchal && player.chalpara.includes(2))) odg = odg.mul(player.origin_data.div(1.25e12).log(4).max(1));
		if(player.entropy[3].gte(1)) odg = odg.mul(N(1000).pow(player.entropy[3].pow(1.25)));
		if(player.godstar.gte(1e13)) odg = odg.mul(player.godstar.div(1e9).sub(9999).root(1.25).max(1).min('e1800'));
		if(player.permupg.includes(7)) odg = odg.mul(player.PL1info.pow(25).add(1.05).log(1.05).pow(1.15));
		if(player.exchal[3].gte(1)) odg = odg.mul(exchal[3].effect());
		player.origin_data = player.origin_data.add(odg.div(10).mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.permupg.includes(24))
	{
		let adg = getalgordatagen();
		if((player.exchal[1].gte(1) && adg.gte(getalgordataspillstart())) || (!player.exchal[1].gte(1) && player.algordata.gte(getalgordataspillstart()))) adg = adg.root(getalgordataspillroot(adg));
		player.algordata = player.algordata.add(adg.mul(PL3globalspeed).mul(tickmult));
	}
	
	if(player.permupg.includes(43))
	{
		let lim = getreactparalim();
		player.reactpara[1] = player.reactpara[1].add(player.reactpara[0].sub(lim[0].div(2)).div(10)).min(lim[1]).max(0);
		player.reactpara[2] = player.reactpara[2].add(player.reactpara[1].sub(lim[1].div(2)).div(10)).max(0);
		let reactspeed = N(1);
		if(player.elements >= 1) reactspeed = reactspeed.mul(player.PL3info.add(1).log(2).add(1));
		if(player.elements >= 3) reactspeed = reactspeed.mul(player.data.add(10).log(10).add(10).log(10));
		
		if(player.elements >= 6) reactspeed = reactspeed.mul(getPL3globalspeed().root(1.5));
		player.reactpara[3] = player.reactpara[3].add(player.reactpara[2].pow(player.reactpara[2].gte(1) ? 3 : 1).div(10).mul(reactspeed));
		if(player.reactpara[2].gte(lim[2]))
		{
			player.reactpara = [N(0), N(0), N(0), N(0)];
		}
		if(player.reactpara[3].gte(lim[3]))
		{
			if(player.permupg.includes(48) && player.openelements)
			{
				player.reactpara = [N(0), N(0), N(0), N(0)];
				page = 6;
				subpage = 3;
				player.elements++;
				player.openelements = false;
			}
			else
			{
				player.reactpara = [N(0), N(0), N(0), N(0)];
				player.chaosshard = player.chaosshard.add(1);
			}
		}
		
		player.chaosmass = player.chaosmass.add(N(3).pow(player.chaosshard).sub(1).mul(tickmult));
	}
	
	if(player.permupg.includes(55))
	{
		if(!player.openbh)
		{
			if(!player.permupg.includes(59))
			{
				player.blackhole = player.blackhole.add(player.data.add(10).log10().add(10).log10().div(10));
				if(player.blackhole.gte(player.data.add(10).log10().add(10).log10()))
				{
					player.blackhole = player.data.add(10).log10().add(10).log10().mul(player.blackhole.div(player.data.add(10).log10().add(10).log10()).pow(0.99));
				}
			}
			else
			{
				player.blackhole = player.data.add(10).log10().add(10).log10().mul(10).max(player.blackhole);
			}
		}
		else
		{
			let sig = player.blackhole;
			if(hassuppupg(33)) sig = sig.pow(suppupgeffect(33));
			player.sing = player.sing.add(sig.div(10));
			if(!player.permupg.includes(59)) player.blackhole = player.blackhole.pow(0.99).mul(0.975).sub(0.1);
			if(!player.blackhole.gte(1)) player.openbh = false;
		}
	}
	
	if(player.exchal[5].gte(2))
	{
		let cdg = player.suppdata.pow(2);
		if(player.exchal[8].gte(1)) cdg = cdg.mul(exchal[8].effect());
		if(hassuppupg(82)) cdg = cdg.mul(suppupgeffect(82));
		player.colldata = player.colldata.add(cdg.div(10).mul(tickmult));
	}
	
	if(player.data.gte('ee38') || player.suppupg[0].gte(0.01))
	{
		for(let i = 0;i < suppupg.length;i++)
		{
			if(suppupg[i] != undefined && suppupg[i].type == 0 && suppupg[i].unlocked())
			{
				player.suppupg[i] = player.suppupg[i].add(suppupg[i].gain().div(10).mul(tickmult));
			}
		}
	}
	
	getentropy();
	
	automation();
}

function update_ach()
{
	if(!player.ach.includes(0) && player.boost.gte(1)){othershine = true; player.ach.push(0);}
	if(!player.ach.includes(1) && player.boost.gte(8)){othershine = true; player.ach.push(1);}
	if(!player.ach.includes(2) && player.buyjd[7].gte(1)){othershine = true; player.ach.push(2);}
	if(!player.ach.includes(3) && player.boost2.gte(1)){othershine = true; player.ach.push(3);}
	if(!player.ach.includes(4) && player.data.gte(1e50)){othershine = true; player.ach.push(4);}
	if(!player.ach.includes(5) && player.boost.gte(10)){othershine = true; player.ach.push(5);}
	if(!player.ach.includes(6) && player.boost2.gte(2)){othershine = true; player.ach.push(6);}
	if(!player.ach.includes(7) && page == 3){othershine = true; player.ach.push(7);}
	if(!player.ach.includes(8) && player.data.gte(1e75)){othershine = true; player.ach.push(8);}
	if(!player.ach.includes(9) && player.data.gte(1e80)){othershine = true; player.ach.push(9);}
	if(!player.ach.includes(10) && player.PL1info.gte(1)){othershine = true; player.ach.push(10);}
	if(!player.ach.includes(11) && player.boost.gte(50)){othershine = true; player.ach.push(11);}
	if(!player.ach.includes(12) && player.PL1upg[7]){othershine = true; player.ach.push(12);}
	if(!player.ach.includes(13) && player.data.gte('1.797e308')){othershine = true; player.ach.push(13);}
	if(!player.ach.includes(14) && player.PL1info.gte('1.797e308')){othershine = true; player.ach.push(14);}
	if(!player.ach.includes(15) && player.unlock_origin){othershine = true; player.ach.push(15);}
	if(!player.ach.includes(16) && player.origin_data.gte(1e40)){othershine = true; player.ach.push(16);}
	if(!player.ach.includes(17) && player.PL1info.gte('e1000')){othershine = true; player.ach.push(17);}
	if(!player.ach.includes(18) && page == 4){othershine = true; player.ach.push(18);}
	if(!player.ach.includes(19) && player.PL1info.gte('e7000')){othershine = true; player.ach.push(19);}
	if(!player.ach.includes(20) && player.PL2unlock){othershine = true; player.ach.push(20);}
	if(!player.ach.includes(21) && player.PL2info.gte('1.797e308')){othershine = true; player.ach.push(21);}
	if(!player.ach.includes(22) && player.boost3.gte(1)){othershine = true; player.ach.push(22);}
	if(!player.ach.includes(23) && player.openentropy){othershine = true; player.ach.push(23);}
	if(!player.ach.includes(24) && player.PL2upg[2]){othershine = true; player.ach.push(24);}
	if(!player.ach.includes(25) && player.PL2upg[3]){othershine = true; player.ach.push(25);}
	if(!player.ach.includes(26) && getbuyjdeffect().gte(1e7)){othershine = true; player.ach.push(26);}
	if(!player.ach.includes(27) && player.chalcomp.gte(1)){othershine = true; player.ach.push(27);}
	if(!player.ach.includes(28) && player.algorrebuy[0].gte(1)){othershine = true; player.ach.push(28);}
	if(!player.ach.includes(29) && player.PL2info.gte('e10000')){othershine = true; player.ach.push(29);}
	if(!player.ach.includes(30) && player.PL3unlock){othershine = true; player.ach.push(30);}
	if(!player.ach.includes(31) && player.PL3info.gte('1.797e308')){othershine = true; player.ach.push(31);}
	if(!player.ach.includes(32) && player.chaosmass.gte(1)){othershine = true; player.ach.push(32);}
	if(!player.ach.includes(33) && player.openbh){othershine = true; player.ach.push(33);}
	if(!player.ach.includes(34) && getPL3globalspeed().gte(1000)){othershine = true; player.ach.push(34);}
	if(!player.ach.includes(35) && player.colldata.gte(1)){othershine = true; player.ach.push(35);}
	if(!player.ach.includes(36) && player.PL3tms.gte(1000)){othershine = true; player.ach.push(36);}
	if(!player.ach.includes(37) && player.exchal[8].gte(1)){othershine = true; player.ach.push(37);}
	if(!player.ach.includes(38) && player.exchal[1].gte(100)){othershine = true; player.ach.push(38);}
	if(!player.ach.includes(39) && player.data.gte('e1.797e308')){othershine = true; player.ach.push(39);}
}

var othershine = false;

function hidenode()
{
	player.hidenode = !player.hidenode;
}

function timeshow(time)
{
	let s = '';
	if(time >= 1e20)
	{
		return '很长时间';
	}
	if(time >= 3153600000) s = s + Math.floor(time / 3153600000) + '世纪';
	time -= Math.floor(time / 3153600000) * 3153600000;
	if(time >= 31536000) s = s + Math.floor(time / 31536000) + '年';
	time -= Math.floor(time / 31536000) * 31536000;
	if(time >= 86400) s = s + Math.floor(time / 86400) + '天';
	time -= Math.floor(time / 86400) * 86400;
	if(time >= 3600) s = s + Math.floor(time / 3600) + '小时';
	time -= Math.floor(time / 3600) * 3600;
	if(time >= 60) s = s + Math.floor(time / 60) + '分钟';
	time -= Math.floor(time / 60) * 60;
	s = s + Math.floor(time) + '秒';
	return s;
}

function getdatashow()
{
	let planck = 3.3e-102;
	if(player.data.gte('ee1000')) return '如果你每秒写1个数字，你需要写' + timeshow(player.data.log10().log10()) + '才能写出你的数据的数量级数量。';
	else if(player.data.gte(1e300)) return '如果你每秒写1个数字，你需要写' + timeshow(player.data.log10()) + '才能写出你的数据。';
	else if(player.data.gte(1e81 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e81 / planck)) + '个可观测宇宙。';
	else if(player.data.gte(1e48 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e48 / planck)) + '立方光年。';
	else if(player.data.gte(3e27 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(3e27 / planck)) + '个太阳。';
	else if(player.data.gte(3e24 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(3e24 / planck)) + '个木星。';
	else if(player.data.gte(4e19 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(4e19 / planck)) + '个月球。';
	else if(player.data.gte(1e18 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e18 / planck)) + '个塞德娜。';
	else if(player.data.gte(1e-30 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e-30 / planck)) + '个氢原子。';
	else if(player.data.gte(2e-64 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(2e-64 / planck)) + '个顶夸克。';
	else if(player.data.gte(5e-46 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(5e-46 / planck)) + '个质子。';
	else if(player.data.gte(1e-54 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e-54 / planck)) + '个电子。';
	else if(player.data.gte(2e-64 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(2e-64 / planck)) + '个顶夸克。';
	else if(player.data.gte(1e-72 / planck)) return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data.div(1e-72 / planck)) + '个电中微子。';
	else return '如果每个数据占据1个普朗克体积，你的数据占据了' + notation(player.data) + '个普朗克体积。';
}

function GUI()
{
	update_ach();
	
	let page_has_spage = [3, 3, 4, 3, 4, 5, 0, 0, 0, 0, 3];
	let max_page_has_spage = 5;
	
	for(let i = 1;i <= 11;i++)
	{
		if(page == i) document.getElementById('page' + i).style.display = 'block';
		else document.getElementById('page' + i).style.display = 'none';
	}
	
	if(othershine) document.getElementById('pagebt11').style.animation = 'flash-red 1s infinite';
	else document.getElementById('pagebt11').style.animation = 'flash-red 1s 0';
	if(page == 11) othershine = false;
	
	for(let i = 1;i <= max_page_has_spage;i++)
	{
		if(page_has_spage[page - 1] >= i)
		{
			if(subpage == i) document.getElementById('spage' + i + '_' + page).style.display = 'block';
			else document.getElementById('spage' + i + '_' + page).style.display = 'none';
		}	
	}
	
	if(player.PL1unlock) document.getElementById('PL1pbt').style.display = 'inline-block';
	else document.getElementById('PL1pbt').style.display = 'none';
	if(player.PL2unlock) document.getElementById('PL2pbt').style.display = 'inline-block';
	else document.getElementById('PL2pbt').style.display = 'none';
	if(player.PL3unlock) document.getElementById('PL3pbt').style.display = 'inline-block';
	else document.getElementById('PL3pbt').style.display = 'none';
	document.getElementById('PL4pbt').style.display = 'none';
	document.getElementById('PL5pbt').style.display = 'none';
	document.getElementById('PL6pbt').style.display = 'none';
	document.getElementById('PL7pbt').style.display = 'none';
	if(player.sliceupg[3]) document.getElementById('PL2bt').style.display = 'block';
	else document.getElementById('PL2bt').style.display = 'none';
	if(player.permupg.includes(29)) document.getElementById('PL3bt').style.display = 'block';
	else document.getElementById('PL3bt').style.display = 'none';
	if(player.exchal[8].gte(25)) document.getElementById('PL4bt').style.display = 'auto';
	else document.getElementById('PL4bt').style.display = 'none';
	
	if(player.PL1upg[7]) document.getElementById('spagebt2_4').style.display = 'inline-block';
	else document.getElementById('spagebt2_4').style.display = 'none';
	
	if(player.PL2unlock) document.getElementById('spagebt2_1').style.display = 'inline-block';
	else document.getElementById('spagebt2_1').style.display = 'none';
	
	if(player.PL2tms.gte(25)) document.getElementById('spagebt4_3').style.display = 'inline-block';
	else document.getElementById('spagebt4_3').style.display = 'none';
	
	if(player.PL2tms.gte(35)) document.getElementById('spagebt2_5').style.display = 'inline-block';
	else document.getElementById('spagebt2_5').style.display = 'none';
	
	if(player.PL2upg[2]) document.getElementById('spagebt4_5').style.display = 'inline-block';
	else document.getElementById('spagebt4_5').style.display = 'none';
	
	if(player.PL2upg[3]) document.getElementById('spagebt3_1').style.display = 'inline-block';
	else document.getElementById('spagebt3_1').style.display = 'none';
	
	if(player.permupg.includes(14)) document.getElementById('spagebt2_2').style.display = 'inline-block';
	else document.getElementById('spagebt2_2').style.display = 'none';
	
	if(player.permupg.includes(43)) document.getElementById('spagebt2_6').style.display = 'inline-block';
	else document.getElementById('spagebt2_6').style.display = 'none';
	
	if(player.permupg.includes(48)) document.getElementById('spagebt3_6').style.display = 'inline-block';
	else document.getElementById('spagebt3_6').style.display = 'none';
	
	if(player.permupg.includes(55)) document.getElementById('spagebt4_6').style.display = 'inline-block';
	else document.getElementById('spagebt4_6').style.display = 'none';
	
	if(player.permupg.includes(58)) document.getElementById('spagebt3_2').style.display = 'inline-block';
	else document.getElementById('spagebt3_2').style.display = 'none';
	
	if(player.exchal[5].gte(2)) document.getElementById('spagebt5_6').style.display = 'inline-block';
	else document.getElementById('spagebt5_6').style.display = 'none';
	
	document.getElementById('PL1infoget').innerHTML = notation(PL1infoget, 0);
	document.getElementById('PL2infoget').innerHTML = notation(PL2infoget, 0);
	document.getElementById('PL3infoget').innerHTML = notation(PL3infoget, 0);
	
	document.getElementById('PL3globalspeed').innerHTML = notation(getPL3globalspeed(), 2);
	if(getofflinelimit() > 0 && player.offlinetime >= 1000)
	{
		document.getElementById('offline').style.display = 'block';
		document.getElementById('offline').innerHTML = '离线时间正在加成超越以前全局速度，当前剩余' + timeshow(Math.floor(player.offlinetime / 1000)) + '(上限在' + timeshow(Math.floor(getofflinelimit() / 1000)) + ')离线时间。';
	}
	else document.getElementById('offline').style.display = 'none';
	
	if(getofflinelimit() > 0)
	{
		if(player.openoffline) document.getElementById('offlinebt').innerHTML = '离线进度已开启';
		else document.getElementById('offlinebt').innerHTML = '离线进度已关闭';
	}
	else document.getElementById('offlinebt').innerHTML = '暂未解锁离线进度';
	
	if(Date.now() < player.last_update)
	{
		document.getElementById('offline').style.display = 'block';
		document.getElementById('offline').innerHTML = '<span style="color: red; text-shadow: 6px 6px 10px red; -6px -6px 10px red;">您从' + timeshow(Math.floor((player.last_update - Date.now()) / 1000)) + '后穿越了回来！';
	}
	
	document.getElementById('data').innerHTML = notation(player.data, 0);
	document.getElementById('data2').innerHTML = notation(player.data, 0);
	document.getElementById('datashow').innerHTML = getdatashow();
	document.getElementById('PL1info').innerHTML = notation(player.PL1info, 0);
	document.getElementById('PL2info').innerHTML = notation(player.PL2info, 0);
	document.getElementById('PL3info').innerHTML = notation(player.PL3info, 0);
	document.getElementById('PL3infottl').innerHTML = notation(player.PL3infottl, 0);
	document.getElementById('PL3infoeffect').innerHTML = getPL3infoeffect();
	document.getElementById('PL2tms').innerHTML = notation(player.PL2tms, 0);
	document.getElementById('PL3tms').innerHTML = notation(player.PL3tms, 0);
	//document.getElementById('PL4tms').innerHTML = notation(player.PL4tms);
	
	let jdx = getjdx();
	let datagen = player.jdnum[0].mul(jdx[0]);
	if(datagen.gte(getdataspillstart()))
	{
		document.getElementById('dataspill').style.display = 'block';
		document.getElementById('dataspill').innerHTML = '在达到 ' + notation(getdataspillstart()) + ' 数据后，数据将溢出！获取速度变为' + notation(getdataspillroot(datagen)) + '次方根';
	}
	else
	{
		document.getElementById('dataspill').style.display = 'none';
	}
	
	document.getElementById('slice').innerHTML = notation(player.slice, 0);
	document.getElementById('slice_effect').innerHTML = notation(getsliceeffect());
	for(let i = 0;i < 3;i++)
	{
		sbc[i] += sbct[i];
		if(sbc[i] < 0) sbc[i] = 0, sbct[i] = ((-sbct[i]) + 1) % 3;
		else if(sbc[i] > 255) sbc[i] = 255, sbct[i] = ((-sbct[i]) - 1) % 3;
	}
	for(let xm = 1;xm < 9;xm++) document.getElementById('slicebt' + xm).style['border-color'] = 'rgb(' + sbc[0] + ',' + sbc[1] + ',' + sbc[2] + ')';
	document.getElementById('boostnum').innerHTML = notation(player.boost, 0);
	document.getElementById('boost2num').innerHTML = notation(player.boost2, 0);
	document.getElementById('boost3num').innerHTML = notation(player.boost3, 0);
	if(player.boost.gte(20000)) document.getElementById('boostscaling').innerHTML = '究极折算|';
	else if(player.boost.gte(10)) document.getElementById('boostscaling').innerHTML = '超级折算|';
	else document.getElementById('boostscaling').innerHTML = '';
	document.getElementById('boostscalingeffect').innerHTML = notation(getboostzs1x(), 3);
	document.getElementById('boostscaling2effect').innerHTML = notation(getboostzs2x(), 3);
	if(player.boost.gte(20000)) document.getElementById('boostscal2').style.display = 'block';
	else document.getElementById('boostscal2').style.display = 'none';
	document.getElementById('unlock_origin').style.display = (player.unlock_origin ? 'block' : 'none');
	document.getElementById('uunlock_origin').style.display = (!player.unlock_origin ? 'block' : 'none');
	document.getElementById('origin_data').innerHTML = notation(player.origin_data, 0);
	document.getElementById('origin_effect').innerHTML = getorigineffect();
	
	document.getElementById('dim').innerHTML = notation(player.dimension, 0);
	document.getElementById('dimcost').innerHTML = notation(getdimcost());
	document.getElementById('star').innerHTML = notation(player.star, 0);
	document.getElementById('godstar').innerHTML = notation(player.godstar, 0);
	document.getElementById('stareffect').innerHTML = getstareffect();
	document.getElementById('godstareffect').innerHTML = getgodstareffect();
	if(player.PL2info.gte(getdimcost()))
	{
		document.getElementById('dimbt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('dimbt').style['background-color'] = 'black';
	}
	let PL2mlst_num = 8;
	let PL2mlst_dis = [N(1), N(2), N(4), N(7), N(10), N(15), N(25), N(35)];
	for(let i = 0;i < PL2mlst_num;i++)
	{
		if(player.PL2tms.gte(PL2mlst_dis[i]))
		{
			document.getElementById('PL2mlst' + i).style['background-color'] = 'purple';
			document.getElementById('PL2mlst' + i).style['border-color'] = 'white';
			document.getElementById('PL2mlst' + i).style['color'] = 'white';
		}
		else
		{
			document.getElementById('PL2mlst' + i).style['background-color'] = 'white';
			document.getElementById('PL2mlst' + i).style['border-color'] = 'purple';
			document.getElementById('PL2mlst' + i).style['color'] = 'black';
		}
	}
	document.getElementById('chalcompmax').innerHTML = notation(player.chalcomp, 3);
	document.getElementById('chalcompnow').innerHTML = notation(getchalparacomp());
	document.getElementById('chalcompeffect').innerHTML = getchalcompeffect();
	
	let boostcost = getboostcost();
	let boost2cost = getboost2cost();
	let boost3cost = getboost3cost();
	let jdcost = getjdprice();
	let jdunlock = [N(1), N(2), N(4), N(5), N(11), N(12), N(13), N(14)];
	document.getElementById('boosteffect').innerHTML = getboosteffect(player.boost);
	document.getElementById('boost2effect').innerHTML = getboost2effect(player.boost2);
	document.getElementById('boost3effect').innerHTML = getboost3effect(player.boost3);
	let beff = '', b2eff = '', b3eff = '';
	for(let i = 0;i < boosteffectnum;i++)
	{
		if(player.boost.gte(boosteffectlist[i])) beff = beff + getboosteffect(boosteffectlist[i].sub(1)) + '<br/>';
	}
	for(let i = 0;i < boost2effectnum;i++)
	{
		if(player.boost2.gte(boost2effectlist[i])) b2eff = b2eff + getboost2effect(boost2effectlist[i].sub(1)) + '<br/>';
	}
	for(let i = 0;i < boost3effectnum;i++)
	{
		if(player.boost3.gte(boost3effectlist[i])) b3eff = b3eff + getboost3effect(boost3effectlist[i].sub(1)) + '<br/>';
	}
	document.getElementById('boosteffectlist').innerHTML = beff;
	document.getElementById('boost2effectlist').innerHTML = b2eff;
	document.getElementById('boost3effectlist').innerHTML = b3eff;
	if(player.autoboost) document.getElementById('autoboostbts').innerHTML = '自动购买：开';
	else document.getElementById('autoboostbts').innerHTML = '自动购买：关';
	if(player.autoboost2) document.getElementById('autoboost2bts').innerHTML = '自动购买：开';
	else document.getElementById('autoboost2bts').innerHTML = '自动购买：关';
	if(player.autoboost3) document.getElementById('autoboost3bts').innerHTML = '自动购买：开';
	else document.getElementById('autoboost3bts').innerHTML = '自动购买：关';
	if(player.PL1upg[4]) document.getElementById('autoboostbt').style.display = 'block';
	else document.getElementById('autoboostbt').style.display = 'none';
	if(player.sliceupg[0]) document.getElementById('autoboost2bt').style.display = 'block';
	else document.getElementById('autoboost2bt').style.display = 'none';
	if(player.PL2upg[1]) document.getElementById('autoboost3bt').style.display = 'block';
	else document.getElementById('autoboost3bt').style.display = 'none';
	document.getElementById('buyjdeffect').innerHTML = notation(getbuyjdeffect());
	for(let i = 0;i < 8;i++)
	{
		let scs = getjdscs(i);
		let scx = getjdscx(i);
		for(let j = 0;j < 8;j++) document.getElementById('jdscs' + (j + 1)).innerHTML = notation(scs[j]);
		for(let j = 0;j < 8;j++) document.getElementById('jdscx' + (j + 1)).innerHTML = notation(scx[j]);
		let jdx = getjdx();
		let zscolor = ['#ff0000', '#aa2200', '#22aa00', '#00ff00', '#00aa22', '#0022aa', '#0000ff', '#2200aa'];
		let zstext = ['一阶软上限', '二阶软上限', '三阶软上限', '四阶软上限', '五阶软上限', '六阶软上限', '七阶软上限', '八阶软上限'];
		document.getElementById('jdzs' + (i + 1)).innerHTML = '';
		document.getElementById('jdzs' + (i + 1)).style['color'] = '#ffffff';
		let now_x = getbuyjdeffect().pow(player.buyjd[i]);
		for(let j = 0;j < 4;j++)
		{
			if(now_x.gte(scs[j]))
			{
				document.getElementById('jdzs' + (i + 1)).innerHTML = zstext[j];
				document.getElementById('jdzs' + (i + 1)).style['color'] = zscolor[j];
				now_x = scs[j].mul(now_x.div(scs[j]).pow(scx[j]));
			}
		}
		let jd_x = getjdx();
		for(let j = 4;j < 8;j++)
		{
			let jd_xi = jd_x[i];
			if(jd_xi.gte(N(10).pow(scs[j])))
			{
				document.getElementById('jdzs' + (i + 1)).innerHTML = zstext[j];
				document.getElementById('jdzs' + (i + 1)).style['color'] = zscolor[j];
				jd_xi = (N(10).pow(scs[j])).mul(N(10).pow(jd_xi.log10().div(scs[j]).pow(scx[j])));
			}
		}
		if(player.boost.gte(jdunlock[i]))
		{
			document.getElementById('unlockjd' + (i + 1)).style.display = 'block';
		}
		else
		{
			document.getElementById('unlockjd' + (i + 1)).style.display = 'none';
		}
		document.getElementById('jdnum' + (i + 1)).innerHTML = notation(player.jdnum[i], 1);
		document.getElementById('jdbuy' + (i + 1)).innerHTML = notation(player.buyjd[i].add(player.permupg.includes(24) ? getalgoreffect() : 0), 0);
		document.getElementById('jdx' + (i + 1)).innerHTML = notation(jdx[i], 2);
		document.getElementById('jdcost' + (i + 1)).innerHTML = notation(jdcost[i], 0);
		if(player.data.gte(jdcost[i])) document.getElementById('jdbuybt' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('jdbuybt' + (i + 1)).style['background-color'] = '#000000';
		
		if(player.autobuyjd[i]) document.getElementById('autobuyjds' + (i + 1)).innerHTML = '自动购买：开';
		else document.getElementById('autobuyjds' + (i + 1)).innerHTML = '自动购买：关';
		if(player.PL1upg[0]) document.getElementById('autobuyjdbt' + (i + 1)).style.display = 'block';
		else document.getElementById('autobuyjdbt' + (i + 1)).style.display = 'none';
	}
	if(player.PL1upg[7])
	{
		for(let i = 0;i < 4;i++)
		{
			if(player.sliceupg_rep[i].gte(200)) document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'green';
			else document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'black';
			document.getElementById('sliceupgcost' + (i + 1)).innerHTML = notation(sliceupgcost[i].pow(player.sliceupg_rep[i].add(1)), 0);
			document.getElementById('sliceupglevel' + (i + 1)).innerHTML = notation(player.sliceupg_rep[i], 0);
		}
		for(let i = 4;i < 8;i++)
		{
			if(player.sliceupg[i - 4]) document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'green';
			else document.getElementById('slicebt' + (i + 1)).style['background-color'] = 'black';
			document.getElementById('sliceupgcost' + (i + 1)).innerHTML = notation(sliceupgcost[i], 0);
		}
	}
	if(player.PL2unlock)
	{
		for(let i = 0;i < 8;i++)
		{
			let zscolor = ['#ff0000', '#aa2200', '#22aa00', '#00ff00'];
			let zstext = ['一阶软上限', '二阶软上限', '三阶软上限', '四阶软上限'];
			let snx = getsnx();
			let sncost = getsncost(i);
			let scs = getsnscs();
			document.getElementById('snbuy' + (i + 1)).innerHTML = notation(player.buysn[i], 0);
			document.getElementById('sncost' + (i + 1)).innerHTML = notation(getsncost(i), 0);
			document.getElementById('snnum' + (i + 1)).innerHTML = notation(player.star_node[i], 1);
			document.getElementById('snx' + (i + 1)).innerHTML = notation(snx[i], 2);
			if(player.star.gte(sncost))
			{
				document.getElementById('snbuybt' + (i + 1)).style['background-color'] = '#666666';
			}
			else
			{
				document.getElementById('snbuybt' + (i + 1)).style['background-color'] = '#000000';
			}
			document.getElementById('snzs' + (i + 1)).innerHTML = '';
			document.getElementById('snzs' + (i + 1)).style['color'] = 'black';
			for(let j = 0;j < 4;j++)
			{
				if(snx[i].gte(scs[j]))
				{
					document.getElementById('snzs' + (i + 1)).innerHTML = zstext[j];
					document.getElementById('snzs' + (i + 1)).style['color'] = zscolor[j];
				}
			}
		}
	}
	if(player.PL2upg[2])
	{
		for(let i = 0;i < 8;i++)
		{
			let gnx = getgnx();
			let gnc = getgnc();
			if(!player.gnunlock[i]) document.getElementById('unlockgn' + (i + 1)).style.display = 'block', document.getElementById('gnbt' + (i + 1)).style.display = 'none';
			else document.getElementById('unlockgn' + (i + 1)).style.display = 'none', document.getElementById('gnbt' + (i + 1)).style.display = 'block';
			document.getElementById('gn' + (i + 1)).innerHTML = notation(player.godnode[i], 1);
			document.getElementById('gnx' + (i + 1)).innerHTML = notation(gnx[i], 2);
			document.getElementById('gnc' + (i + 1)).innerHTML = notation(gnc[i], 0);
		}
		if(player.permupg.includes(10)) document.getElementById('buymaxgn').style.display = 'block';
		else document.getElementById('buymaxgn').style.display = 'none';
	}
	document.getElementById('boostcost').innerHTML = notation(boostcost);
	if(player.data.gte(boostcost))
	{
		document.getElementById('boostbt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('boostbt').style['background-color'] = '#000000';
	}
	document.getElementById('boost2cost').innerHTML = notation(boost2cost);
	if(player.boost.gte(boost2cost))
	{
		document.getElementById('boost2bt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('boost2bt').style['background-color'] = '#000000';
	}
	document.getElementById('boost3cost').innerHTML = notation(boost3cost);
	if(player.PL2tms.gte(25)) document.getElementById('boost3bt').style.display = 'block';
	else document.getElementById('boost3bt').style.display = 'none';
	if(player.boost2.gte(boost3cost))
	{
		document.getElementById('boost3bt').style['background-color'] = '#666666';
	}
	else
	{
		document.getElementById('boost3bt').style['background-color'] = '#000000';
	}
	for(let i = 0;i < 8;i++)
	{
		if(player.PL1upg[i]) document.getElementById('PL1ug' + (i + 1)).style['background-color'] = 'blue';
		else if(player.PL1info.gte(PL1upgcost[i])) document.getElementById('PL1ug' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('PL1ug' + (i + 1)).style['background-color'] = '#000000';
	}
	document.getElementById('PL1ug3effect').innerHTML = notation(player.boost.add(1).pow(1.5), 2);
	for(let i = 0;i < 5;i++)
	{
		let cap = [N(100), N(100), N(30), N(30)];
		if(i != 4 && player.origin_upg[i].gte(cap[i])) document.getElementById('originupg' + (i + 1)).style['background-color'] = 'blue';
		else if(player.origin_data.gte(getoriginupgcost(i))) document.getElementById('originupg' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('originupg' + (i + 1)).style['background-color'] = 'black';
		document.getElementById('originupgcost' + (i + 1)).innerHTML = notation(getoriginupgcost(i), 0);
		document.getElementById('originupglevel' + (i + 1)).innerHTML = notation(player.origin_upg[i], 1);
	}
	if(player.openentropy) document.getElementById('openentropy').style['background-color'] = 'red';
	else document.getElementById('openentropy').style['background-color'] = 'black';
	for(let i = 0;i < 4;i++)
	{
		document.getElementById('ent' + i).innerHTML = notation(player.entropy[i], 3);
		document.getElementById('entropyeffect' + i).innerHTML = getentropyeffect(i);
	}
	for(let i = 0;i < 4;i++)
	{
		if(player.PL2upg[i]) document.getElementById('PL2upg' + (i + 1)).style['background-color'] = 'purple';
		else if(player.PL2info.gte(PL2upgcost[i])) document.getElementById('PL2upg' + (i + 1)).style['background-color'] = '#666666';
		else document.getElementById('PL2upg' + (i + 1)).style['background-color'] = '#000000';
	}
	for(let i = 0;i < 100;i++)
	{
		if(document.getElementById('ach' + i))
		{
			if(player.ach.includes(i)) document.getElementById('ach' + i).style['background-color'] = 'green';
			else document.getElementById('ach' + i).style['background-color'] = 'darkred';
		}
	}
	player.chalcomp_temp = player.chalcomp;
	if(!player.permupg.includes(24) || !player.hidenode) document.getElementById('normal_node').style.display = 'block';
	else if(player.permupg.includes(24) && player.hidenode) document.getElementById('normal_node').style.display = 'none';
	if(player.permupg.includes(24))
	{
		document.getElementById('algor').style.display = 'block';
		document.getElementById('algornum').innerHTML = notation(player.algor, 0)
		+ (player.permupg.includes(57) ? ' + ' + notation(player.algorrebuy[0].mul(0.25)) : '');
		document.getElementById('algordata').innerHTML = notation(player.algordata, 0);
		let adg = getalgordatagen();
		if((player.exchal[1].gte(1) && adg.gte(getalgordataspillstart())) || (!player.exchal[1].gte(1) && player.algordata.gte(getalgordataspillstart())))
		{
			document.getElementById('algordataspill').style.display = 'block';
			document.getElementById('algordataspill').innerHTML = '在达到 ' + notation(getalgordataspillstart()) + ' 算法数据后，算法数据将溢出！获取速度变为' + notation(getalgordataspillroot(adg)) + '次方根';
		}
		else
		{
			document.getElementById('algordataspill').style.display = 'none';
		}
		document.getElementById('algoreffect').innerHTML = notation(getalgoreffect());
		document.getElementById('algorcost').innerHTML = notation(getalgorcost());
		if(player.PL1info.gte(getalgorcost()))
		{
			document.getElementById('algorbt').style['background-color'] = '#666666';
		}
		else
		{
			document.getElementById('algorbt').style['background-color'] = 'black';
		}
		if(player.permupg.includes(29))
		{
			document.getElementById('algorrebuy1bt').style.display = 'block';
			document.getElementById('algorrebuy2bt').style.display = 'block';
			document.getElementById('algorrebuy1cost').innerHTML = notation(getalgorrebuycost(0), 0);
			document.getElementById('algorrebuy2cost').innerHTML = notation(getalgorrebuycost(1), 0);
			document.getElementById('algorrebuy1effect').innerHTML = notation(N(1).add(player.algorrebuy[0].mul(0.05)));
			document.getElementById('algorrebuy2effect').innerHTML = notation(player.algorrebuy[1].mul(0.02));
			document.getElementById('algorrebuy1').innerHTML = notation(player.algorrebuy[0], 0)
			+ (player.permupg.includes(57) ? ' + ' + notation(player.algorrebuy[1].mul(0.5)) : '');
			document.getElementById('algorrebuy2').innerHTML = notation(player.algorrebuy[1], 0);
			if(player.PL1info.gte(getalgorrebuycost(0)))
			{
				document.getElementById('algorrebuy1bt').style['background-color'] = '#666666';
			}
			else
			{
				document.getElementById('algorrebuy1bt').style['background-color'] = 'black';
			}
			if(player.PL1info.gte(getalgorrebuycost(1)))
			{
				document.getElementById('algorrebuy2bt').style['background-color'] = '#666666';
			}
			else
			{
				document.getElementById('algorrebuy2bt').style['background-color'] = 'black';
			}
			if(player.algorrebuy[0].gte(50)) document.getElementById('algorrebuy1scal').innerHTML = '超级折算|';
			else document.getElementById('algorrebuy1scal').innerHTML = '';
			if(player.algorrebuy[1].gte(25)) document.getElementById('algorrebuy2scal').innerHTML = '超级折算|';
			else document.getElementById('algorrebuy2scal').innerHTML = '';
		}
		else
		{
			document.getElementById('algorrebuy1bt').style.display = 'none';
			document.getElementById('algorrebuy2bt').style.display = 'none';
		}
	}
	else
	{
		document.getElementById('algor').style.display = 'none';
	}
	
	if(player.permupg.includes(43))
	{
		document.getElementById('chaosshard').innerHTML = notation(player.chaosshard, 0);
		document.getElementById('chaosmass').innerHTML = notation(player.chaosmass, 0);
		document.getElementById('chaosmasseffect').innerHTML = getchaosmasseffect();
		let lim = getreactparalim();
		for(let i = 0;i < 4;i++)
		{
			document.getElementById('reactpara' + i).innerHTML = notation(player.reactpara[i]);
			document.getElementById('reactparalim' + i).innerHTML = notation(lim[i]);
			document.getElementById('reactbar' + i).style.width = 100 - (player.reactpara[i].div(lim[i]).mul(100)) + '%';
		}
		document.getElementById('reactgoal').innerHTML = '混沌碎片';
	}
	
	if(player.permupg.includes(48))
	{
		document.getElementById('startelements').innerHTML = '开始/结束压缩元素' + (player.elements + 1);
		document.getElementById('elementseffect').innerHTML = getelementseffect();
		if(player.openelements) document.getElementById('startelements').style['background-color'] = 'red';
		else document.getElementById('startelements').style['background-color'] = 'black';
		if(player.openelements) document.getElementById('reactgoal').innerHTML = '元素' + (player.elements + 1);
	}
	
	if(player.permupg.includes(39))
	{
		document.getElementById('autochaos').style.display = 'block';
		if(player.autochaos) document.getElementById('autochaosbutton').innerHTML = '更改自动混沌设置<br>当前状态：开启<br>当前目标：' + notation(player.autochaosgoal);
		else document.getElementById('autochaosbutton').innerHTML = '更改自动混沌设置<br>当前状态：关闭';
	}
	else
	{
		document.getElementById('autochaos').style.display = 'none';	
	}
	
	if(player.permupg.includes(55))
	{
		document.getElementById('PL4tms').innerHTML = notation(player.PL4tms, 0);
		document.getElementById('singnow').innerHTML = notation(player.sing, 0);
		document.getElementById('singcap').innerHTML = notation(getsingcap());
		if(player.opensupp) document.getElementById('blackhole').innerHTML = '已禁用';
		else document.getElementById('blackhole').innerHTML = notation(player.blackhole, 2);
		document.getElementById('bheffect').innerHTML = getbheffect();
		if(player.opensupp) document.getElementById('bhbutton').style['border-color'] = 'red';
		else if(player.openbh) document.getElementById('bhbutton').style['border-color'] = 'gold';
		else document.getElementById('bhbutton').style['border-color'] = 'white';
	}
	
	if(player.exchal[5].gte(2))
	{
		document.getElementById('colldata').innerHTML = notation(player.colldata, 0);
		document.getElementById('colleffect').innerHTML = getcolleffect();
		document.getElementById('suppdata').innerHTML = notation(player.suppdata, 0);
		if(player.opensupp)
		{
			document.getElementById('suppweaken').style.display = 'none';
			document.getElementById('suppget').innerHTML = '+' + notation(getcollget()) + ' 压制数据';
			document.getElementById('suppget').style.display = 'block';
			document.getElementById('opensupp').style['box-shadow'] = '0px 0px 30px silver';
		}
		else 
		{
			document.getElementById('suppweaken').style.display = 'block';
			document.getElementById('suppget').style.display = 'none';
			document.getElementById('opensupp').style['box-shadow'] = '0px 0px 10px silver';
		}
	}
}

init();

var playerTemp = player;

data_input();

let playerLen = Object.keys(player).length;

const bKeys = Object.keys(playerTemp);

bKeys.forEach(key =>
{
	if (!player.hasOwnProperty(key))
	{
	  player[key] = playerTemp[key];
	}
});

if('mag' in player.entropy) player.entropy = [N(0), N(0), N(0), N(0)];
for(let i = 1;i < exchal.length;i++)
{
	if(!player.exchal[i]) player.exchal[i] = N(0);
}

dis_permupgui();
dis_chalui();
dis_exchalui();
dis_suppui();

function getofflinelimit() //ms
{
	if(!hassuppupg(8)) return 0;
	else
	{
		let base = 600000;
		return base;
	}
}

//滚动新闻
var news = {
	0: {text() {return '这是一条不滚动新闻';}},
	1: {text() {return notation(player.data) + '数据？弱爆了';}},
	2: {text() {return '新闻为什么不从左往右走？';}},
	3: {text() {return '原神，启动';}},
	4: {text() {return '史上平衡最差的增量游戏是什么？IMR算什么，IDR才是真神';}},
	5: {text() {return '|0````1````2````2.5``2.9``3.2``3.5``|这是一把被软上限限制的尺子';}},
	6: {text() {return '|0````1````2````2````2````2````2````|这是一把被硬上限限制的尺子';}},
	7: {text() {return '|0````1````1.8``2.3``2.6``2.8``3````|这是一把被渐进限限制的尺子';}},
	8: {text() {return '你难以想象本游戏制造了多少软上限';}},
	9: {text() {return '我被chaos大重置chaos了';}},
	10: {text() {return '本游戏使用HTML/Javascript/CSS编写';}},
	11: {text() {return '美国有硅谷，中国有洛谷';}},
	12: {text() {return '我们为我们的产品质量感到自豪……';}},
	13: {text() {return '本游戏共有七个声望层：世界、宇宙、混沌、虚空、天理、现实、超越';}},
	14: {text() {return '本游戏每个声望层都没有反物质维度的现实层级大';}},
	15: {text() {return '你没有' + notation(player.data) + '数据。';}},
	16: {text() {return '新闻机构瘫痪了';}},
	17: {text() {return '你不知道你在看的新闻都是假新闻吗？';}},
	18: {text() {return '本游戏共有' + newsl + '个滚动新闻';}},
	19: {text() {return '说好了5小时后更新，可是都好几天了！';}},
	20: {text() {return '当你看这条新闻时，你就看过这条新闻了';}},
	21: {text() {return '增量的反义词是减魖';}},
	22: {text() {return '游戏有bug怎么办？只要我们把代码删完，就没有bug了。';}},
	//{text() {return '';}},
};
let newsl = 23;
let wid = window.innerWidth;
let nownews = Math.floor(Math.random() * newsl);
let newsleft = 100;
document.getElementById('newstext').left = '100%';
document.getElementById('newstext').innerHTML = news[nownews].text();
function newsscroll()
{
	newsleft -= 0.2;
	let nowpx = newsleft / 100 * wid;
	if(nowpx < 0 - news[nownews].text().length * 16)
	{
		nownews = Math.floor(Math.random() * newsl);
		document.getElementById('newstext').innerHTML = news[nownews].text();
		newsleft = 100;
	}
	document.getElementById('newstext').style.left = newsleft + '%';
}

setInterval(produce, 100);
setInterval(GUI, 40);
setInterval(data_print, 400);
setInterval(build_permupgui, 100);
setInterval(build_chalui, 100);
setInterval(build_exchalui, 100);
setInterval(build_suppui, 100);
setInterval(newsscroll, 40);
