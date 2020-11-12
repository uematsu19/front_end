// htmlを読んでからメニューを表示させる
$(document).ready(function () {
    if (window.matchMedia('(max-width:480px)').matches) {
        $('#doc-sort').css('width', '200px');
    }
})