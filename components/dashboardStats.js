import { getTasks } from "../principal/principal.js";

export function loadDashboardStats(){

const tasks = getTasks();

/* TOTAL */

document.getElementById("totalTasks").textContent =
tasks.length;

/* COMPLETED */

document.getElementById("completedTasks").textContent =
tasks.filter(t => t.status === "Completed").length;

/* PENDING */

document.getElementById("pendingTasks").textContent =
tasks.filter(t => t.status === "Pending").length;

/* LATE */

document.getElementById("lateTasks").textContent =
tasks.filter(t => t.status === "Late").length;

/* FAILED */

document.getElementById("failedTasks").textContent =
tasks.filter(t => t.status === "Failed").length;

}