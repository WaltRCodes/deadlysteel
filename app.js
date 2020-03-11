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
    //this function damaging the robot
    takeDamage(damage){
        this.health-=damage;
    }
}