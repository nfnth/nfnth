





var widths = 1024; var xs = 4; var ws = widths/xs; var heights = 768; var ys = 3; var hs = heights/ys; //console.log(ws); console.log(hs);
var fireEffectData = { frames: {
		fire1: { frame: { x: (0*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire2: { frame: { x: (1*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire3: { frame: { x: (2*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire4: { frame: { x: (3*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire5: { frame: { x: (0*ws), y:(1*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire6: { frame: { x: (1*ws), y:(1*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire7: { frame: { x: (2*ws), y:(1*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire8: { frame: { x: (3*ws), y:(1*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire9: { frame: { x: (0*ws), y:(2*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		fire10: { frame: { x: (1*ws), y:(2*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		
 },
	meta: { image: 'res/img/fire.png', format: 'RGBA8888', size: { w: widths, h: heights }, scale: 1	},
	animations: {
		fire: ['fire1','fire2','fire3','fire4','fire5','fire6','fire7','fire8','fire9','fire10'],
 } }
 
widths = 312; xs = 12; var ws = widths/xs; heights = 288; ys = 8; hs = heights/ys; //console.log(ws); console.log(hs);
var animalData = { frames: {
		dogad1: { frame: { x: (0*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogad2: { frame: { x: (1*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogad3: { frame: { x: (2*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		
		dogal1: { frame: { x: (0*ws), y:(1*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogal2: { frame: { x: (1*ws), y:(1*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogal3: { frame: { x: (2*ws), y:(1*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		
		dogar1: { frame: { x: (0*ws), y:(2*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogar2: { frame: { x: (1*ws), y:(2*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogar3: { frame: { x: (2*ws), y:(2*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		
		dogau1: { frame: { x: (0*ws), y:(3*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogau2: { frame: { x: (1*ws), y:(3*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		dogau3: { frame: { x: (2*ws), y:(3*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		
		
 },
	meta: { image: 'res/img/game/sprite/animal/animals1.png', format: 'RGBA8888', size: { w: widths, h: heights }, scale: 1	},
	animations: {
		dogad: ['dogad1','dogad2','dogad3'], dogal: ['dogal1','dogal2','dogal3'], dogar: ['dogar1','dogar2','dogar3'], dogau: ['dogau1','dogau2','dogau3'],
 } }
 
 
 // add dogb, dogc, dogd, cata, catb,  catc, catd
 // animals2/3/4/5 (different size!)
 //... squirrel,hamster,rabbita,rabbitb,porcupine,raccoona,  raccoonb,fox
 //... cowa, cowaba,cowb, cowbba,pig,pigba,goata,goatb
 //...sheepa,sheepb,sheepc,sheepaba,sheepbba,sheepcba
 //...deerfba,deerf,deermba,deerm,bearaba,beara,bearbba,bearb
 
 
 
 
widths = 384; xs = 4; ws = widths/xs; heights = 96; ys = 1; hs = heights/ys; 


var cyberData = { frames: {
		idle1: { frame: { x: (0*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		idle2: { frame: { x: (1*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		idle3: { frame: { x: (2*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		idle4: { frame: { x: (3*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		
 },
	meta: { image: 'res/sprite/cyber/bar/1/Idle.png', format: 'RGBA8888', size: { w: widths, h: heights }, scale: 1	},
	animations: {
		idle: ['idle1','idle2','idle3','idle4'],
 } }
 widths = 192; xs = 2; ws = widths/xs;
var cyberData2 = { frames: {
		hurt1: { frame: { x: (0*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		hurt2: { frame: { x: (1*ws), y:(0*hs), w:ws, h:hs }, sourceSize: { w: ws, h: hs}, spriteSourceSize: { x: 0, y: 0, w: ws, h: hs } },
		
 },
	meta: { image: 'res/sprite/cyber/bar/1/Hurt.png', format: 'RGBA8888', size: { w: widths, h: heights }, scale: 1	},
	animations: {
		hurt: ['hurt1','hurt2',],
 } }

 
const deerData = { frames: {
		fire1: { frame: { x: 0, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
		fire2: { frame: { x: 32, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
		fire3: { frame: { x: 64, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
		fire4: { frame: { x: 96, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
		fire5: { frame: { x: 128, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
		fire6: { frame: { x: 160, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
		fire7: { frame: { x: 192, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
		fire8: { frame: { x: 224, y:192, w:32, h:32 }, sourceSize: { w: 32, h: 32}, spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 } },
 },
	meta: { image: 'res/sprite/deer/deer.png', format: 'RGBA8888', size: { w: 320, h: 384 }, scale: 1	},
	animations: {
		walk: ['stand1','stand2','stand3','stand4','stand5','stand6','stand7','stand8'],
 } }

var format = '.png';
var color = ['Red','Yellow','Blue','Purple'];
var section = ['res/sprite/sword/Factions','res/sprite/sword/Terrain','res/sprite/sword/Resources','res/sprite/sword/Effects','res/sprite/sword/Deco'];
var faction = ['Knights','Goblins'];
var area = ['Troops','Buildings'];
var piece = ['Pawn','Warrior','Archer','Barrel','TNT','Torch'];

//static
var terrain = ['Terrain/Water', 'Terrain/Ground/Tilemap_Flat','Terrain/Ground/Tilemap_Elevation','Terrain/Ground/Shadows','Terrain/Bridge/Bridge_All']; 
var build = ['Factions/Knights/Buildings/Castle/Castle_','Factions/Knights/Buildings/House/House_','Factions/Knights/Buildings/Tower/Tower_','Factions/Goblins/Buildings/Wood_Tower/Wood_Tower_']; //colors, Construction, Destroyed 
//wood uses InConstruction, Destroyed, nothing else
var build2 = ['Resources/Gold Mine/GoldMine_']; //Active, Destroyed, Inactive

var prop = ['smush','mmush','lmush','srock','mrock','lrock','sbush','mbush','lbush','sfern','lfern','spump','lpump','sbone','mbone','lbone','post','scarecrow'];
var res = ['G','M','W']; //_Idle

const pawnData = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		work1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hold1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		carry1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[0]+'/'+color[0]+'/'+piece[0] + '_'+color[0]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		work: ['work1','work2','work3','work4','work5','work6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		hold: ['hold1','hold2','hold3','hold4','hold5','hold6'],
		carry: ['carry1','carry2','carry3','carry4','carry5','carry6'], } }
const pawnData2 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		work1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hold1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		carry1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[0]+'/'+color[1]+'/'+piece[0] + '_'+color[1]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		work: ['work1','work2','work3','work4','work5','work6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		hold: ['hold1','hold2','hold3','hold4','hold5','hold6'],
		carry: ['carry1','carry2','carry3','carry4','carry5','carry6'], } }
const pawnData3 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		work1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hold1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		carry1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[0]+'/'+color[2]+'/'+piece[0] + '_'+color[2]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		work: ['work1','work2','work3','work4','work5','work6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		hold: ['hold1','hold2','hold3','hold4','hold5','hold6'],
		carry: ['carry1','carry2','carry3','carry4','carry5','carry6'], } }
const pawnData4= { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		work1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		work6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hold1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hold6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		carry1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		carry6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[0]+'/'+color[3]+'/'+piece[0] + '_'+color[3]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		work: ['work1','work2','work3','work4','work5','work6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		hold: ['hold1','hold2','hold3','hold4','hold5','hold6'],
		carry: ['carry1','carry2','carry3','carry4','carry5','carry6'], } }
		
const warriorData = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fr1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fl1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		br1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		bl1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[1]+'/'+color[0]+'/'+piece[1] + '_'+color[0]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		fr: ['fr1','fr2','fr3','fr4','fr5','fr6'],
		fl: ['fl1','fl2','fl3','fl4','fl5','fl6'],
		br: ['br1','br2','br3','br4','br5','br6'],
		bl: ['bl1','bl2','bl3','bl4','bl5','bl6'], } }
const warriorData2 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fr1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fl1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		br1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		bl1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[1]+'/'+color[1]+'/'+piece[1] + '_'+color[1]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		fr: ['fr1','fr2','fr3','fr4','fr5','fr6'],
		fl: ['fl1','fl2','fl3','fl4','fl5','fl6'],
		br: ['br1','br2','br3','br4','br5','br6'],
		bl: ['bl1','bl2','bl3','bl4','bl5','bl6'], } }	
const warriorData3 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fr1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fl1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		br1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		bl1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[1]+'/'+color[2]+'/'+piece[1] + '_'+color[2]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		fr: ['fr1','fr2','fr3','fr4','fr5','fr6'],
		fl: ['fl1','fl2','fl3','fl4','fl5','fl6'],
		br: ['br1','br2','br3','br4','br5','br6'],
		bl: ['bl1','bl2','bl3','bl4','bl5','bl6'], } }	
const warriorData4 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		hit1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		hit6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fr1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fr6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		fl1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		fl6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		br1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		br6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		bl1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		bl6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[1]+'/'+color[3]+'/'+piece[1] + '_'+color[3]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		hit: ['hit1','hit2','hit3','hit4','hit5','hit6'],
		fr: ['fr1','fr2','fr3','fr4','fr5','fr6'],
		fl: ['fl1','fl2','fl3','fl4','fl5','fl6'],
		br: ['br1','br2','br3','br4','br5','br6'],
		bl: ['bl1','bl2','bl3','bl4','bl5','bl6'], } }
 
const archerData = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		over1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		under1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[2]+'/'+color[0]+'/'+piece[2] + '_'+color[0]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		over: ['over1','over2','over3','over4','over5','over6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		under: ['under1','under2','under3','under4','under5','under6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }	
const archerData2 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		over1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		under1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[2]+'/'+color[1]+'/'+piece[2] + '_'+color[1]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		over: ['over1','over2','over3','over4','over5','over6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		under: ['under1','under2','under3','under4','under5','under6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }	
const archerData3 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		over1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		under1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[2]+'/'+color[2]+'/'+piece[2] + '_'+color[2]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		over: ['over1','over2','over3','over4','over5','over6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		under: ['under1','under2','under3','under4','under5','under6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }
const archerData4 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		over1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		over6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		under1: { frame: { x: 0, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under2: { frame: { x: 192, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under3: { frame: { x: 384, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under4: { frame: { x: 576, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under5: { frame: { x: 768, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		under6: { frame: { x: 960, y:960, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:1152, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[0]+'/'+area[0]+'/'+piece[2]+'/'+color[3]+'/'+piece[2] + '_'+color[3]+format, format: 'RGBA8888', size: { w: 1152, h: 1152 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		over: ['over1','over2','over3','over4','over5','over6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		under: ['under1','under2','under3','under4','under5','under6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }

const arrowData = { frames: {
		fly1: { frame: { x: 0, y:0, w:64, h:64 }, sourceSize: { w: 64, h: 64}, spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 } },
	    hit1: { frame: { x: 0, y:64, w:64, h:64 }, sourceSize: { w: 64, h: 64}, spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 } },},
	meta: { image: 'Factions/Knights/Troops/Archer/Arrow/Arrow'+format, format: 'RGBA8888', size: { w: 64, h: 128 }, scale: 1	},
	animations: {
		fly: ['fly1'], 
		hit:['hit1'] } }

const torchData = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand7: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[5]+'/'+color[0]+'/'+piece[5] + '_'+color[0]+format, format: 'RGBA8888', size: { w: 1344, h: 960 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6','stand7'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }	
const torchData2 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand7: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[5]+'/'+color[1]+'/'+piece[5] + '_'+color[1]+format, format: 'RGBA8888', size: { w: 1344, h: 960 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6','stand7'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }	
const torchData3 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand7: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[5]+'/'+color[2]+'/'+piece[5] + '_'+color[2]+format, format: 'RGBA8888', size: { w: 1344, h: 960 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6','stand7'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }	
const torchData4 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand7: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		up1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		up6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		right1: { frame: { x: 0, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right2: { frame: { x: 192, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right3: { frame: { x: 384, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right4: { frame: { x: 576, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right5: { frame: { x: 768, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		right6: { frame: { x: 960, y:576, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		down1: { frame: { x: 0, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down2: { frame: { x: 192, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down3: { frame: { x: 384, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down4: { frame: { x: 576, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down5: { frame: { x: 768, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		down6: { frame: { x: 960, y:768, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[5]+'/'+color[3]+'/'+piece[5] + '_'+color[3]+format, format: 'RGBA8888', size: { w: 1344, h: 960 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6','stand7'],
		walk: ['walk1','walk2','walk3','walk4','walk5','walk6'],
		up: ['up1','up2','up3','up4','up5','up6'],
		right: ['right1','right2','right3','right4','right5','right6'],
		down: ['down1','down2','down3','down4','down5','down6'], } }	

const barrelData = { frames: {
	    hide1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
	    
		open1: { frame: { x: 0, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open2: { frame: { x: 128, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open3: { frame: { x: 256, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open4: { frame: { x: 384, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open5: { frame: { x: 512, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open6: { frame: { x: 640, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		stand1: { frame: { x: 0, y:256, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		close1: { frame: { x: 0, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close2: { frame: { x: 128, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close3: { frame: { x: 256, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close4: { frame: { x: 384, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close5: { frame: { x: 512, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close6: { frame: { x: 640, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		walk1: { frame: { x: 0, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk2: { frame: { x: 128, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk3: { frame: { x: 256, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		ignite1: { frame: { x: 0, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite2: { frame: { x: 128, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite3: { frame: { x: 256, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[3]+'/'+color[0]+'/'+piece[3] + '_'+color[0]+format, format: 'RGBA8888', size: { w: 768, h: 768 }, scale: 1	},
	animations: {
		hide:['hide1'],
		open:['open1','open2','open3','open4','open5','open6'],
		stand:['stand1'],
		close:['close1','close2','close3','close4','close5','close6'],
		walk:['walk1','walk2','walk3'],
		ignite:['ignite1','ignite2','ignite3'], } }
const barrelData2 = { frames: {
	    hide1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
	    
		open1: { frame: { x: 0, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open2: { frame: { x: 128, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open3: { frame: { x: 256, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open4: { frame: { x: 384, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open5: { frame: { x: 512, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open6: { frame: { x: 640, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		stand1: { frame: { x: 0, y:256, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		close1: { frame: { x: 0, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close2: { frame: { x: 128, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close3: { frame: { x: 256, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close4: { frame: { x: 384, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close5: { frame: { x: 512, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close6: { frame: { x: 640, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		walk1: { frame: { x: 0, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk2: { frame: { x: 128, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk3: { frame: { x: 256, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		ignite1: { frame: { x: 0, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite2: { frame: { x: 128, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite3: { frame: { x: 256, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[3]+'/'+color[1]+'/'+piece[3] + '_'+color[1]+format, format: 'RGBA8888', size: { w: 768, h: 768 }, scale: 1	},
	animations: {
		hide:['hide1'],
		open:['open1','open2','open3','open4','open5','open6'],
		stand:['stand1'],
		close:['close1','close2','close3','close4','close5','close6'],
		walk:['walk1','walk2','walk3'],
		ignite:['ignite1','ignite2','ignite3'], } }
const barrelData3 = { frames: {
	    hide1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
	    
		open1: { frame: { x: 0, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open2: { frame: { x: 128, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open3: { frame: { x: 256, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open4: { frame: { x: 384, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open5: { frame: { x: 512, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open6: { frame: { x: 640, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		stand1: { frame: { x: 0, y:256, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		close1: { frame: { x: 0, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close2: { frame: { x: 128, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close3: { frame: { x: 256, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close4: { frame: { x: 384, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close5: { frame: { x: 512, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close6: { frame: { x: 640, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		walk1: { frame: { x: 0, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk2: { frame: { x: 128, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk3: { frame: { x: 256, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		ignite1: { frame: { x: 0, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite2: { frame: { x: 128, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite3: { frame: { x: 256, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[3]+'/'+color[2]+'/'+piece[3] + '_'+color[2]+format, format: 'RGBA8888', size: { w: 768, h: 768 }, scale: 1	},
	animations: {
		hide:['hide1'],
		open:['open1','open2','open3','open4','open5','open6'],
		stand:['stand1'],
		close:['close1','close2','close3','close4','close5','close6'],
		walk:['walk1','walk2','walk3'],
		ignite:['ignite1','ignite2','ignite3'], } }
const barrelData4 = { frames: {
	    hide1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
	    
		open1: { frame: { x: 0, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open2: { frame: { x: 128, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open3: { frame: { x: 256, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open4: { frame: { x: 384, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open5: { frame: { x: 512, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		open6: { frame: { x: 640, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		stand1: { frame: { x: 0, y:256, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		close1: { frame: { x: 0, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close2: { frame: { x: 128, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close3: { frame: { x: 256, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close4: { frame: { x: 384, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close5: { frame: { x: 512, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		close6: { frame: { x: 640, y:384, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		walk1: { frame: { x: 0, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk2: { frame: { x: 128, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		walk3: { frame: { x: 256, y:512, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		
		ignite1: { frame: { x: 0, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite2: { frame: { x: 128, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		ignite3: { frame: { x: 256, y:640, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[3]+'/'+color[3]+'/'+piece[3] + '_'+color[3]+format, format: 'RGBA8888', size: { w: 768, h: 768 }, scale: 1	},
	animations: {
		hide:['hide1'],
		open:['open1','open2','open3','open4','open5','open6'],
		stand:['stand1'],
		close:['close1','close2','close3','close4','close5','close6'],
		walk:['walk1','walk2','walk3'],
		ignite:['ignite1','ignite2','ignite3'], } }

const TNTData = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		throw1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw7: { frame: { x: 1152, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[4]+'/'+color[0]+'/'+piece[4] + '_'+color[0]+format, format: 'RGBA8888', size: { w: 1344, h: 576 }, scale: 1	},
	animations: {
		stand:['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk:['walk1','walk2','walk3','walk4','walk5','walk6'],
		throe:['throw1','throw2','throw3','throw4','throw5','throw6','throw7'] } }
const TNTData2 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		throw1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw7: { frame: { x: 1152, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[4]+'/'+color[1]+'/'+piece[4] + '_'+color[1]+format, format: 'RGBA8888', size: { w: 1344, h: 576 }, scale: 1	},
	animations: {
		stand:['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk:['walk1','walk2','walk3','walk4','walk5','walk6'],
		throe:['throw1','throw2','throw3','throw4','throw5','throw6','throw7'] } }
const TNTData3 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		throw1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw7: { frame: { x: 1152, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[4]+'/'+color[2]+'/'+piece[4] + '_'+color[2]+format, format: 'RGBA8888', size: { w: 1344, h: 576 }, scale: 1	},
	animations: {
		stand:['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk:['walk1','walk2','walk3','walk4','walk5','walk6'],
		throe:['throw1','throw2','throw3','throw4','throw5','throw6','throw7'] } }
const TNTData4 = { frames: {
		stand1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		stand6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		walk1: { frame: { x: 0, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk2: { frame: { x: 192, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk3: { frame: { x: 384, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk4: { frame: { x: 576, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk5: { frame: { x: 768, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		walk6: { frame: { x: 960, y:192, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		
		throw1: { frame: { x: 0, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw2: { frame: { x: 192, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw3: { frame: { x: 384, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw4: { frame: { x: 576, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw5: { frame: { x: 768, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw6: { frame: { x: 960, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		throw7: { frame: { x: 1152, y:384, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: section[0]+'/'+faction[1]+'/'+area[0]+'/'+piece[4]+'/'+color[3]+'/'+piece[4] + '_'+color[3]+format, format: 'RGBA8888', size: { w: 1344, h: 576 }, scale: 1	},
	animations: {
		stand:['stand1','stand2','stand3','stand4','stand5','stand6'],
		walk:['walk1','walk2','walk3','walk4','walk5','walk6'],
		throe:['throw1','throw2','throw3','throw4','throw5','throw6','throw7'] } }

const deadData = { frames: {
		dead1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead2: { frame: { x: 128, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead3: { frame: { x: 256, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead4: { frame: { x: 384, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead5: { frame: { x: 512, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead6: { frame: { x: 640, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead7: { frame: { x: 768, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead8: { frame: { x: 0, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead9: { frame: { x: 128, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead10: { frame: { x: 256, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead11: { frame: { x: 384, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead12: { frame: { x: 512, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead13: { frame: { x: 640, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		dead14: { frame: { x: 768, y:128, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },  },
	meta: { image: 'Factions/Knights/Troops/Dead/Dead'+format, format: 'RGBA8888', size: { w: 896, h: 256 }, scale: 1	},
	animations: {
		dead: ['dead1','dead2','dead3','dead4','dead5','dead6','dead7','dead8','dead9','dead10','dead11','dead12','dead13','dead14',], } }

const goldData = { frames: {
		move1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move2: { frame: { x: 128, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move3: { frame: { x: 256, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move4: { frame: { x: 384, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move5: { frame: { x: 512, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move6: { frame: { x: 640, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move7: { frame: { x: 768, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: section[2]+'/Resources/'+res[0] + '_Spawn'+format, format: 'RGBA8888', size: { w: 896, h: 128 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7'], } }
const meatData = { frames: {
		move1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move2: { frame: { x: 128, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move3: { frame: { x: 256, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move4: { frame: { x: 384, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move5: { frame: { x: 512, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move6: { frame: { x: 640, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move7: { frame: { x: 768, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: section[2]+'/Resources/'+res[1] + '_Spawn'+format, format: 'RGBA8888', size: { w: 896, h: 128 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7'], } }
const woodData = { frames: {
		move1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move2: { frame: { x: 128, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move3: { frame: { x: 256, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move4: { frame: { x: 384, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move5: { frame: { x: 512, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move6: { frame: { x: 640, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		move7: { frame: { x: 768, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: section[2]+'/Resources/'+res[2] + '_Spawn'+format, format: 'RGBA8888', size: { w: 896, h: 128 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7'], } }

const foamData = { frames: {
		move1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move7: { frame: { x: 1152, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move8: { frame: { x: 1344, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Terrain/Water/Foam/Foam'+format, format: 'RGBA8888', size: { w: 1536, h: 192 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7','move8'], } }

const rockData = { frames: {
		move1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move7: { frame: { x: 1152, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move8: { frame: { x: 1344, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Terrain/Water/Rocks/Rocks_01'+format, format: 'RGBA8888', size: { w: 1536, h: 192 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7','move8'], } }
const rockData2 = { frames: {
		move1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move7: { frame: { x: 1152, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move8: { frame: { x: 1344, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Terrain/Water/Rocks/Rocks_02'+format, format: 'RGBA8888', size: { w: 1536, h: 192 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7','move8'], } }
const rockData3 = { frames: {
		move1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move7: { frame: { x: 1152, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move8: { frame: { x: 1344, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Terrain/Water/Rocks/Rocks_03'+format, format: 'RGBA8888', size: { w: 1536, h: 192 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7','move8'], } }
const rockData4 = { frames: {
		move1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move7: { frame: { x: 1152, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		move8: { frame: { x: 1344, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Terrain/Water/Rocks/Rocks_4'+format, format: 'RGBA8888', size: { w: 1536, h: 192 }, scale: 1	},
	animations: {
		move: ['move1','move2','move3','move4','move5','move6','move7','move8'], } }
		
const treeData = { frames: {
	    stand1: { frame: { x: 0, y:0, w:144, h:144 }, sourceSize: { w: 144, h: 144}, spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 } },
		stand2: { frame: { x: 144, y:0, w:144, h:144 }, sourceSize: { w: 144, h: 144}, spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 } },
		stand3: { frame: { x: 288, y:0, w:144, h:144 }, sourceSize: { w: 144, h: 144}, spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 } },
		stand4: { frame: { x: 332, y:0, w:144, h:144 }, sourceSize: { w: 144, h: 144}, spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 } },
		
		move1: { frame: { x: 0, y:0, w:144, h:144 }, sourceSize: { w: 144, h: 144}, spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 } },
		move2: { frame: { x: 144, y:0, w:144, h:144 }, sourceSize: { w: 144, h: 144}, spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 } },
		
		stump1: { frame: { x: 0, y:0, w:144, h:144 }, sourceSize: { w: 144, h: 144}, spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 } }, },
	meta: { image: 'Resources/Trees/Tree'+format, format: 'RGBA8888', size: { w: 768, h: 576 }, scale: 1	},
	animations: {
		stand: ['stand1','stand2','stand3','stand4'], 
		move: ['move1','move2'], 
		stump: ['stump1'], } }

const sheepData = { frames: {
	    bounce1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
	    bounce2: { frame: { x: 128, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
	    bounce3: { frame: { x: 256, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
	    bounce4: { frame: { x: 384, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
	    bounce5: { frame: { x: 512, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
	    bounce6: { frame: { x: 649, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		
		stand1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		stand2: { frame: { x: 128, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		stand3: { frame: { x: 256, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		stand4: { frame: { x: 384, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		stand5: { frame: { x: 512, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		stand6: { frame: { x: 640, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		stand7: { frame: { x: 768, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },
		stand8: { frame: { x: 896, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128} },  },
	meta: { image: 'Resources/Sheep/HappySheep_All'+format, format: 'RGBA8888', size: { w: 1024, h: 256 }, scale: 1	},
	animations: {
		bounce: ['bounce1','bounce2','bounce3','bounce4','bounce5','bounce6'], 
		stand: ['stand1','stand2','stand3','stand4','stand5','stand6','stand7','stand8'],  } }
		
const explodeData = { frames: {
		explode1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode5: { frame: { x: 768, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode6: { frame: { x: 960, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode7: { frame: { x: 1152, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode8: { frame: { x: 1344, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		explode9: { frame: { x: 1536, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Effects/Explosion/Explosions'+format, format: 'RGBA8888', size: { w: 1728, h: 192 }, scale: 1	},
	animations: {
		move: ['explode1','explode2','explode3','explode4','explode5','explode6','explode7','explode8','explode9'], } }
const fireData = { frames: {
		fire1: { frame: { x: 0, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		fire2: { frame: { x: 128, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		fire3: { frame: { x: 256, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		fire4: { frame: { x: 384, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		fire5: { frame: { x: 512, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		fire6: { frame: { x: 640, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } },
		fire7: { frame: { x: 768, y:0, w:128, h:128 }, sourceSize: { w: 128, h: 128}, spriteSourceSize: { x: 0, y: 0, w: 128, h: 128 } }, },
	meta: { image: 'Effects/Fire/Fire'+format, format: 'RGBA8888', size: { w: 896, h: 128 }, scale: 1	},
	animations: {
		move: ['fire1','fire1','fire3','fire4','fire5','fire6','fire7'], } }

const towerData = { frames: {
		shake1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Factions/Goblins/Buildings/Wood_Tower/Wood_Tower_'+color[0]+format, format: 'RGBA8888', size: { w: 1024, h: 192 }, scale: 1	},
	animations: {
		shake: ['shake1','shake2','shake3','shake4'], } }
const towerData2 = { frames: {
		shake1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Factions/Goblins/Buildings/Wood_Tower/Wood_Tower_'+color[1]+format, format: 'RGBA8888', size: { w: 1024, h: 192 }, scale: 1	},
	animations: {
		shake: ['shake1','shake2','shake3','shake4'], } }	
const towerData3 = { frames: {
		shake1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Factions/Goblins/Buildings/Wood_Tower/Wood_Tower_'+color[2]+format, format: 'RGBA8888', size: { w: 1024, h: 192 }, scale: 1	},
	animations: {
		shake: ['shake1','shake2','shake3','shake4'], } }
const towerData4 = { frames: {
		shake1: { frame: { x: 0, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake2: { frame: { x: 192, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake3: { frame: { x: 384, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } },
		shake4: { frame: { x: 576, y:0, w:192, h:192 }, sourceSize: { w: 192, h: 192}, spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 } }, },
	meta: { image: 'Factions/Goblins/Buildings/Wood_Tower/Wood_Tower_'+color[3]+format, format: 'RGBA8888', size: { w: 1024, h: 192 }, scale: 1	},
	animations: {
		shake: ['shake1','shake2','shake3','shake4'], } }
