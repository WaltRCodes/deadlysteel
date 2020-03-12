//creating a robot class in order to encompas all the functions and values that the players will utilize
class robot{
    constructor(name){
        this.name = name;
        this.health = 100;
        this.attackPower = 10;
    }
    //this method returns the robot's health
    get getHealth(){
        return this.health;
    }
    //method for getting attack power
    get getAttackPower(){
        return this.attackPower;
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
//this function starts the game
const startGame = () =>{
    let player1 = new robot("player1");
    console.log(player1.getHealth +" "+ player1.getAttackPower);
    player1.takeDamage(50);
    player1.takeDamage(50);
    player1.getBattery();
    console.log(player1.getAttackPower);
    player1.removeBattery();
    console.log(player1.getAttackPower);
    
}
startGame();
//insert these 3 and 4 keyboard keys into the class later
let player1 = document.getElementById("player1");
let player1col=1;
let player1row=1;
player1.style.gridColumn=player1col;
player1.style.gridRow=player1row;

const moveDown = (player) =>{
    if (player1row!=3){
        player1row++;
    }
    player.style.gridRow=player1row;
}
const moveUp = (player) =>{
    if (player1row!=1){
        player1row--;
    }
    player.style.gridRow=player1row;
}
const moveLeft = (player) =>{
    if (player1col!=1){
        player1col--;
    }
    player.style.gridColumn=player1col;
}
const moveRight = (player) =>{
    if (player1col!=6){
        player1col++;
        console.log(player1col, 'col')
    }
    player.style.gridColumn=player1col;
}

document.addEventListener('keydown', logKey);

function logKey(e) {
    console.log(`${e.code}`);
    if(e.code==="ArrowUp"){
        moveUp(player1);
    } else if(e.code==="ArrowDown"){
        moveDown(player1);
    } else if(e.code==="ArrowLeft"){
        moveLeft(player1);
    } else if(e.code==="ArrowRight"){
        moveRight(player1);
    }
    
}
