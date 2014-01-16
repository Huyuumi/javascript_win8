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
            var canvas1 = document.getElementById("canvas1");
            canvas1.addEventListener("mousemove", draw, true);
            canvas1.addEventListener("mousedown", function (e) {
                drawFlag = true;
                oldX = e.clientX;
                oldY = e.clientY;
            }, true);
            canvas1.addEventListener("mouseup", function () {
                drawFlag = false;
            }, true);
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


    var drawFlag = false;
    var oldX = 0;
    var oldY = 0;


    function draw(e) {
        if (!drawFlag) return;
        var x = e.clientX;
        var y = e.clientY;
        var can = document.getElementById("canvas1");
        var context = can.getContext("2d");
        context.strokeStyle = "rbga(255,0,0,1)";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(oldX, oldY);
        context.lineTo(x, y);
        context.stroke();
        context.closePath;
        oldX = x;
        oldY = y;
        
    }


    app.start();
})();
