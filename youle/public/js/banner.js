;(function($){
    "use strict";
    $.fn.banner = function(options){
        var {list,items,left,right,autoPlay,delayTime,moveTime,index} = options;

        list = list===false ? false : true;
        autoPlay = autoPlay===false ? false : true;
        delayTime = delayTime || 2000;
        moveTime = moveTime || 200;
        index = index || 0;


        let move = function (direct){
            items.eq(iPrev).css({
                left:0
            }).stop().animate({
                left:items.eq(0).width() * direct
            },moveTime).end().eq(index).css({
                left:-items.eq(0).width() * direct
            }).stop().animate({
                left:0
            },moveTime)

            if(list){
                $(".list").children().eq(iPrev).css({background:"#fff"}).end().eq(index).css({background:"#c7181d"});
            }

        }


        let iPrev = items.length-1;

        function rightEvent(){

            if(index == items.length-1){
                index = 0;
                iPrev = items.length-1
            }else{
                index++;
                iPrev = index-1;
            }
 
            move(-1)
        }
        function leftEvent(){

            if(index == 0){
                index = items.length-1;
                iPrev = 0
            }else{
                index--;
                iPrev = index + 1;
            }
 
            move(1)
        }
        
        if(left != undefined && left.length>0 && right != undefined && right.length>0){
 

            left.click(leftEvent);
            right.click(rightEvent);
        }

        if(list){

            var str = "";
            for(var i=0;i<items.length;i++){
                str += `<li></li>`
            }
            this.append($("<ul class='list'>").html(str));

            $(".list").css({
                height:30,
                width:"240px",
                position:"absolute",
                left:0,bottom:"8px",right:0,
                margin:"0 auto",listStyle:"none",padding:0,
                display:"flex"
            }).children().css({
                flex:1,
                background:"#fff",
                width:"20px",
                height:"20px",
                borderRadius:"30px",
                margin:"0 5px"
            }).eq(index).css({
                background:"#c7181d"
            })


            let move = function(direct,iPrev,iNow){
                items.eq(iPrev).css({
                    left:0
                }).stop().animate({
                    left:-items.eq(0).width() * direct
                },moveTime).end().eq(iNow).css({
                    left:items.eq(0).width() * direct
                }).stop().animate({
                    left:0
                },moveTime)
            }


            $(".list").children("li").click(function(){

                if($(this).index() > index){

                    move(1,index,$(this).index())
                }
                if($(this).index() < index){
 
                    move(-1,index,$(this).index())
                }
                

                $(".list").children("li").eq(index).css({background:"#fff"}).end().eq($(this).index()).css({background:"#c7181d"})


                index = $(this).index();
            })
        }

  
        if(autoPlay){
            let timer;

            timer = setInterval(() => {

                rightEvent()
            }, delayTime);

  
            this.hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(() => {

                    rightEvent()
                }, delayTime);
            })
        }
    }
})(jQuery);