const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const timerDiv = document.querySelector('#timer')

const playerImg = new Image()
playerImg.src = './images/AllCharacters/Golem/noBKG_GolemIdle_strip.png'

ctx.fillRect(50,400,200,50)

const gravity = 1

class Background {
    constructor(x,y,sx,sy,swidth,sheight,width,height,imageSrc){
        this.x = x;
        this.y = y;
        this.hitX = this.x + 50;
        this.hitY = this.y + 30;
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.w = width
        this.h = height
        this.hitW = this.w - 100;
        this.hitH = this.h - 50;
        this.img = new Image()
        this.img.src = imageSrc;

    }

    draw(){
        
        ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y, this.w, this.h)
     
    }
}

class Enemy {
    constructor(x,y,width,height,imageSrc){
        this.x = -70
        this.y = y
        this.h = 120
        this.w = 120
        this.sx = 0
        this.sy = 0
        this.swidth = 45
        this.sheight = 50
        this.frame = 0
        this.img = new Image()
        this.img.src = imageSrc;
        this.velocity= {
            x:0,
            y:0
        };
    }

    moveRight(){
        this.velocity.x = 5
    }

    draw(){

ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y, this.w, this.h)
    
    }

    collisionDetectionEnemies(player1){
        if (this.x < player1.x + player1.w &&
            this.x + this.w > player1.x &&
            this.y < player1.y + player1.h &&
            this.y + this.h > player1.y) {
        return true
         }
        else {
            return false
          }
        }

    update(){

        this.x += this.velocity.x
        
        this.y += this.velocity.y
    
    // floor border
        if (this.y + this.h + this.velocity.y >= canvas.height ){
            this.velocity.y = 0
        }
    
    //    Ceiling border!
    if (this.y <= 0){
            this.velocity.y = 1
            this.y = 1
    }
    
    this.draw()
    
    }
}



let backgroundImg = new Background(0,0,0,0,928,735,canvas.width, canvas.height,"./images/Free-Pixel-Art-Forest/Preview/Background.png")




class Player {
    constructor({x,y,width,height,color,velocity}){
        this.w = width;
        this.h = height;
        this.color = color;
        this.velocity= velocity;
        this.x = x;
        this.y = y;
        this.hasJumped = 0;
    }

    moveLeft(){
        this.velocity.x = -1
    }

    moveRight(){
        this.velocity.x = 1
        }
    stopX(){
        this.velocity.x = 0 / 40 * 100;
    }
    stopY(){
        this.velocity.y = 0 / 40 * 100;
    }
    jump(){
        this.hasJumped++
        console.log(this.hasJumped)
        if(this.hasJumped < 3){
            this.velocity.y  = -17; 
        }
        
    }

    collisionDetection(object){
        if (
            this.x < object.hitX + object.hitW &&
            this.x + this.w > object.hitX &&
            this.y + this.velocity.y < object.hitY + object.hitH &&
            this.h + this.y + this.velocity.y > object.hitY
          ) {
            if(this.velocity.y > 0 && this.y + this.h < object.hitY + object.hitY * 0.05){
                this.velocity.y = 0;
                this.y = object.hitY - this.h;
                this.hasJumped = 0;
            }
            return true 
          } else {
            return false
          }
    }

    
    
    drawPlayer(){
        
     
        ctx.drawImage(playerImg,0,0,50,50, this.x, this.y, 70,85)
    }

update(){

    this.x += this.velocity.x
    
    this.y += this.velocity.y

// floor border
    if (this.y + this.h + this.velocity.y >= canvas.height ){
        this.velocity.y = 0
        this.hasJumped = 0
     } else {this.velocity.y += gravity}

//    Ceiling border!
if (this.y <= 0){
        this.velocity.y = 1
        this.y = 1
}
// Left Wall Border
if (this.x <= 0){
    this.velocity.x = 1
    this.x= 0
}
// Right wall border
if (this.x >= canvas.width - this.w){
    this.velocity.x = -1
    this.x = canvas.width - this.w - 1
  
}
this.drawPlayer()

}
}



let newPlayer = new Player({
    x: 400,
    y: 0,
    width: 45,
    height: 85,
    color: 'blue',
    velocity: {
        x:0,
        y:0
    }
});



// let newEnemy = new Enemy (0, 720 * Math.random(), 30, 30, './images/8172279.jpeg');
// let newEnemy = new Enemy ({
//     x: 0,
//     y: 720 * Math.random(),
//     width: 30,
//     height: 30,
//     imageSrc: './images/8172279.jpeg'

// });



// constructor(x,y,sx,sy,swidth,sheight,width,height,imageSrc)

let newIsland = new Background(100,475,400,0,1200,470,300,100,"./images/Mossy-FloatingPlatforms.png")

let newIsland2 = new Background(550,325,400,0,1200,470,300,100,"./images/Mossy-FloatingPlatforms.png")

let newIsland3 = new Background(60,150,400,0,1200,470,300,100,"./images/Mossy-FloatingPlatforms.png")



const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    Space: {
        pressed: false
    }
}



window.addEventListener('keydown', function(event){


    switch(event.code){
        case "ArrowLeft":
            newPlayer.moveLeft();
            keys.ArrowLeft.pressed = true
            break
        case "ArrowRight":
            newPlayer.moveRight();
            keys.ArrowRight.pressed = true
            break
        case "Space":
            newPlayer.jump();
            keys.Space.pressed = true
    }
});


window.addEventListener('keyup',function(event){
    switch(event.code){
        case "ArrowLeft":
            newPlayer.stopX();
            keys.ArrowLeft.pressed = false
            break
        case "ArrowRight":
            newPlayer.stopX();
            keys.ArrowRight.pressed = false
            break
        case "Space":
            newPlayer.stopX();
            break
    }
})

let islandsArr = [newIsland, newIsland2, newIsland3]

let enemyArr = []

let frameCount = 0;
let score = 0;
let spriteFrame = 0

let animationFrameId
function animate(){
    frameCount += .5
    if(frameCount % 30 === 0){
       score++;
       timerDiv.textContent = `Time Survived: ${score}`
    }
    spriteFrame = Math.floor(frameCount % 7.5)
    animationFrameId = window.requestAnimationFrame(animate) 
    ctx.fillStyle = "white"
    ctx.fillRect (0,0,canvas.width,canvas.height)

    

    backgroundImg.draw()

 

    newPlayer.update()




    for(let i = 0; i < islandsArr.length; i++){
        if(newPlayer.collisionDetection(islandsArr[i])){
        }
        islandsArr[i].draw()
    }




    if (frameCount % 30 == 0){
        const newEnemy = new Enemy(0,650 * Math.random(),30,30, './images/Bat/noBKG_BatFlight_strip.png');
        enemyArr.push(newEnemy);
    }

    for (let j = 0; j < enemyArr.length; j++){
if(enemyArr[j].collisionDetectionEnemies(newPlayer)){
    cancelAnimationFrame(animationFrameId)
}
    }

    for (let i = 0; i < enemyArr.length; i++){
        enemyArr[i].frame = frameCount
        enemyArr[i].sx = spriteFrame * 64
        enemyArr[i].moveRight();
        enemyArr[i].update()
        if(enemyArr[i].x > canvas.width + 1){
            enemyArr.splice(i, 1)
            i--
        }
    }

   
    newPlayer.velocity.x = 0


    if (keys.ArrowLeft.pressed){
        newPlayer.velocity.x = -8
    }
    else if (keys.ArrowRight.pressed){
        newPlayer.velocity.x = 8



    }

}


animate()





