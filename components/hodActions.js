import { loadHodTasks } from "./hodTasks.js";

function getTasks(){
return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

export function startTaskTimers(){

document.querySelectorAll(".taskTimer").forEach(timer=>{

const deadline = new Date(timer.dataset.deadline);

function update(){

const now = new Date();
const diff = deadline - now;

if(diff <= 0){
timer.textContent = "Deadline Passed";
return;
}

const hours = Math.floor(diff/(1000*60*60));
const minutes = Math.floor((diff%(1000*60*60))/(1000*60));

timer.textContent = `${hours}h ${minutes}m`;

}

update();
setInterval(update,60000);

});

}

export function setupHodActions(){

document.addEventListener("change",(e)=>{

if(e.target.classList.contains("hodStatusSelect")){

const id = Number(e.target.dataset.id);
const tasks = getTasks();

const task = tasks.find(t=>t.id===id);

task.status = e.target.value;

saveTasks(tasks);

const card = e.target.closest(".taskCard");
const submitBtn = card.querySelector(".submitTaskBtn");

if(task.status==="Completed"){
submitBtn.classList.remove("hidden");
}else{
submitBtn.classList.add("hidden");
}

}

});

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("submitTaskBtn")){

const id = Number(e.target.dataset.id);

const tasks = getTasks();
const task = tasks.find(t=>t.id===id);

const reply=document.querySelector(`.hodReply[data-id="${id}"]`);
const fileInput=document.querySelector(`.hodFile[data-id="${id}"]`);

const file=fileInput.files[0];

if(!reply.value){
alert("Write reply");
return;
}

if(!file){
alert("Upload file");
return;
}

if(task.status==="Completed"){
submitBtn.classList.remove("hidden")
}
const reader=new FileReader();

reader.onload=function(){

task.hodReply=reply.value;
task.hodFile=reader.result;
task.status="Completed";
task.locked=true;

saveTasks(tasks);

alert("Task submitted");

loadHodTasks();

};

reader.readAsDataURL(file);

}

});

}
