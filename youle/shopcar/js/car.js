class Car{
	constructor(){
		this.tbody=document.querySelector("#main table tbody");
		this.thead=document.querySelector("#main table thead .election");
		this.addEvent();
		
		this.init();
	}
	init(){
		var that = this;
		$.ajax({
			url:"../public/json/goods.json",
			type:"get",
			success:function(res){
				that.res = res;
				that.getCookie()
			}
		})
	}
	getCookie(){
		this.goods = JSON.parse(getCookie("thing"));
		var str=";"
		for(var i=0;i<this.res.length;i++){
			for(var j=0;j<this.goods.length;j++){
				if(this.goods[j].code==this.res[i].goodId){
					this.price="￥"+((this.res[i].price.substring(1,this.res[i].price.length)*parseInt(this.goods[j].num)).toFixed(2))
					str += `<tr index="${this.goods[j].code}" class="single">
							<td>
								<input type="checkbox" />
								<img src="${this.res[i].src}" />
								<p>${this.res[i].title}</p>
							</td>
							<td>${this.res[i].price}</td>
							<td>
								<input type="number" min="1" value="${this.goods[j].num}"/>
							</td>
							<td>${this.price}</td>
							<td>
								<input type="button" value="删除" class="delete" />
							</td>
						</tr>`
				}
			}
		}
			this.tbody.innerHTML=str;
			this.sum()
	}
	addEvent(){
		var that = this;
		this.tbody.addEventListener("click",function(eve){
			var e = eve || window.event;
			var target = e.target || e.srcElement;
			if(target.className=="delete"){
				that.index = target.parentNode.parentNode.getAttribute("index");
				target.parentNode.parentNode.remove();
				that.changeCookie(function(i){
					that.goods.splice(i,1)
				})
				// that.removeCookie()
			}
		})
		this.tbody.addEventListener("input",function(eve){
			var e = eve || window.event;
			var target = e.target || e.srcElement;
			if(target.type=="number"){
				that.index = target.parentNode.parentNode.getAttribute("index");
				that.num = target.value;
				// console.log(target.parentNode.previousElementSibling.innerHTML)
				that.oneprice=target.parentNode.previousElementSibling.innerHTML;
				// console.log(that.oneprice)
				that.price=(that.oneprice.substring(1,that.oneprice.length)*parseInt(that.num)).toFixed(2);
				// console.log(that.price)
				target.parentNode.nextElementSibling.innerHTML="￥"+that.price;
				// target.parentNode.nextElementSibling.innerHTML="66"
				that.changeCookie(function(i){
					that.goods[i].num = that.num
				})

				// that.setCookie()
			}
		})
	}
	changeCookie(callback){
		for(var i=0;i<this.goods.length;i++){
			if(this.index==this.goods[i].code){
				callback(i)
				break;
			}
		}
		setCookie("thing",JSON.stringify(this.goods))
	}
// 	removeCookie(){
// 		for(var i=0;i<this.goods.length;i++){
// 			if(this.index==this.goods[i].code){
// 				this.goods.splice(i,1)
// 				setCookie("thing",JSON.stringify(this.goods))
// 				return
// 			}
// 		}
// 	}
// 	setCookie(){
// 		for(var i=0;i<this.goods.length;i++){
// 			if(this.index==this.goods[i].code){
// 				this.goods[i].num= this.num;
// 				setCookie("thing",JSON.stringify(this.goods))
// 			}
// 		}
// 	}
	sum(){
		console.log(this.thead)
		this.bodytr=document.querySelectorAll("#main table tbody tr");
		// console.log(this.bodytr)
		var that = this;
		this.thead.addEventListener("click",function(){
			if(that.thead.checked){
				for(var i=0;i<that.bodytr.length;i++){
					that.bodytr[i].firstElementChild.firstElementChild.checked=true;
				}
			}else{
				for(var i=0;i<that.bodytr.length;i++){
					that.bodytr[i].firstElementChild.firstElementChild.checked=false;
				}
			}
		})
	}
}
new Car