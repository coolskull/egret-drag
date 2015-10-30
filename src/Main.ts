class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView:LoadingUI;
    static currentScene:any;
    static currentIndex:number;
    static linkAarray:Array<any> = [];


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        RES.loadGroup("sounds",1);
        RES.loadGroup("preload",2);
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }

    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    public createScene():void {
        //游戏场景层，游戏场景相关内容可以放在这里面。
        var _self = this;
        Main.currentIndex = 0;
        Main.currentScene = new Showcase17();
        Main.currentScene.createScene();
    }

    /**
     *移除场景
     */
    static removeScene():void {
        var _self = this;
        var container = egret.MainContext.instance.stage;

        var count = 1;
        var index = 0;
        for(var i=0; i < container.$children.length; i++){
            var o = container.$children[i];
            if(o.name.substr(0,2) == 'sc') {
                count++;
                if(count == 2) {
                    index = i;
                }
            }
        }
        if(count > 1) {
            container.removeChildAt(index);
        }
    }

    /*
     * 下一场景
     * */
    static nextScene(numb):void {
        switch (numb) {
            case 17:
                Main.currentScene = new Showcase17();
                break;
        }
        console.log(numb);
        Main.currentScene.createScene();
    }

}


