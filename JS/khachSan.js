
/*  BAM VAO NGOI SAO DANH GIA */
var labels = document.querySelectorAll('.label_star');
var allIElements = document.querySelectorAll('.label_star i');
labels.forEach(function (label , index){ 
    label.onclick = function (){
        for(var i =0;i<allIElements.length;i++){
            if(allIElements[i].classList.contains('choose'));
            allIElements[i].classList.remove('choose');
        }
        var Ielements = this.querySelectorAll('i');
        Ielements.forEach(function (I){
            I.classList.add('choose');
        });
    }
});

/* ------- BAM VAO CAC MỤC---------- */

var tabs = document.querySelectorAll(".tab_item");
var tabs_content_item = document.querySelectorAll(".tabs_content_item");

// hàm set width cho line
function handleLine (){
    // lay thằng đag dc active hiện tại
    var tab_active = document.querySelector(".tab_item.active");
    // lấy line
    var line = document.querySelector('.tabs_head .line');
    line.style.left = tab_active.offsetLeft + "px";
    line.style.width = tab_active.offsetWidth + "px"; 
}

handleLine ();
tabs.forEach(function (tab , index){
    tab.onclick = function (){
            document.querySelector(".tab_item.active").classList.remove("active");
            document.querySelector(".tabs_content_item.active").classList.remove("active");

            this.classList.add("active");
            tabs_content_item[index].classList.add('active');
            handleLine ();
    }
});

var footerImgKS = document.querySelectorAll('.footer__img--ks');
footerImgKS.forEach(function (tour , index){
    tour.onclick = function (){
     window.localStorage.setItem("id_footer_img_ks",index);
    }
});

var footerImgTour = document.querySelectorAll('.footer__img--tour');
footerImgTour.forEach(function (tour , index){
    tour.onclick = function (){
     window.localStorage.setItem("id_footer_img_tour",index);
    }
});




