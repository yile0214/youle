// 楼层数据
class Data{
        constructor(){
            this.food = $("#floor").find(".food").find(".lie-r");
            this.furniture = $("#floor").find(".furniture").find(".lie-r");
            this.life = $("#floor").find(".life").find(".lie-r");
            this.fashion = $("#floor").find(".fashion").find(".lie-r");
            this.beauty = $("#floor").find(".beauty").find(".lie-r");
            this.init()
        }
        init(){
            var that = this;
            $.ajax({
                url:"./public/json/goods.json",
                type:"get",
                success:function(res){
                    that.res = res;
                    that.display()
                }
            })
        }
        display(){
            var str = ""
            for(var i=0;i<this.res.length;i++){
				if(i<8){
					str += `<li goodId="${this.res[i].goodId}">
								<a href="xiangqing/details.html?id=${this.res[i].goodId}">
									<img src="${this.res[i].src}" alt="">
									<p>${this.res[i].title}</p>
									<span>${this.res[i].price}</span>
								</a>
							</li>`	
				}
            }
            this.food.html(str);
			this.furniture.html(str);
			this.life.html(str);
			this.fashion.html(str);
			this.beauty.html(str);
        }
    }

    new Data


// 卡片数据
class Card{
	constructor(){
		this.num = 5;
		this.index;
		
		this.commodity = $("#main").find(".commodity");
		this.addEvent();
		this.init();
		
	}
	init(){
		// console.log(this.title)
		var that = this;
		$.ajax({
			url:"./public/json/goods.json",
			type:"get",
			success:function(res){
				that.res = res;
				// console.log(that.res)
				that.display()
			}
		})
	}
	display(){
		var str = ""
		for(var i=this.index*this.num;i<this.index*this.num+this.num;i++){
			if(i<this.res.length){
				str += `<li>
						<a href="xiangqing/details.html?id=${this.res[i].goodId}">
							<img src="${this.res[i].src}" alt="">
							<p>${this.res[i].title}</p>
							<span>${this.res[i].price}</span>
						</a>
					</li>`
			}
		}
		this.commodity.html(str)
	}
	addEvent(){
		var that = this;
		this.index=0;
		$("#main").find(".title").children("h4").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			that.index=$(this).index();
			that.display()
		})
		
	}
}
	new Card
	
	
	// 搜索框接口
	class Search{
		constructor(){
			this.txt = document.querySelector("#header .search .txt")
			this.ul = document.querySelector("#header .search ul.cb");
			this.init()
		}
		init(){
			
			var that = this
			this.txt.oninput = function(){
				that.txt.value = this.value;
				that.load()
			}
			
		}
		load(){
			var that=this;
			$.ajax({
				url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
				data:{
					wd:this.txt.value
				},
				jsonp:"cb",
				dataType:"jsonp",
				success:function(res){
					that.res=res.s
					that.display()
				}
			})
		}
		display(){
			var str = "";
			for(var i=0;i<this.res.length;i++){
				str += `<li>${this.res[i]}</li>`
			}
			this.ul.style.border="solid 1px #eee";
			this.ul.innerHTML=str;
			this.addEvent()
		}
		addEvent(){
			var that=this
			this.ul.onclick=function(eve){
				var e = eve || window.event;
				var target = e.target || e.srcElement
				if(target.nodeName=="LI"){
					that.txt.value=target.innerHTML;
					that.ul.style.border="none";
					that.ul.innerHTML="";
				}
			}
		}
	}
	new Search
	
	
	// 倒计时
function Reciprocal(){
	let now = new Date()
	let prev = new Date("2019/6/18")
	let differ = prev - now;
	let d = parseInt(differ/1000/60/60/24)

	 let h = parseInt(differ/1000/60/60%24)

	 let minu = parseInt(differ/1000/60%60)

	 let s = parseInt(differ/1000%60)

	document.querySelectorAll("#main .title h4 p span")[0].innerHTML = d+"天";
	document.querySelectorAll("#main .title h4 p span")[1].innerHTML = h+"时";
	document.querySelectorAll("#main .title h4 p span")[2].innerHTML = minu+"分";
	document.querySelectorAll("#main .title h4 p span")[3].innerHTML = s+"秒";
	
}
setInterval(()=>{
	Reciprocal()
},1000)