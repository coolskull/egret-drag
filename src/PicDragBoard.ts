class PicDragBoard extends egret.Sprite {
    public  constructor() {
        super();
        this.createBoard();
        this.width = 340;
        this.height = 560;
        this.x = 26;
        this.y = 108;
    }

    public pics:Array<DragPic>;
    private boardBg:egret.Bitmap;
    public currentTarget:any;
    public   clickPicCallback:()=>void;

    private  createBoard():void {

        this.boardBg = Unity.createBitmapByName("bgBlock");
        this.boardBg.height = 566;
        this.addChild(this.boardBg);

        this.pics = [];
        var picsheet:egret.SpriteSheet = RES.getRes("dragPics");
        for (var i:number = 0; i < 3; i++) {
            //var index:number = i;
            var x:number = 80;
            var y:number = 15 + i * 175;
            var pic:DragPic = new DragPic(x, y);
            var texture:egret.Texture = picsheet.getTexture("pic" + (i + 1));
            pic.texture = texture;
            pic.touchEnabled = true;
            switch (i) {
                case 0:
                    pic.text = "你不尊重我妈妈";
                    break;
                case 1:
                    pic.text = "你意图抢我女朋友";
                    break;
                case 2:
                    pic.text = "你贬低我";
                    break;
            }
            this.addChild(pic);
            this.pics.push(pic);
        }
    }


}
class DragPic extends egret.Bitmap {
    //private  index:number;
    public  startX;
    public  startY;
    public  text;
    public  LinkBubble:number=-1;

    public  constructor(x:number, y:number) {
        super();
        //this.index = index;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
    }

    public setTexture(texture:egret.Texture):void {
        this.texture = texture;
    }
    public setXY(x:number,y:number):void {
        this.x=x;
        this.y=y;
    }
}