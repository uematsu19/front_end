let doc_select = 0;
$(document).ready(function () {
    // 初期画面
    $('#sugg').hide();
    $('#repo').hide();
    $('#doc-pre').hide();
    $('#post-btn').hide();

    // ボタンのイベントリスナー
    // 提案書ボタン
    $('#sugg-btn').on('click', function () {
        doc_select = 1;
        $('#sugg-btn').css({ 'background': 'lightskyblue', 'color': "white" });
        $('#repo-btn').css({ 'background': 'white', 'color': 'black' });
        $('.ps').html('※文字数制限はありません。枠内で改行することができます。');
        $('#sugg').fadeIn();
        $('#repo').hide();
    })
    // 報告書ボタン
    $('#repo-btn').on('click', function () {
        doc_select = 2;
        $('#repo-btn').css({ 'background': 'lightskyblue', 'color': "white" });
        $('#sugg-btn').css({ 'background': 'white', 'color': 'black' });
        $('.ps').html('※文字数制限はありません。枠内で改行することができます。');
        $('#sugg').hide();
        $('#repo').fadeIn();
    })
    // 確認ボタン
    $('.pre-btn').on('click', function () {
        if (doc_select == 0) {
            alert('記入する書類を選択してください。');
        }
        else {
            $('.ps').hide();
            // プレビュー画面を表示させる
            $('#doc-form').hide();
            $('.pre-btn').hide();
            $('#doc-pre').fadeIn();
            $('#post-btn').fadeIn();
        }
    })
    // 戻るボタン
    $('.return').on('click', function () {
        // フォームを表示し、プレビューは非表示
        $('.ps').fadeIn();
        $('#doc-form').fadeIn();
        $('.pre-btn').fadeIn();
        $('#doc-pre').hide();
        $('#post-btn').hide();
    })
    // 投稿ボタン
    $('.doc-post').on('click', function () {
        alert('投稿しました！');
        doc_post();
    })
})

// 書類投稿処理
function doc_post() {

}