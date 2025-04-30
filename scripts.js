$(document).ready(function() {
  let data = [];
  
  fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;
      displayData(data);
    });

  function displayData(data) {
    const dataContainer = $('#dataContainer');
    dataContainer.empty();
    data.forEach(item => {
      dataContainer.append(`
        <div class="data-item" data-id="${item.id}">
          <p>Name: ${item.name}</p>
          <p>Email: ${item.email}</p>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `);
    });
  }
});


//form submissions
$('#addDataForm').on('submit', function(e) {
  e.preventDefault();
  const newName = $('#newName').val();
  const newEmail = $('#newEmail').val();
  
  // Add the new data to the array and update the DOM
  const newData = {
    id: data.length + 1, // Simple ID generation, in a real app you would need a more robust solution
    name: newName,
    email: newEmail
  };
  data.push(newData);
  displayData(data);
  $('#addDataForm')[0].reset(); // Reset the form
});


//editing
$(document).on('click', '.edit-btn', function() {
  const dataId = $(this).closest('.data-item').data('id');
  const itemToEdit = data.find(item => item.id === dataId);
  
  // Populate the form with the item's data
  $('#newName').val(itemToEdit.name);
  $('#newEmail').val(itemToEdit.email);
  
  // Change the form to update instead of add
  $('#addDataForm').off('submit').on('submit', function(e) {
    e.preventDefault();
    itemToEdit.name = $('#newName').val();
    itemToEdit.email = $('#newEmail').val();
    displayData(data);
    $('#addDataForm')[0].reset();
  });
});


//delete function
$(document).on('click', '.delete-btn', function() {
  const dataId = $(this).closest('.data-item').data('id');
  data = data.filter(item => item.id !== dataId); // Remove the data
  displayData(data);
});

//export data to console
$('#exportDataBtn').on('click', function() {
  console.log(JSON.stringify(data, null, 2)); // Prints the data in JSON format
});
