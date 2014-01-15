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
        var getYearMonth = document.getElementById("textBox"); //テキストボックスの中身を参照
        var getArray = getYearMonth.value.split("/"); //'/'で月と年をわける
        var weekTbl = new Array('日', '月', '火', '水', '木', '金', '土'); //曜日をセット
        var monthTbl = new Array('31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'); //月をセット
        if (getArray[1] % 400 == 0 || (getArray[1] % 4 == 0 && getArray[1] % 100 != 0)) {
            monthTbl[1] = 29;　//うるう年なら２月を２９に
        }
        var first = new Date(parseInt(getArray[0]), parseInt(getArray[1] - 1), 1);
        var youbi = first.getDay(); //指定された月の１日の曜日を取得
        var TblLine = Math.ceil((youbi + parseInt(monthTbl[parseInt(getArray[1]) - 1])) / 7); //行を取得

        //以下カレンダー表示部
        var div = document.getElementById('cal');

        var table = document.createElement('table');
        table.setAttribute('id', 'table');
        var tbody = document.createElement('tbody');

        var tr = document.createElement('tr');

        var td = document.createElement('td');

        for (var i = 0; i < 7; i++) {　//曜日表示のループ
            var th = document.createElement('th');
            th.setAttribute('class','cells');
            th.textContent = weekTbl[i];
            tr.appendChild(th)
        }
        tbody.appendChild(tr);
        var day = 0; //日数を初期化
        for (i = 0; i < TblLine; i++) { //日付表示のループ
            var cnt = 0;
            tr = document.createElement('tr');
            tr.setAttribute('class','cells');
            for (var d = 0; (d < youbi) && (day == 0) ; d++) {
                td = document.createElement('td');
                td.setAttribute('class','cells');
                tr.appendChild(td);
                cnt++;
            }
            for (day; day != monthTbl[getArray[1] - 1]; day++) {
                td = document.createElement('td');
                td.setAttribute('class','cells');
                td.textContent = day + 1;
                tr.appendChild(td);
                cnt++;
                if ((day + 1 + youbi) % 7 == 0) { //列が終わったらbreak
                    break;
                }
            }
            tbody.appendChild(tr);
            
            if (day == monthTbl[getArray[1] - 1]) { //日数が指定月の最後まで進んでたらbreak
                break;
            }
            day++;
        }
        for (cnt; cnt < 7; cnt++) {　//余った空白セル表示のループ
            td = document.createElement('td');
            td.setAttribute('class', 'cells');
            tr.appendChild(td)
        }

        table.appendChild(tbody);
        div.appendChild(table); //divタグにセット
    }
    //以下参考コードです。
    //function ex() {


    //    var a_data = new Array();

    //    //配列の要素に連想配列をセット
    //    a_data.push({ 'name': 'apple', 'price': 100 });
    //    a_data.push({ 'name': 'orange', 'price': 200 });
    //    a_data.push({ 'name': 'peach', 'price': 150 });

    //    var div = document.getElementById('cal');

    //    //テーブル要素作成
    //    var table = document.createElement('table');
    //    var tbody = document.createElement('tbody');

    //    //テーブルの見出し行
    //    var tr = document.createElement('tr');
    //    var th1 = document.createElement('th');
    //    var th2 = document.createElement('th');

    //    th1.appendChild(document.createTextNode('name'));
    //    th2.appendChild(document.createTextNode('price'));

    //    tr.appendChild(th1);
    //    tr.appendChild(th2);

    //    tbody.appendChild(tr);

    //    //テーブルのデータ行
    //    for (var i = 0; i < a_data.length; i++) {

    //        tr = document.createElement('tr');
    //        var td1 = document.createElement('td');
    //        var td2 = document.createElement('td');

    //        td1.appendChild(document.createTextNode(a_data[i]["name"]));
    //        td2.appendChild(document.createTextNode(a_data[i]["price"]));

    //        tr.appendChild(td1);
    //        tr.appendChild(td2);

    //        tbody.appendChild(tr);
    //    }

    //    table.appendChild(tbody);

    //    //class属性つけたいとき
    //    if (document.documentElement.getAttribute("style") == document.documentElement.style) {
    //        table.setAttribute("className", "test");
    //    } else {
    //        table.setAttribute("class", "test");
    //    }

    //    //DIV要素にテーブルをセット
    //    div.appendChild(table);

    //}
    app.start();
})();
