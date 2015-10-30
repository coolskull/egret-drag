class MovingParagraphList extends egret.Sprite {
    public  constructor() {
        super();
        this.create();
    }

    public  moveTextList:Array<egret.TextField> = [];
    public  moveTextPosOrig = [];

    private create() {
        // 1. 初始化显示文字对象
        var moveingMsg = RES.getRes("moveParagrahList");
        this.moveTextPosOrig = moveingMsg;
        // 1. 初始化显示文字对象
        for (var i = 0; i < moveingMsg.length; i++) {
            var text:egret.TextField = new egret.TextField();
            this.addChild(text);
            text.name = i.toString();
            text.text = moveingMsg[i].msg;
            text.textColor = 0x000000;
            text.fontFamily = "微软雅黑";
            text.size = 32;
            text.background = true;
            text.backgroundColor = 0xedaf47;
            text.x = moveingMsg[i].pos.x;
            text.y = moveingMsg[i].pos.y;
            text.touchEnabled = true;
            text.width = 485;
            text.lineSpacing = 16;
            text.visible = false;
            this.moveTextList.push(text);
        }
    }
}