class Registor{
        constructor(){
            this.user = document.querySelector("#main .register .put .tel input")
            this.Verification = document.querySelector("#main .register .put .Verification input")
            this.pass = document.querySelector("#main .register .put .password input")
            this.rePass = document.querySelector("#main .register .put .re-password input")
            this.remember = document.querySelector("#main .register .accept .remember");
            this.btn = document.querySelector("#main .register .zhuce");
            this.telDefeat =  document.querySelector("#main .register ul.put .tel i")
            this.subSuccess =  document.querySelector("#main .register .subSuccess");
            this.passDefeat = document.querySelector("#main .register .put .password i")
            this.rePassDefeat = document.querySelector("#main .register .put .re-password i");
            this.Verification = document.querySelector("#main .register ul.put .Verification input");
            this.VerificationMa = document.querySelector("#main .register ul.put .Verification s");
            this.VerificationFeat = document.querySelector("#main .register ul.put .Verification i");
            
            this.init()
        }
        init(){
            var that = this;
            this.btn.onclick = function(){
                that.getMsg()
            }
        }
        getMsg(){
            this.msg = localStorage.getItem("msg");
            this.setMsg()
        }
        setMsg(){
            
            if(this.msg==null){
                this.msg=[{
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                }];
                this.telDefeat.innerHTML="";
                
            }else{
                this.msg = JSON.parse(this.msg);
                var that =this;
                for(var i=0;i<this.msg.length;i++){
                    if(this.user.value == this.msg[i].user){
                        this.telDefeat.innerHTML="用户名重复或不符合规则";
                        return
                    }
                }
                var telReg=/^[1]{1}\d{10}$/g;
                var passReg=/^[\da-zA-Z]{6,20}$/g;

                this.user.onblur = function(){
                    if(!telReg.test(that.user.value)){
                        that.telDefeat.innerHTML="用户名重复或不符合规则";
                    }else{
                        that.telDefeat.innerHTML=""
                    }
                }
                
                if(this.Verification.value!=this.VerificationMa.innerHTML){
                    this.VerificationFeat.innerHTML="验证码不正确";
                }else{
                    this.VerificationFeat.innerHTML=""
                }

                if(!passReg.test(this.pass.value)){
                    this.passDefeat.innerHTML="密码不符合";
                }else{
                    this.passDefeat.innerHTML=""
                }

                if(this.pass.value!=this.rePassDefeat.value){
                    this.rePassDefeat.innerHTML="与密码不一致";
                }else{
                    this.rePassDefeat.innerHTML=""
                }

                if(!this.remember.checked){
                    return
                }
                
                this.telDefeat.innerHtml="";
                this.msg.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                })
            }
            localStorage.setItem("msg",JSON.stringify(this.msg))
            setTimeout(()=>{
                location.href="login.html"
            },2000)
        }
}
new Registor;