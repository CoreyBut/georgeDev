// Initialize data array
let data = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

// Handle feeding form submission
document.getElementById("feedingForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent form from refreshing the page

  // Get values from the form
  const feedingDate = document.getElementById("feedingDate").value;
  const feedingTime = document.getElementById("feedingTime").value;
  const foodAmount = document.getElementById("foodAmount").value;

  // Create a new list item with the feeding information
  const newFeeding = document.createElement("li");
  newFeeding.classList.add("list-item");
  newFeeding.textContent = `${feedingDate} - ${feedingTime}: ${foodAmount}`;

  // Add the new feeding item to the list
  document.getElementById("feedingList").appendChild(newFeeding);

  // Reset the form fields
  document.getElementById("feedingForm").reset();
});

// Display the data on the page
function displayData(data) {
  const dataContainer = $('#dataContainer');
  dataContainer.empty(); // Clear current list
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

// Form submission to add new data
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

// Editing data
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

// Deleting data
$(document).on('click', '.delete-btn', function() {
  const dataId = $(this).closest('.data-item').data('id');
  data = data.filter(item => item.id !== dataId); // Remove the data
  displayData(data);
});

// Export data to console as JSON
$('#exportDataBtn').on('click', function() {
  console.log(JSON.stringify(data, null, 2)); // Prints the data in JSON format
});

