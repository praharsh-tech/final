export function renderTasks(taskArray){

    const taskList = document.getElementById("taskList");
    
    taskList.innerHTML = "";
    
    if(taskArray.length === 0){
    
    taskList.innerHTML = "<p class='text-gray-500'>No tasks found</p>";
    return;
    
    }
    
    taskArray.forEach(task => {
    
    const div = document.createElement("div");
    
    div.className = "bg-white p-5 rounded-xl shadow";
    
    div.innerHTML = div.innerHTML = `

<div class="taskCard space-y-3">

<h3 class="text-lg font-semibold text-blue-700">
${task.title}
</h3>

<p class="text-gray-600 text-sm">
${task.description}
</p>

<div class="flex justify-between text-sm">

<p>
<strong>Deadline:</strong> ${task.deadline}
</p>

<p class="text-red-500">
Time Left:
<span class="taskTimer" data-deadline="${task.deadline}"></span>
</p>

</div>

<div class="flex items-center justify-between">

<span class="px-3 py-1 text-xs rounded-full
${task.status==="Completed" ? "bg-green-100 text-green-700" :
task.status==="Processing" ? "bg-blue-100 text-blue-700" :
task.status==="Late" ? "bg-yellow-100 text-yellow-700" :
task.status==="Failed" ? "bg-red-100 text-red-700" :
"bg-gray-100 text-gray-700"}">

${task.status}

</span>

</div>

<select
class="hodStatusSelect border rounded p-2 w-full mt-2"
data-id="${task.id}">

<option value="Pending" ${task.status==="Pending"?"selected":""}>
Pending
</option>

<option value="Processing" ${task.status==="Processing"?"selected":""}>
Processing
</option>

<option value="Completed">
Completed
</option>

</select>

<textarea
class="hodReply border rounded p-2 w-full mt-2"
data-id="${task.id}"
placeholder="Write response to Principal...">${task.hodReply || ""}</textarea>

<input
type="file"
class="hodFile border rounded p-2 w-full mt-2"
data-id="${task.id}">

<button
class="submitTaskBtn hidden bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-3 w-full"
data-id="${task.id}">

Submit Task

</button>

</div>
`;
    
    taskList.appendChild(div);
    
    });
    
    }