const theForm = document.getElementsByTagName("form")[0];
const todoTxt = document.getElementById("todoTxt");
const todoDesc = document.getElementById("todoDesc");
const todoTime = document.getElementById("todoTime");
const theSubAdd = document.getElementById("theSubAdd");
const theSubEdit = document.getElementById("theSubEdit");
const todoTxtErr = document.getElementById("todoTxt_err");
const todoTimeErr = document.getElementById("todoTime_err");
const toast_con=document.getElementById("toast_con");
const toast_body_before=document.querySelector(".toast_body::before");
theSubAdd.disabled = true;

let valObj = {};
valObj.todoTxt = false;
valObj.todoTime = false;
todoTxt.addEventListener("blur", function (evt) {
  if (evt.target.value == "") {
    valObj.todoTxt = false;
    evt.target.style = "border:1px solid var(--trash-color)";
    todoTxtErr.style.color = "var(--trash-color)";
    todoTxtErr.classList.remove("hidden");
    todoTxtErr.textContent = "invalid input!!!";
  } else {
    valObj.todoTxt = true;
    evt.target.style = "border:none";
    todoTxtErr.classList.add("hidden");
  }
  subCondition();
});
document.addEventListener("DOMContentLoaded",function(){
  let url = new URL(window.location.href);
  let id_search_value = url.searchParams.get("id"); 
  console.log(id_search_value);
  if(id_search_value==null){
    theSubEdit.classList.add("hidden");
    theSubAdd.classList.remove("hidden");
    theForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
         const data = {
             "title": todoTxt.value,
             "description": todoDesc.value,
             "createdAt": new Date(),
             "updatedAt": new Date(),
             "checked": false,
             "dueDate":todoTime.value ,
           }
     
         fetch("https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos", {
           method: "POST", // or 'PUT'
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(data),
         })
           .then((response) => {response.json()
            if(response.status>300){
              location.href="./404.html";
            }
          })
           .then((data) => {
            toast_con.classList.remove("hidden");
            toast_con.classList.add("toastTime");
            setTimeout(function(){
              toast_con.remove();
              toast_con.classList.remove("toastTime");
            },3000);
             todoTxt.value="";
             todoDesc.value="";
             todoTime.value="";
           })
           .catch((error) => {
             
            console.log(error);
           });
       
     });
  }else{
    fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id_search_value}`)
    .then((res) => {
      if(res.status>300){
        location.href="./404.html";
      }
      // if(res.status!==200){
      // container.innerHTML="404 page not found!!!";
      // alert("404 page not found!!!");
      // }else{
      return res.json();
      // }
    }).then(result=>{
      todoTxt.value=result.title;
      todoDesc.value=result.description;
      todoTime.value=result.dueDate;
    })
    theSubEdit.classList.remove("hidden");
    theSubAdd.classList.add("hidden");
    theForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
         const data = {
             "title": todoTxt.value,
             "description": todoDesc.value,
             "updatedAt": new Date(),
             "dueDate":todoTime.value ,
           }
     
         fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id_search_value}`, {
           method: "PUT", // or 'PUT'
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(data),
         }).then(response=>{
           if(response.status>300){
             location.href='./404.html';
           }
           response.json();
         })
          //  .then((response) => response.json())
           .then((data) => {
            let url = new URL(window.location.href);
            let id_search_value=url.searchParams.get('id');
          
            let page_search_value = url.searchParams.get("page");
            theSubEdit.classList.add("hidden");
            theSubAdd.classList.remove("hidden");
             todoTxt.value="";
             todoDesc.value="";
             todoTime.value="";
             location.href=`./todos_page.html?page=${page_search_value}`;
           })
           .catch((error) => {
            //  location.href="./404.html";
           });
       
     });
  }
})
todoTime.addEventListener("blur", function (evt) {
  if (evt.target.value == "" || evt.target.value == "2021-11-06") {
    valObj.todoTime = false;
    evt.target.style = "border:1px solid var(--trash-color)";
    todoTimeErr.style.color = "var(--trash-color)";
    todoTimeErr.classList.remove("hidden");
    todoTimeErr.textContent = "invalid input!!!";
  } else {
    valObj.todoTime = true;
    evt.target.style = "border:none";
    todoTimeErr.classList.add("hidden");
  }
  subCondition();
});
function subCondition() {
  if (
    Object.values(valObj).every(function (val) {
      return val == true;
    })
  ) {
    theSubAdd.disabled = false;
  } else {
    theSubAdd.disabled = true;
  }
}
function hide(evt){
  evt.remove();
}
