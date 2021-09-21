let income = 0;
let expense = 0;
let balance = 0;
let history_arr = [];

window.onload = () => {
  if (localStorage.getItem("Income")) {
    income += parseInt(localStorage.getItem("Income")); //accessing income data from localstorage
  }
  if (localStorage.getItem("Expense")) {
    expense += parseInt(localStorage.getItem("Expense")); //accessing expense data from localstorage
  }
  if (localStorage.getItem("Balance")) {
    balance += parseInt(localStorage.getItem("Balance")); //accessing balance data from localstorage
  }
  if (localStorage.getItem("history")) {
    history_arr.push(...JSON.parse(localStorage.getItem("history"))); //accessing history data from localstorage
  }

  //displaying the accessed data
  document.getElementById("balance").innerHTML = `₹${balance}`;
  document.getElementById("money-plus").innerHTML = `+₹${income}`;
  document.getElementById("money-minus").innerHTML = `-₹${Math.abs(expense)}`;

  //parsing the JSON data of history and displaying it
  let arr = JSON.parse(localStorage.getItem("history"));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].amount > 0) {
      document.getElementById(
        "list"
      ).innerHTML += `<li class='plus'>${arr[i].text}  <strong>+${arr[i].amount}<strong></li>`;
    } else if (arr[i].amount < 0) {
      document.getElementById(
        "list"
      ).innerHTML += `<li class='minus'>${arr[i].text}  <strong>${arr[i].amount}</strong></li>`;
    }
  }
};

function addExpense() {
  let text = document.getElementById("text").value;
  let amount = document.getElementById("amount").value;

  if (text.length > 0 && amount.length > 0 && amount !== 0) {
    if (amount > 0) {
      //calculating income and storing in local storage
      income += parseInt(amount);
      localStorage.setItem("Income", income.toString());
    } else if (amount < 0) {
      //calculating expense and storing in localstorage
      expense += parseInt(amount);
      localStorage.setItem("Expense", expense.toString());
    }

    //pushing the data in array and storing it in localstorage in JSON format
    history_arr.push({
      text: text,
      amount: amount,
    });
    localStorage.setItem("history", JSON.stringify(history_arr));

    //calculating balance and storing in localstorage
    balance += parseInt(amount);
    localStorage.setItem("Balance", balance.toString());
  }
}
