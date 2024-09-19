let todo=JSON.parse(localStorage.getItem("todo") || []);
const todoinput=document.getElementById("todoinput");
const todolist=document.getElementById("todolist");
const todocount=document.getElementById("todocount");
const addbutton=document.querySelector(".btn");
const deletebutton=document.getElementById("deletebutton");