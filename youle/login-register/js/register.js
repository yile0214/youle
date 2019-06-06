
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
            this.check = document.querySelector("#main .register .accept i");
            this.telonoff = this.passonoff = this.Veronoff = this.repassonoff = this.rememberonoff = false;
            this.reg();
        }
        reg(){
            var telReg=/^[1]{1}\d{10}$/g;
            var passReg=/^[\da-zA-Z]{6,20}$/g;
            var that = this;
            this.VerificationMa.onclick = function(){
                that.VerificationMa.innerHTML = random(1000,9999);
                return false;
            }
            this.user.onblur = function(){
                if(telReg.test(that.user.value)){
                    that.telDefeat.innerHTML="符合";
                    that.telonoff = true;
                }else{
                    that.telDefeat.innerHTML="用户名重复或不符合规则";
                    that.telonoff = false;
                }
            }
            this.Verification.onblur = function(){
                if(that.Verification.value==that.VerificationMa.innerHTML){
                    that.VerificationFeat.innerHTML="验证成功";
                    that.Veronoff = true;
                }else{
                    that.VerificationFeat.innerHTML="验证码不正确";
                    that.Veronoff = false;
                    that.VerificationMa.innerHTML = random(1000,9999);
                }
            }
            this.pass.onblur = function(){
                if(passReg.test(that.pass.value)){
                    that.passDefeat.innerHTML="符合";
                    that.passonoff = true;
                }else{
                    that.passDefeat.innerHTML="密码不符合";
                    that.passonoff = false;
                }
                if(that.rePass.value != ""){
                    if(that.rePass.value == that.pass.value){
                        that.rePassDefeat.innerHTML="一致";
                        that.repassonoff=true;
                    }else{
                        that.rePassDefeat.innerHTML="与密码不一致";
                        that.repassonoff=false;
                    }
                }
            }
            this.rePass.onblur = function(){
                if(that.pass.value==that.rePass.value){
                    that.rePassDefeat.innerHTML="一致";
                    that.repassonoff = true;
                }else{
                    that.rePassDefeat.innerHTML="与密码不一致";
                    that.repassonoff = false;
                }
            }
            this.remember.onblur = function(){
                if(that.remember.checked){
                    // that.check.innerHTML = "";
                    that.rememberonoff = true;
                }else{
                    // that.check.innerHTML = "《请同意并勾选》";
                    that.rememberonoff = false;
                }
            }
            this.init()
        }
        init(){
            var that = this;
            this.btn.onclick = function(){
                if(that.telonoff && that.passonoff && that.repassonoff && that.Veronoff && that.rememberonoff ){
                    that.getMsg()
                }
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
                this.telDefeat.innerHTML="";
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
function random(a,b){
    return Math.round(Math.random()*(a-b)+b)
}
new Registor;