export default class Button extends PIXI.Sprite
{
    constructor(texture)
    {
        super(texture);

        this.buttonMode = true;
        this.interactive = true;
        //this._onClick =onClick; 
        this.on('pointerup',this.onPointerUp.bind(this));
    }
    addTouchListener(listener)
    {
        this._onClick = listener;
    }
    onPointerUp(event)
    {
        event.stopPropagation ();
        this._onClick();
    }
}