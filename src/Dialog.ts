/**
 * Created by skull on 2015/10/15.
 *
 * var test = new Dialog(options);
 * {x:10, y:10, duration:10}
 *
 * class Dialog
 * animate(){
 *        x ,y ,duration
 *
 *        if(!!options.x) {
 *
 *        }
 * }
 */

class Dialog extends egret.Sprite {
    private tipText:egret.TextField;
    private  opts;
    public btnClick;
    private tipGirl:egret.Bitmap;
    private  tip:egret.Sprite;
    public btn:Btn;

    public constructor(opts:any) {
        super();
        this.opts = opts;
        this.creatTip();
    }

    public creatTip():void {
        var stage:egret.Stage = egret.MainContext.instance.stage;

        // 背景颜色
        var dialogBg:egret.Sprite = new egret.Sprite();
        dialogBg.graphics.beginFill(0xcbcbcb);
        dialogBg.graphics.drawRect(0, 0, stage.stageWidth, stage.height);
        dialogBg.graphics.endFill();
        this.addChild(dialogBg);

        //人物
        this.tipGirl = Unity.createBitmapByName("tipGirl");
        this.addChild(this.tipGirl);
        this.tipGirl.x = 315;
        //this.tipGirl.y = -200;
        this.tipGirl.y = 110;

        // 文字框
        this.tip = new egret.Sprite();
        this.tip.x = 585;
        this.tip.y = 60;
        this.tip.width = 585;
        this.tip.height = 60;
        this.addChild(this.tip);

        // 文字框：背景
        var tipBg:egret.Bitmap = Unity.createBitmapByName("bgTip");
        this.tip.addChild(tipBg);

        // 文字框：文字
        this.tipText = new egret.TextField();
        this.tipText.textColor = 0x000000;
        this.tipText.fontFamily = "微软雅黑";
        this.tipText.size = 30;
        this.tipText.lineSpacing = 10;
        this.tipText.x = 60;
        this.tipText.y = 50;
        this.tipText.width = 360;
        this.tip.addChild(this.tipText);

        //按钮
        var src;
        if (this.opts.btn == "continue")
            src = "btnContinue";
        else
            src = "btnReselect";

        this.btn = new Btn({
            src: src,
            x: 850,
            y: 600
        });

        this.addChild(this.btn);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBtn, this);
        this.config();
    }

    public startAnimate():void {
        // 小女生
        this.tipGirl.alpha = 0;
        var tipGirl_tw = egret.Tween.get(this.tipGirl);
        tipGirl_tw.to({alpha: 1}, 500);

        // 气泡
        this.tip.alpha = 0;
        var tips_tw = egret.Tween.get(this.tip);
        tips_tw.wait(300).to({alpha: 1}, 800);

        //按钮
        this.btn.alpha = 0;
        var btn_alpha_tw = egret.Tween.get(this.btn);
        btn_alpha_tw.wait(400).to({alpha: 1}, 800);
        var btn_tw = egret.Tween.get(this.btn, {loop: true});
        btn_tw.to({scaleX: 1, scaleY: 1}, 1000).to({scaleX: 0.8, scaleY: 0.8}, 1000);
    }

    private  touchBtn():void {
        this.btnClick();
    }

    private  config():void {
        if (this.opts.text) {
            this.tipText.text = this.opts.text;
        } else if (!this.opts.scene) {
            this.tipText.text = "来说几句吧！";
        }

        if (this.opts.scene) {
            var textFlow:Array<egret.ITextElement> = Unity.getTipText(this.opts.scene);
            this.tipText.textFlow = textFlow;
        }
        if (this.opts.x) {
            this.tipText.x = this.opts.x;
        }
        if (this.opts.y) {
            this.tipText.y = this.opts.y;
        }
        if (this.opts.width) {
            this.tipText.width = this.opts.width;
            console.log(this.opts.width);
        }
        if (this.opts.size) {
            this.tipText.size = this.opts.size;
        }

    }

    public  setText(text:string):void {
        this.tipText.text = text;
    }

}