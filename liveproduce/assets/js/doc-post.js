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

            if (doc_type == 1) {      // ライブ提案書
                // s = $('textarea[name="doc-setlist"]').val() + $('textarea[name="doc-dire"]').val();
                s = $('textarea[name="doc-dire"]').val();
            }
            else if (doc_type == 2) { // ライブ報告書
                s = $('textarea[name="doc-repo"]').val() + $('textarea[name="doc-total"]').val();
            }
            // 分析をする文章が空じゃなければ、APIに投げて結果を受ける
            if (!s == "") {
                console.log(s);
                $('#shadow').show(); // 分析が終わるまでの待機画面

                // 分析が終わるまでボタンの無効化
                $('.return').prop("disabled", true);
                $('.doc-post').prop("disabled", true);

                call_cotoha(s);

                // フォームを非表示にして、プレビュー画面を表示させる
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
        doc_score = { score: 0, sentiment: "" }; // スコアを初期化
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
        // OK をクリック
        location.href = '../index.html'; // ライブプロデュースシステムTOPへ移動
    })
})


// COTOHA_APIで感情分析結果のJSONを返す
function call_cotoha(sentence) {
    $.ajax({
        // url: '../assets/cgi/parsing.cgi',
        url: 'http://parsing.hasshie765.server-on.net/parsing.cgi',
        type: 'POST',
        data: sentence,
    }).then(
        // 成功
        function (result) {
            res = JSON.parse(result); // JSON形式に変換
            console.log(res);

            // スコアを代入
            doc_score.score = res.result.score;
            doc_score.sentiment = res.result.sentiment;

            $('#shadow').hide(); // 待機画面から抜ける
            $('.return').prop("disabled", false); // 戻るボタンの有効化

            // 結果からネガティブ感情の言葉をマークする
            negative_mark(res.result.emotional_phrase, 'negative_w');
        },
        // 失敗
        function (err) {
            console.log(err);
        })
}

// ネガティブ感情を含むワードをマークしプレビューを描画
function negative_mark(word_arr, class_name) {
    let res = "";

    if (doc_type == 1) {
        res = $('textarea[name="doc-dire"]').val();
    }
    else if (doc_type == 2) {
        res = '<h2 class="title">推し、担当 業務報告</h2>' + $('textarea[name = "doc-repo"]').val() + '<h2 class="title">総括</h2>' + $('textarea[name="doc-total"]').val();
    }

    word_arr.forEach((e) => {
        if (e.emotion == "N") {
            let SearchString = '(' + e.form + ')';
            let RegularExp = new RegExp(SearchString, "g");
            let ReplaceString = '<mark class="' + class_name + '">$1</mark>';
            let ResString = res.replace(RegularExp, ReplaceString);
            res = ResString;
        }
    })

    // 分析スコアを表示
    // sentiment == Psitive && score が 0.5 以上のとき、投稿できる
    if (doc_score.sentiment == "Positive" && doc_score.score >= 0.600) {
        $('.ps').html('感情: ' + doc_score.sentiment + '<br>' + '感情の強さ(1に近いほど強い): ' + doc_score.score + '<br>' + 'この書類を投稿することができます！');
        $('.doc-post').prop("disabled", false); // 投稿ボタンの有効化
    }
    else {
        $('.ps').html('感情: ' + doc_score.sentiment + '<br>' + '感情の強さ(1に近いほど強い): ' + doc_score.score + '<br><mark class="negative_w">' + 'もっと前向きな表現で記入してください！');
    }

    // 書類のプレビューを表示
    let doc_title = "";
    doc_title = $('textarea[name="doc-title"]').val(); // タイトル要素を代入
    if (doc_title == "") { // タイトル未記入時
        $('.doc-title').html('NO TITLE');
    }
    else {
        $('.doc-title').html(doc_title);
    }

    // ライブ提案書の場合は、感情分析を掛けていないセットリストを含めプレビューする
    if (doc_type == 1) {
        // テキストエリアの改行をbrに置換してプレビュー
        $('.doc-main').html('<h2 class="title">理想のセットリスト</h2>' + $('textarea[name="doc-setlist"]').val().replace(/\r?\n/g, '<br />') + '<h2 class="title">理想の演出</h2>' + res.replace(/\r?\n/g, '<br />'));
    }
    // ライブ報告書の場合は、そのままプレビューする
    else if (doc_type == 2) {
        // テキストエリアの改行をbrに置換してプレビュー
        $('.doc-main').html(res.replace(/\r?\n/g, '<br />'));
    }
}


// 書類投稿処理
function doc_post() {

}