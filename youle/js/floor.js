$("#aside-l").find("li").click(function(){
    if($(this).index()==5){
        $("html").animate({
            scrollTop:0
        })
    }else{
        $("html").animate({
            scrollTop:$("#floor").find(".category").children("li").eq($(this).index()).offset().top
        })
    }
})

$("#banner").find(".menu").children(".menu-child").hover(function(){
    $(this).css("background","#fff").children("ul").css("display","block").end().siblings().children("ul").css("display","none")
},function(){
    $("#banner").find(".menu").children(".menu-child").css("background","").children("ul").css("display","none")
})