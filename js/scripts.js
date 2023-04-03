const currentDate = document.createElement('div');
currentDate.setAttribute('id', 'current-date');
document.querySelector('.container').insertAdjacentElement('afterbegin', currentDate);

function updateDate() {
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  currentDate.innerHTML = `Today is ${formattedDate}`;
}

updateDate();

setInterval(updateDate, 1000);

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
    let removeButton = $('<button>X</button>').addClass('btn btn-danger btn-sm').attr('title', 'Remove the "' + task + '" task').attr('contenteditable', false);
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
    let removeButton = $('<button>X</button>').addClass('btn btn-danger btn-sm').attr('title', 'Remove the "' + task + '" task').attr('contenteditable', false);
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
  