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

            var black = document.getElementById("black");
            var green = document.getElementById("green");
            var white = document.getElementById("white");
            var blue = document.getElementById("blue");
            var red = document.getElementById("red");

            red.addEventListener("click", function () {
                penColor=colorList["red"];
            });     
            black.addEventListener("click", function () {
                penColor=colorList["black"];
            });
            green.addEventListener("click", function () {
                penColor=colorList["green"];
            });
            blue.addEventListener("click", function () {
                penColor=colorList["blue"];
            });
            white.addEventListener("click", function () {
                penColor = colorList["white"];
            });

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
    var colorList = {
        "black": "rgba(0,0,0,1)",
        "blue": "rgba(0,0,255,1)",
        "red": "rgba(255,0,0,1)",
        "green": "rgba(0,255,0,1)",
        "white": "rgba(255,255,255,1)"
    }
    var penColor = colorList["black"];



    // 描画処理
    function draw(e) {
        if (!drawFlag) return;
        var x = e.clientX;
        var y = e.clientY;
        var can = document.getElementById("canvas1");
        var context = can.getContext("2d");
        context.strokeStyle = penColor;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(oldX, oldY);
        context.lineTo(x, y);
        context.stroke();
        context.closePath();
        oldX = x;
        oldY = y;
    }


    app.start();
})();
