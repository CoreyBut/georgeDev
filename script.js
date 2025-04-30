document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");
  const loadSampleBtn = document.getElementById("loadSampleBtn");

  const dogImageUpload = document.getElementById("dogImageUpload");
  const userDogGallery = document.getElementById("userDogGallery");

  dogImageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";

      const img = document.createElement("img");
      img.src = event.target.result;
      img.className = "img-fluid rounded shadow-sm";
      img.alt = "Uploaded Dog Photo";

      col.appendChild(img);
      userDogGallery.appendChild(col);
    };
    reader.readAsDataURL(file);
  });

  
  let editingIndex = null;

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
  editingIndex = index; // mark we're editing this one
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
if (editingIndex !== null) {
  savedData[editingIndex] = newEntry;
  editingIndex = null;
  feedingList.innerHTML = "";
  savedData.forEach(displayEntry);
} else {
  savedData.push(newEntry);
  displayEntry(newEntry, savedData.length - 1);
}

localStorage.setItem("feedings", JSON.stringify(savedData));

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
