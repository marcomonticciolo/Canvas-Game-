const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const timerDiv = document.querySelector('#timer')

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

class enemy {
    constructor(x,y,width,height,imageSrc){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.img = new Image()
        this.img.src = imageSrc;
    }

    draw(){

        ctx.fillStyle = 'red'
        ctx.fillRect(this.x,this.y,this.w,this.h);
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
        
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.w,this.h);
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
    width: 30,
    height: 60,
    color: 'blue',
    velocity: {
        x:0,
        y:0
    }
});



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

const islandsArr = [newIsland, newIsland2, newIsland3]

let frameCount = 0;
let score = 0;

function animate(){
    // frameCount++
    // if(frameCount % 60 === 0){
    //    score++;
    //    timerDiv.textContent = `time ${score}`
    // }
    window.requestAnimationFrame(animate) 
    ctx.fillStyle = "white"
    ctx.fillRect (0,0,canvas.width,canvas.height)
    backgroundImg.draw()
    newPlayer.update()
    for(let i = 0; i < islandsArr.length; i++){
        if(newPlayer.collisionDetection(islandsArr[i])){
            console.log('detected')
        }
        islandsArr[i].draw()
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





