document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

  // Handle form submission for feeding
  feedingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh

    const feedingDate = document.getElementById("feedingDate").value;
    const feedingTime = document.getElementById("feedingTime").value.trim();
    const foodAmount = document.getElementById("foodAmount").value.trim();

    // Check if all fields are filled
    if (feedingDate && feedingTime && foodAmount) {
      // Create a new list item for the feeding
      const listItem = document.createElement("li");
      listItem.className = "list-item list-group-item"; // Bootstrap classes
      listItem.textContent = `${feedingDate} - ${feedingTime}: ${foodAmount}`;

      // Append the new item to the feeding list
      feedingList.appendChild(listItem);

      // Reset the form after submission
      feedingForm.reset();
      errorMessage.style.display = "none"; // Hide error message if fields are valid
    } else {
      // Show an error message if fields are empty
      errorMessage.style.display = "block";
    }
  });

  // Export Data to console as JSON
  document.getElementById("exportDataBtn").addEventListener("click", () => {
    const data = [];
    const items = feedingList.querySelectorAll(".list-item");
    
    items.forEach(item => {
      const [date, time, amount] = item.textContent.split(" - ");
      data.push({ date, time, amount });
    });

    console.log(JSON.stringify(data, null, 2)); // Export data as JSON to the console
  });

  // Handle login modal form submission
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    // Display the logged-in user in an alert (customize this if needed)
    alert(`Welcome, ${username}!`);
    $('#loginModal').modal('hide'); // Hide modal after login
  });
});

