document.addEventListener("DOMContentLoaded", () => {
  const feedingForm = document.getElementById("feedingForm");
  const feedingList = document.getElementById("feedingList");
  const errorMessage = document.getElementById("errorMessage");

  // Handle form submission
  feedingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form refresh

    const feedingDate = document.getElementById("feedingDate").value;
    const feedingTime = document.getElementById("feedingTime").value.trim();
    const foodAmount = document.getElementById("foodAmount").value.trim();

    if (feedingDate && feedingTime && foodAmount) {
      const listItem = document.createElement("li");
      listItem.className = "list-item list-group-item";
      listItem.textContent = `${feedingDate} - ${feedingTime}: ${foodAmount}`;

      feedingList.appendChild(listItem);
      feedingForm.reset();
      errorMessage.style.display = "none";
    } else {
      errorMessage.style.display = "block"; // Show error if fields are empty
    }
  });

  // Export data as JSON
  document.getElementById("exportDataBtn").addEventListener("click", () => {
    const data = [];
    const items = feedingList.querySelectorAll(".list-item");
    items.forEach(item => {
      const [date, time, amount] = item.textContent.split(" - ");
      data.push({ date, time, amount });
    });

    console.log(JSON.stringify(data, null, 2));
  });
});

