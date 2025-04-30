document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

  // Handle form submission for feeding
  feedingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh

    // Get form input values
    const feedingDate = document.getElementById("feedingDate").value;
    const feedingTime = document.getElementById("feedingTime").value.trim();
    const foodAmount = document.getElementById("foodAmount").value.trim();

    // Log form data to check if values are being captured
    console.log("Form Data:", feedingDate, feedingTime, foodAmount);

    // Check if all fields are filled
    if (feedingDate && feedingTime && foodAmount) {
      // Create a new list item for the feeding
      const listItem = document.createElement("li");
      listItem.className = "list-item list-group-item"; // Bootstrap classes
      listItem.textContent = `${feedingDate} - ${feedingTime}: ${foodAmount}`;

      // Append the new item to the feeding list
      feedingList.appendChild(listItem);

      // Log to console to ensure the item is added to the list
      console.log('New feeding added:', listItem.textContent);

      // Reset the form after submission
      feedingForm.reset();
      errorMessage.style.display = "none"; // Hide error message if fields are valid
    } else {
      // Show an error message if fields are empty
      errorMessage.style.display = "block";
      console.log("Error: Missing fields");
    }
  });

  // Export Data to console as JSON
  document.getElementById("exportDataBtn").addEventListener("click", () => {
    const data = [];
    const items = feedingList.querySelectorAll(".list-item");

    // Log all feeding items to the console to check if they're being captured
    console.log('Feeding items:', items);

    items.forEach(item => {
      const [date, time, amount] = item.textContent.split(" - ");

      // Log the extracted data for each item
      console.log('Item data:', { date, time, amount });

      data.push({ date, time, amount });
    });

    // Log the final JSON data to the console
    console.log('Final JSON data:', JSON.stringify(data, null, 2));
  });
});
