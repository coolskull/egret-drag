/**
 * Created by SKULL on 2015/10/12.
 */
class DragText extends egret.Sprite {
    public  constructor(text:string, x:number, y:number,index:number) {
        super();
        this.createText(text,index);
        this.setXY(x, y);
        this.startX=x;
        this.startY=y;
    }

    private  dragTextBg:egret.Bitmap;
    public  textField:egret.TextField;
    public  text:string;
    public  index:number;
    public  startX:number;
    public  startY:number;
    private  createText(text:string,index:number) {
        this.index=index;
        if (text == null) {
            this.text = "文字区";
        } else {
            this.text = text;
        }
        this.width=279;
        this.height=95;
        this.dragTextBg = Unity.createBitmapByName("btnNormal");
        this.dragTextBg.scale9Grid = new egret.Rectangle(35,25,215,50);
        this.dragTextBg.width = this.width;
        this.dragTextBg.height = this.height;
        this.addChild(this.dragTextBg);

        this.textField = new egret.TextField();
        this.textField.text = this.text;
        this.textField.textColor = 0x000000;
        this.textField.size = 30;
        this.textField.width =  this.width;
        this.textField.y = 30;
        this.textField.textAlign = "center";
        this.textField.verticalAlign = "middle";
        this.textField.fontFamily = "微软雅黑";
        this.addChild(this.textField);


    }

    public  setXY(x:number, y:number):void {
        this.x = x;
        this.y = y;
    }
    public  setWH(width:number, height:number):void {
        this.width = width;
        this.height = height;
        this.dragTextBg.width = width;
        this.dragTextBg.height= height;
        this.textField.width =  width-10;
        this.textField.y = 15;

    }

    public  setColor():void {
        this.textField.textColor = 0xff0000;

    }
    public setBg(name:string):void{
    var texture:egret.Texture = RES.getRes(name);
    this.dragTextBg.texture = texture;
      // 蹩脚的，因为showcase16添加了 scale9Grid
    this.dragTextBg.scale9Grid = new egret.Rectangle(31,32,98,23);
    }
}
