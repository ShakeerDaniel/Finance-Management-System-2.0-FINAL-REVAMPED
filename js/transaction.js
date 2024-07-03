document.getElementById("transaction-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const key = `transactions_${currentUser}`;
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    transactions.push({ type, amount });
    localStorage.setItem(key, JSON.stringify(transactions));
    document.getElementById("transaction-result").innerText = "Transaction registered successfully!";
});
