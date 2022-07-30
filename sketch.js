//add variables here// 
var plane_img, plane,bullet_img, bullet, background_img, background_sprite, bullet_group, coin_img, coin, coin_group
var obstacle_img, obstacles, obstacles_group, liner
 gameState= "PLAY"
 var coin_score = 0, lives = 3










//load Images/Media here//
function preload(){
plane_img = loadImage('fighterPlane.png')
bullet_img = loadImage('bullet_img.png')
background_img = loadImage('background_img.webp')
coin_img = loadImage('coin.jpeg')
obstacle_img = loadImage('obstacle.png')

}

//add enviroment properties here// 
function setup(){
createCanvas(1000,700)

plane = createSprite(500,600)
plane.addImage(plane_img)
plane.scale = 0.5

background_sprite = createSprite(500,250,1000,500)
background_sprite.addImage(background_img)
background_sprite.scale = 2.15

 var block1 = createSprite(87,45,140,30)
liner = createSprite(900,700,2000,40)


bullet_group = new Group()
coin_group = new Group()
obstacles_group = new Group()



}

function createObstacles(){
      if(frameCount % 50 ==0){
            obstacles = createSprite(random(10,900),0)
           obstacles.addImage(obstacle_img)
            obstacles.scale = 0.1
           obstacles.velocityY = ((6 + 3*coin_score/100))
             obstacles_group.add(obstacles)
      
            }
}

function createCoins(){
      if(frameCount % 200 ==0){
      coin = createSprite(random(10,900),0)
      coin.addImage(coin_img)
      coin.scale = 0.1
      coin.velocityY = 10
       coin_group.add(coin)

      }
}


function createBullets(){
      bullet = createSprite(500,600)
      bullet.addImage(bullet_img)
      bullet.scale = 0.1
      bullet.velocityY = -10
      bullet.x = plane.x
      bullet_group.add(bullet)
}



function plane_properties(){
      if(keyDown('RIGHT')){
plane.x = plane.x +10
      }
 if(keyDown('LEFT')){
plane.x = plane.x-10
 }
 if(keyDown('SPACE')){
      createBullets()
}
 }



function gameOver(){
      swal({
            title: `Game Over!`,
            text: `Better Luck Next Time ${"\n"} Your Coin Count: ${coin_score}`,
            confirmButtonText : "Play Again"
      },
            function(isConfirm){
                  if(isConfirm){
             location.reload()
                  }
            }

           
      )
}

function congrats(){
      swal({
            title: `Yay! You Did It:) ${'\n'} You Collected 50 Coins`,
            text: ` Your Coin Count: ${coin_score}`,
            confirmButtonText : "Play Again"
      },
            function(isConfirm){
                  if(isConfirm){
             location.reload()
                  }
            }

           
      )
}

// function draw//
function draw(){
 background('#34165c')

drawSprites()

textSize(20)
fill('black')
text("Coin Score: "+ coin_score,30,50)
textSize(20)
fill('black')
text("Lives:  "+ lives,30,80)


if(gameState === "PLAY"){
createCoins()
plane_properties()
createObstacles()

plane.overlap(coin_group, function(collector, collected) {
      coin_score = coin_score+10
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
})
plane.overlap(obstacles_group, function(collector, collected) {
      lives = lives-1
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
})
bullet_group.overlap(obstacles_group, function(collector, collected) {
      
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
})
 if(lives == 0 ){
gameState = "END"
 }
if(obstacles_group.isTouching(liner)){
      gameState = "END"
}




}

if(coin_score === 50){
 congrats()
}
else if(gameState === "END"){
   gameOver()
}
}


