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
    get getAttackPower(){
        
    }
}