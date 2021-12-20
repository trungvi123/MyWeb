/*****************************ẩn những tin không được chọn**************************************************** */
var tinTucs = JSON.parse(localStorage.getItem('NewsRender'));
var news = document.querySelectorAll('.new');
if(news){
    if(tinTucs){
        var tinTucRender = tinTucs[0];
    news.forEach(function (newItem , index){
        if(newItem.classList.contains(tinTucs[0])===false) {
            newItem.classList.add('hidden');
        }
    })
    }

}


window.onscroll = function (){
    // tùy tnhf duyệt mà sài body hay element
    if(document.body.scrollTop > 621 || document.documentElement.scrollTop > 621){
        document.querySelector('.circle-up').style.opacity = "0.3";
        document.querySelector('.circle-up').style.display =  "block";
    }else {
        document.querySelector('.circle-up').style.opacity = "0";
        document.querySelector('.circle-up').style.display =  "none";
    }
}
var circle = document.querySelector('.circle-up');
if(circle){
    circle.onclick= function topFunction () {
        document.body.scrollTop =0;
        document.documentElement.scrollTop =0;
    }
}

