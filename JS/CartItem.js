
var BtnElement = document.querySelector('.content_text--btn');
// Phải có câu lệnh if vì sang trang khác không có phần tử BtnElement thì sẽ lỗi
// Nếu có BtnElement thì mới thực hiện các câu lệnh
if (BtnElement) {
    // Từ nút bấm vào ta có thể suy ra tất cả thông tin của sản phẩm vừa click
    var headItem = BtnElement.parentElement.querySelector('.content_text--head').textContent;
    var priceItem = BtnElement.parentElement.querySelector('.content_text--price').textContent;
    var idItem = BtnElement.parentElement.querySelector('.content_text--id').textContent;
    var imgItem = BtnElement.parentElement.querySelector('.content_text--img').textContent;
    // Khi bấm đặt hàng thì sẽ gửi thông tin về sản phẩm lên localStorge
    BtnElement.onclick = function () {
        // dang nhap moi dat hang duoc
        if(localStorage.getItem("State") == "LoginSuccess"){
            var newItem = {
                id: idItem,
                name: headItem,
                price: priceItem,
                img: imgItem,
                quantily: 1
            };

            var updateCart = [];
            if ((JSON.parse(localStorage.getItem('CartItem')) === null)) {
                updateCart.push(newItem);
                localStorage.setItem('CartItem', JSON.stringify(updateCart));
                window.location.reload();// cập nhật để hiện số trên giỏ hàng
            } else {
                updateCart = JSON.parse(localStorage.getItem('CartItem'));
                var result = updateCart.find(function (itemCart) {
                    return itemCart.id === newItem.id;
                });
                if (result === undefined) {
                    updateCart.push(newItem)
                } else {
                    result.quantily += 1;
                }
                localStorage.setItem('CartItem', JSON.stringify(updateCart));
                window.location.reload();// cập nhật để hiện số trên giỏ hàng
            }
        }else {
            location.href = "dangNhap.html"
        }
    }
}


/* Cập nhật số lượng trên icon giỏ hàng */
// Để riêng khỏi hàm onlcick để luôn cập nhật mà không cần click mới hiện
if ((JSON.parse(localStorage.getItem('CartItem')) !== null)) {
    var updateCart = JSON.parse(localStorage.getItem('CartItem'));
    var numberCartElement = document.querySelector('.numberCart')
    if (numberCartElement) {
        var sum = updateCart.reduce(function (bienTichTru, giaTriCongThem) {
            // Gia trị cộng thêm tức là từng phần tử mà ta lập qua rồi lấy quantily
            // Ta đã chuyển sang số hết nên hàm number() sài hay không cũng được
            // Muốn chắc chắn không bug thì ta sài 
            return bienTichTru + Number(giaTriCongThem.quantily);
        }, 0);
        
        if(sum>0){ 
           numberCartElement.textContent = sum; 
        }else { // sum nhỏ hơn 0 thì ẩn số lượng luôn
            numberCartElement.textContent = '';
        }
        
    }

}
// click vào icon chuyển trang


ShoppingIcons = document.querySelectorAll('.shopping-icon');
ShoppingIcons.forEach(function (ShoppingIcon){
    ShoppingIcon.onclick = function () {
        console.log("hihi")
        if (localStorage.getItem("State") == "LoginSuccess") {
            // khi dang nhap user moi thuc hien cac viec nay
            var ktra = JSON.parse(localStorage.getItem('CartItem'));
            if(ktra.length > 0){
            // Có item nào hay không?
                location.href = "Cart.html"; 
            } else {
                location.href = "EmptyCart.html"
            }
        } else {
            location.href = "dangNhap.html"
        }
    }
});

/*****************************Hiển thị thông tin User********************************* */ 
 // vì file js này liên kết với nhiều file html nên xử lí vấn đề up avatar ở đây 
var avatarContainer = document.querySelector('.avatar-container');
var userName = localStorage.getItem('UserName');
if(localStorage.getItem("State") == "LoginSuccess"){
    if(avatarContainer){
        var html = `<div class="avatar-item">
                    <img class="avatar-img" src="https://www.placidsoftware.com/assets/images/user-img.png" alt="">
                    </div>
                    <span class="avatar-info">${userName}</span>
                    `
        avatarContainer.innerHTML = html;
    }
}

/*****************************Xử lí khi ng dùng đăng xuất********************************* */
var dangXuatBtn = document.querySelector('.dangXuat__btn');
if(dangXuatBtn){
    dangXuatBtn.onclick = function (){
        localStorage.setItem('UserName',"");
        JSON.stringify(localStorage.setItem("State","LoginFail"));
        window.location.reload();
    }
}






