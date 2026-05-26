import React from "react";
import CSS from "./CSS.css";
import { useState } from "react";

function ExpenseTracker() {
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState(0);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('')
    const [expenses, setExpenses] = useState([]);



    function handleExpense() {

        if (amount === '' || description === ''
            || category === '' || date === '') {
            alert("please fill all the details");
            return;
        }

        const newExpense = {
            amount,
            description,
            category,
            date
        }
        setExpenses([...expenses, newExpense]);

        const expenseAmount = Number(amount);

        setTotal(prev => prev + expenseAmount);
        setTransactions(prev => prev + 1);
        setAmount(0);
        setDescription("");
        setDate("");
        setCategory("");
    }

    function handleCategory(categoryName) {
        setCategory(categoryName)
    }

    const groupedExpenses = expenses.reduce((group, expense) => {

        if (!group[expense.date]) {
            group[expense.date] = [];
        }

        group[expense.date].push(expense);

        return group;
    }, {});

    return (
        <div className="universal">
            <h3>My Expenses</h3>
            <div className="left-right-sides">
                <div className="left-side">
                    <div className="top-bar">
                        <div className="card">
                            Total Spent   <br></br>
                            {total}
                        </div>
                        <div className="card">
                            Transactions <br></br>
                            {transactions}
                        </div>
                    </div>
                    <div className="expense-row">
                        <div style={{ marginBottom: '10px' }}><b>By Category</b></div>
                        <div className="category-label">
                            <span>Food</span>
                            <div className="bar">
                                <div className="fill"
                                    style={{
                                        width: `${(category.Food / total) * 100}%`,
                                        backgroundColor: 'orange'
                                    }}></div>
                            </div>
                            <span>${category.Food}</span>
                        </div>
                        <div className="category-label">
                            <span>Travel</span>
                            <div className="bar">
                                <div className="fill"
                                    style={{
                                        width: `${(category.Travel / total) * 100}%`,
                                        backgroundColor: 'darkblue'
                                    }}></div>
                            </div>
                            <span>${category.Travel}</span>
                        </div>
                        <div className="category-label">
                            <span>Entertainment</span>
                            <div className="bar">
                                <div className="fill"
                                    style={{
                                        width: `${(category.Entertainment / total) * 100}%`,
                                        backgroundColor: 'darkgreen'
                                    }}></div>
                            </div>
                            <span>${category.Entertainment}</span>
                        </div>
                        <div className="category-label">
                            <span>Education</span>
                            <div className="bar">
                                <div className="fill"
                                    style={{
                                        width: `${(category.Education / total) * 100}%`,
                                        backgroundColor: 'violet'
                                    }}></div>
                            </div>
                            <span>${category.Education}</span>
                        </div>
                        <div className="category-label">
                            <span>Shopping</span>
                            <div className="bar">
                                <div className="fill"
                                    style={{
                                        width: `${(category.Shopping / total) * 100}%`,
                                        backgroundColor: 'red'
                                    }}></div>
                            </div>
                            <span>${category.Shopping}</span>
                        </div>


                    </div>
                    <div className="expense-list">
                        <b>Recent Transactions</b>
                        {Object.keys(groupedExpenses)
                            .sort((a, b) => new Date(b) - new Date(a))
                            .map((date) => (
                                <div key={date} className="date-group">
                                    <div style={{ borderBottom: '2px solid gray', paddingBottom: '10px', paddingTop: '10px' }}> {date} </div>
                                    {groupedExpenses[date].map((expense, index) => (
                                        <div className="expense-item" key={index}>
                                            <div>
                                                <b>{expense.description}</b> <br></br>
                                                {expense.category}
                                            </div>
                                            <div>
                                                ${expense.amount}
                                            </div>

                                        </div>
                                    ))
                                    }
                                </div>
                            ))}
                    </div>
                </div>
                <div className="right-side">
                    Add Expense
                    <label>Amount($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}>
                    </input>
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="What did you spend on?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </input>

                    Category
                    <div className="grid">
                        <button
                            className={category === "Food" ? "selected" : ""}
                            onClick={() => handleCategory("Food")}>Food</button>
                        <button
                            className={category === "Travel" ? "selected" : ""}
                            onClick={() => handleCategory("Travel")}>Travel</button>
                        <button
                            className={category === "Entertainment" ? "selected" : ""}
                            onClick={() => handleCategory("Entertainment")}>Entertainment</button>
                        <button
                            className={category === "Education" ? "selected" : ""}
                            onClick={() => handleCategory("Education")}>Education</button>
                        <button
                            className={category === "Shopping" ? "selected" : ""}
                            onClick={() => handleCategory("Shopping")}>Shopping</button>
                        <button onClick={() => handleCategory("Other")}>Other</button>
                    </div>
                    Date
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button className="save-btn" onClick={handleExpense}>Save Expense</button>
                </div>
            </div>
        </div>
    )
}

export default ExpenseTracker;

