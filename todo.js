
//tüm elementleri seçme:

const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

//tüm event listenerlar için function:
eventListeners();

function eventListeners (){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    //arayüzden todoları temizleme
    if(confirm("Tümünü temizlemek istediğinize emin misiniz?")){

        //  todoList.innerHTML=""; yavaş yöntem
        while(todoList.firstElementChild !=null){
            todoList.removeChild(todoList.firstElementChild);
        }

    }
         localStorage.removeItem("todos");


}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue)=== -1){
            //bulamadı
            listItem.setAttribute("style","display:none !important");
        }else{
            listItem.setAttribute("style","display:block");
        }

    })
}

function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        
        showAlert("success","Başarıyla silindi...")
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1); //arraydan değeri silme
        }
    });
   
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);

    })
}

function addTodo(e){
    const newTodo=todoInput.value.trim(); //trim boşlukları silmek içindir.
    
    if(newTodo===""){

     /*
     <div class="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                      </div>


     */

        showAlert("danger","Lütfen bir todo girin...");
    }else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Başarıyla eklendi.")
    }
    addTodoToUI(newTodo);


    e.preventDefault(); //sayfa kendi kendine yeniden yüklenmesin diye en alta yazılır
}
//localstorage ekleme


function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoToStorage(newTodo){
   
let todos=getTodosFromStorage();
todos.push(newTodo);

localStorage.setItem("todos",JSON.stringify(todos));

}


function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
 
        firstCardBody.appendChild(alert);

        //settimeout objesi uyarı verip bikaç saniye sonra kaybolmasını sağlar.
        setTimeout(function(){
            alert.remove();
        },1000);

}

function addTodoToUI(newTodo){ //string değerini liast item olarak UI(arayüze) ya ekle

    /*

 <!-- <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>-->

*/

//list item oluşturma
const listItem=document.createElement("li");
const link=document.createElement("a");

//link oluşturma
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i> ";

listItem.className="list-group-item d-flex justify-content-between";

//text node ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

// to-do liste list item ekleme

todoList.appendChild(listItem);

todoInput.value=""; //input yazı ekledikten sonra boşalsın diye

}
