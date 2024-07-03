function loadTransactions() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    const key = `transactions_${currentUser}`;
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    const transactionsDiv = document.getElementById("transaction-list");
    if (transactions.length === 0) {
        transactionsDiv.innerHTML = "No transactions found.";
    } else {
        transactions.forEach(transaction => {
            const div = document.createElement("div");
            div.innerText = `Type: ${transaction.type}, Amount: ${transaction.amount}`;
            transactionsDiv.appendChild(div);
        });
    }
}

window.onload = loadTransactions;
