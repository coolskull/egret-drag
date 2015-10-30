/**
 * @author skull
 */
class Scene7 extends egret.Sprite {

    public sc7Text:Array<egret.TextField>;

    public constructor() {
        super();
        this.createScene();
    }

    public  createScene():void {


        //背景

        var sc7_bg:egret.Bitmap = Unity.createBitmapByName("sc7_bg");
        this.addChild(sc7_bg);
        sc7_bg.width = 1334;
        sc7_bg.height = 750;

        // 用户选择的文字顺序
        var createSc7TextPos = [135, 244, 355, 466];
        for (var i = 0; i < createSc7TextPos.length; i++) {
            var text:egret.TextField = new egret.TextField();
            this.addChild(text);
            text.text = '';
            text.textColor = 0x000000;
            text.fontFamily = "微软雅黑";
            text.size = 30;
            text.lineSpacing = 10;
            text.x = 260;
            text.width = 875;
            text.y = createSc7TextPos[i];
            this.sc7Text = this.sc7Text || [];
            this.sc7Text.push(text);
        }


        var btn_answer = new Btn({
            src: "sc7_btn",
            x: 1070,
            y: 670
        });
        //参考答案
        var btn_tw = egret.Tween.get(btn_answer, {loop: false});
        btn_tw.wait(3000)
            .to({visible: true}, 100)
            .to({
                scaleX: 0.9,
                scaleY: 0.9
            }, 1000)
            .to({
                scaleX: 1,
                scaleY: 1
            }, 1000);
        btn_answer.name = "answer";
        this.addChild(btn_answer);
        btn_answer.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.get(sc7_a, {
                loop: false
            })
                .to({visible: true}, 100)
                .to({alpha: 1, scaleY: 1}, 300);

        }, this);

        //参考答案页面
        var sc7_a = new egret.Sprite();
        this.addChild(sc7_a);
        sc7_a.scaleY = 0.2;
        sc7_a.scaleX = 1;
        sc7_a.anchorOffsetX = 50;
        sc7_a.anchorOffsetY = 50;
        sc7_a.alpha = 0;
        sc7_a.width = 1334;
        sc7_a.height = 750;
        sc7_a.visible = false;
        sc7_a.x = 50;
        sc7_a.y = 50;

        //背景图片
        var sc7_tip:egret.Bitmap = Unity.createBitmapByName("sc7_tip");
        sc7_a.addChild(sc7_tip);
        sc7_tip.width = 1334;
        sc7_tip.height = 750;

        //关闭
        var sc7_btn_colse = new egret.Sprite();
        sc7_a.addChild(sc7_btn_colse);
        sc7_btn_colse.graphics.beginFill(0xff0000);
        sc7_btn_colse.graphics.drawRect(0, 0, 78, 74);
        sc7_btn_colse.graphics.endFill();
        sc7_btn_colse.alpha = 0.01;
        sc7_btn_colse.name = "close";
        sc7_btn_colse.x = 1040;
        sc7_btn_colse.y = 60;
        sc7_btn_colse.touchEnabled = true;
        sc7_btn_colse.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            continue_btn.visible = true;
            egret.Tween.get(sc7_a, {
                loop: false
            })
                .to({alpha: 0, scaleY: 0.2, visible: false}, 300)
        }, this);

        //继续按钮
        var continue_btn = new Btn({
            src: "btnContinue",
            x: 1280,
            y:780,
            width:100,
            height:60
        });
        this.addChild(continue_btn);
        continue_btn.visible = false;
        continue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Main.removeScene();
            Main.currentIndex++;
            Main.nextScene(Main.currentIndex);
        }, this);
    }

}
