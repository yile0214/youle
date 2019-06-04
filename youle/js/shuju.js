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
            // console.log(1)
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
					str += `<li>
								<a href="#">
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
		console.log(this.index*this.num,this.index*this.num+this.num)
		for(var i=this.index*this.num;i<this.index*this.num+this.num;i++){
			if(i<this.res.length){
				str += `<li>
						<a href="#">
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
			console.log(that.index)
			that.display()
		})
		
	}
}
	new Card