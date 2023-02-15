import Bullet from "./src/Bullet";
import Button from "./src/Button";
import Enemy from "./src/Enemy";
import Player from "./src/Player";


const app = new PIXI.Application({
  width:640,
  height:1136,
  antialias: true, 
  transparent: false, 
  resolution: 1
});
let fns,score=0,highScore=0,highScoreText,newScore,overText,changeYTicker;
let NoOfAlien = 6,bottomOffeset = 5;
let player,alians,bullets,state,aliensCount =0,bulletCount =0,NoOfBullets = 4,start,gameScene ,gameOver;
let Cotainer = {x: 28, y: 10, width: 640 ,height:1136}

document.body.appendChild(app.view);
PIXI.Loader.shared
  .add([
    "res/alian_0.png",
    "res/alian_1.png",
    "res/alian_2.png",
    "res/alian_3.png",
    "res/bullet.png",
    "res/player.png",
    "res/restart.png",
    "res/start.png"
  ]).load(onComplete);
  function onComplete()
  {




    start = new PIXI.Container();
    let playBtn = new Button(PIXI.Loader.shared.resources["res/start.png"].texture);
    playBtn.addTouchListener(setup.bind(this));
    start.addChild(playBtn);
    playBtn.position.x = Cotainer.width/2-32;
    playBtn.position.y = Cotainer.height/2;
    let style = new PIXI.TextStyle({
      fontFamily: "Futura",
      fontSize: 20,
      fill: "white"
    });
    score=0;
    let scores = new PIXI.Text("HIGH SCORE : "+highScore,style);
    scores.position.x = Cotainer.width/2-32;
    scores.position.y =Cotainer.height/2-100;
    start.addChild(scores)
    app.stage.addChild(start);
    //setup();
 
  }
  function setup()
  {
    gameOver = new PIXI.Container();
    gameScene = new PIXI.Container();
    start.visible = false;
    player = new Player(PIXI.Loader.shared.resources["res/player.png"].texture);
    alians =[];
    let 
    spacing = 50,
    yOffset = 80,
    speed = 2,
    direction = 1;
    for(let i = 0; i< NoOfAlien;i++)
    {
     
      
      alians.push((new Enemy(PIXI.Loader.shared.resources["res/alian_"+randomInt(0,3)+".png"].texture)));
      const y = spacing * i + yOffset;

      const x = randomInt(0, 640 - alians[alians.length-1].width);
      alians[alians.length-1].position.x= x;
      alians[alians.length-1].position.y=y;
      alians[alians.length-1].vx = speed*direction;
      direction*=-1;
      gameScene.addChild(alians[alians.length-1]);
      aliensCount++;
    }
 
    bullets =[];
    for(let i = 0; i< NoOfBullets;i++)
    {
      
      bullets.push(new Bullet(PIXI.Loader.shared.resources["res/bullet.png"].texture))
      gameScene.addChild(bullets[bullets.length-1]);
    }
    gameScene.addChild(player);
    const left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40),
      space = keyboard(32);

      left.press = function() {

        //Change the player's velocity when the key is pressed
        player.vx = -player.getSpeed();
        player.vy = 0;
      };
    
      //Left arrow key `release` method
      left.release = function() {
    
        //If the left arrow has been released, and the right arrow isn't down,
        //and the player isn't moving vertically:
        //Stop the player
        if (!right.isDown && player.vy === 0) {
          player.vx = 0;
        }
      };
    
      //Up
      up.press = function() {
        player.vy = -player.getSpeed();;
        player.vx = 0;
      };
      up.release = function() {
        if (!down.isDown && player.vx === 0) {
          player.vy = 0;
        }
      };
    
      //Right
      right.press = function() {
        player.vx = player.getSpeed();;
        player.vy = 0;
      };
      right.release = function() {
        if (!left.isDown && player.vy === 0) {
          player.vx = 0;
        }
      };
    
      //Down
      down.press = function() {
        player.vy = player.getSpeed();;
        player.vx = 0;
      };
      down.release = function() {
        if (!up.isDown && player.vx === 0) {
          player.vy = 0;
        }
      };
      space.press = function()
      {
        if(bulletCount == NoOfBullets-1)
        {
          return;
        }
        bullets[bulletCount].enableBullet();
        bullets[bulletCount].setPosition(player.position.x+17,player.position.y) ;
        bulletCount++;
      }

      //setting gameover
      gameOver.visible = false;

      //Create the text sprite and add it to the `gameOver` scene
      let style = new PIXI.TextStyle({
        fontFamily: "Futura",
        fontSize: 20,
        fill: "white"
      });
      highScoreText = new PIXI.Text("",style);
      highScoreText.text = "Score : "+score;
      highScoreText.position.y =0;
      style.fontSize = 10;
      let message = new PIXI.Text("The End!", style);
      message.position.x =  Cotainer.width / 2-50 ;
      message.position.y = Cotainer.height / 2 ;
      gameScene.addChild(highScoreText);
      gameOver.addChild(message);
      overText= new PIXI.Text("New HighScore !!!",style);
      
      overText.position.x =  Cotainer.width / 2-100 ;
      overText.position.y = Cotainer.height / 2+50 ;
      overText.visible = false;
      gameOver.addChild(overText);
      style.fontSize = 50;


      let playBtn = new Button(PIXI.Loader.shared.resources["res/restart.png"].texture);
      playBtn.addTouchListener(restart.bind(this));
      gameOver.addChild(playBtn);
      playBtn.position.x = Cotainer.width/2;
      playBtn.position.y = Cotainer.height/2-200;

      newScore =  new PIXI.Text(" ", style);
      newScore.position.x =  Cotainer.width / 2 ;
      newScore.position.y = Cotainer.height / 2-75 ;
      gameOver.addChild(newScore);


      state = play;
      app.ticker.start();
      fns = (delta) => gameLoop(delta);
    app.ticker.add(fns);
    setInterval(changeY.bind(this),10000);
    app.stage.addChild(gameOver);
    app.stage.addChild(gameScene);
  }
  
  function gameLoop(delta) {

    state(delta);
  }
  function changeY()
  {
    if(NoOfAlien > aliensCount)
    {
      spawnUFO();
    }
    for(let i in alians)
    {
      if(alians[i].getisActive())
      { 
          alians[i].position.y+=bottomOffeset;  
      }
    } 
  }
  //playloop
  function play(delta) {

    console.log(delta);
  
    player.x += player.vx;
    player.y += player.vy;
    //bullet functions starts
    for(let i in bullets)
    {
      if(bullets[i].isActive)
      {
        
        bullets[i].position.y -=bullets[i].speed;  
        if(contain(bullets[i],Cotainer) == "top")
        {
          bullets[i].disableBullet();
          let old = bullets[i];
          bullets.splice(i,1);
          bullets.push(old);
          bulletCount--;
        }
      }
    }
    for(let i in alians)
    {
      if(alians[i].getisActive())
      { 
        alians[i].position.x +=alians[i].vx;  
       
        let hitstatus = contain(alians[i],Cotainer);
        if(hitstatus == "left"||hitstatus == "right")
        {
          alians[i].vx *=-1 ;
        }
      }
    }
   
    //bullet function ends
    //collision detection bullet and ufo

    for(let i in alians)
    {
      if(alians[i].getisActive())
      {
        for (let j in bullets)
        {
          if(bullets[j].isActive)
          {
            
            if(hitTestRectangle(bullets[j],alians[i]))
            {  
              score+=10;
              highScoreText.text = "Score : "+score;
              alians[i].life-=bullets[j].damage;
              if(alians[i].life<=0)
              {
                score+=20;
                highScoreText.text = "Score : "+score;
                let oldUfo = alians[i];
                oldUfo.setisActive(false); 
                alians.splice(i,1);
                alians.push(oldUfo);
                aliensCount--;
  
              }
              

              let oldBullet = bullets[j];
              oldBullet.disableBullet();
              bullets.splice(j,1);
              bullets.push(oldBullet);
              bulletCount--;
  
            }
          }
        }
        if(hitTestRectangle(player,alians[i]))
        {
          if(highScore<score)
          {
            highScore = score;
            newScore.position.x-=50;
            newScore.text = "Score is "+score;
            overText.visible = true;
          }
          app.ticker.remove(fns);
          GameOver();
        }
      }
    

    }
  contain(player,Cotainer);
  }
  function GameOver()
  {
    for(let i in bullets)
    {
      bullets[i].reset()
    }
    for(let i in alians)
    {
      alians[i].reset() ;
    }
    player.reset();

    gameScene.visible = false;
    gameScene.destroy();
    gameOver.visible = true;
    
    console.log("gameover");
  }
  function restart()
  {
    gameOver.destroy();
    gameOver.visible = false;
    onComplete();
  }
  function spawnUFO()
  {
    alians[aliensCount].setisActive(true);
    alians[aliensCount].setTexture(PIXI.Loader.shared.resources["res/alian_"+randomInt(0,3)+".png"].texture);
    alians[aliensCount].position.y = randomInt(20,50);
    alians[aliensCount].position.x = randomInt(20,400);
    alians[aliensCount].life = 100;
    
    aliensCount++;
  }
  function contain(sprite, container) {

    let collision = undefined;
  
    if (sprite.x < container.x) {
      sprite.x = container.x;
      collision = "left";
    }
  
    if (sprite.y < container.y) {
      sprite.y = container.y;
      collision = "top";
    }
  
    if (sprite.x + sprite.width > container.width) {
      sprite.x = container.width - sprite.width;
      collision = "right";
    }
  
    if (sprite.y + sprite.height > container.height) {
      sprite.y = container.height - sprite.height;
      collision = "bottom";
    }
  
    return collision;
  }
  
  function hitTestRectangle(r1, r2) {
  
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    hit = false;
  
    r1.centerX = r1.x + r1.width / 2; 
    r1.centerY = r1.y + r1.height / 2; 
    r2.centerX = r2.x + r2.width / 2; 
    r2.centerY = r2.y + r2.height / 2; 
  
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    if (Math.abs(vx) < combinedHalfWidths) {
  
      if (Math.abs(vy) < combinedHalfHeights) {
  
        hit = true;
      } else {
  
        hit = false;
      }
    } else {
  
      hit = false;
    }
  
    return hit;
  };
  
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function keyboard(keyCode) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
  }


