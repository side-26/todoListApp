const container = document.getElementById("container");
const modal_page = document.getElementById("modal_page");
const cancelBtnModal = document.getElementById("cancelBtnModal");
const modalMainText = document.getElementById("modalMainText");
const modalMainTime = document.getElementById("modalMainTime");
const deleteBtnModal = document.getElementById("deleteBtnModal");
document.addEventListener("DOMContentLoaded", () => {
  todolist();
});

function todolist() {
  fetch("https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos")
    .then((res) => {
      if(res.status>300){
        window.location.href="./404.html"
      }
      return res.json();
      
    })
    .then((result) => {
      let htmlcode = "";

      let url = new URL(window.location.href);
      let page_search_value = url.searchParams.get("page");
      console.log(page_search_value);
      if (page_search_value == null) {
        page_search_value = 1;
      }
      
      const res = pagination(result.reverse(), page_search_value, 5);
      console.log(res.querySet);
      res.querySet.map((items) => {
        if (items.checked) {
          htmlcode += `<div class="li">
                <div class="li_header">
                    <input checked type="checkbox">
                    <strong onclick="checked(this,${items.id})" class="done" id="listTxt">${items.title}</strong>
                    <span id="dueTime">${items.dueDate}</span>
                </div>
                <div class="btnCon">
                    <button  onclick="editTodo(this,${items.id})" id="editBtn"><span><i class="bi bi-pencil-square"></i></span></button>
                    <button onclick="removeItem(this,${items.id})"  id="deleteBtn"><span><i class="bi bi-trash-fill"></i></i></span></button>
                </div>
                <p id="descript">${items.description}</p>
            </div>`;
        } else {
          htmlcode += `<div class="li">
                <div class="li_header">
                    <input  type="checkbox">
                    <strong onclick="checked(this,${items.id})"  id="listTxt">${items.title}</strong>
                    <span id="dueTime">${items.dueDate}</span>
                </div>
                <div class="btnCon">
                    <button onclick="editTodo(this,${items.id})" id="editBtn"><span><i class="bi bi-pencil-square"></i></span></button>
                    <button onclick="removeItem(this,${items.id})" id="deleteBtn"><span><i class="bi bi-trash-fill"></i></i></span></button>
                </div>
                <p id="descript">${items.description}</p>
            </div>`;
        }
      });
      container.innerHTML = htmlcode;
      pagesNo(res);
      findCurrnetPage(page_search_value);
    })
    .catch((err) => {
      location.href = "./404.html";
    });
}
function pagesNo(pages) {
  const page_btns = document.getElementById("page_btns");
  page_btns.innerHTML = "";
  for (let i = 1; i <= pages.pages; i++) {
    page_btns.innerHTML += `<li class="page_btn" ><a class="a_btn" href='?page=${i}'>${i}</a></li>`;
  }
}

function pagination(querySet, page, eachPageLength) {
  const trimStart = (page - 1) * eachPageLength;
  const trimEnd = trimStart + eachPageLength;
  const trimeData = querySet.slice(trimStart, trimEnd);
  const pages = Math.ceil(querySet.length / eachPageLength);
  return {
    querySet: trimeData,
    pages: pages,
  };
}
function findCurrnetPage(current_page) {
  const pages_btns = document.getElementsByClassName("a_btn");
  for (const page_btn of pages_btns) {
    if (page_btn.innerHTML == current_page) {
      page_btn.parentElement.classList.add("active");
    }
  }
}
function removeItem(evt, id) {
  modalMainText.textContent =
    evt.parentElement.previousElementSibling.children[1].textContent;
  modalMainTime.textContent =
    evt.parentElement.previousElementSibling.children[2].textContent;
  modal_page.classList.remove("delete");
  modal_page.querySelectorAll("button")[0].setAttribute("idValue", id);
  // console.log(modal_page.querySelectorAll("button")[0]);
  deleteBtnModal.addEventListener("click", function (evt) {
    const x = evt.target.getAttribute("idValue");
    remove(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${x}`);
    // if(document.getElementsByClassName("active").length<3&&document.getElementsByClassName("page_btn").length>1){
    //   const url = new URL(window.location.href);
    //   let page_no=url.searchParams.get("page");
    //   window.location.href=`./todos_page.html?page=${page_no-1}`;
    // }else if(document.getElementsByClassName("active").length<3&&document.getElementsByClassName("page_btn").length==1){
    //   window.location.href=`./todos_page.html?page=1`;
    // }
    modal_page.classList.add("delete");
  });
}
cancelBtnModal.addEventListener("click", function () {
  modal_page.classList.add("hidden");
});

async function remove(url) {
  // Awaiting fetch which contains
  // method, headers and content-type
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  }).then(res=>{
    
  }).finally(x=>todolist());

  // Awaiting for the resource to be deleted
  // todolist();
}
function checked(evt, id) {
  let data = {};
  if (evt.previousElementSibling.hasAttribute("checked")) {
    data.checked = false;
  } else {
    data.checked = true;
  }
  // data.title = evt.innerHTML;
  // data.dueDate = evt.nextSibling.innerHTML;
  data.updatedAt = new Date();
  // data.description = evt.parentElement.parentElement.children[2].innerHTML;

  ischecked(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${id}`, data);
}
async function ischecked(url, dataObject) {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(dataObject),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => todolist());
}
function editTodo(evt, id) {
  // let url = new URL(window.location.href);
  //     
  const url = new URL(window.location.href);
  let page_search_value = url.searchParams.get("page");
  if(page_search_value==null){
    page_search_value=1;
  }
  const params = new URLSearchParams({ 'page': page_search_value, 'id': id });
  const query = params.toString()
  window.location.href = `./index.html?${query}`;
}
