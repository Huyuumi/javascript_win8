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
            var displayBotton = document.getElementById('button');
            displayBotton.addEventListener("click", cal);
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
    function cal() {
        var getYearMonth = document.getElementById("textBox");
        var getArray = getYearMonth.value.split("/");
        var getYear = getArray[0].split("");
        var weekTbl = new Array('日', '月', '火', '水', '木', '金', '土');
        var monthTbl = new Array('31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31');
        if (getArray[1] % 400 == 0 || (getArray[1] % 4 == 0 && getArray[1] % 100 != 0)) {
            monthTbl[1] = 29;
        }
        var AB = getYear[0] * getYear[1];
        var CD = getYear[2] * getYear[3];
        var youbi = CD + Math.floor(CD / 4) + Math.floor(AB / 4) - 2 * AB + Math.floor(13(getArray[1] + 1) / 5);
        document.write("<table border='1'>");
        document.write("<tr>");
        for (var i = 0; i < 7; i++) {
            document.write("<td>");
            document.write("<strong>", weekTbl[i], "</strong>");
            document.write("</td>");
        }
        document.write("</tr>");
        for (var day = 1; day < monthTbl[getArray[1] - 1]; day++) {
            document.write("<tr>");
            for (day; day % 7 != 0; day++) {
                document.write("<td>", day, "</td>");
                if (day == monthTbl[getArray[1]-1]) {
                    break;
                }
            }
            document.write("</tr>");
            if (day == monthTbl[getArray[1] - 1]) {
                break;
            }
        }
        document.write("</table>");
    }
    app.start();
})();

//ABCD年E月F日とした場合
//W=CD+[CD/4]+[AB/4]-2AB+[13(E+1)/5]+Fを求めます
//そしてWを7で割った余りが曜日になります。
//1234560で日月火水木金土となります。
//
//[]はガウス記号です。

