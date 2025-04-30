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

