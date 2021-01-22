$(document).ready(function() {

    hsize = $(window).height();
    $("body").css("height", hsize + "px");
    
 package sample;

 import java.io.IOException;

 import javax.servlet.ServletException;
 import javax.servlet.annotation.MultipartConfig;
 import javax.servlet.annotation.WebServlet;
 import javax.servlet.http.HttpServlet;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import javax.servlet.http.Part;
 
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
        
        