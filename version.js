class Version{
    version = [];
    constructor(versionString){
        this.version = versionString.split(".");
    }
    isGreaterThan(comparedTo){
        const ver1 = comparedTo;
        const ver2 = this;
        const minLength = Math.max(ver1.version.length, ver2.version.length);

        for (let i = 0; i < minLength; i++) {
            const v1 = ver1.version[i];
            const v2 = ver2.version[i];
            if(v1 > v2){
                return false;
            }
            else if(v1 < v2){
                return true;
            }

        }
        if(ver1.version.length < ver2.version.length){
            return true;
        }
        return false;
    }
    toString(){
        return this.version.join(".");
    }
}