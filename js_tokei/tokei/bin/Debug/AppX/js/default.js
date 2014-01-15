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
            document.getElementById("pickfile").addEventListener("click", pickFile);
            showTime();
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

    function pickFile() {
        var fileOpenPicker = new Windows.Storage.Pickers.FileOpenPicker();

        fileOpenPicker.fileTypeFilter.push(".jpg", ".jpeg", ".png");
        fileOpenPicker.pickSingleFileAsync().done(
            function (storageFile) {
                if (storageFile) {
                    var futureAccessList = Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList;
                    futureAccessList.add(storageFile);

                    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

                    localSettings.values["backgroundImageFlag"] = true;
                    localSettings.values["backgroundImagePath"] = storageFile.path;
                    document.body.style.backgroundImage = "url(" + URL.createObjectURL(storageFile) + ")";
                }
            }
            );
    }


    function showTime() {
        var date0bj = new Date();
        clock.textContent = date0bj.toLocaleTimeString();
        setTimeout(showTime, 1000);
    }

    app.start();
})();
