import PIXI, { Sprite } from "pixi.js";

export default class Bullet extends Sprite {

    constructor(texture)
    {
        super(texture);
        this._speed = 3;
        this._damage = 20;
        this._isActive = false;

        this.disableBullet();
    }
    get damage()
    {
        return this._damage;
    }
    get isActive()
    {
        return this._isActive;
    }
    get speed()
    {
        return this._speed;
    }
    disableBullet()
    {
        this.visible = false;
        this._isActive = false;
    }
    enableBullet()
    {
        this.visible = true;
        this._isActive = true;
    }
    setPosition(x,y)
    {
        this.position.x = x;
        this.position.y = y;
    }
    reset()
    {
        this._speed = 3;
        this._damage = 20; 
    }

};