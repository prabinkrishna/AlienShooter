import PIXI, { Sprite } from "pixi.js";

export default class Player extends Sprite {

    constructor(texture)
    {
        super(texture);
        this._speed = 2;
        this._life = 3;
        this.position.y = 800;
        this.position.x = 300;
        this.vx =0;
        this.vy=0;
    }
    getSpeed()
    {
        return this._speed;
    }
    getPosition()
    {
        return this.position;
    }
    reset()
    {
        this._speed = 2;
        this._life = 3;
        this.position.y = 800;
        this.position.x = 300;
        this.vx =0;
        this.vy=0;
    }


};