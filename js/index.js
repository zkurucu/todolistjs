const todoInput=document.querySelector("#task")
const addTaskButton=document.querySelector("#liveToastBtn")
const todoList=document.querySelector("#list")
const toast=document.querySelector(".toast")
const toastHeader=document.querySelector(".toast-header strong")
const toastBody=document.querySelector(".toast-body")
const toastSuccessMessage="Todo başarıyla eklendi"
const toastErrorMessage="Hata! Lütfen kontrol ederek yeniden ekleyiniz."
const toastDeleteMessage="Todo Başarıyla silindi."
let toastStorage=[]

const option={
    animation:true,
    delay:2000
}
const toastElement=new bootstrap.Toast(toast,option)
toast.style.display="none"
const successMessage=``
const errorMessage=``

eventListeners()
function eventListeners(){
    todoList.addEventListener("click",deleteItem)
    document.addEventListener("DOMContentLoaded",loadAllTodosUI)
}


// TODO Add, Delete, Checked

function newElement(){
    let newtodo=task.value.trim()
    if(newtodo!==""){
        addTodoToStorage(newtodo)
        addTodoToUI(newtodo)
        toastBody.innerHTML=`
        ${toastSuccessMessage}
        <i class="fas fa-smile text-success"></i>
        `
        
    }
    else{
        toastBody.innerHTML=`
        ${toastErrorMessage}
        <i class="fas fa-frown text-danger"></i>
        `
    }
    toast.style.display="block"
    toastElement.show()
}


//Checked İşlemi
  function checkedTodo(e){
    if(e.target.className==="checked"){
         e.target.classList.remove("checked")
     }
     else{
          e.target.classList.add("checked")
     }
    //  
    
 }

 //Todo LocalStorage Add, Delete, GetAll

 function addTodoToStorage(todo){
     toastStorage=getAllTodosToStorage()
     toastStorage.push(todo)
     localStorage.setItem("todos",JSON.stringify(toastStorage))
 }
 //Todoları arayüze aktarma
 function loadAllTodosUI(){
     toastStorage=getAllTodosToStorage()
     todoList.innerHTML=""
    toastStorage.map(function(todo){
       let newTask=`<li>${todo}<a class="close float-right border-0" ><i id="delete-item" class="fas fa-times"></i></a></li>`
       todoList.innerHTML=todoList.innerHTML+newTask
    })
 }
 //Seçilen todoyu arayüzden ve storagedan silme
 function deleteItem(e){
    if (e.target.id==="delete-item") {
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent.trim());

        toastBody.innerHTML=`
        ${toastDeleteMessage}
          <i class="fas  fa-thumbs-up text-info pl-1"></i>
        `
        toast.style.display="block"
        toastElement.show()
    }
    else{
        checkedTodo(e)
    }

    
}

 function deleteTodoFromStorage(deletetodo){
    
    let todos=getAllTodosToStorage();
    
    todos.forEach(function(todo,index){
       if (todo===deletetodo) {
           
        todos.splice(index,1);
      
       }
        
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

 //Todoları storage dan alma

 function getAllTodosToStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        return todos=[];
    }
    else{
        return todos=JSON.parse(localStorage.getItem("todos"));
        
    }
    
     
 }

 //UI iŞLEMLERİ
 function addTodoToUI(newTodo){//String değerini list item olarak UI'ya ekledik.


    //List item oluşturma
    const listItem=document.createElement("li");
    //List item a textNode 
    listItem.appendChild(document.createTextNode(newTodo));
    //Link oluşturma
    const link=document.createElement("a");
    link.href="#";
    link.className="close";
    link.innerHTML=" <i id='delete-item' class='fas fa-times'></i>";
    //List item a child olarak link ekleme
    listItem.appendChild(link); 
    //TodoList e child olarak list item ekleme
    todoList.appendChild(listItem);
    todoInput.value="";
   
}