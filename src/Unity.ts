/**
 * Created by Administrator on 2015/10/14.
 */
class Unity {
    public constructor() {
    }

    static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    static goonAnimate(obj:any) {

        obj.anchorOffsetX = 50;
        obj.anchorOffsetY = 50;
        var tw = egret.Tween.get( obj, {loop: true});
        tw.to({
            scaleX: 0.8,
            scaleY: 0.8
        }, 1000)
            .to({
                scaleX:1,
                scaleY: 1
            }, 1000);
    }
    static getTipText(key:string){
        var tipTextList:Array<string> =RES.getRes("tipTextList");
        var parser:egret.HtmlTextParser = new egret.HtmlTextParser();
        var result=  parser.parser(tipTextList[key]);

        return result;
    }
    static autoTouchSound(sounds:Array<string>){
        for(var i:number = 0;i < sounds.length;i++){
            var sound:egret.Sound = RES.getRes(sounds[i]);
            var channel:egret.SoundChannel = sound.play(0,1);
            channel.stop();
        }
        
    }
}