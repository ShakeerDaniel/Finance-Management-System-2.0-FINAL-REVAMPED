document.getElementById("budget-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const key = `budgets_${currentUser}`;
    const budgets = JSON.parse(localStorage.getItem(key) || "[]");
    budgets.push({ category, amount });
    localStorage.setItem(key, JSON.stringify(budgets));
    document.getElementById("budget-result").innerText = "Budget set successfully!";
});