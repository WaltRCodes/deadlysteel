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
        this.batteries=0;
        this.setUp();
    }
    //this keyCheck function handles the various animations to be played either on the grid or battle screen whenever keys are pressed
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
        } else{
            if(code===this.upKey){
                
                if (this.batteries<=0){
                    return 0;
                } else {
                    document.getElementById(`${this.screenSide}`).style.height="200px";
                    document.getElementById(`${this.screenSide}`).style.width="200px";
                    document.getElementById(`${this.screenSide}`).style.animation='';
                    document.getElementById(`${this.screenSide}`).style.backgroundImage=`url('./assets/sprites/${this.name}_stand_${this.screenSide}.png')`;
                    document.getElementById(`${this.screenSide}`).style.animation=`${this.name}shoot${this.screenSide}  1s ease-in-out 1`;
                    document.getElementById(`${this.screenSide}`).style.margin="40px";
                    let attack = this.attackPower+(this.batteries*5);
                    this.removeBattery();
                    return attack;
                }
                
            } else if(code===this.leftKey){
                console.log(`url('./assets/sprites/${this.name}_shield_${this.screenSide}.png')`);
                document.getElementById(`${this.screenSide}`).style.animation='';
                document.getElementById(`${this.screenSide}`).style.backgroundImage=`url('./assets/sprites/${this.name}_shield_${this.screenSide}.png')`;
                document.getElementById(`${this.screenSide}`).style.height="270px";
                document.getElementById(`${this.screenSide}`).style.width="270px";
                document.getElementById(`${this.screenSide}`).style.margin="0";
            } else if(code===this.rightKey){
                document.getElementById(`${this.screenSide}`).style.height="200px";
                document.getElementById(`${this.screenSide}`).style.width="200px";
                document.getElementById(`${this.screenSide}`).style.animation='';
                document.getElementById(`${this.screenSide}`).style.backgroundImage=`url('./assets/sprites/${this.name}_stand_${this.screenSide}.png')`;
                document.getElementById(`${this.screenSide}`).style.animation=`${this.name}punch${this.screenSide}  1s ease-in-out 1`;
                document.getElementById(`${this.screenSide}`).style.margin="40px";
                return this.attackPower;
            }
        }
        return 0;
    }
    //this function sets up the battle screen when the timer runs out or the robots collide
    offTheGrid=()=>{
        this.onTheGrid=false;
        document.getElementById(`${this.screenSide}`).style.backgroundImage=`url('./assets/sprites/${this.name}_stand_${this.screenSide}.png')`;
        document.getElementById(`${this.screenSide}`).style.margin="40px";
        document.getElementById(`${this.screenSide}Instructions`).innerHTML=`
        <p>${this.name} Health: <span id="${this.screenSide}HealthUnits">${this.health}</span></p>
        <p>Batteries: <span id="${this.name}battlebattery">${this.batteries}</span</p>
        <p>${this.upKey} to shoot laser(removes one battery)</p>
        <p>${this.leftKey} to block</p>
        <p>${this.rightKey} to punch</p>`;

    }

    moveDown = () =>{
        this.htmlElement.style.animation=`${this.name}walkDown  1s ease-in-out infinite`;
        if (this.row!=5){
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
        document.getElementById(`${this.name}stats`).innerHTML=`
        <p>${this.name} Health: ${this.health}</p>
        <p>Batteries: <span id="${this.name}battery">${this.batteries}</span</p>`;
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
        this.batteries++;
        document.getElementById(`${this.name}battery`).innerHTML=this.batteries;
    }
    //this function removes the battery from the robot
    removeBattery(){
        this.batteries--;
        document.getElementById(`${this.name}battlebattery`).innerHTML=this.batteries;
    }
    //this function handles damaging the robot
    takeDamage(damage){
        console.log(document.getElementById(`${this.screenSide}`).style.backgroundImage===`url("./assets/sprites/${this.name}_shield_${this.screenSide}.png")`);
        //this updates the health value and accounts for blocking
        if(document.getElementById(`${this.screenSide}`).style.backgroundImage===`url("./assets/sprites/${this.name}_shield_${this.screenSide}.png")`){
            damage=damage/2;
            this.health-=damage;
        } else {
            this.health-=damage;
        }
        //this populates the health grid value
        if(!this.onTheGrid){
            document.getElementById(`${this.screenSide}HealthUnits`).innerHTML=`${this.health}`;
        }
        //this triggers the blowIn animation upon player death
        if(this.health<=0){
            console.log(`${this.name} has lost`);
            
            document.getElementById(`${this.screenSide}Holder`).style.animation=`blowInModal .5s  forwards`;
            //document.getElementById(`${this.screenSide}Holder`).style.display="none";
        
        } else{
            console.log(`${this.name} has taken damage`);
        }
    }
}
// this is the class for the battery holds the battery row and column
class battery{
    constructor(row,column){
        this.row=row;
        this.column=column;
    }
    get getRow(){
        return this.row;
    }
    get getCol(){
        return this.column;
    }
}
//this function creates a random int to be used with the battery placement loop
const getRandomInt =(min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let batteries =[];
// this function creates the batteries that appear on the board
for(let i=0;i<6;i++){
    batteries[i]=new battery(getRandomInt(1,5),getRandomInt(2,5));
    document.getElementById("gameBoard").innerHTML+=`
    <div id="battery${i}" style="background-repeat: no-repeat; background-size: 100% 100%; height:100px; width:100px; grid-column: ${batteries[i].getCol};
    grid-row: ${batteries[i].getRow};"></div>
    `;
    document.getElementById(`battery${i}`).style.backgroundImage=`url('./assets/sprites/battery.png')`;
}
let player1;
let player2;
let timeleft = 600;
//this function starts the game and initilizes the players
const startGame = () =>{
    
    player1 = new robot("P1",document.getElementById("player1"),1,1,"ArrowUp","ArrowDown","ArrowLeft","ArrowRight","left");
    player2 = new robot("P2",document.getElementById("player2"),5,6,"KeyW","KeyS","KeyA","KeyD","right");
    timeleft = 30;
    document.getElementById('startscreen').style.animation=`blowInModal .5s  forwards`;
}


//this checks to see if two objects on the board are colliding
const collisionCheck=(obj1row,obj1col,obj2row,obj2col)=>{
    if(obj1row===obj2row&&obj1col===obj2col){
        return true;
    } else {
        return false;
    }
}
//this function checks for a winner to the game
const winCheck =(player1Health,player2Health)=>{
    let decision = document.getElementById("decision");
    if(player1Health<=0&&player2Health<=0){
        decision.innerHTML="Its a Draw!";
    } else if(player1Health<=0 | player2Health<=0){
        decision.innerHTML="We have a winner!";
    }
}


//this function controls the timer
let timer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(timer);
    //document.getElementById("timer").innerHTML = "Finished";
    document.getElementById("battleScreen").style.display="block";
    document.getElementById("battleScreen").style.animation=`blowUpModal .5s  forwards`;
    player1.offTheGrid();
    player2.offTheGrid();
    battlecheck=false;
  } else {
    document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);


