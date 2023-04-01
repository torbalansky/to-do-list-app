function newItem() {
  // Add new item to the list:
  let inputValue = $('#input').val();
  if (inputValue === '') {
    alert("You must write something.");
  } else {
    let li = $('<li></li>');
    li.append(inputValue);
    $('#list').append(li);

    // Cross item from the list:
    function crossOut() {
      li.toggleClass("strike");
      updateLocalStorage();
    }
    li.on("dblclick", crossOut);
 
    // Delete button "X":
    let crossOutButton = $('<crossOutButton>X</crossOutButton>');
    li.append(crossOutButton);
    crossOutButton.on("click", function() {
      li.remove();
      updateLocalStorage();
    });

    // Add class "delete" from css:
    function deleteListItem() {
      li.addClass("delete");
    }
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

    // Delete button "X":
    let crossOutButton = $('<crossOutButton>X</crossOutButton>');
    li.append(crossOutButton);
    crossOutButton.on("click", function() {
      li.remove();
      updateLocalStorage();
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

let clearButton = $('<button>Clear All</button>');
$('#list-container').append(clearButton);
clearButton.on("click", function() {
  $('#list').empty();
  localStorage.clear();
});

// Reorder of items:
$('#list').sortable();