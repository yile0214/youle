class AllLogin{
    constructor(){
        this.loginSuc=document.querySelector("#top-t .margin .right .wel s");
        this.land=document.querySelector("#top-t .margin .right .land");
        this.excit=document.querySelector("#top-t .margin .right .wel a");
        this.init()
        this.addEvent()
    }
    addEvent(){
        var that = this;
        this.excit.onclick=function(){
            for(var i=0;i<that.msg.length;i++){
                if(that.msg[i].user == that.name){
                    that.msg[i].onoff = 0;
                    
                    that.land.style.display="block";
                    that.loginSuc.innerHTML= "";
                    that.excit.innerHTML="";
                    localStorage.setItem("msg",JSON.stringify(that.msg));
                    return
                }
            }
           
        }
    }
    init(){
        
        this.msg = localStorage.getItem("msg")?JSON.parse(localStorage.getItem("msg")):[];
        this.check()
    }
    check(){
        for(var i=0;i<this.msg.length;i++){
            if(this.msg[i].onoff==1){
                this.loginSuc.innerHTML = this.msg[i].user
                this.land.style.display="none";
                this.excit.innerHTML="退出";;
                this.name = this.msg[i].user;
                return
            }
        }
    }
}
new AllLogin