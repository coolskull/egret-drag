class Bubble extends egret.Sprite {
    public  constructor(x:number, y:number, style:number) {
        super();
        this.createBubble(x, y, style);
    }

    private  textBlock:egret.Sprite;
    public  str:egret.TextField;
    public  text:string;
    public  style:number;
    public  linkIndex:number;
    public  hasPic:boolean=false;
    public  picX:number;
    public  picY:number;
    public  picWidth:number;
    public  picHeight:number;
    private  createBubble(x:number, y:number, style:number) {

        this.textBlock = new egret.Sprite();
        var textRect:egret.Shape = new egret.Shape();
        this.str = new egret.TextField();
        this.x = x;
        this.y = y;

        this.str.textAlign = "center";
        this.str.verticalAlign = "middle";
        this.str.size = 24;
        this.str.fontFamily = "微软雅黑";
        this.str.textColor = 0x000000;


        textRect.graphics.beginFill(0xffffff, 0.01);

        // 0:我恨你tom ; 1:文字横的,文字在下面的; 2.文字横的，文字在上面 ；3: 竖排的
        this.style = style;
        switch (style) {
            case 0:

                textRect.graphics.drawRect(0, 0, 238, 123);
                this.str.width = 238;
                this.str.height = 123;

                break;
            case 1:
                textRect.graphics.drawRect(0, 0, 220, 280);
                this.str.width = 220;
                this.str.height = 50;
                this.str.y = 223;
                this.picX = this.x;
                this.picY = this.y;
                this.picWidth=210;
                this.picHeight=220;
                break;
            case 2:
                textRect.graphics.drawRect(0, 0, 220, 280);
                this.str.width = 220;
                this.str.height = 50;
                this.picX = this.x;
                this.picY = this.y + 52;
                this.picWidth=210;
                this.picHeight=220;
                break;
            case 3:
                textRect.graphics.drawRect(0, 0, 280, 220);
                this.str.width = 30;
                this.str.height = 210;
                this.str.x = 235;
                this.picX = this.x;
                this.picY = this.y;
                this.picWidth=220;
                this.picHeight=210;
                break;
        }

        textRect.graphics.endFill();
        this.textBlock.addChild(textRect);
        this.textBlock.addChild(this.str);
        this.addChild(this.textBlock);
    }

    public  setText(str:string):void {
        this.text = str;
        this.str.text = str;
    }

    public  setLinkIndex(index:number):void {
        this.linkIndex = index;
    }

}
