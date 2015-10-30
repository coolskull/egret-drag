/**
 *
 * @author    skull
 *
 */
class Showcase24 extends egret.DisplayObjectContainer {
    public gameLayer:egret.DisplayObjectContainer;
    private scene24:egret.Sprite;
    private  soundChannel:egret.SoundChannel;
    private tipError:Dialog;
    private  dragDisplayBoard:DragDisplayBoard;
    private  picDragBoard:PicDragBoard;
    private  btnContinue:Btn;
    private  currentDragPic:DragPic;
    private localX:number;
    private localY:number;
    public myAudio: PPTSound;

    public constructor() {
        super();
    }

    public  createScene():void {
        var self = this;
        var stage:egret.Stage = egret.MainContext.instance.stage;
        this.gameLayer = new egret.DisplayObjectContainer();
        this.gameLayer.name = 'sc24';
        stage.addChild(this.gameLayer);

        // 添加p24的场景
        this.scene24 = new egret.Sprite();
        this.gameLayer.addChild(this.scene24);
        

        // 添加音频
        self.myAudio=new PPTSound('resource/assets/sound/P24.mp3',12000,loadEndCallback,null);
        
        function loadEndCallback() { 
            egret.Tween.get(tip).to({alpha: 1}, 1000).wait(4 * 1000).to({x: 370}, 1000);   
            egret.Tween.get(self.dragDisplayBoard).to({alpha: 1}, 1000).wait(4 * 1000).to({x: 370}, 1000);
            egret.Tween.get(self.picDragBoard).wait(6 * 1000).to({alpha: 1}, 1000);
        };

        // 添加p24的背景
        var sceneBg:egret.Bitmap = Unity.createBitmapByName("bgMain");
        this.scene24.addChild(sceneBg);

        // 添加p24的标题
        var tip:egret.Bitmap = Unity.createBitmapByName("casetip24");
        tip.width = 278;
        tip.height = 55;
        tip.x = 155;
        tip.y = 45;
        tip.alpha = 0;
        this.scene24.addChild(tip);
        

        // 添加dragDisplayBoard
        this.dragDisplayBoard = new DragDisplayBoard(155, 109, 1.01, 3);
        this.dragDisplayBoard.alpha = 0;
        this.scene24.addChild(this.dragDisplayBoard);
        //------- 将文字区填成用户选择的样子
        this.dragDisplayBoard.setAllText();
        


        // 添加picDragBoard
        this.picDragBoard = new PicDragBoard();
        this.picDragBoard.alpha = 0;
        this.scene24.addChild(this.picDragBoard);
        

        // 添加继续按钮
        this.btnContinue = new Btn({
            width: 133,
            height: 66
        });
        this.btnContinue.visible = false;
        this.btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGoon, this);
        this.scene24.addChild(this.btnContinue);


        // 添加错误的弹框
        this.tipError = new Dialog({
            text: "图片匹配错啦，要根据内容来选择图片哦！",
            y: 120
        });
        this.tipError.visible = false;
        //this.tipError.startAnimate();

        this.gameLayer.addChild(this.tipError);
        this.tipError.btnClick = function () {
            self.tipError.visible = false;
            self.scene24.visible = true;
        }

        // 舞台监听拖拽事件
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
    }

    private touchGoon(event:egret.TouchEvent):void {
        console.log("skull");
        // 跳转页面
        Main.removeScene();
        Main.currentIndex = 25;
        Main.nextScene(Main.currentIndex);
    }

    private onTouchBegin(event:egret.TouchEvent):void {
        for (var i:number = this.picDragBoard.pics.length - 1; i >= 0; i--) {
            var DragPic = this.picDragBoard.pics[i];
            if (DragPic.hitTestPoint(event.stageX, event.stageY, true)) {
                this.currentDragPic = DragPic;
                // p为当前鼠标的点
                console.log("p为当前鼠标的点" + DragPic.LinkBubble);
                var p:egret.Point = this.currentDragPic.globalToLocal(event.stageX, event.stageY);
                this.localX = p.x * this.currentDragPic.scaleX;
                this.localY = p.y * this.currentDragPic.scaleY;
                return;
            }
        }

    }

    private onTouchMove(event:egret.TouchEvent):void {
        if (this.currentDragPic) {
            //改变当前拖拽的ball的x,y值
            this.currentDragPic.x = event.stageX - this.picDragBoard.x - this.localX;
            this.currentDragPic.y = event.stageY - this.picDragBoard.y - this.localY;
        }
    }

    private onTouchEnd(event:egret.TouchEvent):void {
        var flag = 0;
        if (this.currentDragPic) {
            // 有选中图片的时候
            if (this.currentDragPic.LinkBubble == -1) {
                // 图片未拖进气泡框里
                for (var i:number = 1; i < this.dragDisplayBoard.bubbles.length; i++) {
                    //这里设置i为1,过滤掉"我恨你，tom!"
                    var bubble:Bubble = this.dragDisplayBoard.bubbles[i];
                    //console.log(bubble.text);
                    if (bubble.hitTestPoint(event.stageX, event.stageY, true)) {
                        //有跟气泡选框重叠
                        if ((bubble.text).trim() == (this.currentDragPic.text).trim()) {
                            // 拖拽：配对成功
                            // 设置图片的位置
                            flag++;
                            // 设置图片对应的气泡index
                            this.currentDragPic.LinkBubble = i;
                        } else {
                            flag--;
                        }
                    }
                }
            }
            else {
                // 图片已拖进气泡框里
                var bubble:Bubble = this.dragDisplayBoard.bubbles[this.currentDragPic.LinkBubble];

                if (bubble.hitTestPoint(event.stageX, event.stageY, true)) {
                    // 没有被拖拽出来
                    flag++;

                } else {
                    // 被拖拽出来了
                    bubble.hasPic = false;
                }
            }

        }
        if (flag == 0) {
            this.resetPicPosition();
        } else if (flag < 0) {
            this.resetPicPosition();
            this.soundChannel.stop();
            this.tipError.visible = true;
            this.tipError.startAnimate();
        } else {
            this.setDragInPosition();
        }

        if (this.chooseOK()) {
            this.btnContinue.visible = true;
        } else {
            this.btnContinue.visible = false;
        }

        this.currentDragPic = null;

    }

    // 用来判断要不要显示继续按钮
    private  chooseOK() {
        var sum:number = 0;
        for (var i:number = this.dragDisplayBoard.bubbles.length - 1; i >= 0; i--) {
            var bubble:Bubble = this.dragDisplayBoard.bubbles[i];
            if (bubble.hasPic) {
                sum++
            }
        }
        if (sum == 3) {
            return 1;
        } else {
            return 0;
        }
    }

    private  setDragInPosition() {
        var bubble:Bubble = this.dragDisplayBoard.bubbles[this.currentDragPic.LinkBubble];
        if (bubble) {
            this.currentDragPic.x = bubble.picX * this.dragDisplayBoard.scale + this.dragDisplayBoard.x - this.picDragBoard.x;
            this.currentDragPic.y = bubble.picY * this.dragDisplayBoard.scale + this.dragDisplayBoard.y - this.picDragBoard.y;
            this.currentDragPic.width = bubble.picWidth;
            this.currentDragPic.height = bubble.picHeight;
            bubble.hasPic = true;
        }

    }

    private   resetPicPosition() {
        if (this.currentDragPic) {
            this.currentDragPic.setXY(this.currentDragPic.startX, this.currentDragPic.startY);
            this.currentDragPic.width = 170;
            this.currentDragPic.height = 170;
            this.currentDragPic.LinkBubble = -1;
        }

    }
}

