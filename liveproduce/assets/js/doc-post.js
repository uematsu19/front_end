let doc_type = 0; // 選択された書類タイプ
// 0 == 未選択
// 1 == 提案書
// 2 == 報告書

let doc_score = { score: 0, sentiment: "" }; // 感情分析結果

$(document).ready(function () {
    // 初期画面
    $('#sugg').hide();
    $('#repo').hide();
    $('#doc-pre').hide();
    $('#post-btn').hide();

    // ボタンのイベントリスナー
    // 提案書ボタン
    $('#sugg-btn').on('click', function () {
        doc_type = 1;
        $('#sugg-btn').css({ 'background': 'lightskyblue', 'color': "white" });
        $('#repo-btn').css({ 'background': 'white', 'color': 'black' });
        $('.ps').html('※文字数制限はありません。枠内で改行することができます。');
        $('#sugg').fadeIn();
        $('#repo').hide();
    })
    // 報告書ボタン
    $('#repo-btn').on('click', function () {
        doc_type = 2;
        $('#repo-btn').css({ 'background': 'lightskyblue', 'color': "white" });
        $('#sugg-btn').css({ 'background': 'white', 'color': 'black' });
        $('.ps').html('※文字数制限はありません。枠内で改行することができます。');
        $('#sugg').hide();
        $('#repo').fadeIn();
    })
    // 確認ボタン
    $('.pre-btn').on('click', function () {
        if (doc_type == 0) {
            alert('記入する書類を選択してください。');
        }
        else {
            let s = ""; // 感情分析をする文章

            if (doc_type == 1) {
                s = $('textarea[name="doc-setlist"]').val() + $('textarea[name="doc-dire"]').val();
            }
            else if (doc_type == 2) {
                s = $('textarea[name="doc-repo"]').val() + $('textarea[name="doc-total"]').val();
            }
            // 分析をする文章が空じゃなければ、APIに投げて結果を受ける
            if (!s == "") {
                console.log(s);
                call_cotoha(s);

                // フォームを非表示にして、プレビュー画面を表示させる
                $('.ps').hide();
                $('#doc-form').hide();
                $('.pre-btn').hide();
                $('#doc-pre').fadeIn();
                $('#post-btn').fadeIn();
            }
            else {
                alert('フォームに未記入があります。')
            }
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
        // sentiment == Psitive && score が 0.5 以上のとき、投稿できる
        if (doc_score.sentiment == "Positive" && doc_score.score >= 0.500) {
            alert('投稿しました！');
            doc_post();
        }
        else {
            alert('ポジティブな表現での記入をお願いします。');
        }
    })
})


// COTOHA_APIで感情分析結果のJSONを返す
function call_cotoha(sentence) {
    $.ajax({
        url: '../assets/cgi/parsing.cgi',
        type: 'POST',
        data: sentence,
    }).then(
        // 成功
        function (result) {
            console.log(result);
            res = JSON.parse(result); // JSON形式に変換
            console.log(res);

            // スコアを代入
            doc_score.score = res.result.score;
            doc_score.sentiment = res.result.sentiment;

            // 結果からネガティブ感情の言葉をマークする
            negative_mark(sentence, res.result.emotional_phrase, 'negative_w');
        },
        // 失敗
        function (err) {
            console.log(err);
        })
}

// ネガティブ感情を含むワードをマークする
function negative_mark(str, word_arr, class_name) {
    let res = str;

    word_arr.forEach((e) => {
        if (e.emotion == "N") {
            let SearchString = '(' + e.form + ')';
            let RegularExp = new RegExp(SearchString, "g");
            let ReplaceString = '<mark class="' + class_name + '">$1</mark>';
            let ResString = res.replace(RegularExp, ReplaceString);
            res = ResString;
        }
    })

    // マークした要素を代入
    $('.doc-main').html(res);
}


// 書類投稿処理
function doc_post() {

}