document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

  // Handle form submission for feeding
feedingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  console.log("Form submitted"); // Debugging log

  const feedingDate = document.getElementById("feedingDate").value;
  const feedingTime = document.getElementById("feedingTime").value.trim();
  const foodAmount = document.getElementById("foodAmount").value.trim();

  // Log the form data
  console.log("Form Data:", feedingDate, feedingTime, foodAmount);

  if (feedingDate && feedingTime && foodAmount) {
    const listItem = document.createElement("li");
    listItem.className = "list-item list-group-item";
    listItem.textContent = `${feedingDate} - ${feedingTime}: ${foodAmount}`;
    
    feedingList.appendChild(listItem);

    console.log("New feeding added:", listItem.textContent);
    feedingForm.reset();
    errorMessage.style.display = "none";
  } else {
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
