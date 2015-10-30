/**
 * 添加分镜6/7
 */
class Showcase3 extends egret.DisplayObjectContainer {
    public constructor() {
        super();
    }

    public gameLayer:egret.DisplayObjectContainer;
    private currentText:egret.TextField; // 当前移动的文字
    private localX:number;
    private localY:number;
    private displayTextList:Array<egret.TextField>;  // 左边显示文字数组
    private moveTextList:Array<egret.TextField>;    // 用来移动的数组
    private moveTextPosOrig:any;                    // 原始的移动的位置信息
    private yellowBlocks:any;  // 黄色区域
    private textRight:any;
    private sc7Text:Array<egret.TextField>;         //sc7用户选择顺序文字区域
    private scene_sc7:Scene7;         //sc7用户选择顺序文字区域
    private submitBtn:any;
    static mapList = [[0], [1, 2], [3, 4, 5], [6, 7], [8]];

    public createScene():void {
        var _self = this;
        var container = egret.MainContext.instance.stage;
        this.gameLayer = new egret.DisplayObjectContainer();
        this.gameLayer.name = 'sc6-7';
        container.addChild(this.gameLayer);

        //scene_sc6
        var scene_sc6 = new egret.Sprite();
        this.gameLayer.addChild(scene_sc6);
        scene_sc6.visible = true;
        var stage = scene_sc6;

        //背景
        var sc6_bg:egret.Bitmap = Unity.createBitmapByName("sc6_bg");
        scene_sc6.addChild(sc6_bg);

        // 1. 初始化显示文字对象
        var paragraphList:ParagraphList = new ParagraphList();
        scene_sc6.addChild(paragraphList);
        // 可以修改
        this.moveTextPosOrig = RES.getRes("moveParagrahList");
        this.displayTextList = paragraphList.displayTextList;

        // 2. 初始化移动数组
        var movingParagraphList:MovingParagraphList = new MovingParagraphList();
        scene_sc6.addChild(movingParagraphList);
        this.moveTextList = movingParagraphList.moveTextList;

        // 右边黄色区域块
        this.yellowBlocks = RES.getRes("yellowBlock");

        //按钮
        this.submitBtn = new Btn({
            src: "submit_btn"
        });
        this.submitBtn.visible = false;
        this.submitBtn.name = "nextBtn";
        this.gameLayer.addChild(this.submitBtn);

        // 场景7
        this.scene_sc7=new  Scene7();
        this.gameLayer.addChild(this.scene_sc7);
        this.scene_sc7.visible=false;
        this.sc7Text=this.scene_sc7.sc7Text;

        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _self.submitBtn.visible = false;
            scene_sc6.visible = false;
            _self.scene_sc7.visible=true;

            //文字顺序
            for (var i = 0; i < _self.yellowBlocks.blocks.length; i++) {
                var block = _self.yellowBlocks.blocks[i];
                if (block.content != null && block.content.length > 0) {
                    var ithText = '';
                    for (var j = 0; j < block.content.length; j++) {
                        ithText += block.content[j].text;
                    }
                    _self.sc7Text[i].text = ithText;
                    console.log(_self.yellowBlocks.blocks);
                }
            }

        }, this);

        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);


    }

    private onTouchBegin(event:egret.TouchEvent):void {

        // 初始化从左边拖拽到右边
        event.preventDefault();
        var index:number;
        for (var i:number = 0; i < this.displayTextList.length; i++) {
            var smallText:egret.TextField = this.displayTextList[i];
            if (smallText.hitTestPoint(event.stageX, event.stageY, true)) {
                if (i == 0) {
                    index = 0;
                } else if (i == 1 || i == 2) {
                    index = 1;
                } else if (i >= 3 && i <= 5) {
                    index = 2
                } else if (i == 6 || i == 7) {
                    index = 3;
                } else if (i == 8) {
                    index = 4;
                }
                for (var j:number = 0; j < Showcase3.mapList [index].length; j++) {
                    this.displayTextList[Showcase3.mapList [index][j]].textColor = 0xcccccc;
                }
                this.currentText = this.moveTextList[index];
                this.currentText.visible = true;
                // -1是初始move_y，move_y是右边移出是记录当时y，posBlock = 'left' 判断是不是右边移出 右边移出的时候ontouchEnd--return
                this.moveTextPosOrig[this.currentText.name].move_y = -1;
                this.moveTextPosOrig[this.currentText.name].posBlock = 'left';

                var p:egret.Point = this.currentText.globalToLocal(event.stageX, event.stageY);
                this.localX = p.x * this.currentText.scaleX;
                this.localY = p.y * this.currentText.scaleY;
            }
        }

        // 右边点击还原
        for (var i:number = 0; i < this.moveTextList.length; i++) {
            if (this.moveTextList[i].x == 810) {
                this.textRight = this.moveTextList[i];
                if (this.textRight.hitTestPoint(event.stageX, event.stageY, true)) {
                    // 有拖拽进去
                    this.currentText = this.textRight;
                    var p:egret.Point = this.currentText.globalToLocal(event.stageX, event.stageY);
                    //this.localX = p.x * this.currentText.scaleX;
                    //this.localY = p.y * this.currentText.scaleY;
                    this.localX = p.x;
                    this.localY = p.y;
                    var currentBlock = null;
                    for (var i = 0; i < this.yellowBlocks.blocks.length; i++) {
                        var block = this.yellowBlocks.blocks[i];
                        // 当拖到block下面的位置的时候
                        if (event.stageY > block.pos_y[0] && event.stageY < block.pos_y[1]) {
                            currentBlock = block;
                            break;
                        }
                    }
                    if (currentBlock.content.length == 1) {
                        //如果只有一个，删除元素（ 删除第一个元素 ）
                        currentBlock.content.splice(0, 1);
                    } else {
                        // 如果没有或者一个以上
                        if (currentBlock.content.length != 0) {
                            // 一个以上
                            var moveY = this.moveTextPosOrig[this.currentText.name].move_y;
                            var removeIndex = (moveY > 0 && moveY == currentBlock.smallBlock[0].y) ? 0 : 1;
                            currentBlock.content.splice(removeIndex, 1);
                        }

                    }

                    this.currentText.size = 32;
                    this.currentText.background = true;
                    this.currentText.width = 485;
                    this.currentText.lineSpacing = 16;

                    this.outYellowBlock();
                }
            }
        }
    }


    private onTouchMove(event:egret.TouchEvent):void {
        if (this.currentText) {
            this.currentText.x = event.stageX - this.localX;
            this.currentText.y = event.stageY - this.localY;
        }
    }


    private onTouchEnd(event:egret.TouchEvent):void {
        if (event.target.name == 'nextBtn')  return;

        var position = -1;
        var currentBlock = null;

        if (this.currentText) {
            if (this.moveTextPosOrig[this.currentText.name].posBlock &&this.moveTextPosOrig[this.currentText.name].posBlock == 'right') {
                this.currentText = null;
                return;
            }
            for (var i = 0; i < this.yellowBlocks.blocks.length; i++) {
                var block = this.yellowBlocks.blocks[i];
                // 判断onTouchEnd的位置是不是右边黄色区域
                if (event.stageY > block.pos_y[0] && event.stageY < block.pos_y[1]) {
                    //// 右边黄色区域y中
                    position = i;
                    currentBlock = block;
                    break;
                }
            }
            if (currentBlock) {
                var inYellowBlock = event.stageX > this.yellowBlocks.pos_x[0] && event.stageX < this.yellowBlocks.pos_x[1];
                if (!inYellowBlock || position == -1) {
                    // 如果不在黄色区域中
                    this.outYellowBlock();
                }
                else {
                    //在黄色区域
                    if (currentBlock.content.length == 2) {
                        // 个数超过两个
                        this.outYellowBlock();
                    }
                    else {
                        if (position >= 0 && currentBlock.content.length < 2) {
                            //拖拽进去& 显示提交按钮
                            //提交按钮
                            this.submitBtn.visible = true;

                            // 设置右边栏拖拽进来的时候的样式
                            this.currentText.width = 350;
                            this.currentText.size = 20;
                            this.currentText.x = 810;
                            this.currentText.lineSpacing = 5;
                            this.currentText.background = false;

                            var count = currentBlock.content.length;
                            var input_y = 0;  //这个是干嘛的？？
                            if (count == 0) {
                                // 没有添加的时候
                                currentBlock.content.push({
                                    y: currentBlock.smallBlock[0].y,
                                    text: this.currentText.text
                                });
                                input_y = currentBlock.smallBlock[0].y;
                            }
                            else {
                                // 有一个的时候
                                var inblock_y = currentBlock.content[0].y;
                                var inblock_index = ((inblock_y == currentBlock.smallBlock[0].y) ? 1 : 0);

                                if (inblock_index == 0) {
                                    // 在下面的时候
                                    currentBlock.content.unshift({
                                        y: currentBlock.smallBlock[inblock_index].y,
                                        text:this.currentText.text
                                    });
                                } else {
                                    // 在上面的时候
                                    currentBlock.content.push({
                                        y: currentBlock.smallBlock[inblock_index].y,
                                        text: this.currentText.text
                                    });
                                }
                                input_y = currentBlock.smallBlock[inblock_index].y;
                            }

                            this.currentText.y = input_y;
                            // move_y  posBlock
                            this.moveTextPosOrig[this.currentText.name].move_y = input_y;
                            this.moveTextPosOrig[this.currentText.name].posBlock = 'right';

                            this.disableLeftBlock();

                        }
                    }
                }
            } else {
                this.outYellowBlock();
            }
            this.currentText = null;
        }
    }

    private outYellowBlock() {
        var index = parseInt(this.currentText.name);
        this.currentText.x = 158;
        this.currentText.y = this.moveTextPosOrig[index].pos.y;
        this.currentText.visible = false;

        //  激活左边模块颜色 & 变成可以点击
        var mapList = Showcase3.mapList;
        for (var i:number = 0; i < mapList[index].length; i++) {
            this.displayTextList[mapList[index][i]].textColor = 0x000000;
            this.displayTextList[mapList[index][i]].touchEnabled = true;
        }

    }

    private disableLeftBlock() {
        //  禁止左边拖拽
        var mapList = Showcase3.mapList;
        var index:number = parseInt(this.currentText.name);
        for (var i:number = 0; i < mapList[index].length; i++) {
            this.displayTextList[mapList[index][i]].textColor = 0xcccccc;
            this.displayTextList[mapList[index][i]].touchEnabled = false;
        }

    }

}