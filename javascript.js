const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');



ctx.fillRect(50,400,200,50)

const gravity = 1

class Player {
    constructor({x,y,width,height,color,velocity}){
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity= velocity;
        this.x = x;
        this.y = y;
    }

    moveLeft(){
        this.velocity.x = -1
        // if (this.velocity.x >= -5){
        // //  this.velocity.x -= 4 / 40 * 100;}
    }

    moveRight(){
        this.velocity.x = 1
        // if (this.velocity.x <= 5){
        //     this.velocity.x += 4 / 40 * 100;
        }
    // }
    stopX(){
        this.velocity.x = 0 / 40 * 100;
    }
    stopY(){
        this.velocity.y = 0 / 40 * 100;
    }
    jump(){
        if (this.velocity.y  =-19);
            // this.velocity.y -= 7 / 40 * 100;  
        // }
    

    }

    
    drawPlayer(){
        
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

update(){

    this.x += this.velocity.x
    
    this.y += this.velocity.y

// floor border
    if (this.y + this.height + this.velocity.y >= canvas.height ){
        this.velocity.y = 0
     } else {this.velocity.y += gravity}
   this.drawPlayer()

//    if  (this.y + this.height + this.velocity.y >= )


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
if (this.x >= canvas.width - this.width){
    this.velocity.x = -1
    this.x = canvas.width - this.width - 1
  
}



}

}

class Islands extends Player {
    drawIslands(){
        ctx.fillStyle= 'black'
        ctx.fillRect(this.x,this.y,this.width,this.height);

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


let newIsland = new Islands({
    x: 100,
    y:420,
    width:250,
    height: 25,
    color: 'black',
   
});

let newIsland2 = new Islands({
    x: 500,
    y:300,
    width:250,
    height: 25,
    color: 'black',
   
})

let newIsland3 = new Islands({
    x: 75,
    y:200,
    width:250,
    height: 25,
    color: 'black',
   
})


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
            keys.Space.pressed = false
            break
    }
})

function animate(){
    
    window.requestAnimationFrame(animate) 
    ctx.fillStyle = "white"
    ctx.fillRect (0,0,canvas.width,canvas.height)
    newIsland.drawIslands() 
    newIsland2.drawIslands()
    newIsland3.drawIslands()
    newPlayer.update()


    newPlayer.velocity.x = 0


    if (keys.ArrowLeft.pressed){
        newPlayer.velocity.x = -8
    }
    else if (keys.ArrowRight.pressed){
        newPlayer.velocity.x = 8




    }
    }

animate()








// let frames = 0

// const animationLoop = () => {

//     frames++


// ctx.clearRect(0,0,canvas.width,canvas.height);


// newPlayer.drawPlayer();


// }

// setInterval(animationLoop, 16)








