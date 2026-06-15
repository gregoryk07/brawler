AssetLoader = {
    AssetsToLoad: [],
    AssetsLoadedCount: 0,
    Assets: {

    },
    isLoading: false,
    getLoadingPercentage() {
        if(AssetLoader.AssetsToLoad.length == 0) return 1;
        return AssetLoader.AssetsLoadedCount / AssetLoader.AssetsToLoad.length;
    },
    queueLoad(toLoad){
        AssetLoader.AssetsToLoad[AssetLoader.AssetsToLoad.length] = toLoad;
    },
    async loadAssets(){
        AssetLoader.isLoading = true;
        for (let i = 0; i < AssetLoader.AssetsToLoad.length; i++) {
            const _asset = AssetLoader.AssetsToLoad[i];
            let _img = new Image();
            _img.onerror = () => {
                // throw new Error("ERROR");
                _img.src = "assets/missing.png";
            }
            _img.onload = () => {
                AssetLoader.Assets[_asset] = _img;
                AssetLoader.AssetsLoadedCount++
                if(AssetLoader.getLoadingPercentage() == 1){
                    dispatchEvent(new CustomEvent("assets_loaded"));
                    AssetLoader.isLoading = false;
                }
            }
            _img.src = _asset;
        }
    },
    getResource: {
        character(name){
            if(AssetLoader.Assets["assets/characters/" + name] != null){
                return AssetLoader.Assets["assets/characters/" + name];
            }
            else{
                return AssetLoader.Assets["assets/missing.png"];
            }
        },
        particle(name){
            if(AssetLoader.Assets["assets/particles/" + name] != null){
                return AssetLoader.Assets["assets/particles/" + name];
            }
            else{
                return AssetLoader.Assets["assets/missing.png"];
            }
        },
        raw(name){
            if(name[0] == "/") name = name.substring(1);
            if(AssetLoader.Assets[name] != null){
                return AssetLoader.Assets[name];
            }
            else{
                return AssetLoader.Assets["assets/missing.png"];
            }
        }
    }
}
addEventListener("assets_loaded", () => {
    console.log("ASSETS LOADED!");
});