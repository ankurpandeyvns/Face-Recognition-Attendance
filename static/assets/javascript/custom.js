$(function(){
    // Codes Here
    $('.sidenav').sidenav();
    $("#click").click(function(e){
        e.preventDefault();
        $("form#takepic").submit();
    });
    $("#app-container").css({
        "max-height" : $(window).height() - 50,
        "max-width" : $(window).width(),
        "padding" : "10px"
    });
});