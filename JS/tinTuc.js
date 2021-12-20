var newItems = document.querySelectorAll('.main_content_item');
var newItemsSidebar = document.querySelectorAll('.News_box_item');
if(newItems){
    newItems.forEach(function (item,index){
        item.onclick = function(){
            let idItem =  "new--"+index;
            let ItemUpdate = []; 
            ItemUpdate.push(idItem)
            window.localStorage.setItem("NewsRender",JSON.stringify(ItemUpdate));
            window.location.href = "tinTuc--render.html"
        }
    });
}

if(newItemsSidebar){
    newItemsSidebar.forEach(function (item,index){
        item.onclick = function(){
            let idItem =  "new--"+index;
            let ItemUpdate = []; 
            ItemUpdate.push(idItem)
            window.localStorage.setItem("NewsRender",JSON.stringify(ItemUpdate));
        }
    });
}