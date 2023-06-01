

const app = new PIXI.Application({ backgroundAlpha: 0, antialias: true, width:window.innerWidth, height:240 }); //transparent: true }); { background: '#1099bb' }); 

var priestImage = [];
for (var a = 0;  a <46; a++) { priestImage.push('res/game/sprite/hummer/HummerMan_Stand/HummerMan_Stand_000/HummerMan_Stand_000_000'+a.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}).slice(-2)+'.png'); }
const textureArray = []; for (let i = 0; i < 41; i++) { const texture = PIXI.Texture.from(priestImage[i]); textureArray.push(texture); }
const anim = new PIXI.AnimatedSprite(textureArray);

const pawn = new PIXI.Spritesheet(PIXI.BaseTexture.from(animalData.meta.image), animalData ); pawn.parse(); const anima = new PIXI.AnimatedSprite(pawn.animations.dogar); 
anima.animationSpeed = 0.24666; anima.position.set(anima.position.x + 100, anima.position.y +100); anima.eventMode  = 'static'; // anima.loop = true;
anima.on('pointerdown', (event) => { alert('clicked!'); anima.textures = pawn2.animations.hurt; });

function playGame() { document.body.appendChild(app.view); //document.body.appendChild(renderer.view);
	//const videoResource = new PIXI.VideoResource('res/img/test.mp4'); videoResource.updateFPS = 30; let texture = PIXI.Texture.from(videoResource); let videoSprite = new PIXI.Sprite(texture);

	anim.play(); app.stage.addChild(anim); // anim.stop();
	anima.play(); app.stage.addChild(anima); 
	
	//animx.pointertap = (event) => {alert('clicked!'); animx.texture = pawn2.animations.hurt;
	app.ticker.add((delta) => { anim.x += 0.3 * delta; }); // delta is 1 if running at 100% performance
//requestAnimationFrame(animate); //app.stage.removeChildren();
} 



// const texture = PIXI.utils.TextureCache["res/img/walls.png"]; const img = new PIXI.Sprite(texture); img.width = window.innerWidth; img.height = window.innerHeight; app.stage.addChild(img);
//let texture = PIXI.Texture.fromVideo('res/img/test.mp4');
//let video = document.createElement('video'); video.preload = 'auto'; video.loop = true; video.autoplay = true; video.src = 'res/img/test.mp4';
//let texture = PIXI.Texture.from('res/img/test.mp4'); //var texture = new PIXI.Texture(baseTexture); //const texture = PIXI.Texture.from('res/img/walls.png');
//this.backgroundVideo = videoSprite; this.backgroundVideo.height = h; this.backgroundVideo.width = w; app.stage.addChild(videoSprite);
//const tilingSprite = new PIXI.TilingSprite( texture, app.screen.width, app.screen.height, ); app.stage.addChild(tilingSprite);

//var plane; let count = 0;
//app.ticker.add(() => { count += 0.005; tilingSprite.tileScale.x = 2 + Math.sin(count); tilingSprite.tileScale.y = 2 + Math.cos(count); tilingSprite.tilePosition.x += 1; tilingSprite.tilePosition.y += 1; });
//PIXI.Assets.load('res/img/walls.png').then((texture) => { plane = new PIXI.SimplePlane(texture, 10, 10); plane.x = 100; plane.y = 100; app.stage.addChild(plane); });



//var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: true, resolution: 1}); //{ BackgroundAlpha:0 });
//var stage = new PIXI.Container();

/* document.body.appendChild(app.view);
PIXI.Assets.load('examples/assets/spritesheet/fighter.json').then(() => { const frames = []; for (let i = 0; i < 30; i++) { const val = i < 10 ? `0${i}` : i; frames.push(PIXI.Texture.from(`rollSequence00${val}.png`)); }
const anim = new PIXI.AnimatedSprite(frames); anim.x = app.screen.width / 2; anim.y = app.screen.height / 2; anim.anchor.set(0.5); anim.animationSpeed = 0.5; anim.play();
app.stage.addChild(anim); app.ticker.add(() => { anim.rotation += 0.01; }); });
*/
//function animate() { requestAnimationFrame(animate); renderer.render(stage); }
//const alienImages = [ 'image_sequence_01.png', 'image_sequence_02.png', 'image_sequence_03.png', 'image_sequence_04.png', ];


/* const texture = PIXI.Texture.from('examples/assets/bunny.png');
const bunny2 = new PIXI.Sprite(texture); bunny2.y = 100; app.stage.addChild(bunny2); new TWEEDLE.Tween(bunny2).to({ alpha: 0.0 }, time).repeat(Infinity).yoyo(true).start();
const bunny3 = new PIXI.Sprite(texture); bunny3.y = 200; app.stage.addChild(bunny3); new TWEEDLE.Tween(bunny3).to({ scale: { x: 2.0, y: 2.0 } }, time).repeat(Infinity).yoyo(true).start();
const bunny4 = new PIXI.Sprite(texture); bunny4.y = 350; bunny4.x = 100; bunny4.anchor.set(0.5, 0.5); app.stage.addChild(bunny4); new TWEEDLE.Tween(bunny4).to({ rotation: 2 * Math.PI }, time).repeat(Infinity).yoyo(true).start();

let colorBunny = null; createNewBunny();

function createNewBunny() { if (colorBunny) { app.stage.removeChild(colorBunny); }
    colorBunny = new PIXI.Sprite(texture); colorBunny.y = 500; colorBunny.x = 50; colorBunny.tint = `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
    app.stage.addChild(colorBunny);
    new TWEEDLE.Tween(colorBunny).to({ x: 500 }, time).onComplete(createNewBunny).start(); } */
