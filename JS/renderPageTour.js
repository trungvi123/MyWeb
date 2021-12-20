var tour_content = [
    {
        id: "tour--0",
        imgLink : "/IMG/tour-img/canada.jpg",
        head : "Du lịch Canada 10 ngày mùa thu 2017 giá tốt khởi hành từ Sài Gòn",
        price: "97,900,000 ₫",
        info: "<strong>Du lịch Canada</strong> mùa thu 2017 một trong những Xứ sở lá phong đẹp nhất khi thu đến, và đây cũng là thời điểm lá phong dần dần ngả sang vàng, tạo nên không gian hữu tình, thơ mộng như trong miền cổ tích. Khi thu gõ cửa thành phố Montréal ” <strong>Một trong những thành phố lớn của tỉnh Québec, Canada </strong>“, với sắc thu trên những con đường nơi đây không chỉ trải đầy lá vàng mà còn được nhuộm màu đỏ kiêu sa hay màu xanh pha cam độc đáo. Montréal như chìm trong cả một khoảng trời mùa thu với những hàng cây rực rỡ sắc màu.",
        type: "Danh mục: Khách sạn",
    },
    {
        id: "tour--1",
        imgLink : "/IMG/tour-img/losangeles2.jpg",
        head : "Du lịch bờ Tây Hoa Kỳ 7 ngày Los Angeles - Las Vegas giá tốt 2018",
        price: "34,900,000 ₫",
        info: "<strong>Du lịch nước Mỹ</strong> là quốc gia được nhiều người xem là “thiên đường”. Du khách sẽ choáng ngợp trước nước Mỹ hoa lệ, rực rỡ trong hàng triệu triệu ánh đèn muôn màu từ các tòa nhà cao tầng rọi xuống, từ các khách sạn, các trung tâm mua sắm lan tỏa sang, với một phong cách sống hiện đại và văn minh.",
        type: "Danh mục: <a> Du lịch châu Mỹ</a>,<a> Du lịch Mỹ</a>, <a>Du lịch nước ngoài</a>",
    },
]

function render_tour_img (index ){
    var img_box = document.querySelector('.content_img_box');
    if(img_box){
        var imgrender = tour_content.map(function (img){
            if(index === img.id){
                // khi có được link ảnh thì lấy nó làm backgr của nav luôn.
                document.querySelector('.header_nav').style.backgroundImage = `url(${img.imgLink})` 
                return `
                <img src= ${img.imgLink} alt="">
                `
            }
        });
        img_box.innerHTML = imgrender.join('');
    }
}

function render_tour_text (index ){
    var content_text = document.querySelector('.content_text');
    var tabs_content_item = document.querySelector('.tabs_content_item--render');
    if(content_text){
        var html = tour_content.map(function (content){
            if(index === content.id){
                return `
                    <h1 class="content_text--head">${content.head}</h1>
                    <p class="content_text--id" style="display: none">${content.id}</p>
                    <p class="content_text--img" style="display: none">${content.imgLink}</p>
                    <p class="content_text--price">${content.price}</p>
                    <p class="content_text--info">${content.info}</p>
                    <button class="content_text--btn">ĐẶT NGAY</button>
                    <p class="content_text--type">${content.type}</p>
                    <ul class="content_text--contact">
                        <li> <a href="https://www.facebook.com/gom.gomVvvv/"> <i class="fab fa-facebook-f"></i>  </a> </li>
                        <li> <a href=""> <i class="fab fa-instagram"></i>  </a> </li>
                        <li> <a href=""> <i class="fab fa-twitter"></i>  </a> </li>
                        <li> <a href=""> <i class="fab fa-google-plus"></i>  </a> </li>
                        <li> <a href=""> <i class="fab fa-youtube"></i>  </a> </li>
                    </ul>
                `
            }
        });
        content_text.innerHTML = html.join('');
    }
    if(tabs_content_item){
        var html2 = tour_content.map(function (content){
            if(index === content.id){
                return `
                <p>${content.info}</p> `
            }
        });
        tabs_content_item.innerHTML = html2.join('');
    }
}

var footerImgTour = document.querySelectorAll('.footer__img--tour');
var footerImgKS = document.querySelectorAll('.footer__img--ks');
footerImgTour.forEach(function (tour , index){
    tour.onclick = function (){// lập qua và gỡ hết id của ks trên local vì k gỡ thì hàm render nào áp dụng sau thì nó render -> sai data
            let idItem =  "tour--"+index;
            let ItemUpdate = []; 
            ItemUpdate.push(idItem)
            window.localStorage.setItem("ItemRender",JSON.stringify(ItemUpdate) );
    }
});
//**************************************-RENDER-*************************************** 
tour_content.forEach(function (item){
    let Mang = JSON.parse(localStorage.getItem("ItemRender"));
    if(Mang){ // ta truy suất mảng thứ 0 thì phải đảm bảo rằng mảng đó tồn tại
                // nếu không kiểm tra trước thì khi mảng rỗng sẽ bị lỗi
        if(Mang[0] === item.id) {
                render_tour_img(Mang[0]);
                render_tour_text(Mang[0]);
        }
    }
})


 