document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  

  const saveTaskTolocalStorage = () => {
    const tasks =Array.from(taskList.querySelectorAll('li')).map(li=> ({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('.checkbox').checked
    }));
    localStorage.setItem('tasks' , JSON.stringify(tasks));
  };
  const loadTasksFromLocalStorage =()=>{
    const savedTasks =JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(({text,completed}) => addTask(text, completed,false));
  }

  const addTask = (text, completed=false) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) {
      return;
    }
    const li = document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" class="checkbox" ${completed ? 'checked': ''}>
    <span>${taskText}</span>
    <div class="task-buttons" >
     <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `
    ;
    const checkbox =li.querySelector('.checkbox');

    checkbox.addEventListener('change',() =>{
      const isChecked = checkbox.checked;
      li.classList.toggle('completed', isChecked);
      saveTaskTolocalStorage();

    });
   
    li.querySelector('.delete-btn').
    addEventListener('click' , () => {
      li.remove();
      saveTaskTolocalStorage();
    });
    
    taskList.appendChild(li);
    taskInput.value = '';
    saveTaskTolocalStorage();
  };

  addTaskBtn.addEventListener('click', ()=> addTask());

  taskInput.addEventListener('keypress', (e) => {
    if (e.key ==='Enter') {
      e.preventDefault();
      addTask();
    }
  });
  loadTasksFromLocalStorage();
});
