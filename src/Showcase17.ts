/**
 * @author skull
 */
class Showcase17 extends egret.DisplayObjectContainer {
    public constructor() {
        super();
    }

    public gameLayer:egret.DisplayObjectContainer;
    private  scene:egret.Bitmap;
    private  tip:egret.Bitmap;
    private  dragDisplayBoard:DragDisplayBoard;
    private  textListBoard:TextListBoard;
    private  btnContinue:Btn;
    private  tipError:Dialog;
    private  soundChannel:egret.SoundChannel;

    private  currentDragText:DragText;
    private localX:number;
    private localY:number;

    public  createScene():void {
        var self = this;
        var stage:egret.Stage = egret.MainContext.instance.stage;
        this.gameLayer = new egret.DisplayObjectContainer();
        this.gameLayer.name = 'sc17';
        stage.addChild(this.gameLayer);

        // 添加背景
        this.scene = Unity.createBitmapByName("bgMain");
        this.gameLayer.addChild(this.scene);

        // 添加标题
        this.tip = Unity.createBitmapByName("casetip17");
        this.tip.width = 781;
        this.tip.height = 61;
        this.tip.x = 155;
        this.tip.y = 43;
        this.gameLayer.addChild(this.tip);

        // 添加dragDisplayBoard
        this.dragDisplayBoard = new DragDisplayBoard(38, 105, 1, 1);
        this.gameLayer.addChild(this.dragDisplayBoard);

        // 添加textListBoard
        this.textListBoard = new TextListBoard();
        this.gameLayer.addChild(this.textListBoard);

        // 添加继续按钮
        this.btnContinue = new Btn({
            width: 133,
            height: 66
        });
        this.btnContinue.visible = false;
        this.gameLayer.addChild(this.btnContinue);
        this.btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGoon, this);

        // 添加错误的弹框
        this.tipError = new Dialog({
            text: "做错啦，再试试吧！",
            x: 100,
            y: 120,
            size: 32
        });
        this.tipError.visible = false;
        this.gameLayer.addChild(this.tipError);
        this.tipError.btnClick = function () {
            self.tipError.visible = false;
        }

        // 舞台监听拖拽事件
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
    }

    // 点击继续按钮
    private touchGoon(event:egret.TouchEvent):void {
        var linkArray:Array<any> = [];
        for (var i:number = this.dragDisplayBoard.bubbles.length - 1; i >= 0; i--) {
            var bubble:Bubble = this.dragDisplayBoard.bubbles[i];
            if (bubble.linkIndex != null) {
                linkArray.push(bubble.text);
            }
        }
        // 保存用户选择状态
        Main.linkAarray=linkArray;
        //egret.localStorage.setItem("linkAarray", linkArray.toString());
        // 跳转页面
        Main.removeScene();
        Main.currentIndex = 18;
        Main.nextScene(Main.currentIndex);
    }

    private onTouchBegin(event:egret.TouchEvent):void {
        for (var i:number = this.textListBoard.dragTexts.length - 1; i >= 0; i--) {
            var dragText:DragText = this.textListBoard.dragTexts[i];
            if (dragText.hitTestPoint(event.stageX, event.stageY, true)) {
                this.currentDragText = dragText;

                // p为当前鼠标的点
                var p:egret.Point = this.currentDragText.globalToLocal(event.stageX, event.stageY);
                this.localX = p.x * this.currentDragText.scaleX;
                this.localY = p.y * this.currentDragText.scaleY;
                return;
            }
        }

        for (var i:number = this.dragDisplayBoard.bubbles.length - 1; i >= 0; i--) {
            var bubble:Bubble = this.dragDisplayBoard.bubbles[i];
            if (bubble.linkIndex != null) {
                if (bubble.hitTestPoint(event.stageX, event.stageY, true)) {
                    this.currentDragText = this.textListBoard.dragTexts[bubble.linkIndex];
                    this.textListBoard.dragTexts[bubble.linkIndex].visible = true;
                    bubble.setText("文字区");
                    bubble.linkIndex = null;
                    return;
                }
            }

        }
    }

    private onTouchMove(event:egret.TouchEvent):void {
        if (this.currentDragText) {
            // 改变当前拖拽的DragText的x,y值
            this.currentDragText.x = event.stageX - this.textListBoard.x - this.localX;
            this.currentDragText.y = event.stageY - this.textListBoard.y - this.localY;
        }
    }

    private onTouchEnd(event:egret.TouchEvent):void {
        var flag = 0;
        var bubble2:Bubble;
        if (this.currentDragText) {
            for (var i:number = 0; i < this.dragDisplayBoard.bubbles.length; i++) {
                var bubble:Bubble = this.dragDisplayBoard.bubbles[i];

                if (bubble.hitTestPoint(event.stageX, event.stageY, true)) {
                    if(bubble.linkIndex == undefined) {   
                        if (bubble.style == 0) {
                            if (this.currentDragText.index == 3) {
                                bubble2 = bubble;
                                flag=1;
                            } else {
                                flag=-1;
                            }
                        } else {
                            if (this.currentDragText.index != 3) {
                                bubble2 = bubble;
                                flag=1;
                            } else {
                                flag=-1;
                            }
                        }
                    }else{
                        flag = 0;
                        bubble2 = bubble;
                    }
                }
            }
            if (flag == 0) {
                this.currentDragText.setXY(this.currentDragText.startX, this.currentDragText.startY);
            } else if (flag ==1) {
                this.dragInText(bubble2);
            } else{
                this.dragError();
            }
            this.btnContinue.visible = this.chooseOK() ? true : false;

        }
        this.currentDragText = null;
    }

    // 用来判断要不要显示继续按钮
    private  chooseOK() {
        var sum:number = 0;
        for (var i:number = this.dragDisplayBoard.bubbles.length - 1; i >= 0; i--) {
            var bubble:Bubble = this.dragDisplayBoard.bubbles[i];
            if (bubble.linkIndex != null) {
                sum++
            }
        }
        if (sum == 4) {
            return 1;
        } else {
            return 0;
        }
    }

    // 将文字拖进气泡
    private  dragInText(bubble:Bubble):void {
        bubble.setText(this.currentDragText.text);
        this.currentDragText.visible = false;
        bubble.setLinkIndex(this.currentDragText.index);

    }

    //拖拽错误
    private dragError() {
        this.currentDragText.setXY(this.currentDragText.startX, this.currentDragText.startY);
        this.tipError.visible = true;
        this.tipError.startAnimate();
    }
}
