/****************************************DATA*************************************************** */
// Khi sài json sever ta call API thì sẽ đưa data này sang file json
var khachSan_content = [
    {  
        id: "khachSan--0",
        imgLink : "/IMG/tour-img/victoria_hotel.png",
        head : "Đặt Phòng Khách Sạn Victoria Sapa Resort",
        price: "7,399,000 ₫",
        info: "<strong>Victoria Sapa Resort & Spa</strong> nằm ở thị trấn Sapa, cách Hà Nội 380km về phía Bắc và gần đường biên giới với Trung Quốc. Để đến Khách sạn Victoria Sapa, Quý khách đi tàu từ ga Hà Nội đến ga Lào Cai và chuyển sang xe để đến khách sạn cách đó khoảng 35km.",
        type: "Danh mục: Khách sạn",
    },
    {  
        id: "khachSan--1",
        imgLink : "/IMG/tour-img/resort--phanthiet.png",
        head : "Beach Resort Phan Thiết Khuyến Mãi Mùa Đông",
        price: "2,999,000 ₫",
        info: "<strong>Đặt phòng khách sạn Victoria Phan Thiet Beach Resort</strong> - Victoria Phan Thiết Beach Resort & Spa gồm 57 bungalows được thiết kế theo phong cách những ngôi nhà mái tranh mộc mạc ở miền quê ẩn mình trong khu vườn nhiệt đới quyến rũ. ",
        type: "Danh mục: Khách sạn",
    },
    {  
        id: "khachSan--2",
        imgLink : "/IMG/tour-img/nhaatrang.webp",
        head : "An Lâm Retreats Ninh Vân Bay",
        price: "4,781,267 ₫",
        info: "Chỉ cách thành phố Nha Trang 20 phút đi tàu thuyền, khi đến với<strong> An Lâm Retreats Ninh Vân Bay</strong>, du khách sẽ được bước vào một hành trình gắn kết với thiên nhiên và với chính mình. Hãy cảm nhận chút nắng ấm của biển khơi Nha Trang cùng làn gió biển mát lành, lắng nghe tiếng rì rào của thiên nhiên và thả mình trong sự tĩnh lặng và bình yên tuyệt đối.",
        type: "Danh mục: Khách sạn",
    },
    {  
        id: "khachSan--3",
        imgLink : "/IMG/tour-img/hotram-hotel.png",
        head : "Đặt Phòng Khách Sạn Grand Hồ Tràm 5 Sao",
        price: "1,980,000 ₫",
        info: "Nằm đối diện resort là sân gôn The Bluffs do tay gôn huyền thoại Greg Norman thiết kế. <strong> The Grand Ho Tram Strip </strong> cách Thành phố Hồ Chí Minh 2 giờ lái xe qua huyện Long Thành và sắp xếp buýt miễn phí cho khách. Dịch vụ đón tại sân bay và máy bay trực thăng được cung cấp kèm phụ phí. Resort cách thành phố Vũng Tàu 50 km và cách Sân bay Quốc tế Tân Sơn Nhất khoảng 120 km.",
        type: "Danh mục: Khách sạn",
    },
]


/******************************************Ham render******************************************************* */
// Type là mảng khachSan_content or tour_content 
function render_khachSan_img (index){
    var img_box = document.querySelector('.content_img_box');
    if(img_box){
        var imgrender = khachSan_content.map(function (img){
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

function render_khachSan_text (index ){
    var content_text = document.querySelector('.content_text');
    var tabs_content_item = document.querySelector('.tabs_content_item--render');
    if(content_text){
        var html = khachSan_content.map(function (content){
            if(index === content.id){//id và imgLink thêm vào nhưng k hiện, mục đích và dễ dàng lấy id và link ảnh để hiển thị bên trang cart
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
        var html2 = khachSan_content.map(function (content){
            if(index === content.id){
                return `
                <p>${content.info}</p> `
            }
        });
        tabs_content_item.innerHTML = html2.join('');
    }
}

    var footerImgKS = document.querySelectorAll('.footer__img--ks');
    var footerImgTour = document.querySelectorAll('.footer__img--tour');
    footerImgKS.forEach(function (tour , index){
        tour.onclick = function (){
            let idItem =  "khachSan--"+index;
            let ItemUpdate = []; 
            ItemUpdate.push(idItem)
            window.localStorage.setItem("ItemRender",JSON.stringify(ItemUpdate));
        }
    });
        
//***************************************** render--khachsan******************************************************* 
khachSan_content.forEach(function (item){
    let Mang = JSON.parse(localStorage.getItem("ItemRender"))
    if(Mang){
        if(Mang[0] === item.id) {
        render_khachSan_img(Mang[0]);
        render_khachSan_text(Mang[0]);
        }
    }
    
})

















