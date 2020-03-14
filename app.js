//creating a robot class in order to encompas all the functions and values that the players will utilize
class robot{
    constructor(name,htmlElement,row,column,upKey,downKey,leftKey,rightKey,screenSide){
        this.name = name;
        this.health = 100;
        this.attackPower = 10;
        this.htmlElement=htmlElement;
        this.row=row;
        this.column=column;
        this.upKey=upKey;
        this.downKey=downKey;
        this.leftKey=leftKey;
        this.rightKey=rightKey;
        this.screenSide=screenSide;
        this.onTheGrid=true;
        this.setUp();
    }

    keyCheck =(code)=>{
        if(this.onTheGrid){
            if(code===this.upKey){
                this.moveUp();
            } else if(code===this.downKey){
                this.moveDown();
            } else if(code===this.leftKey){
                this.moveLeft();
            } else if(code===this.rightKey){
                this.moveRight();
            }
        }
        
    }

    moveDown = () =>{
        this.htmlElement.style.animation=`${this.name}walkDown  1s ease-in-out infinite`;
        if (this.row!=3){
            this.row++;
            this.htmlElement.style.gridRow=this.row;
        }
    }
    moveUp = () =>{
        this.htmlElement.style.animation=`${this.name}walkUp  1s ease-in-out infinite`;
        if (this.row!=1){
            this.row--;
            this.htmlElement.style.gridRow=this.row;
        }
    }
    moveLeft = () =>{
        this.htmlElement.style.animation=`${this.name}walkLeft  1s ease-in-out infinite`;
        if (this.column!=1){
            this.column--;
            this.htmlElement.style.gridColumn=this.column;
        }
    }
    moveRight = () =>{
        this.htmlElement.style.animation=`${this.name}walkRight  1s ease-in-out infinite`;
        if (this.column!=6){
            this.column++;
            this.htmlElement.style.gridColumn=this.column;
        }
    }

    //this method sets up the player
    setUp(){
        this.htmlElement.style.gridColumn=this.column;
        this.htmlElement.style.gridRow=this.row;
        this.htmlElement.style.animation=`${this.name}walkDown 1s ease-in-out infinite`;
    }
    //this method returns the robot's health
    get getHealth(){
        return this.health;
    }
    //method for getting attack power
    get getAttackPower(){
        return this.attackPower;
    }

    get getDownKey(){
        return this.downKey;
    }

    get getUpKey(){
        return this.upKey;
    }

    get getLeftKey(){
        return this.leftKey;
    }

    get getRightKey(){
        return this.rightKey;
    }
    get getRow(){
        return this.row;
    }
    get getCol(){
        return this.column;
    }
    //this function updates the attack power when a robot gets a battery
    getBattery(){
        this.attackPower+=5;
    }
    //this function removes the battery from the robot
    removeBattery(){
        this.attackPower-=5;
    }
    //this function handles damaging the robot
    takeDamage(damage){
        this.health-=damage;
        if(this.health<=0){
            console.log(`${this.name} has lost`);
        } else{
            console.log(`${this.name} has taken damage`);
        }
    }
}

let player1;
//this function starts the game
const startGame = () =>{
    // let player1 = new robot("player1",document.getElementById("player1"),1,1);
    // console.log(player1.getHealth +" "+ player1.getAttackPower);
    // player1.takeDamage(50);
    // player1.takeDamage(50);
    // player1.getBattery();
    // console.log(player1.getAttackPower);
    // player1.removeBattery();
    // console.log(player1.getAttackPower);
    player1 = new robot("P1",document.getElementById("player1"),1,1,"ArrowUp","ArrowDown","ArrowLeft","ArrowRight");

}
startGame();
//insert these 3 and 4 keyboard keys into the class later
// let player1 = document.getElementById("player1");
// let player1col=1;
// let player1row=1;
// player1.style.gridColumn=player1col;
// player1.style.gridRow=player1row;
// player1.style.animation="walkRight 1s ease-in-out infinite";

// const moveDown = (player) =>{
//     player.style.animation="walkDown  1s ease-in-out infinite";
//     if (player1row!=3){
//         player1row++;
//         player.style.gridRow=player1row;
//     }
// }
// const moveUp = (player) =>{
//     player.style.animation="walkUp  1s ease-in-out infinite";
//     if (player1row!=1){
//         player1row--;
//         player.style.gridRow=player1row;
//     }
// }
// const moveLeft = (player) =>{
//     player.style.animation="walkLeft  1s ease-in-out infinite";
//     if (player1col!=1){
//         player1col--;
//         player.style.gridColumn=player1col;
//     }
// }
// const moveRight = (player) =>{
//     player.style.animation="walkRight  1s ease-in-out infinite";
//     if (player1col!=6){
//         player1col++;
//         player.style.gridColumn=player1col;
//     }
// }
let player2 = new robot("P2",document.getElementById("player2"),3,6,"KeyW","KeyS","KeyA","KeyD");
    
// function moveCheck(code,playerObj){
//     if(code===playerObj.getUpKey){
//         playerObj.moveUp();
//     } else if(code===playerObj.getDownKey){
//         playerObj.moveDown();
//     } else if(code===playerObj.getLeftKey){
//         playerObj.moveLeft();
//     } else if(code===playerObj.getRightKey){
//         playerObj.moveRight();
//     }
// }

const collisionCheck=(obj1row,obj1col,obj2row,obj2col)=>{
    if(obj1row===obj2row&&obj1col===obj2col){
        return true;
    } else {
        return false;
    }
}

document.addEventListener('keydown', logKey);

function logKey(e) {
    console.log(`${e.code}`);
    player1.keyCheck(e.code);
    if(collisionCheck(player1.getRow,player1.getCol,player2.getRow,player2.getCol)){
        console.log("robot collision!");
        document.getElementById("battleScreen").style.display="block";
        document.getElementById("battleScreen").style.animation=`blowUpModal .5s  forwards`;
    }
    player2.keyCheck(e.code);
    if(collisionCheck(player1.getRow,player1.getCol,player2.getRow,player2.getCol)){
        console.log("robot collision!");
        document.getElementById("battleScreen").style.display="block";
        document.getElementById("battleScreen").style.animation=`blowUpModal .5s  forwards`;
    }
    // if(e.code==="ArrowUp"){
    //     moveUp(player1);
    // } else if(e.code==="ArrowDown"){
    //     moveDown(player1);
    // } else if(e.code==="ArrowLeft"){
    //     moveLeft(player1);
    // } else if(e.code==="ArrowRight"){
    //     moveRight(player1);
    // }
    
}
