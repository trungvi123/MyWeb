

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/*************************************CIRCLE-UP*****************************************/
window.onscroll = function (){
    // tùy tnhf duyệt mà sài body hay element
    if(document.body.scrollTop > 621 || document.documentElement.scrollTop > 621){
        $('.circle-up').style.opacity = "0.3";
        $('.circle-up').style.display =  "block";
    }else {
        $('.circle-up').style.opacity = "0";
        $('.circle-up').style.display =  "none";
    }
}
var circle = $('.circle-up');
if(circle){
    circle.onclick= function topFunction () {
        document.body.scrollTop =0;
        document.documentElement.scrollTop =0;
    }
}
















/*------------------------------ TEXT SLIDER -----------------*/
/*---------------DATA----------------- */
var infoText = [
    {
        id: 0,
        khuVuc: "DU LỊCH VIỆT NAM",
        diaDiem : "ĐÀ LẠT",
        gioiThieu : "Chùa Linh Quy Pháp Ấn với những lớp sương mờ giăng khắp núi đồi trùng điệp, những ngọn núi trở nên mờ ảo như thực như hư"
    },
    {
        id: 1,
        khuVuc: "DU LỊCH PHÁP",
        diaDiem : "PARIS",
        gioiThieu : "Thủ đô Paris – một trong những thành phố lãng mạn nhất thế giới. Nơi đây còn là một trong những điểm du lịch ở Pháp được đông đảo du khách yêu thích."
    },
    {
        id: 2,
        khuVuc: "DU LỊCH VIỆT NAM",
        diaDiem : "NHA TRANG",
        gioiThieu : "Nha Trang, hòn ngọc quý của tỉnh Khánh Hòa luôn là một điểm sáng trên bản đồ du lịch Việt Nam, thu hút đông đảo du khách trong nước và quốc tế."
    },
    {
        id: 3,
        khuVuc: "DU LỊCH TRUNG QUỐC",
        diaDiem : "PHƯỢNG HOÀNG CỔ TRẤN",
        gioiThieu : "Một khu vực vẻ đẹp tự nhiên nổi bật, nơi núi, nước và bầu trời xanh chiếm ưu thế. Khi đến nơi, du khách sẽ bị ấn tượng bởi văn hóa hoang sơ, kiến ​​trúc độc đáo qua hàng nghìn năm."
    }
] 
/*Get element de them text vao slider */
var textBoxElement=$('.info_travel_slider');
function renderText(index){
    var htmls = infoText.map(function (info){
        if(info.id == index){
            return  `
                    <div class="info_travel_slider-box text-ani">
                    <h6>${info.khuVuc}</h6>
                    <h2>${info.diaDiem}</h2>
                    <p>${info.gioiThieu}</p>
                    </div> `
        }
    }); 
            textBoxElement.innerHTML = htmls.join('');
}

/* auto next slide  = radio */
//------------------------- 1 lan ----------------------------


var btn0 = $('.btn0')
if(btn0){
btn0.classList.add('active');
renderText(0);
}
// ------------------------Manual-click-slides---------------------
    var count = 1;
    var manualBtn = $$('.manual_btn');
    manualBtn.forEach(function (item, index){
        item.onclick = function (){
            $('.manual_btn.active').classList.remove('active');
            $('.slide_img.zoomimg').classList.remove('zoomimg');
            
            this.checked = true;
            $('.slide_img--' + index).classList.add('zoomimg');
            this.classList.add('active');
            renderText(index);
            if(index === 3){
                count = 0;
            }else{
                count = (index+1); // nếu gán count bằng index thì nó sẽ lặp lại trang hiện tại 1 lần nữa
            }
            
        }
    });

    setInterval( function (){
        var radiochecked = document.getElementById('radio' + count);
        
        if(radiochecked) radiochecked.checked = true;
        

        if(count === 0) {
            if( $('.btn' + 3).classList.contains('active')===true)
                $('.btn' + 3).classList.remove('active');
            if( $('.slide_img--' + 3).classList.contains('zoomimg')===true)
                $('.slide_img--' + 3).classList.remove('zoomimg');

            $('.btn' + count).classList.add('active');
            $('.slide_img--' + count).classList.add('zoomimg');

        }else{
            $('.slide_img--' + (count-1)).classList.remove('zoomimg');
            $('.btn' + (count-1)).classList.remove('active');

            $('.btn' + count).classList.add('active');
            $('.slide_img--' + count).classList.add('zoomimg');
        }
        // Slide comment
        var cmtBoxSlide = document.querySelector('.comment_box_slides');
            cmtBoxSlide.style.marginLeft =  -(count * 100) + "%";
        
        renderText(count);
           count++;
            if(count > 3){
                count = 0;
            }
    },10000)
    














/* -----------------responsive slider----------------*/
var list = $$('.slide img');
    setInterval(function(){
       var manual_checked = $('.manual_checked');
       var headerSliderWidth = $('.header_slider').clientWidth;
        if(manual_checked)
            manual_checked.style.width = $('html').clientWidth + "px";

        list.forEach(function (img){
            img.style.width = headerSliderWidth + "px";
        });

},100);












//*****************************GetElementRender-pageKhachSan************************
// Lắng nghe sự kiện onclink item của main
var items_ks = document.querySelectorAll('.info_item--ks');
var items_tour = document.querySelectorAll('.info_item--tour');
var newElements = document.querySelectorAll('.news_item'); 

items_ks.forEach(function (ks , index){
    ks.onclick = function (){
        let idItem =  "khachSan--"+index; 
        let ItemUpdate = []; 
        ItemUpdate.push(idItem)
        window.localStorage.setItem("ItemRender",JSON.stringify(ItemUpdate));
    }
});

items_tour.forEach(function (tour , index){
    tour.onclick = function (){
        let idItem =  "tour--"+index;
        let ItemUpdate = []; 
        ItemUpdate.push(idItem)
        window.localStorage.setItem("ItemRender",JSON.stringify(ItemUpdate));
    }
});

newElements.forEach(function (news ,index){
    news.onclick = function (){
        let idItem =  "new--"+index;
        let ItemUpdate = []; 
        ItemUpdate.push(idItem)
        window.localStorage.setItem("NewsRender",JSON.stringify(ItemUpdate));
    }
});










