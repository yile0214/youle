//放大镜
class Magnifier{
	constructor(){
		this.sBox = document.querySelector("#main .information .left .sBox");
		this.sImg = document.querySelector("#main .information .left .sBox img");
		this.span = document.querySelector("#main .information .left .sBox span");
		this.bBox = document.querySelector("#main .information .left .bBox");
		this.bImg = document.querySelector("#main .information .left .bBox img");
		this.aImg = document.querySelectorAll("#main .information .left .graph img");
		this.ali = document.querySelectorAll("#main .information .left .graph li");
		this.init();
		this.addEvent();
	}
	init(){
		var that = this;
		this.sBox.onmouseover=function(){
			that.show()
		}
		this.sBox.onmouseout=function(){
			that.hide()
		}
		this.sBox.onmousemove=function(eve){
			var e = eve || window.event;
			that.move(e)
		}
	}
	show(){
		this.span.style.display="block";
		this.bBox.style.display="block";
	}
	hide(){
		this.span.style.display="none";
		this.bBox.style.display="none";
	}
	move(e){
		var l=e.pageX-this.sBox.offsetLeft-this.span.offsetWidth/2;
		var t=e.pageY-this.sBox.offsetTop-this.span.offsetHeight/2;
		if(l<0) l=0;
		if(t<0) t=0;
		if(l>this.sBox.offsetWidth-this.span.offsetWidth) l=this.sBox.offsetWidth-this.span.offsetWidth;
		if(t>this.sBox.offsetHeight-this.span.offsetHeight) t=this.sBox.offsetHeight-this.span.offsetHeight;
		this.span.style.left = l+"px";
		this.span.style.top = t+"px";
		this.x = l/(this.sBox.offsetWidth-this.span.offsetWidth);
		this.y = t/(this.sBox.offsetHeight-this.span.offsetHeight);
		this.bImg.style.left = this.x*(this.bBox.offsetWidth-this.bImg.offsetWidth)+"px";
		this.bImg.style.top = this.y*(this.bBox.offsetHeight-this.bImg.offsetHeight)+"px";
	}
	addEvent(){
		var that = this;
		for(var i=0;i<this.aImg.length;i++){
			this.aImg[i].onmouseover=function(){
				for(var j=0;j<that.ali.length;j++){
					that.ali[j].className="";
				}
				this.parentNode.className="active"
				that.prev = this.getAttribute("src");
				that.sImg.setAttribute("src",that.prev)
				that.bImg.setAttribute("src",that.prev)
			}
		}
	}
}




class Rendering{
	constructor(){
		this.left = document.querySelector("#main .information .left");
		this.information = document.querySelector("#main .information");
		this.center = document.querySelector("#main .information .center");
		this.init();
			
	}
	init(){
		var that = this;
		this.id=GetQueryString("id");
		$.ajax({
			url:"../public/json/goods.json",
			type:"get",
			success:function(res){
				that.res=res
				that.display()
			}
		})
	}
	display(){
		// console.log(this.res)
		var str="";
		var str2=""
		// console.log(this.id)
		for(var i=0;i<this.res.length;i++){
			if(this.res[i].goodId==this.id){
				str = `<div class="sBox">
							<img src="${this.res[i].src}" />
							<span></span>
						</div>
						<div class="bBox">
							<img src="${this.res[i].src}" />
						</div>
						<ul class="graph clear">
							<li class="active">
								<img src="${this.res[i].src}" />
							</li>
							<li>
								<img src="${this.res[i].src1}" />
							</li>
							<li>
								<img src="${this.res[i].src2}" />
							</li>
						</ul>`
				str2 = `<ul>
							<li>
								<h4>${this.res[i].title}</h4>
								<p>颜色随机</p>
							</li>
							<li>
								<span>商品号</span>
								<i>${this.res[i].goodId}</i>
							</li>
							<li>
								<span>价格</span>
								<i>${this.res[i].price}</i>
							</li>
							<li>
								<span>配送</span>
								<i>全国包邮</i>
							</li>
							<li class="clear">
								<span>服务</span>
								<p>本商品由邮乐网天堂伞官方旗舰店提供
	并进行相关配送和售后等服务。</p>
							</li>
							<li>
								<span>颜色</span>
								<i>随机</i>
							</li>
							<li>
								<span>规格</span>
								<i>默认</i>
							</li>
							<li>
								<span>数量</span>
								<input type="number" min="1" value="1" />
							</li>
							<li>
								<span>已选</span>
								<i>339S格颜色随机，57cm*7k，1件</i>
							</li>
						</ul>
						<div class="car clear">
							<input type="btn" class="buy" value="立即购买"/>
							<a href="car.html"><input type="btn" class="add" value="加入购物车"/></a>
							<input type="btn" class="collect" value="收藏"/>
						</div>`
						this.left.innerHTML=str;
						this.center.innerHTML=str2;
						new Magnifier;
						this.add()
						return;
			}
		}
	}
	add(){
		
		this.addBtn = document.querySelector("#main .information .center .add");
		this.click()
	}
	click(){
		var that = this
			this.msg = localStorage.getItem("msg");
		this.addBtn.onclick=function(){
			console.log(that.msg)
			if(that.msg!=null){
				that.msg=JSON.parse(that.msg);
				console.log(that.msg)
				var onoff=true;
				for(var i=0;i<that.msg.length;i++){
					console.log(1)
					if(that.msg[i].onoff==1){
						onoff=false
						that.setCookie();
						break;
					}
				}
				if(onoff||(!getCookie("thing"))){
					removeCookie("thing")
				}
					
				
				
			}else{
				if(!getCookie("thing")){
					removeCookie("thing")
					
				}
				return;
			}
		}
	}
	// click(){
// 		for(var i=0;i<this.res.length;i++){
// 			if(this.id == this.res[i].goodId){
				// this.setCookie()
// 				return
// 			}
// 		}
	// }
	setCookie(){
		this.goods = getCookie("thing")
		// console.log(this.goods)
		var onoff=true;
		 if(this.goods){
			 this.goods=JSON.parse(this.goods)
			 for(var i=0;i<this.goods.length;i++){
				 if(this.goods[i].code==this.id){
					 this.goods[i].num ++
					 onoff=false;
				 }
			 }
			 if(onoff){
				 this.goods.push({
					 code:this.id,
					 num:1
				 })
			 }
		 }else{
			this.goods = [{
				code:this.id,
				num:1
			}]
			// console.log(getCookie("shangpin"))
		 }
		setCookie("thing",JSON.stringify(this.goods))
		 
	}
}

function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

new Rendering

