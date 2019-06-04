class login{
    constructor(){
        this.user = document.querySelector("#main .login input.user");
        this.pass = document.querySelector("#main .login input.pass");
        this.passSpan = document.querySelector("#main .login .put span");
        this.btn = document.querySelector("#main .login .forget .sub");
        this.logFeat = document.querySelector("#main .login .forget .logIn");
        this.init()
    }
    init(){
        var that = this;
        this.btn.onclick=function(){
            that.getMsg()
        }
    }
    getMsg(){
       console.log(localStorage.getItem("msg"))
       this.msg = localStorage.getItem("msg");
       if(this.msg){
           this.msg = JSON.parse(this.msg)
       }else{
           this.msg = [];
       }
       this.check()
    }
    check(){
        for(var i=0;i<this.msg.length;i++){
            if(this.msg[i].user == this.user.value&&this.msg[i].pass == this.pass.value){
                this.msg[i].onoff=1;
                localStorage.setItem("msg",JSON.stringify(this.msg));
                setTimeout(()=>{
                    location.href="../index.html"
                },2000)
                return
            }

        }
        this.logFeat.innerHTML="用户名或密码错误"
    }
}

new login;