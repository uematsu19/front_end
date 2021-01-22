$(document).ready(function() {

    hsize = $(window).height();
    $("body").css("height", hsize + "px");


 @MultipartConfig
 @WebServlet("/upload")
 public class UploadServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        for (Part part: request.getParts()) {
            System.out.println("Name:" + part.getName());
            System.out.println("Type:" + part.getContentType());
            System.out.println("Size:" + part.getSize());
        }
 }

 var TARGET = document.getElementById('sound');

 function play(){
    TARGET.play();
 }

 function pause(){
    TARGET.pause();
 }

 function go(seconds){
    TARGET.currentTime = seconds;
 }

 function skip(seconds){
    TARGET.currentTime += seconds;
 }
 
 function reset(){
    TARGET.pause();
    TARGET.currentTime = 0;
}

 function mute(){
    if(TARGET.muted){
        TARGET.muted = false;
    }else{
        TARGET.muted = true;
    }
 }

 function rateup(Num){
    // play()後反映、1が通常、0が停止
    TARGET.play();
    TARGET.playbackRate += Num;
 }

 function ratedown(Num){
    TARGET.play();
    TARGET.playbackRate -= Num;
 }

 function timeupdate(){
    TARGET.play();
    TARGET.addEventListener("timeupdate", function() {
        var NOW = Math.floor(TARGET.currentTime);
        document.getElementById('btn_time').innerHTML = NOW + 's';
    }, true);
 }

 function duration(){
    var TOTAL = Math.round(TARGET.duration);
    document.getElementById('btn_duration').innerHTML = TOTAL + 's';
 }
 
 function volume(Num){
    TARGET.volume = Num;
 }
 
 var TARGET = document.getElementById('sound');
        $(function () {
            $('a').click(function () {
                if (!TARGET.paused) {
                    var TOTAL = Math.round(TARGET.duration);
                    TARGET.addEventListener("timeupdate", function () {
                        var NOW = Math.round(TARGET.currentTime);
                        var PERCE = (NOW / TOTAL * 100) + '%';
                        $('#bar').css({ 'width': PERCE });
                    }, true);
                }
            });
        });
        
        

this.$video = $('#video');
    
//イベントリスナを設定した後に記述
oCom.call(this, this.showVideo,[],"");

showVideo:function(){
    this.$video.attr('src','./bin/page/top/img/pro.mp4'); //Videoタグに動画srcを追加
}

this.$video = $('#video');
    

this.$PlayBtn = $('#playBtn');
this.isPlay = false; //停止か再生か
var oSelf = this;
 
this.$PlayBtn.on("click",function(e){
    oSelf.onClickPlayBtn.apply(oSelf,[e]);
});
 
/*Playボタン_クリック時*/
onClickPlayBtn:function(e){
    if(this.isPlay){ //再生中だったら
        this.$PlayBtn.html('▶');
        this.isPlay = false;
        this.$video[0].pause();
    }else{ //停止中だったら
        this.$PlayBtn.html('| |');
        this.isPlay = true;
        this.$video[0].play();
    }
}

this.$RateBtn = $('.rateBtn');
 
this.$RateBtn.on("click",function(e){
    oSelf.onClickRateBtn(this); //クリックした.ratebtnをthisに格納
});
 
/**
* レートボタンクリック時の処理
*/
onClickRateBtn:function(target){
    var rate = $(target).data("rate"); //.rateBtn に設定したdata-rateを取得
    this.$video[0].playbackRate = rate; //取得したdata-rateを動画の速度に設定
 
    this.$RateBtn.css('background-color','#fff').css('color','#000'); //.rateBtn をすべて白ボタンに
    $(target).css('background-color','#000').css('color','#fff'); //クリックされた.rateBtn を黒ボタンに
}

this.$video.on('loadeddata',function(e){
    oSelf.showDuration.apply(oSelf,[e]); //全体の時間を表示
});
 
/*初期状態で全体の時間表示*/
showDuration:function(e){
    var AllTime = this.$video[0].duration;
    //全体の時間表示
    var duration_of_time = this.reTime(AllTime);
    this.$FullTime.html(duration_of_time.hour + ':' + duration_of_time.min + ':' + duration_of_time.sec);
},
/*秒を時間何分何秒になおす計算*/
reTime:function(time){
    var CalTime = { //連想配列を先に作っておく
        hour : Math.floor(time / 3600), //時間
        min : Math.floor(time / 60), //分
        sec : Math.floor(time % 60) //秒
    }
    for( var item in CalTime ) { //for in 構文
        CalTime[item] = ('0' + CalTime[item]).slice(-2);
    }
    return CalTime; //CalTimeオブジェクトの中のhour,min,secに値を返す
}

this.$VolumeBtn = $('#volumeBtn');
 
this.$VolumeBtn.on("click",function(e){
    oSelf.onClickVolumeBtn.apply(oSelf,[e]);
});
 
/*音量ボタン_クリック時*/
onClickVolumeBtn:function(e){
    this.$video[0].muted = this.$video[0].muted ? false : true; //動画をミュートにする
 
    if(this.$video[0].muted){ //ミュートだったら
        this.$VolumeBtn.html('音量ON');
        this.showVolumeBarMute();
    }else{
        this.$VolumeBtn.html('音量OFF');
        this.showVolumeBar();
    }

}

this.$VolumeBox = $('#volumebox');
this.$VolumeBar = $('.volumebar');
 
this.$VolumeBox.on("click",function(e){
    oSelf.onClickVolumeBar.apply(oSelf,[e]);
});
 
onClickVolumeBar:function(e){
    if(this.$video[0].muted){ 
        this.onClickVolumeBtn.apply(this,[e]);
    }
 
    var ClickX = e.offsetX;
    var VolumeBoxW = this.$VolumeBox.width();
    var iPer = ClickX / VolumeBoxW;
 
    if (iPer > 1){
        iPer = 1;
    }else if(iPer < 0.01){ //ボリュームバーの0.00をクリックしたら、次ON押したときに一個前の数値をボリュームバーに入れるために onClickVolumeBtn へ飛ばす
        this.onClickVolumeBtn.apply(this,[e]);
        return;
    }
 
    this.$video[0].volume = iPer;
 
    this.showVolumeBar();
},  
/*ボリュームバー_CSS反映*/
showVolumeBar:function(e){
    var NowVolume = this.$video[0].volume;
    var FullVolume = 1.0;
    var iPerVolume = NowVolume / FullVolume;
 
    iPerVolume = Math.round(iPerVolume * 100)/100;
    
    if(iPerVolume <= 0){
        this.$VolumeSize.html("0.00");
    }else if(iPerVolume < 1){
        this.$VolumeSize.html((iPerVolume + '0').slice(0,4));
    }else{
        this.$VolumeSize.html("1.00");
    }
 
    this.$VolumeBar.css({'width': iPerVolume*100 + '%'});
},
showVolumeBarMute:function(){
    this.$VolumeSize.html("0.00");
    this.$VolumeBar.css({'width':'0%'});
}


var values = $( "#slider" ).slider( "option", "values" );

// Index指定で取得
var value0 = $( "#slider" ).slider( "option", "values", 0 );

// 配列で設定
$( "#slider" ).slider( "option", "values", [ 5, 7 ] );

// Index指定で設定
$( "#slider" ).slider( "option", "values", 0, 5 );
