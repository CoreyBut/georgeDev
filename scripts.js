

document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

  // Load saved entries
  const savedData = JSON.parse(localStorage.getItem("feedings")) || [];
  savedData.forEach(entry => {
    const listItem = document.createElement("li");
    listItem.className = "list-item list-group-item";
    listItem.textContent = `${entry.date} - ${entry.time}: ${entry.amount}`;
    feedingList.appendChild(listItem);
  });

  // Handle form submission
  feedingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const feedingDate = document.getElementById("feedingDate").value;
    const feedingTime = document.getElementById("feedingTime").value.trim();
    const foodAmount = document.getElementById("foodAmount").value.trim();

    if (feedingDate && feedingTime && foodAmount) {
      const listItem = document.createElement("li");
      listItem.className = "list-item list-group-item";
      listItem.textContent = `${feedingDate} - ${feedingTime}: ${foodAmount}`;
      feedingList.appendChild(listItem);

      savedData.push({ date: feedingDate, time: feedingTime, amount: foodAmount });
      localStorage.setItem("feedings", JSON.stringify(savedData));

      feedingForm.reset();
      errorMessage.style.display = "none";
    } else {
      errorMessage.style.display = "block";
    }
  });

  // Export button
  document.getElementById("exportDataBtn").addEventListener("click", () => {
    const items = feedingList.querySelectorAll(".list-item");
    const data = Array.from(items).map(item => {
      const [date, rest] = item.textContent.split(" - ");
      const [time, amount] = rest.split(": ");
      return { date, time, amount };
    });
    console.log("Final JSON data:", JSON.stringify(data, null, 2));
  });
});

