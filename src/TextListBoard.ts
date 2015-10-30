/**
 * Created by skull on 2015/10/14.
 */
class TextListBoard extends egret.Sprite {
    private   textListBoardBg:egret.Bitmap;
    public   dragTexts:Array<DragText>;

    public  constructor() {
        super();
        this.width = 200;
        this.height = 560;
        //this.x = 38;
        //this.y = 105;
        this.x = 974;
        this.y = 105;
        this.creatBoard();
    }

    private  creatBoard():void {
        var texts:Array<string> =RES.getRes("dragTextListParam");
        this.textListBoardBg = Unity.createBitmapByName("bgBlock");
        this.addChild(this.textListBoardBg);
        this.textListBoardBg.scale9Grid=new egret.Rectangle(35,25,215,50);
        this.textListBoardBg.width = 340;
        this.textListBoardBg.height = 560;
        this.dragTexts=[];
        for (var i:number = 0; i < texts.length; i++) {
            var staticX:number = 25;
            var staticY:number = 45;
            var dragText = new DragText(texts[i], staticX, staticY + i * 110, i);
            //var dragText = new DragText({
            //    text:texts[i],
            //    x:  staticX,
            //    y:  staticY + i * 110,
            //    index:i
            //});
            this.addChild(dragText);
            this.dragTexts.push(dragText);
        }
    }



}
