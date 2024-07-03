// Utility function to get the current user
function getCurrentUser() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return null;
    }
    return currentUser;
}

// Load income function
function loadIncome() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const key = `income_${currentUser}`;
    const income = JSON.parse(localStorage.getItem(key) || "[]");
    const incomeDiv = document.getElementById("income-list");
    incomeDiv.innerHTML = ""; // Clear previous content
    let totalIncome = 0;

    if (income.length === 0) {
        incomeDiv.innerHTML = "No income found.";
    } else {
        income.forEach(entry => {
            const div = document.createElement("div");
            div.innerText = `Amount: ${entry.amount}`;
            div.style.color = 'green';
            incomeDiv.appendChild(div);
            totalIncome += entry.amount;
        });
    }

    document.getElementById("total-income").innerText = `Total Income: ${totalIncome}`;
}

// Load expenses function
function loadExpenses() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const key = `expenses_${currentUser}`;
    const expenses = JSON.parse(localStorage.getItem(key) || "[]");
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

    document.getElementById("total-expenses").innerText = `Total Expenses: ${totalExpenses}`;
}

// Load budgets function
function loadBudgets() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;

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
            div.style.color = 'purple';
            budgetsDiv.appendChild(div);
        });
    }
}


// Call the load functions when the home page is loaded
if (window.location.pathname.endsWith("home.html")) {
    window.onload = () => {
        loadHomePage();
        loadIncome();
		loadBudgets();
        loadExpenses();
        
    };
}
