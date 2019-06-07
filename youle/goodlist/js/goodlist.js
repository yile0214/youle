class Data{
        constructor(){
            this.allList = document.querySelector("#main .allList");
 
            this.init()
			this.addEvent()
        }
        init(){
            var that = this;
            $.ajax({
                url:"../public/json/goods.json",
                type:"get",
                success:function(res){
					// console.log(res)
                    that.res = res;
                    that.display()
                }
            })
        }
        display(){
            var str = ""
			for(var j=0;j<4;j++){
				for(var i=0;i<this.res.length;i++){
					if(i<8){
						str += `<li goodId="${this.res[i].goodId}">
									<input type="button" class="add" value="加入购物车"/>
									<a href="details.html?id=${this.res[i].goodId}">
										<img src="${this.res[i].src}" alt="">
										<p>${this.res[i].title}</p>
										<span>${this.res[i].price}</span>
									</a>
								</li>`	
					}
				}
			}
            $(this.allList).html(str);
        }
		addEvent(){
			var that = this
		
			console.log(this.allList)
			this.allList.onclick=function(eve){
				console.log(1)
				var e = eve || window.event;
				var target = e.target || e.srcElement;
				if(target.className=="add"){
					console.log(1)
					that.id = target.parentNode.getAttribute("goodId");
					
					console.log(that.id)
					that.jduge();
					e.cancelBubble=true;
				}
			}
		}
		jduge(){
			this.msg = localStorage.getItem("msg");
			console.log(this.msg)
			if(this.msg!=null){
				this.msg = JSON.parse(this.msg);
				var on = true;
				for(var i=0;i<this.msg.length;i++){
					if(this.msg[i].onoff==1){
						on=false;
						location.href="car.html"
						this.setCookie()
						break;
					}
				}
				if(on){
					removeCookie("thing")
				}
			}else{
				// if(getCookie("thing")){
					removeCookie("thing")
				// }
				return;
			}
		}
		setCookie(){
			this.goods = getCookie("thing");
			if(this.goods){
				this.goods=JSON.parse(this.goods);
				var off=true;
				for(var i=0;i<this.goods.length;i++){
					if(this.id == this.goods[i].code){
						off=false;
						this.goods[i].num ++;
						break;
					}
				}
				if(off){
					this.goods.push({
						code:this.id,
						num:1
					})
				}
			}else{
				this.goods=[{
					code:this.id,
					num:1
				}]
			}
			setCookie("thing",JSON.stringify(this.goods))
		}
    }

    new Data