var aimg = document.querySelectorAll("img");
var clientH = document.documentElement.clientHeight;

function lazyLoad(arr){
	var scrollT = document.documentElement.scrollTop;
	for(var i=0;i<arr.length;i++){
		if(arr[i].src !="") continue;
		if(arr[i].offsetTop<clientH+scrollT){
			arr[i].src = arr[i].getAttribute("data-src");
			console.log(i)
		}
	}
		
}

lazyLoad(aimg)

onscroll = function(){
	lazyLoad(aimg)
}