document.addEventListener('keydown', logKey);
//this check is used to run functions exclisive to the grid portion of the game
let battlecheck = true;
//this function triggers every time a key is pressed
function logKey(e) {
    //e.code is the key pressed on the keyboard
    console.log(`${e.code}`);
    //this checks to make sures the player has started the ame before calling any functions
    if(player1!=undefined&&player2!=undefined){
        //this combination of functions checks the first players action in order to see if they have a result on the second player
        player2.takeDamage(player1.keyCheck(e.code));
        //this check is done so that batteries can no longer be connected once in battle
        if(battlecheck){
            //this uses the collisionCheck function inorder to check to see if a player has stepped over a battery
            for(let i=0;i<6;i++){
                        
                if(collisionCheck(player1.getRow,player1.getCol,batteries[i].getRow,batteries[i].getCol)){
                    document.getElementById(`battery${i}`).style.backgroundImage=``;
                    player1.getBattery();
                }
                
            }
        }
        
        //with all the keys pressed, a check must also be done in order to check if a player has won
        winCheck(player1.getHealth, player2.getHealth);
        //this checks to see if the player robots have landed on the same space
        if(collisionCheck(player1.getRow,player1.getCol,player2.getRow,player2.getCol)&&battlecheck){
            console.log("robot collision!");
            document.getElementById("battleScreen").style.display="block";
            document.getElementById("battleScreen").style.animation=`blowUpModal .5s  forwards`;
            player1.offTheGrid();
            player2.offTheGrid();
            battlecheck=false;
        }
        //the same actions repeat for player 2
        player1.takeDamage(player2.keyCheck(e.code));
        
        if(battlecheck){

            for(let i=0;i<6;i++){
            
            
                if(collisionCheck(player2.getRow,player2.getCol,batteries[i].getRow,batteries[i].getCol)){
                    document.getElementById(`battery${i}`).style.backgroundImage=``;
                    player2.getBattery();
                }
            }

        }
        
        
        winCheck(player1.getHealth, player2.getHealth);
        if(collisionCheck(player1.getRow,player1.getCol,player2.getRow,player2.getCol)&&battlecheck){
            console.log("robot collision!");
            document.getElementById("battleScreen").style.display="block";
            document.getElementById("battleScreen").style.animation=`blowUpModal .5s  forwards`;
            player1.offTheGrid();
            player2.offTheGrid();
            battlecheck=false;
        }

    }

    
}
