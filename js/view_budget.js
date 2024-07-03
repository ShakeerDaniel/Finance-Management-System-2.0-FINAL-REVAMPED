function loadBudgets() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    const key = `budgets_${currentUser}`;
    const budgets = JSON.parse(localStorage.getItem(key) || "[]");
    const budgetsDiv = document.getElementById("budget-list");
    budgetsDiv.innerHTML = ""; // Clear previous content
    if (budgets.length === 0) {
        budgetsDiv.innerHTML = "No budgets found.";
    } else {
        budgets.forEach(budget => {
            const div = document.createElement("div");
            div.innerText = `Category: ${budget.category}, Amount: ${budget.amount}`;
            div.style.color = 'yellow';
            budgetsDiv.appendChild(div);
        });
    }
}

window.onload = loadBudgets;
