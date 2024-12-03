let LIMIT = 10000;
const currency = ' руб.';
const status_in_limit = 'все хорошо';
const status_out_of_limit = 'все плохо'
const status_out_of_limit_classname = 'status_red';
const modal_on ='modal_on';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categoryNode = document.querySelector('.selector');
const validationTextNode = document.querySelector('.js-validation');
const btnResetNode = document.querySelector('.js-btn-reset');
const btnOpenModalNode = document.querySelector('.open-modal');
const sectionModalNode = document.querySelector('.section-modal');
const btnCloseModal = document.querySelector('.js-btn-close-modal');
const inputChangeLimit = document.querySelector('.js-input-change-limit');
const btnChangeLimit = document.querySelector('.js-btn-change-limit');


let expenses = [];

init(expenses);

buttonNode.addEventListener('click', function() {

    const expense = getExpenseFromUser();
    if ((!expense || expense.expense === 0) || categoryNode.value === 'disabled') {
        validationTextNode.classList.add('on');
        return;
    } else {
        validationTextNode.classList.remove('on');
        trackExpense(expense);
        render(expenses);
        clearInput();
    }
});

btnOpenModalNode.addEventListener('click', function(){
    modalOn();
});
btnCloseModal.addEventListener('click', function(){
    closeModal();
});

btnResetNode.addEventListener('click', function(){
    reset();
});

btnChangeLimit.addEventListener('click', function() {
    if (!inputChangeLimit.value || inputChangeLimit.value == 0) {
        return;
    }
    LIMIT = inputChangeLimit.value;
    limitNode.innerText = LIMIT;
    inputChangeLimit.value = '';
    closeModal();
    renderST(expenses);

    return LIMIT;
});

function renderST(expenses){
    const sum = calculateExpenses(expenses);

    renderStatus(sum);
}


function trackExpense(expense){
    expenses.push(expense);
}
function getExpenseFromUser(){
    if (!inputNode.value) {
        return null;
    }
    
    const expense = {
        expense: parseInt(inputNode.value),
        category: categoryNode.value,
    };
    
    return expense;

    
}

function clearInput() {
    inputNode.value = '';
}

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = status_in_limit;
    sumNode.innerText = calculateExpenses(expenses); 
}

function calculateExpenses (expenses) {
    let sum = 0;
    
    expenses.forEach(element => {
        sum += element.expense;
    });
    return sum;
}

function render(expenses){
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory (expenses) {
    let expensesHTML = '';

    expenses.forEach(expense => {
       const elementHTML = `<li>${expense.expense} ${currency} - ${expense.category}</li>`
       expensesHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol>${expensesHTML}</ol>`;
}

function renderSum(sum){
    sumNode.innerText = sum;
}

function renderStatus(sum){
    if (sum <= LIMIT) {
        statusNode.classList.remove(status_out_of_limit_classname);
        statusNode.innerText = status_in_limit;
    } else {
        let difference = LIMIT - sum;
        statusNode.classList.add(status_out_of_limit_classname);
        statusNode.innerText = `${status_out_of_limit} (${difference} ${currency})`;
        
    }
}

function reset() {
    expenses = [];
    sum = 0;
    validationTextNode.classList.remove('on');
    inputNode.value = '';
    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);

}

function modalOn() {
    sectionModalNode.classList.add(modal_on);
}
function closeModal() {
    sectionModalNode.classList.remove(modal_on);
}


 
