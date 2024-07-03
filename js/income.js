document.getElementById("income-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    const amount = parseFloat(document.getElementById("amount").value);

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const key = `income_${currentUser}`;
    const income = JSON.parse(localStorage.getItem(key) || "[]");
    income.push({ amount });
    localStorage.setItem(key, JSON.stringify(income));
    document.getElementById("income-result").innerText = "Income added successfully!";
});
