// Initialize chart data from localStorage or start fresh
let data = JSON.parse(localStorage.getItem('pieChartData')) || {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
    }]
};

// Configuration options for the pie chart
const config = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true
            },
            datalabels: {
                formatter: (value, context) => {
                    let total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    let percentage = ((value / total) * 100).toFixed(2) + '%';
                    return `${context.chart.data.labels[context.dataIndex]}: ${percentage}`;
                },
                color: '#000',
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                selectData(index);
            }
        }
    },
    plugins: [ChartDataLabels]
};

// Initialize the chart when the window loads
window.onload = function() {
    renderChart();
    updateSavingsCategory();
};

// Function to render the pie chart
function renderChart() {
    const ctx = document.getElementById('myPieChart').getContext('2d');
    window.myPieChart = new Chart(ctx, config);
}

// Function to add data to the chart
function addData(label, value) {
    const totalIncome = getTotalIncome();
    if (totalIncome === 0) {  // Change starts here
        alert("Please enter your income before adding any expenses.");  // Alert user to input income first
        return;
    }

    if (label === 'Savings') {
        alert("You cannot add expenses directly to Savings.");
        return;
    }

    const totalExpenses = getTotalExpenses() + value;

    if (totalExpenses > totalIncome) {
        alert("Total expenses cannot exceed total income.");
        return;
    }

    const index = data.labels.indexOf(label);
    if (index === -1) {
        const color = getRandomColor();
        data.labels.push(label);
        data.datasets[0].data.push(value);
        data.datasets[0].backgroundColor.push(color.backgroundColor);
        data.datasets[0].borderColor.push(color.borderColor);
    } else {
        data.datasets[0].data[index] += value;
    }

    // Update localStorage
    localStorage.setItem('pieChartData', JSON.stringify(data));

    // Update the chart
    window.myPieChart.update();
    updateSavingsCategory();
}

// Function to update the savings category in the chart
function updateSavingsCategory() {
    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();

    const savings = totalIncome - totalExpenses;

    const savingsIndex = data.labels.indexOf('Savings');
    if (savingsIndex === -1 && savings > 0) {
        const color = getRandomColor();
        data.labels.push('Savings');
        data.datasets[0].data.push(savings);
        data.datasets[0].backgroundColor.push(color.backgroundColor);
        data.datasets[0].borderColor.push(color.borderColor);
    } else if (savingsIndex !== -1) {
        data.datasets[0].data[savingsIndex] = savings;
    }

    window.myPieChart.update();

    // Update localStorage
    localStorage.setItem('pieChartData', JSON.stringify(data));
}

// Function to get total income
function getTotalIncome() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return 0;

    const key = `income_${currentUser}`;
    const incomeData = JSON.parse(localStorage.getItem(key) || "[]");
    return incomeData.reduce((sum, entry) => sum + entry.amount, 0);
}

// Function to get total expenses
function getTotalExpenses() {
    const savingsIndex = data.labels.indexOf('Savings');
    return data.datasets[0].data.reduce((sum, value, index) => {
        if (index !== savingsIndex) {
            return sum + value;
        }
        return sum;
    }, 0);
}

// Variable to store the selected index
let selectedIndex = null;

// Function to select data
function selectData(index) {
    selectedIndex = index;
    const label = data.labels[index];
    const value = data.datasets[0].data[index];
    document.getElementById('amount').value = value;
    document.getElementById('category').value = label;
}

// Function to remove selected data from the chart
function removeData() {
    if (selectedIndex !== null) {
        data.labels.splice(selectedIndex, 1);
        data.datasets[0].data.splice(selectedIndex, 1);
        data.datasets[0].backgroundColor.splice(selectedIndex, 1);
        data.datasets[0].borderColor.splice(selectedIndex, 1);

        // Update localStorage
        localStorage.setItem('pieChartData', JSON.stringify(data));

        // Update the chart
        window.myPieChart.update();
        selectedIndex = null;
        updateSavingsCategory();
    } else {
        alert("No data selected for removal.");
    }
}

// Function to generate random colors
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
        borderColor: `rgba(${r}, ${g}, ${b}, 1)`
    };
}

// Handle the expense form submission
document.getElementById("expense-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    // Add the data to the chart
    addData(category, amount);
	
	// Store the expense in localStorage
    const key = `expenses_${currentUser}`;
    const expenses = JSON.parse(localStorage.getItem(key) || "[]");
    expenses.push({ category, amount });
    localStorage.setItem(key, JSON.stringify(expenses));

    // Clear the input field
    document.getElementById("amount").value = '';
    document.getElementById("category").value = 'Food'; // Reset to default category

    // Optionally display a success message
    document.getElementById("expense-result").innerText = "Expense added successfully!";
});

// Handle the income form submission
document.getElementById("income-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("No profile selected. Redirecting to profile selection.");
        window.location.href = "index.html";
        return;
    }

    const amount = parseFloat(document.getElementById("income-amount").value);

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const key = `income_${currentUser}`;
    const income = JSON.parse(localStorage.getItem(key) || "[]");
    income.push({ amount });
    localStorage.setItem(key, JSON.stringify(income));
    document.getElementById("income-result").innerText = "Income added successfully!";
    updateSavingsCategory();
});

// Function to redirect to home
function redirectToHome() {
    window.location.href = "home.html";
}

