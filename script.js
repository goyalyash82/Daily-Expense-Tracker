let total = 0;
let monthlyTotal = 0;
let expenses = [];

function addExpense() {
  const desc = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!desc || isNaN(amount) || amount <= 0 || !category) {
    alert("Please fill all fields with valid values.");
    return;
  }

  const date = new Date();
  const entry = {
    description: desc,
    amount,
    category,
    date: date.toISOString() // store full date for filtering
  };

  expenses.push(entry);
  updateUI();
  clearInputs();
}

function updateUI() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";
  total = 0;
  monthlyTotal = 0;

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  expenses.forEach((exp, index) => {
    const expDate = new Date(exp.date);
    const li = document.createElement("li");

    li.innerHTML = `
      ${exp.description} - ₹${exp.amount.toFixed(2)} 
      <span class="category">${exp.category}</span>
      <span style="font-size: 12px; color: gray;"> (${expDate.toLocaleDateString()})</span>
      <button onclick="deleteExpense(${index})">❌</button>
    `;

    list.appendChild(li);
    total += exp.amount;

    // Monthly total calculation
    if (expDate.getMonth() === thisMonth && expDate.getFullYear() === thisYear) {
      monthlyTotal += exp.amount;
    }
  });

  document.getElementById("total").innerText = total.toFixed(2);
  document.getElementById("monthly-total").innerText = monthlyTotal.toFixed(2);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

function clearAll() {
  if (confirm("Are you sure you want to clear all expenses?")) {
    expenses = [];
    updateUI();
  }
}

function clearInputs() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
}

