
function loadExpenses() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    // Get income data
    const key = `income_${currentUser}`;
    const incomeData = JSON.parse(localStorage.getItem(key) || "[]");
    const totalIncome = incomeData.reduce((sum, entry) => sum + entry.amount, 0);

    // Get expenses data
    const expensesKey = `expenses_${currentUser}`;
    const expenses = JSON.parse(localStorage.getItem(expensesKey) || "[]");
    const expensesDiv = document.getElementById("expenses-list");
    expensesDiv.innerHTML = ""; // Clear previous content

    let totalExpenses = 0;
    if (expenses.length === 0) {
        expensesDiv.innerHTML = "No expenses found.";
    } else {
        expenses.forEach(entry => {
            const div = document.createElement("div");
            div.innerText = `Category: ${entry.category}, Amount: ${entry.amount}`;
            div.style.color = 'red';
            expensesDiv.appendChild(div);
            totalExpenses += entry.amount;
        });
    }

    // Calculate savings
    const totalSavings = totalIncome - totalExpenses;

    // Display total expenses and savings
    document.getElementById("total-expenses").innerText = `Total Expenses: ${totalExpenses}`;
    document.getElementById("total-savings").innerText = `Total Savings: ${totalSavings}`;
}

window.onload = loadExpenses;



