let total = 0;

function addExpense() {
  const descInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!desc || isNaN(amount) || amount <= 0) {
    alert("Please enter valid description and amount.");
    return;
  }

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    ${desc} - ₹${amount.toFixed(2)}
    <button onclick="removeExpense(this, ${amount})">❌</button>
  `;

  document.getElementById("expense-list").appendChild(listItem);

  total += amount;
  document.getElementById("total").innerText = total.toFixed(2);

  // Clear input fields
  descInput.value = "";
  amountInput.value = "";
}

function removeExpense(button, amount) {
  button.parentElement.remove();
  total -= amount;
  document.getElementById("total").innerText = total.toFixed(2);
}
