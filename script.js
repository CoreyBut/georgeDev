document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

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
        localStorage.setItem("feedings", JSON.stringify(savedData));
      })
      .catch(error => console.error("Failed to load data.json", error));
  }

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

      const listItem = document.createElement("li");
      listItem.className = "list-item list-group-item";
      listItem.textContent = `${newEntry.date} - ${newEntry.time}: ${newEntry.amount}`;
      feedingList.appendChild(listItem);

      savedData.push(newEntry);
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
});
