class PicsBoard extends egret.Sprite {
    public  constructor() {
        super();
        this.createBoard();
        this.width = 340;
        this.height = 560;
        this.x = 26;
        this.y = 108;
    }

    private pics:Array<egret.Bitmap>;
    private boardBg:egret.Bitmap;
    public currentTarget:any;
    public   clickPicCallback:()=>void;

    private  createBoard():void {

        this.boardBg = Unity.createBitmapByName("bgBlock");
        this.addChild(this.boardBg);

        var tip:egret.TextField = new egret.TextField();
        tip.text = "选择你认为合适的图片。";
        tip.textColor = 0x000000;
        tip.fontFamily = "微软雅黑";
        tip.size = 28;
        tip.x = 20;
        tip.y = 20;
        this.addChild(tip);

        this.pics = [];
        var picsheet:egret.SpriteSheet = RES.getRes("pics");
        for (var i:number = 0; i < 2; i++) {
            for (var j:number = 0; j < 2; j++) {
                var index:number = i * 2 + j;
                var pic:Pic = new Pic(index);
                var texture:egret.Texture = picsheet.getTexture("pic" + (i * 2 + j + 1));
                pic.texture = texture;

                pic.x = 25 + j * 147;
                pic.y = 65 + i * 234;
                pic.touchEnabled = true;
                pic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPic, this);
                this.addChild(pic);
                this.pics.push(pic);
            }
        }
    }

    public clickPic(event:egret.TouchEvent) {
        this.currentTarget = event.currentTarget;
        this.clickPicCallback();
    }


}
class Pic extends egret.Bitmap {
    private  index:number;

    public  constructor(index:number) {
        super();
        this.index = index;
    }

    public setTexture(texture:egret.Texture):void {
        this.texture = texture;
    }
}