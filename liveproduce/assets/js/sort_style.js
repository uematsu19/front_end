// htmlを読んでからメニューを表示させる
$(document).ready(function () {
    // スマホサイズだったら
    if (window.matchMedia('(max-width:480px)').matches) {
        // doc_form.html のみ #doc-sort が2つ
        $('#doc-sort').css('width', '200px');
        $('.sort-btn').css('font-size', '16px');
    }
})