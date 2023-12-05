function validateLogin() {
    console.log("validateLogin Called");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/static/passcodes.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let isValid = false;
            let usernameMatch = false;

            for (let line of lines) {
                const [user, pass] = line.split(',');
                if (user === username) {
                    usernameMatch = true;
                    if (pass === password) {
                        isValid = true;
                        break;
                    }
                }
            }

            if (isValid) {
                alert('Login successful');
                
                fetch('/static/reservations.txt')
                    .then(response => response.text())
                    .then(reservationsData => {
                        const seatingChart = generateSeatingChart(reservationsData);
                        document.getElementById('seatingChart').innerText = seatingChart;

                        const totalSales = calculateTotalSales(reservationsData);
                        document.getElementById('totalSales').innerText = `$${totalSales}`;
                    });
                
                document.getElementById('seatingChartHeading').style.display = 'block';
                document.getElementById('seatingChart').style.display = 'block';
                document.getElementById('totalSalesHeading').style.display = 'block';
            } else if (usernameMatch) {
                alert('Incorrect password. Please try again.');
            } else {
                alert('Username not found. Please try again.');
            }
        });
}

function generateSeatingChart(reservationsData) {
    const reservations = reservationsData.trim().split('\n');
    const seatingChart = [];

    for (let i = 0; i < 12; i++) {
        seatingChart.push(Array(4).fill('0'));
    }

    for (let reservation of reservations) {
        const [_, row, seat] = reservation.split(',').map(item => item.item());
        seatingChart[row][seat] = 'X';
    }

    const seatingChartString = seatingChart.map(row => `["${row.join('", "')}"]`).join('\n');
    return seatingChartString;
}

function calculateTotalSales(reservationsData) {

    return 0;
}


