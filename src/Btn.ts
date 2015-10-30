class Btn extends egret.Sprite {
    public opts;
    private bg:egret.Bitmap;

    public  constructor(opts) {
        super();
        this.opts = opts;
        this.createBtn();
    }

    private  createBtn() {
        // 添加继续按钮
        var opts=this.opts;
        var src = (opts.src) ? opts.src : "btnContinue";
        this.bg = Unity.createBitmapByName(src);
        this.addChild(this.bg);

        if (opts.width) {
        this.width=opts.width;
        this.bg.width=opts.width;
        }

        if (opts.height) {
        this.height=opts.height;
        this.bg.height=opts.height;
        }

        this.x = (opts.x) ? opts.x-50 : 1225;
        this.y = (opts.y) ? opts.y-50: 720;
        this.touchEnabled = true;
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 50;
        var animate=( opts.animate==false) ? false: true;
        if (animate) {
            Unity.goonAnimate(this);
        }
    }


}