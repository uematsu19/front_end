let doc_select = 0;
$(document).ready(function () {
    // 初期画面
    $('#sugg').hide();
    $('#repo').hide();

    // ボタンのイベントリスナー
    // 提案書ボタン
    $('#sugg-btn').on('click', function () {
        doc_select = 1;
        $('#sugg-btn').css({ 'background': 'lightskyblue', 'color': "white" });
        $('#repo-btn').css({ 'background': 'white', 'color': 'black' });
        $('#sugg').show();
        $('#repo').hide();
    });
    // 報告書ボタン
    $('#repo-btn').on('click', function () {
        doc_select = 2;
        $('#repo-btn').css({ 'background': 'lightskyblue', 'color': "white" });
        $('#sugg-btn').css({ 'background': 'white', 'color': 'black' });
        $('#sugg').hide();
        $('#repo').show();
    })
    // 確認ボタン
    $('.pre-btn').on('click', function () {
        if (doc_select == 0) {
            alert('記入する書類を選択してください。');
        }
    })
})