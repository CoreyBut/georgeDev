document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");
  const loadSampleBtn = document.getElementById("loadSampleBtn");

  let savedData = [];

  const storedData = localStorage.getItem("feedings");

  if (storedData) {
    savedData = JSON.parse(storedData);
    savedData.forEach(displayEntry);
  } else {
    fetch("data/data.json")
      .then(response => response.json())
      .then(jsonData => {
        savedData = jsonData;
        jsonData.forEach(displayEntry);
        localStorage.setItem("feedings", JSON.stringify(savedData));
      })
      .catch(error => console.error("Failed to load data.json", error));
  }

  function displayEntry(entry, index) {
    const listItem = document.createElement("li");
    listItem.className = "list-item list-group-item d-flex justify-content-between align-items-center";
listItem.innerHTML = `
  <span><strong>${entry.date}</strong> - ${entry.time}: ${entry.amount}</span>
  <span>
    <button class="btn btn-sm btn-warning me-2 edit-btn">Edit</button>
    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
  </span>
`;



    listItem.querySelector(".edit-btn").addEventListener("click", () => {
      document.getElementById("feedingDate").value = entry.date;
      document.getElementById("feedingTime").value = entry.time;
      document.getElementById("foodAmount").value = entry.amount;
      savedData.splice(index, 1); // remove original
      listItem.remove();
      localStorage.setItem("feedings", JSON.stringify(savedData));
    });

    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Delete this entry?")) {
        savedData.splice(index, 1);
        localStorage.setItem("feedings", JSON.stringify(savedData));
        listItem.remove();
      }
    });

    feedingList.appendChild(listItem);
  }

  feedingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const feedingDate = document.getElementById("feedingDate").value;
    const feedingTime = document.getElementById("feedingTime").value.trim();
    const foodAmount = document.getElementById("foodAmount").value.trim();

    if (feedingDate && feedingTime && foodAmount) {
      const newEntry = { date: feedingDate, time: feedingTime, amount: foodAmount };
      savedData.push(newEntry);
      localStorage.setItem("feedings", JSON.stringify(savedData));
      displayEntry(newEntry, savedData.length - 1);
      feedingForm.reset();
      errorMessage.style.display = "none";
    } else {
      errorMessage.style.display = "block";
    }
  });

  document.getElementById("exportDataBtn").addEventListener("click", () => {
    console.log("Final JSON data:", JSON.stringify(savedData, null, 2));
  });

  loadSampleBtn.addEventListener("click", () => {
    document.getElementById("feedingDate").value = "2025-04-30";
    document.getElementById("feedingTime").value = "Afternoon";
    document.getElementById("foodAmount").value = "2 cups";
  });
});
