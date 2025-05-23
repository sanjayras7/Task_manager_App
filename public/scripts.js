document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("taskForm").onsubmit = async function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value;

  if (!title) return alert("Title is required!");

  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  this.reset();
  loadTasks();
};

async function loadTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  const tbody = document.querySelector("#taskTable tbody");
  tbody.innerHTML = "";

  tasks.forEach(task => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="text" value="${task.title}" id="title-${task.id}" disabled></td>
      <td><input type="text" value="${task.description}" id="desc-${task.id}" disabled></td>
      <td class="actions">
        <button class="edit-btn" onclick="enableEdit(${task.id}, this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function enableEdit(id, button) {
  const titleInput = document.getElementById(`title-${id}`);
  const descInput = document.getElementById(`desc-${id}`);

  if (button.innerText === "Edit") {
    titleInput.disabled = false;
    descInput.disabled = false;
    button.innerText = "Save";
  } else {
    titleInput.disabled = true;
    descInput.disabled = true;
    button.innerText = "Edit";

    updateTask(id, "title", titleInput.value);
    updateTask(id, "description", descInput.value);
  }
}

async function updateTask(id, field, value) {
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ field, value })
  });
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE"
  });
  loadTasks();
}
