const currentDate = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');

function updateDateAndTime() {
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  currentDate.innerHTML = formattedDate;
  currentTime.innerHTML = formattedTime;
}

updateDateAndTime();
setInterval(updateDateAndTime, 1000);

function newItem() {
  // Add new item to the list:
  let inputValue = $('#input').val();
  if (inputValue === '') {
    alert("You must write something.");
  } else {
    let task = inputValue;
    let li = $('<li></li>');
    li.append(inputValue);
    $('#list').append(li);

    // Cross item from the list:
    function crossOut() {
      li.toggleClass("strike");
      updateLocalStorage();
    }
    li.on("dblclick", crossOut);

    // Edit item:
    function editItem() {
      li.attr('contenteditable', true);
      li.focus();
    }
    li.on("click", editItem);
 
    // Delete button:
    let removeButton = $('<button></button>').addClass('btn btn-danger btn-sm').attr('title', 'Remove the "' + task + '" task').attr('contenteditable', false);
    let removeIcon = `<button title="Remove task" class="remove-task"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg></button>`
    removeButton.append(removeIcon);
    li.append(removeButton);
    removeButton.on("click", function() {
      if (confirm("Are you sure you want to delete this item?")) {
      li.remove();
      // Remove the task from localStorage:
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      let index = tasks.indexOf(inputValue);
      if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  });

    // Save the task to localStorage:
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(inputValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Add event listener to the input field to detect Enter key press:
$('#input').keypress(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent default form submit behavior
    newItem();
    $('#input').val(''); // Clear input field after adding task
  }
});

// Load tasks from localStorage when the page loads:
$(document).ready(function() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function(task) {
    let li = $('<li></li>');
    li.append(task);
    $('#list').append(li);

    // Cross item from the list:
    function crossOut() {
      li.toggleClass("strike");
      updateLocalStorage();
    }
    li.on("dblclick", crossOut);

    // Edit item:
    function editItem() {
      li.attr('contenteditable', true);
      li.focus();
    }
    li.on("click", editItem);

    // Delete button "X":
    let removeButton = $('<button></button>').addClass('btn btn-danger btn-sm').attr('title', 'Remove the "' + task + '" task').attr('contenteditable', false);
    let removeIcon = `<button title="Remove task" class="remove-task-local"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg></button>`
    removeButton.append(removeIcon);
    li.append(removeButton);
    removeButton.on("click", function() {
      if (confirm("Are you sure you want to delete this item?"))
      li.remove();
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      let index = tasks.indexOf(task);
      if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
  });
});

// Update localStorage with the current list of tasks:
function updateLocalStorage() {
  let tasks = [];
  $('#list li').each(function() {
    tasks.push($(this).text());
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

  // Reorder of items:
  $('#list').sortable();
  