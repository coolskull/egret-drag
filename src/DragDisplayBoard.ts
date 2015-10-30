/**
 * Created by skull on 2015/10/14.
 */
class DragDisplayBoard extends egret.Sprite {
    public  constructor(x:number, y:number, scale:number, bgIndex:number) {
        super();
        this.width = 902;
        this.height = 563;
        //this.x = 38;
        //this.y = 105;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.scaleX = scale;
        this.scaleY = scale;
        this.creatBoard(bgIndex);
    }

    private displayBoardBg:egret.Bitmap;
    public  bubbles:Array<Bubble>;
    public  scale:number;

    private creatBoard(bgIndex:number) {

        var bubbleParam:Array<any> = RES.getRes("bubbleListParam");
        var picSource = "bgAction1";
        if (bgIndex) {
            switch (bgIndex) {
                case 1:
                    picSource = "bgAction1";
                    break;
                case 2:
                    picSource = "bgAction2";
                    break;
                case 3:
                    picSource = "bgAction3";
                    break;
                case 4:
                    picSource = "bgAction4";
                    break;
            }
        }
        this.displayBoardBg = Unity.createBitmapByName(picSource);
        this.displayBoardBg.width = 934;
        this.displayBoardBg.height = 560;
        this.addChild(this.displayBoardBg);

        this.bubbles = [];
        for (var i:number = 0; i < bubbleParam.length; i++) {
            var txtx:number = bubbleParam[i].txtx;
            var txty:number = bubbleParam[i].txty;
            var style:number = bubbleParam[i].style;
            var bubble:Bubble = new Bubble(txtx, txty, style);
            bubble.setText("文字区");
            this.bubbles.push(bubble);
            this.addChild(bubble);
        }
    }

    public  setAllText():void {
        //var linkstr:string = egret.localStorage.getItem("linkAarray");
        var linkArray=Main.linkAarray;
        var length:number = this.bubbles.length;
        for (var i:number = 0; i < length; i++) {
            // 因为bubble是push进去的，所以顺序要反过来
            this.bubbles[i].setText(linkArray[length - i - 1]);
        }
    }

    public  setAllPic():void {
        var picsheet:egret.SpriteSheet = RES.getRes("dragPics");
        for (var i:number = 1; i < this.bubbles.length; i++) {
            // 因为bubble是push进去的，所以顺序要反过来
            var pic:DragPic;
            var picSourse:string;

            //console.log(this.bubbles[i].text);
            switch (this.bubbles[i].text) {
                case  "你不尊重我妈妈":
                    picSourse = "pic1";
                    break;
                case  "你意图抢我女朋友":
                    picSourse = "pic2";
                    break;
                case  "你贬低我":
                    picSourse = "pic3";
                    break;
            }
            if (picSourse) {
                var picx:number = this.bubbles[i].picX;
                var picy:number = this.bubbles[i].picY;
                pic = new DragPic(picx, picy);
                var texture:egret.Texture = picsheet.getTexture(picSourse);
                pic.texture = texture;
                pic.width = this.bubbles[i].picWidth;
                pic.height = this.bubbles[i].picHeight;
                this.addChild(pic);
            }

        }


    }


    public setParam(x:number, y:number, scale:number) {
        this.x = x;
        this.y = y;
        this.scaleX = scale;
        this.scaleY = scale;
    }

}
