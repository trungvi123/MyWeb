
function Validator (options){
    var allRules = {};
    function validate (inputElement,rule){
                // co duoc value cua o input vừa blur: inputElement.value
                // ta có được hàm xử lí luôn :rule.test
                var errorElement = inputElement.parentElement.querySelector('.form_mesage');
                var errorMessage;   
                var rules = allRules[rule.selector];
                for(var i = 0;i<rules.length;i++){
                        errorMessage = rules[i](inputElement.value);
                        if(errorMessage) break;
                }
               
                if(errorMessage){   
                    errorElement.innerText = errorMessage;
                    inputElement.classList.add('invalid');
                    inputElement.classList.remove('valid');
                }else {
                    errorElement.innerText = "";
                    inputElement.classList.add('valid');
                    inputElement.classList.remove('invalid');
                }      
        return !!errorMessage // có lỗi -> true ; k lỗi -> flase                            
    }
   var formElement = document.querySelector(options.formID);
    if(formElement){
        formElement.onsubmit = function (evt){
            evt.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function (rule) {
                var inputElement = document.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                if(isValid){ // nếu lỗi
                    isFormValid = false;
                }
            })
            if(isFormValid){ // nếu form không lỗi thì tiến hành xử lí đăng kí
                var enableInput = document.querySelectorAll('[name]');
                var formValues = {};
                enableInput.forEach(function(input){
                    formValues[input.name] = input.value;   
                });
                // Form không lỗi thì tiến hành đăng kí
                if(options.type === "dangky"){
                    DangKyUser(formValues);
                }
                if(options.type === "dangnhap"){
                    DangNhapUser(formValues);
                }
            }
        }

        options.rules.forEach(function (rule){
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = inputElement.parentElement.querySelector('.form_mesage');
            // Lấy tất cả các rule
            //rule.selector =>> vd: #fullname--dky;
            // allRules[rule.selector] = [rule.test] 
            //=> có nghĩa là lấy hàm test của rule đó gán cho object allrules 
                //với key là rule.selector tức là #fullname--dky
            if(Array.isArray(allRules[rule.selector])){
                allRules[rule.selector].push(rule.test);
            }else {
                allRules[rule.selector] = [rule.test]
            }
           
            // Xử lí khi ng dùng blur
            inputElement.onblur = function (){
                validate(inputElement,rule);
            }

            // Xử lí khi ng dùng bắt đầu nhập lại

            inputElement.oninput = function (){
                errorElement.innerText = "";
                inputElement.classList.remove('invalid');
            }
            
        })
    }

}


// Nếu không lỗi thì trả về undefined
// nếu có lỗi trả về message lỗi
  
Validator.isRequire = function(selector,errmsg)  {
    return {
        selector: selector,
        test : function (value){
            return value.trim() ? undefined : errmsg || 'Vui lòng nhập trường này'
        }
    }
}


Validator.isEmail = function(selector,errmsg)  {
     return {
        selector: selector,
        test : function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
            return regex.test(value) ? undefined : errmsg || 'Trường này phải là Email'
        }
    }
}


Validator.minLength = function(selector , min,errmsg){
    return {
        selector: selector,
        test : function (value){
            return value.length >= min ? undefined : errmsg || `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}

Validator.maxLength = function(selector , max,errmsg){
    return {
        selector: selector,
        test : function (value){
            return value.length <= max ? undefined : errmsg || `Vui lòng nhập tối đa ${max} kí tự`
        }
    }
}

Validator.Confirm = function(selector , getConfirmValue, errmsg){
    return {
        selector: selector,
        test : function (value){
            return value === getConfirmValue() ? undefined : errmsg || 'Giá trị nhập lại không chính xác'
        }
    }

}

/**************************ĐĂNG KÍ************************ */
function DangKyUser(formValues){
    if(JSON.parse(localStorage.getItem('inFoUsers')) === null ){
        let updateUser = [formValues];
        alert("Đăng ký thành công!")
        localStorage.setItem('inFoUsers', JSON.stringify(updateUser));
        // không nên reload vì tài khoản vừa tạo sẽ biến mất ngay 
        // trang web sẽ giật hoặc ng dùng có thể quên.
    }else{
        let updateUser = JSON.parse(localStorage.getItem('inFoUsers'));
        // Lấy dữ liệu
        var isMap = updateUser.map(function (user){
            // lập qua từng tài khoản xem có trùng với tài khoản đang tạo hay không
            if(user['email--dky'] === formValues['email--dky'] ){
                return false;
            }else {
                
                return true;
            }
        });
        // biến isMap là mảng có dạng [false] nên lấy phần tử đầu tiên
        if(isMap[0] === true){
            updateUser.push(formValues);
            alert("Đăng ký thành công!")
            localStorage.setItem('inFoUsers', JSON.stringify(updateUser));
        }else {
            alert("Xin lỗi, Email này đã được sử dụng!");
        }
    }   
}
/**************************ĐĂNG NHẬP************************ */
function DangNhapUser(formValues){
    if(JSON.parse(localStorage.getItem('inFoUsers')) === null ){
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại!")
    }else {
        let dataUser = JSON.parse(localStorage.getItem('inFoUsers'));
        var Datas = dataUser.map(function (user){
            // lập qua từng tài khoản xem có trùng với tài khoản đang đăng nhập hay không
            if(user['email--dky'] === formValues['email--dnhap']){
                if(user['password--dky'] === formValues['password--dnhap']){
                    return {
                        state : "success",
                        Username: user['fullname--dky']
                    }
                }return {
                    state : "error", 
                    // phải thêm state cho những lần thất bại luôn
                    // vì k thêm thì nó sẽ là undefine
                    // mà undifine thì lát so sánh sẽ báo lỗi ngay vì k có state
                }
            }else{
                return {
                    state : "error",
                }
            }
        });
        var name = "";
        var isSuccess = false; // khi có 1 tài khoản trùng với tk ng dùng nhập thì success -> true
        Datas.forEach(function (data){
            if(data.state === "success"){
                isSuccess = true;
                name = data.Username;  
            }
        });
        // Cài user name lên trên localStoge luôn để dể render ra màn hình
        localStorage.setItem("UserName",name);
        if(isSuccess){
                alert(`Xin chào ${name} (^.^)`);
                JSON.stringify(localStorage.setItem("State","LoginSuccess"));
                window.location.reload();
            }else {
                alert("ĐĂNG NHẬP THẤT BẠI. VUI LÒNG KIỂM TRA LẠI (T.T)");
            }
    }
}