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
            initGestureSetting(document.getElementById("img1"));
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

    function initGestureSetting(element) {
        var gesture = new MSGesture();

        gesture.target = element;

        element.addEventListener("MSPointerDown", function (e) {
            gesture.addPointer(e.pointerId);
        }, false);

        element.addEventListener("MSGestureChange", imageChange, false);
    }

    function imageChange(e) {
        var matrix = new MSCSSMatrix(e.target.style.msTransform);

        e.target.style.msTransform = matrix.translate(e.translationX, e.translationY).rotate(e.rotation * 180 / Math.PI).scale(e.scale);
    }


    app.start();
})();
