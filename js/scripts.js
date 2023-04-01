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
    let removeButton = $('<button>X</button>').addClass('btn btn-danger btn-sm').attr('title', 'Remove the "' + task + '" task');
    let removeIcon = $('<i></i>').addClass('bi bi-x');
    removeButton.append(removeIcon);
    li.append(removeButton);
    removeButton.on("click", function() {
      li.remove();
      // Remove the task from localStorage:
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      let index = tasks.indexOf(inputValue);
      if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });

    // Save the task to localStorage:
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(inputValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

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
    let removeButton = $('<button>X</button>').addClass('btn btn-danger btn-sm').attr('title', 'Remove the "' + task + '" task');
    let removeIcon = $('<i></i>').addClass('bi bi-x');
    removeButton.append(removeIcon);
    li.append(removeButton);
    removeButton.on("click", function() {
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
  