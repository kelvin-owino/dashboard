document.getElementById('salesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const saleDate = document.getElementById('saleDate').value;

    if (itemName && itemQuantity && saleDate) {
        // Add the sale data to the table
        const tableBody = document.getElementById('salesTableBody');
        const newRow = tableBody.insertRow();
        
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = itemName;
        cell2.textContent = itemQuantity;
        cell3.textContent = saleDate;

        // Save sale data to localStorage (simulate server)
        let salesData = JSON.parse(localStorage.getItem('salesData')) || [];
        salesData.push({
            itemName,
            itemQuantity,
            saleDate,
            feedbackDate: getOneMonthLater(saleDate)
        });
        localStorage.setItem('salesData', JSON.stringify(salesData));

        // Reset the form
        document.getElementById('salesForm').reset();
    }
});

function getOneMonthLater(dateString) {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
}

function displayFeedback() {
    const feedbackContainer = document.getElementById('feedbackContainer');
    const salesData = JSON.parse(localStorage.getItem('salesData')) || [];
    const today = new Date().toISOString().split('T')[0];

    salesData.forEach(sale => {
        if (sale.feedbackDate <= today) {
            const feedbackMessage = document.createElement('p');
            feedbackMessage.textContent = `Feedback: You sold ${sale.itemName} on ${sale.saleDate}. This was ${sale.itemQuantity} units.`;
            feedbackContainer.appendChild(feedbackMessage);
        }
    });
}

// Check for feedback every time the page loads
window.onload = displayFeedback;
