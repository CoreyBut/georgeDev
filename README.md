# 🐾 Dev G — Final Project

**Author:** Corey B  
**Version:** Dev George

Welcome to **Dev G**, my final project for Web Dev. This app helps track your dog's feeding schedule so you never forget when (or how much) your furry homie ate. It also gives you options to upload pictures, edit feed logs, and even export your data like a pro.

Check out my full portfolio: [coreybut.github.io/coreybut](https://coreybut.github.io/coreybut)

---

## 🚀 Features

- 🐶 **Dog Food Tracker** — track date, time, and amount of food  
- ✍️ **Add/Edit/Delete Feedings** — manage entries easily  
- 📥 **Load Sample Data** — instantly fill in a mock feeding  
- 🗃️ **Export as JSON** — view or copy your data in the console  
- 📸 **Upload Dog Pics** — store and display user-uploaded photos  
- 💾 **Persistent Data** — everything saves using `localStorage`  
- 📱 **Responsive Layout** — mobile-ready thanks to Bootstrap 5

---

## 🛠️ Tech Stack

- **HTML5**  
- **CSS3** (with custom and Bootstrap 5 styles)  
- **JavaScript (Vanilla)**  
- **LocalStorage** for data and images  
- **Bootstrap 5** for layout and responsiveness  

---

## 🧰 Setup Instructions

1. Clone this repo:  
   ```bash
   git clone https://github.com/CoreyBut/georgeDev.git

---

## 🧪 Sample Code Highlight

if (editingIndex !== null) {
  savedData[editingIndex] = newEntry;
  editingIndex = null;
  feedingList.innerHTML = "";
  savedData.forEach(displayEntry);
}

This block lets you edit a feeding log without duplicating or losing anything — just clean and smooth UX.

---

## 🧠 User Story

As a dog owner, 
I want to track my dog's feeding history and photo gallery,
So that I can stay consistent with care and share cute updates with friends.

---

📌 Validation Reports

WAVE Accessibility Report

Nu HTML Validator

---

📅 Wireframe

See the wireframe design here

---


## 📌 License

This project is licensed under the MIT License. See the LICENSE file for full terms.
