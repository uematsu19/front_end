$(document).ready(function() {


    hsize = $(window).height();
    $("body").css("height", hsize + "px");


    var options = ["cicon", "sicon"];
    //var camera = { zidou:"自動", syouta:"翔太", senra:"センラ"}
    var optionsC = ["グクホン","ユビン"]
    var optionsS = ["グクホン","ユビン"]

    //$('.pic').append("<img src=\"zidou.png\" alt=\"pic\" title=\"pic\">");
    optionsC.forEach(function(e) {
      $('.zentai').append("<div id=\"" + e + "pic\"><video src=\"" + e + ".mp4\" type=\"video/mp4\" width=\"720\" height=\"480\"controls　autoplay></video></div>");
        //$("#"+ e + "pic").hide();
        $('.zentai').hide();
        $('.y').hide();
    });


 
    options.forEach(function(e) {
      $('.mode').append("<div class=" + e + "><button type=\"button\"><img src=\"" + e + ".png\" alt=\"button\" width=\"100\" height=\"100\"/></button></div>");
      $('.sicon').hide(); 
      $('.sselections').hide();
    });

    optionsC.forEach(function(e) {
      $('.cselect').append("<a href=\"javascript:void(0)\"><div id=\"" + e + "view\" class=\"btn btn" + optionsC.indexOf(e) + " btn--circle btn--circle-a btn--shadow\">" + e + "</div></a>");
      $('.cselect').append("<a href=\"javascript:void(0)\"><div id=\"" + e + "viewed\" class=\"btn btn" + optionsC.indexOf(e) + " btn--circle btn--circle-a btn--shadow\">" + e + "</div></a>");
      $("#"+ e + "viewed").hide();
      $("#"+ e + "view").hide();
      $('.kirikae1').hide();


       $('.kirikae').on('click',function(){
          $('.kirikae').hide();
          $('.kirikae1').show();
          $("#"+ e + "view").show();
          $("#"+ e + "viewed").hide();
          $('.btn-circle-border-simple').hide();
          $('.x').show();
          $('.y').hide();
          //$('.mv').show();
          //$("#"+ e + "pic").hide()
       });

       $('.kirikae1').on('click',function(){
          $('.kirikae1').hide();
          $('.kirikae').show();
          $("#"+ e + "view").hide();
          $("#"+ e + "viewed").hide();
          $('.btn-circle-border-simple').show();
          $('.mv').show();
          $("#"+ e + "pic").hide();
          $('.zentai').hide();
          $('.y').hide();
       });

       $("#"+ e + "view").on('click',function(){
          $("#"+ e + "view").hide();
          $("#"+ e + "viewed").show();
          $('.btn-circle-border-simple').show();
          $('.zentai').show();
          optionsC.forEach(function(e1) {
            if (e1 == e){
              $("#"+ e1 + "pic").show();
            }else{
              $("#"+ e1 + "pic").hide();
            }
          });
          $('.mv').hide();
          $('.y').show();
          $('.x').hide();
       });

       $("#"+ e + "viewed").on('click',function(){
          $("#"+ e + "view").show();
          $("#"+ e + "viewed").hide();
          $('.btn-circle-border-simple').hide();
          $('.zentai').show();
          $('.y').show();
          $('.x').hide();
          //$('.mv').hide();
          
        });
      
   

      //$("#"+ e + "view").on('click',function(){
      
        //optionsC.forEach(function(e1) {
          //$("#"+ e + "view").hide();
          //if (e1 == e){
            //$("#"+ e1 + "pic").show();
            //$("#viewed").show();
            //$('.angles').show();
            //$('.cselect').append("<a href=\"javascript:void(0)\"><div id=\"" + e + "viewed\" class=\"btn btn" + optionsC.indexOf(e) + " btn--circle btn--circle-a btn--shadow\">" + e + "</div></a>");
          //}else{
            //$("#"+ e1 + "pic").hide();
            //$("#"+ e1 + "view").hide();
          //}
        //});
      //});

      //$("#"+ e + "viewed").on('click',function(){
        //$("#"+ e + "viewed").hide();
      
        //$('.angles').hide();
        //optionsC.forEach(function(e1) {
          //$("#"+ e1 + "view").show();
        //});
      //});

    });

    optionsS.forEach(function(e) {
      $('.sselect').append("<a href=\"javascript:void(0)\"><div id=\"" + e + "view\" class=\"btn btn" + optionsS.indexOf(e) + " btn--circle btn--circle-a btn--shadow\">" + e + "</div></a>");
      $('.sselect').append("<a href=\"javascript:void(0)\"><div id=\"" + e + "viewed\" class=\"btn btn" + optionsS.indexOf(e) + " btn--circle btn--circle-a btn--shadow\">" + e + "</div></a>");
      $("#"+ e + "viewed").hide();

      $("#"+ e + "view").on('click',function(){
        optionsS.forEach(function(e1) {
          $("#"+ e + "view").hide();
          if (e1 == e){
            $("#"+ e1 + "sound").show();
            $("#"+ e1 + "viewed").show();
            //$('.cselect').append("<a href=\"javascript:void(0)\"><div id=\"" + e + "viewed\" class=\"btn btn" + optionsC.indexOf(e) + " btn--circle btn--circle-a btn--shadow\">" + e + "</div></a>");
          }else{
            $("#"+ e1 + "sound").hide();
            $("#"+ e1 + "view").hide();
          }
        });
      });

      $("#"+ e + "viewed").on('click',function(){
        $("#"+ e + "viewed").hide();
        optionsS.forEach(function(e1) {
          $("#"+ e1 + "view").show();
        });
      });

    });




    //optionsS.forEach(function(e) {
      //$('.sselections').append("<div class=\"sselect\"><a href=\"javascript:void(0)\"><div id=" + e + " class=\"btn btn" + optionsS.indexOf(e) + " btn--circle btn--circle-a btn--shadow\">" + e + "</div></a></div>");
      //$('.sselections').hide();
      //$("#"+ e + "").on('click',function(){
      //  optionsS.forEach(function(e1) {
      //    if (e1 == e){
      //      $("#"+ e1 + "pic").show();
      //    }else{
      //      $("#"+ e1 + "pic").hide();
      //    }
      //  });
      //});
    //});

    $('.cicon').on('click',function(){
        // クリックした要素の ID と同じアイコンを非表示
        $('.cicon').hide();
        $('.cselections').hide();
        // クリックした要素の ID と違うアイコンを表示
        $('.sicon').show();
        $('.sselections').show();
    });

    $('.sicon').on('click',function(){
        // クリックした要素の ID と同じアイコンを非表示
        $('.sicon').hide();
        $('.sselections').hide();
        // クリックした要素の ID と違うアイコンを表示
        $('.cicon').show();
        $('.cselections').show();
    });

});
//$(window).on('resize',function(){
//    winH = $(window).height();
//    $('.box').outerHeight(winH);

//});
$(window).resize(function () {
  hsize = $(window).height();
  $("body").css("height", hsize + "px");
});


//<button type=\"button\" id=\"CameraMicrophone\">\"カメラ\"</button>



