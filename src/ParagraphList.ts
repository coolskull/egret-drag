class ParagraphList extends egret.Sprite {
    public  constructor() {
        super();
        this.create();
    }

    public  displayTextList:Array<egret.TextField>= [];

    private create() {

        // 1. 初始化显示文字对象
        var displayMsg = RES.getRes("paragraphList");
        // 1. 初始化显示文字对象
        for (var i = 0; i < displayMsg.length; i++) {
            var text:egret.TextField = new egret.TextField();
            text.text = displayMsg[i].msg;
            this.addChild(text);
            text.name = "displayText_" + i;
            text.textColor = 0x000000;
            text.background =true;
            text.backgroundColor = 0xffffff;
            text.fontFamily = "微软雅黑";
            text.size = 32;
            text.x = displayMsg[i].pos.x;
            text.y = displayMsg[i].pos.y;
            text.touchEnabled = true;
            if (i == 8) {
                text.width = 484;
                text.lineSpacing = 15;
            }
            this.displayTextList.push(text);
        }
    }


}