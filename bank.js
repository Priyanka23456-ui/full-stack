// Initialize balance and transactions
let accountBalance = 5000;
let transactions = [
    {
        description: 'Opening Balance',
        amount: 5000,
        type: 'deposit',
        date: new Date()
    }
];

// DOM Elements
const balanceDisplay = document.getElementById('balance');
const transactionList = document.getElementById('transactionList');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Tab switching functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Clear form inputs
        clearForms();
    });
});

// Clear all form inputs
function clearForms() {
    document.querySelectorAll('.transaction-form input').forEach(input => {
        input.value = '';
    });
}

// Format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format date
function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}

// Update balance display
function updateBalance() {
    balanceDisplay.textContent = formatCurrency(accountBalance);
    balanceDisplay.style.animation = 'none';
    setTimeout(() => {
        balanceDisplay.style.animation = 'updateBalance 0.5s ease';
    }, 10);
}

// Add animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes updateBalance {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Update transaction history display
function updateTransactionHistory() {
    transactionList.innerHTML = '';
    
    // Display transactions in reverse order (newest first)
    [...transactions].reverse().forEach(transaction => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        
        const amountClass = transaction.type === 'deposit' ? 'positive' : 'negative';
        const amountSign = transaction.type === 'deposit' ? '+' : '-';
        
        item.innerHTML = `
            <div class="transaction-info">
                <p class="transaction-desc">${transaction.description}</p>
                <p class="transaction-date">${formatDate(transaction.date)}</p>
            </div>
            <p class="transaction-amount ${amountClass}">${amountSign}${formatCurrency(transaction.amount)}</p>
        `;
        
        transactionList.appendChild(item);
    });
}

// Handle deposit form submission
const depositForm = document.querySelector('#deposit .transaction-form');
depositForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const description = document.getElementById('depositDesc').value;
    
    if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    // Add transaction
    accountBalance += amount;
    transactions.push({
        description: description,
        amount: amount,
        type: 'deposit',
        date: new Date()
    });
    
    // Update UI
    updateBalance();
    updateTransactionHistory();
    clearForms();
    
    // Show success message
    showNotification(`Successfully deposited ${formatCurrency(amount)}!`, 'success');
});

// Handle withdrawal form submission
const withdrawForm = document.querySelector('#withdraw .transaction-form');
withdrawForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const description = document.getElementById('withdrawDesc').value;
    
    if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (amount > accountBalance) {
        showNotification('Insufficient balance!', 'error');
        return;
    }
    
    // Add transaction
    accountBalance -= amount;
    transactions.push({
        description: description,
        amount: amount,
        type: 'withdrawal',
        date: new Date()
    });
    
    // Update UI
    updateBalance();
    updateTransactionHistory();
    clearForms();
    
    // Show success message
    showNotification(`Successfully withdrew ${formatCurrency(amount)}!`, 'success');
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);' 
            : 'background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Initialize the app
updateBalance();
updateTransactionHistory();
