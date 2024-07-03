function loadIncome() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

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

window.onload = loadIncome();

