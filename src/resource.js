var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    flare_jpg: "res/flare.jpg",
    loading_png: "res/loading.png",
    menu_png: "res/menu.png",
    textureTransparentPack_png: "res/textureTransparentPack.png",
    textureTransparentPack_plist: "res/textureTransparentPack.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}