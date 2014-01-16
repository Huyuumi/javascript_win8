// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: このアプリケーションは新しく起動しました。ここでアプリケーションを
                // 初期化します。
            } else {
                // TODO: このアプリケーションは中断状態から再度アクティブ化されました。
                // ここでアプリケーションの状態を復元します。
            }
            args.setPromise(WinJS.UI.processAll());
            draw();
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: このアプリケーションは中断しようとしています。ここで中断中に
        // 維持する必要のある状態を保存します。中断中に自動的に保存され、
        // 復元される WinJS.Application.sessionState オブジェクトを使用
        // できます。アプリケーションを中断する前に非同期操作を完了する
        // 必要がある場合は、args.setPromise() を呼び出して
        // ください。
    };

    function draw() {
        var canvas1 = document.getElementById("canvas1");
        var context = canvas1.getContext("2d");
        context.globalAlpha = 0.3;
        for (var i = 0; i < 200; i++) {
            var color = Math.floor(Math.random() * 0xFFFFFF).toString(16);


            context.strokeStyle = "#" + color;
            context.beginPath();
            context.moveTo(Math.floor(Math.random() * 640), Math.floor(Math.random() * 480)); 
            context.lineTo(Math.floor(Math.random() * 640), Math.floor(Math.random() * 480));
            context.closePath();
            context.stroke();
        }
    }


    app.start();
})();
