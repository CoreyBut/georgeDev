document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

  // Handling form submission
  feedingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh

    const feedingDate = document.getElementById("feedingDate").value;
    const feedingTime = document.getElementById("feedingTime").value.trim();
    const foodAmount = document.getElementById("foodAmount").value.trim();

    // Check if all fields are filled
    if (feedingDate && feedingTime && foodAmount) {
      const listItem = document.createElement("li");
      listItem.className = "list-item";
      listItem.textContent = `${feedingDate} - ${feedingTime}: ${foodAmount}`;

      // Add to the feeding list
      feedingList.appendChild(listItem);

      // Reset the form
      feedingForm.reset();
      errorMessage.style.display = "none"; // Hide error message if valid
    } else {
      // Show error message if fields are incomplete
      errorMessage.style.display = "block";
    }
  });

  // Data management (using global data array)
  let data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ];

  // Display the data dynamically on the page
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

  // Add new data
  $('#addDataForm').on('submit', function(e) {
    e.preventDefault();
    const newName = $('#newName').val();
    const newEmail = $('#newEmail').val();
    
    // Add new data to array and update the DOM
    const newData = {
      id: data.length + 1, // Simple ID generation
      name: newName,
      email: newEmail
    };
    data.push(newData);
    displayData(data);
    $('#addDataForm')[0].reset(); // Reset form
  });

  // Editing existing data
  $(document).on('click', '.edit-btn', function() {
    const dataId = $(this).closest('.data-item').data('id');
    const itemToEdit = data.find(item => item.id === dataId);
    
    // Populate the form with current data for editing
    $('#newName').val(itemToEdit.name);
    $('#newEmail').val(itemToEdit.email);
    
    // Change form behavior to update
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
    data = data.filter(item => item.id !== dataId); // Remove data
    displayData(data);
  });

  // Export data to the console
  $('#exportDataBtn').on('click', function() {
    console.log(JSON.stringify(data, null, 2)); // Export data as JSON
  });

  // Initialize the data on page load
  displayData(data);
});

