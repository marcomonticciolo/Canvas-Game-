const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

class Player {
    constructor(x,y,width,height,color){
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    moveUp(){
        this.y -= 10;
    }

    moveDown(){
        this.y += 10;
    }

    moveLeft(){
        this.x -= 10;
    }

    moveRight(){
        this.x += 10;
    }
    
    drawPlayer(){
        
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height);


    }

}



let newPlayer = new Player(400,0,30,60,"red");


window.addEventListener('keydown', function(event){

    switch(event.code){
        case "ArrowUp":
            newPlayer.moveUp();
            break
        case "ArrowDown":
            newPlayer.moveDown();
            break
        case "ArrowLeft":
            newPlayer.moveLeft();
            break
        case "ArrowRight":
            newPlayer.moveRight();
            break
        

    }

});


let frames = 0

const animationLoop = () => {

    frames++
}


ctx.clearRect(0,0,canvas.width,canvas.height);


Player.drawPlayer();







