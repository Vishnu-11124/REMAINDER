let todo=JSON.parse(localStorage.getItem("todo") || []);
const todoinput=document.getElementById("todoinput");
const todolist=document.getElementById("todolist");
const todocount=document.getElementById("todocount");
const addbutton=document.querySelector(".btn");
const deletebutton=document.getElementById("deletebutton");

document.addEventListener("DOMContentLoaded",function()
{
    addbutton.addEventListener("click",addtask);
    todoinput.addEventListener("keydown",function(event)
    {
        if(event.key==="Enter")
        {
            event.preventDefault();
            addtask();
        }
    });
    deletebutton.addEventListener("click",deletealltasks());
    displaytasks();
});

function addtask()
{
    const newtask=todoinput.ariaValueMax.trim();
    if(newtask !=="")
    {
        todo.push({text:newtask,disabled:false});
        saveToLocalStorage();
        todoinput.value="";
        displaytasks();
    }
}

function displaytasks()
{
    todolist.innerHTML="";
    todo.forEach((item,index) => {
        const p=document.createElement("p");
        p.innerHTML=`
        <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked":""}>
       <p id ="todo-${index}" class="${item.disabled ? "disabled":""}" onclick="editask()${index})">${item.text}</p>
        </div>`;
        p.querySelector(".todo-checkbox").addEventListener("change",()=>
        {
            toggleTask(index);
            todolist.appendChild(p);
        });
        todocount.textContent=todo.length;
    }    );
}
function editask(index)
    {
        const todoitem=document.getElementById(`todo-${index}`);
        const existingtext=todo[index].text;
        const inputelement=document.createElement("input")
        inputelement.addEventListener("blur",function()
        {
            const updatedtext=inputelement.value.trim()
            if(updatedtext)
            {
                todo[index].text=updatedtext;
                saveToLocalStorage();
            }
            displaytasks();
        })
    }
function toggleTask(index)
{
    todo[index].disabled=!todo[index].disabled
    saveToLocalStorage();
    displaytasks();
}

function deletealltasks()
{
    todo=[];
    saveToLocalStorage();
    displaytasks();

}
function saveToLocalStorage()
{
    localStorage.setItem("todo",JSON.stringify(todo));
}