// Initial data for the pie chart
let data = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
    }]
};

// Configuration options
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
                    let total = context.chart._metasets[0].total;
                    let percentage = (value / total * 100).toFixed(2) + '%';
                    return `${context.chart.data.labels[context.dataIndex]}: ${percentage}`;
                },
                color: '#000',
            }
        }
    },
    plugins: [ChartDataLabels]
};

// Render the initial pie chart
window.onload = function() {
    window.myPieChart = new Chart(
        document.getElementById('myPieChart'),
        config
    );
};

// Function to add data to the chart
function addData() {
    const label = document.getElementById('label').value;
    const value = document.getElementById('value').value;

    if (label && value) {
        const color = getRandomColor();
        data.labels.push(label);
        data.datasets[0].data.push(value);
        data.datasets[0].backgroundColor.push(color.backgroundColor);
        data.datasets[0].borderColor.push(color.borderColor);

        window.myPieChart.update();
    }
}

// Variable to store the selected index
let selectedIndex = null;

// Function to select data
function selectData(index) {
    selectedIndex = index;
    const label = data.labels[index];
    document.getElementById('label').value = label;
    document.getElementById('value').value = data.datasets[0].data[index];
}

// Function to remove selected data from the chart
function removeData() {
    if (selectedIndex !== null) {
        data.labels.splice(selectedIndex, 1);
        data.datasets[0].data.splice(selectedIndex, 1);
        data.datasets[0].backgroundColor.splice(selectedIndex, 1);
        data.datasets[0].borderColor.splice(selectedIndex, 1);

        window.myPieChart.update();
        selectedIndex = null;
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
