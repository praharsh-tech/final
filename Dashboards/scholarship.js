const user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user || user.role !== "scholarship"){
window.location.href="../index.html";
}

document.getElementById("scholarHeader").textContent =
`${user.name} (${user.dept})`;

function getTasks(){
return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

const tasks=getTasks();

const myTasks=tasks.filter(t=>
t.assignedTo.includes(user.username)
);

renderTasks(myTasks);
updateDashboard(myTasks);

}

function updateDashboard(tasks){

document.getElementById("totalTasks").textContent=tasks.length;

document.getElementById("completedTasks").textContent=
tasks.filter(t=>t.status==="Completed").length;

document.getElementById("pendingTasks").textContent=
tasks.filter(t=>t.status!=="Completed").length;

}

function renderTasks(tasks){

const container=document.getElementById("scholarTasks");

container.innerHTML="";

tasks.forEach(task=>{

const div=document.createElement("div");

div.className="bg-white p-6 rounded-xl shadow";

div.innerHTML=`

<h3 class="text-lg font-semibold text-purple-700">
${task.title}
</h3>

<p>${task.description}</p>

<p class="text-sm mt-2">
Deadline: ${task.deadline}
</p>

<select class="statusSelect border p-2 w-full mt-2"
data-id="${task.id}">

<option value="Pending">Pending</option>
<option value="Processing">Processing</option>
<option value="Completed">Completed</option>

</select>

<textarea class="replyBox border p-2 w-full mt-2"
data-id="${task.id}"
placeholder="Reply..."></textarea>

<input type="file"
class="replyFile border p-2 w-full mt-2"
data-id="${task.id}">

<button class="submitBtn bg-purple-600 text-white px-4 py-2 rounded mt-3"
data-id="${task.id}">
Submit Task
</button>

`;

container.appendChild(div);

});

attachEvents();

}

function attachEvents(){

document.querySelectorAll(".submitBtn").forEach(btn=>{

btn.onclick=(e)=>{

const id=Number(e.target.dataset.id);

const tasks=getTasks();

const task=tasks.find(t=>t.id===id);

const reply=document.querySelector(
`.replyBox[data-id="${id}"]`
);

const fileInput=document.querySelector(
`.replyFile[data-id="${id}"]`
);

const file=fileInput.files[0];

const reader=new FileReader();

reader.onload=function(){

task.reply=reply.value;
task.fileResponse=reader.result;
task.status="Completed";

saveTasks(tasks);

alert("Task submitted");

loadTasks();

};

reader.readAsDataURL(file);

};

});

}

document.getElementById("logoutBtn").onclick=()=>{
localStorage.removeItem("loggedInUser");
window.location.href="../index.html";
};

loadTasks();