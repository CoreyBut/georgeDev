document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

  // Retrieve from localStorage on load
let savedData = [];

const storedData = localStorage.getItem("feedings");

if (storedData) {
  savedData = JSON.parse(storedData);
  savedData.forEach(entry => {
    const listItem = document.createElement("li");
    listItem.className = "list-item list-group-item";
    listItem.textContent = `${entry.date} - ${entry.time}: ${entry.amount}`;
    feedingList.appendChild(listItem);
  });
} else {
  // If nothing is in localStorage, load from data.json
  fetch("data/data.json")
    .then(response => response.json())
    .then(jsonData => {
      savedData = jsonData;
      jsonData.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.className = "list-item list-group-item";
        listItem.textContent = `${entry.date} - ${entry.time}: ${entry.amount}`;
        feedingList.appendChild(listItem);
      });
      localStorage.setItem("feedings", JSON.stringify(savedData)); // Save jsonData to localStorage
    })
    .catch(error => console.error("Failed to load data.json", error));
}


  // Handle form submission
  feedingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const feedingDate = document.getElementById("feedingDate").value;
    const feedingTime = document.getElementById("feedingTime").value.trim();
    const foodAmount = document.getElementById("foodAmount").value.trim();

    if (feedingDate && feedingTime && foodAmount) {
      const newEntry = {
        date: feedingDate,
        time: feedingTime,
        amount: foodAmount
      };

      // Create list item
      const listItem = document.createElement("li");
      listItem.className = "list-item list-group-item";
      listItem.textContent = `${newEntry.date} - ${newEntry.time}: ${newEntry.amount}`;
      feedingList.appendChild(listItem);

      // Update savedData and localStorage
      savedData.push(newEntry);
      localStorage.setItem("feedings", JSON.stringify(savedData));

      feedingForm.reset();
      errorMessage.style.display = "none";
    } else {
      errorMessage.style.display = "block";
    }
  });

fetch("data/data.json")
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(entry => {
      savedData.push(entry); // push to local array
      const listItem = document.createElement("li");
      listItem.className = "list-item list-group-item";
      listItem.textContent = `${entry.date} - ${entry.time}: ${entry.amount}`;
      feedingList.appendChild(listItem);
    });
  })
  .catch(error => console.error("Failed to load data.json", error));

  
  // Export button
  document.getElementById("exportDataBtn").addEventListener("click", () => {
    console.log("Final JSON data:", JSON.stringify(savedData, null, 2));
  });
});