/********************************************************************************** */
var mainCartBox = document.querySelector('.main-cart_container');
// Có mainCart Box mới thực hiện các lệnh 
if (mainCartBox) {
    let updateCart = JSON.parse(localStorage.getItem('CartItem'));
    let html = updateCart.map(element => {
        let SumMoney = Number(element.price.replace(/[^0-9]/g, "")) * Number(element.quantily);
        SumMoney = formatNumber(SumMoney);
        return `
            <div class="main-cart_item">
                <div class="item_img" style="display:none">
                    <p class ="element_id">${element.id}</p>
                </div>
                <div class="item_img">
                    <img src="${element.img}" alt="">
                </div>
                <div class="item_name">
                    <p>${element.name}</p>
                </div>
                <div class="item_price">
                    <p>${element.price}</p>
                </div>
                <div class="item_quantily">
                    <input class="input-quantily" type="number" value="${element.quantily}">
                </div>
                <div class="item_price2">
                    <p>${SumMoney}</p>
                </div>
                <div class="item_operation">
                    <i class="fas delete-btn fa-trash-alt"></i>
                </div>
            </div>
        `
    });
    mainCartBox.innerHTML = html;
}
/********************************Tính tổng tiền**************************************************** */
var MoneyBox = document.querySelector('.title-money');
if (MoneyBox) {
    var price2s = document.querySelectorAll('.item_price2');
    var payment = 0;
    price2s.forEach(function (price2) {
        // Lập qua và lấy từng sumMoney của các sản phẩm
        var price = price2.firstElementChild.textContent;
        // Vì price là chuỗi và có các kí tự đặt biệt nên ta chuyển sang số
        var money = Number(price.replace(/[^0-9]/g, ""));
        // Cộng dồn vào 1 biến
        payment = payment + money;
    });

    MoneyBox.textContent = formatNumber(payment);
}

/*******************************************DELETE ITEM KHI CLICK TRASH ICON ***************************************************** */
var Del_btn = document.querySelectorAll('.delete-btn');
if (Del_btn) { // sẽ không ảnh hưởng đến những trang k có Del_btn mà liên kết tới file này
    Del_btn.forEach(function (btn) {
        btn.onclick = function () {   // ta sẽ lấy đc thông tin của item mà ng dùng bấm vào
            var element_del = this.parentElement.parentElement.querySelector('.element_id').textContent;
            // lấy id không dùng child vì khi đổi chổ id sẽ không còn chính xác
            DeleteItem(element_del);
        }
    });
}

/****************************************XỬ LÍ KHI NG DÙNG THAY ĐỔI SỐ LƯỢNG************************************************** */
var quantilyElememts = document.querySelectorAll('.input-quantily');
if (quantilyElememts) {
    quantilyElememts.forEach(function (elm) {
        elm.onchange = function () {
            let idItem = this.parentElement.parentElement.querySelector('.element_id').textContent;
            if (this.value < 1) {
                DeleteItem(idItem);
            } else {
                //  Lấy các item của Cart
                updateCart = JSON.parse(localStorage.getItem('CartItem'));
                //result là item mà ta cần tìm để chỉnh sửa số lượng khi ng dùng thay đổi
                var result = updateCart.find(function (itemCart) {
                    return itemCart.id === idItem;
                });
                // Gán giá trị của item trên Cart bằng giá trị mà ng dùng thay đổi
                // this.value hiện tại đang là chuỗi
                // nên ta phải đổi sang số để khi cộng quantily không có bug
                result.quantily = Number(this.value);
                // cẬP NHẬT lại Cart
                localStorage.setItem('CartItem', JSON.stringify(updateCart));
                window.location.reload();
            }
        }
    });
}



/************************************HÀM DELETE************************************************/
function DeleteItem(idItem) {
    let custommerCart = JSON.parse(localStorage.getItem('CartItem'));
    let updateCart = [];

    custommerCart.forEach(function (item) {
        // nếu không phải id cần xóa thì cho vào mảng riêng
        if (item.id != idItem) {
            updateCart.push(item);
        }
    });
    // set lại CartItem mà k có phần tử muốn xóa
    localStorage.setItem('CartItem', JSON.stringify(updateCart));
    window.location.reload();
}

/*****************************************Hàm Format data******************************************* */
function formatNumber(num) {
    // Các ?= n bộ định lượng khớp với bất kỳ chuỗi nào theo sau bởi một chuỗi cụ thể n .
    //Các ?! n bộ định lượng khớp với bất kỳ chuỗi nào không được theo sau bởi một chuỗi cụ thể n .
    //\d{3}+ tìm ít nhất 1 chuỗi có 3 chữ số 
    //?!\d không theo sau bởi 1 số
    // Chọn số mà theo sau số đó phải là 1 chuỗi gồm 3 chữ số và không theo sau bởi 1 số
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "₫";
}

















