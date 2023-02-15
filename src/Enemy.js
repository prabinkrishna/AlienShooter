import PIXI, { Sprite } from "pixi.js";

export default class Enemy extends Sprite {

    constructor(texture)
    {
        super(texture);
        this._speed = 1;
        this._life = 100;
        this.vx =1;
        this.vy=0;
        this._direction =1;
        this._isActive = true;
     
    }
    get life()
    {
        return this._life;
    }
    set life(val)
    {
      
        this._life = val;
    }
    getisActive()
    {
        return this._isActive;
    }
    setisActive(status)
    {
        this._isActive = status;
        this.visible = status;
    }
    setTexture(texture)
    {
        this.texture = texture;
    }
    reset()
    {
        
        this._speed = 1;
        this._life = 100;
        this.vx =1;
        this.vy=0;
        this._direction =1;

    }
};