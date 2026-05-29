import React from "react";
import CSS from "./CSS.css";
import { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaBus } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaCube } from "react-icons/fa";


function ExpenseTracker() {
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState(0);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('')
    const [expenses, setExpenses] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState('');
    const [selectedDuration1, setSelectedDuration1] = useState('');
    const [startDate, setStartDate] = useState('');
    const [barStartDate, setBarStartDate] = useState('');
    const [filteredTotal, setFilteredTotal] = useState(0);
    const [categoryTotal, setCategoryTotal] = useState({
        Food: 0,
        Travel: 0,
        Entertainment: 0,
        Education: 0,
        Shopping: 0,
        Others: 0
    });
    const [filteredCategoryTotal, setFilteredCategoryTotal] = useState({
        Food: 0,
        Travel: 0,
        Entertainment: 0,
        Education: 0,
        Shopping: 0,
        Others: 0
    });


    let today = new Date();




    function handleExpense() {
        if (amount === '' || description === ''
            || category === '' || date === '') {
            alert("please fill all the details");
            return;
        }

        if (new Date(date) > today) {
            alert("Please select a valid date");
            return;
        }
        const newExpense = {
            amount,
            description,
            category,
            date
        }
        setCategoryTotal({
            ...categoryTotal,
            [category]: categoryTotal[category] + Number(amount)
        })
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
        setCategory(categoryName);
    }

    function handleDate(duration) {
        setSelectedDuration(duration);
        let filterStartDate;

        if (duration === 'week') {
            const today = new Date();
            const currentDay = today.getDay();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - currentDay);
            filterStartDate = weekStart;
            setBarStartDate(weekStart);
        }
        else if (duration === 'month') {
            const today = new Date();
            const currentDay = new Date(today);
            currentDay.setDate(1);
            const monthStart = new Date(today);
            monthStart.setDate(1);
            filterStartDate = monthStart;
            setBarStartDate(monthStart);

        }
        else if (duration === 'year') {
            const today = new Date();
            const currentDay = new Date(today);
            currentDay.setDate(1);
            currentDay.setMonth(0);
            filterStartDate = currentDay;
            setBarStartDate(currentDay);
        }

        const filteredexpenses = expenses.filter((expense) =>
            new Date(expense.date) >= new Date(filterStartDate) && new Date(expense.date) <= new Date(today)
        )

        const result = filteredexpenses.reduce((total, expense) => {
            total[expense.category] += Number(expense.amount);
            return total;
        },
            {
                Food: 0,
                Travel: 0,
                Entertainment: 0,
                Shopping: 0,
                Education: 0,
                others: 0
            })
        setFilteredCategoryTotal(result);
        const totalAmount = filteredexpenses.reduce((total, expense) => {
            total += Number(expense.amount);
            return total;
        }, 0);

        setFilteredTotal(totalAmount);

    }

    function handleDate1(duration) {
        setSelectedDuration1(duration);

        if (duration === 'week') {
            const today = new Date();
            const currentDay = today.getDay();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - currentDay);
            setStartDate(weekStart);
        }
        else if (duration === 'month') {
            const today = new Date();
            const currentDay = new Date(today);
            currentDay.setDate(1);
            const monthStart = new Date(today);
            monthStart.setDate(1);
            setStartDate(monthStart);

        }
        else if (duration === 'year') {
            const today = new Date();
            const currentDay = new Date(today);
            currentDay.setDate(1);
            currentDay.setMonth(0);
            setStartDate(currentDay);
        }


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
                    {
                        selectedDuration === '' ? (
                            <div className="expense-row">
                                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}><b>By Category</b>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: '5px' }}>
                                        <button onClick={() => handleDate("week")} className={selectedDuration === "week" ? "selected" : ""}>week</button>
                                        <button onClick={() => handleDate("month")} className={selectedDuration === "month" ? "selected" : ""}>Month</button>
                                        <button onClick={() => handleDate("year")} className={selectedDuration === "year" ? "selected" : ""}>Year</button>
                                    </div>
                                </div>

                                <div className="category-label">
                                    <span>Food</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(categoryTotal.Food / total) * 100}%`,
                                                backgroundColor: 'orange'
                                            }}></div>
                                    </div>
                                    <span>${categoryTotal.Food}</span>
                                </div>
                                <div className="category-label">
                                    <span>Travel</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(categoryTotal.Travel / total) * 100}%`,
                                                backgroundColor: 'darkblue'
                                            }}></div>
                                    </div>
                                    <span>${categoryTotal.Travel}</span>
                                </div>
                                <div className="category-label">
                                    <span>Entertainment</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(categoryTotal.Entertainment / total) * 100}%`,
                                                backgroundColor: 'darkgreen'
                                            }}></div>
                                    </div>
                                    <span>${categoryTotal.Entertainment}</span>
                                </div>
                                <div className="category-label">
                                    <span>Education</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(categoryTotal.Education / total) * 100}%`,
                                                backgroundColor: 'violet'
                                            }}></div>
                                    </div>
                                    <span>${categoryTotal.Education}</span>
                                </div>
                                <div className="category-label">
                                    <span>Shopping</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(categoryTotal.Shopping / total) * 100}%`,
                                                backgroundColor: 'red'
                                            }}></div>
                                    </div>
                                    <span>${categoryTotal.Shopping}</span>
                                </div>
                            </div>

                        ) : (
                            <div className="expense-row">
                                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}><b>By Category</b>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: '5px' }}>
                                        <button onClick={() => handleDate("week")} className={selectedDuration === "week" ? "selected" : ""}>week</button>
                                        <button onClick={() => handleDate("month")} className={selectedDuration === "month" ? "selected" : ""}>Month</button>
                                        <button onClick={() => handleDate("year")} className={selectedDuration === "year" ? "selected" : ""}>Year</button>
                                    </div>
                                </div>

                                <div className="category-label">
                                    <span>Food</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(filteredCategoryTotal.Food / filteredTotal) * 100}%`,
                                                backgroundColor: 'orange'
                                            }}></div>
                                    </div>
                                    <span>${filteredCategoryTotal.Food}</span>
                                </div>
                                <div className="category-label">
                                    <span>Travel</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(filteredCategoryTotal.Travel / filteredTotal) * 100}%`,
                                                backgroundColor: 'darkblue'
                                            }}></div>
                                    </div>
                                    <span>${filteredCategoryTotal.Travel}</span>
                                </div>
                                <div className="category-label">
                                    <span>Entertainment</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(filteredCategoryTotal.Entertainment / filteredTotal) * 100}%`,
                                                backgroundColor: 'darkgreen'
                                            }}></div>
                                    </div>
                                    <span>${filteredCategoryTotal.Entertainment}</span>
                                </div>
                                <div className="category-label">
                                    <span>Education</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(filteredCategoryTotal.Education / filteredTotal) * 100}%`,
                                                backgroundColor: 'violet'
                                            }}></div>
                                    </div>
                                    <span>${filteredCategoryTotal.Education}</span>
                                </div>
                                <div className="category-label">
                                    <span>Shopping</span>
                                    <div className="bar">
                                        <div className="fill"
                                            style={{
                                                width: `${(filteredCategoryTotal.Shopping / filteredTotal) * 100}%`,
                                                backgroundColor: 'red'
                                            }}></div>
                                    </div>
                                    <span>${filteredCategoryTotal.Shopping}</span>
                                </div>
                            </div>
                        )
                    }




                    {expenses.length === 0 ? (
                        <p>No Expense Added Yet</p>
                    ) : (<div className="expense-list">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <b>Recent Transactions</b>
                            <div style={{ display: 'flex', columnGap: '5px' }}>
                                <button onClick={() => handleDate1("week")} className={selectedDuration1 === "week" ? "selected1" : ""}>week</button>
                                <button onClick={() => handleDate1("month")} className={selectedDuration1 === "month" ? "selected1" : ""}>Month</button>
                                <button onClick={() => handleDate1("year")} className={selectedDuration1 === "year" ? "selected1" : ""}>Year</button>
                            </div>
                        </ div>
                        {Object.keys(groupedExpenses)
                            .sort((a, b) => new Date(b) - new Date(a))
                            .map((date) => ((new Date(date) >= startDate && new Date(date) <= today) ? (
                                <div key={date} className="date-group">
                                    <div style={{ borderBottom: '2px solid gray', paddingBottom: '10px', paddingTop: '10px' }}> {date} </div>
                                    {groupedExpenses[date].map((expense, index) => (

                                        <div className="expense-item" key={index}>
                                            <div className="left-expense">
                                                {expense.category === "Food" ? <GiKnifeFork /> :
                                                    expense.category === "Travel" ? <FaBus /> :
                                                        expense.category === "Entertainment" ? <MdMovie /> :
                                                            expense.category === "Education" ? <FaBook /> :
                                                                expense.category === "Shopping" ? <FaBagShopping /> : <FaCube></FaCube>}

                                                <div>
                                                    <b>{expense.description}</b> <br></br>
                                                    {expense.category}
                                                </div>
                                            </div>

                                            <div>
                                                ${expense.amount}
                                            </div>

                                        </div>
                                    ))
                                    }
                                </div>
                            ) : null
                            ))}
                    </div>
                    )}


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
                            onClick={() => handleCategory("Food")}>   <GiKnifeFork /> <br></br>Food</button>
                        <button
                            className={category === "Travel" ? "selected" : ""}
                            onClick={() => handleCategory("Travel")}> <FaBus></FaBus> <br></br> Travel</button>
                        <button
                            className={category === "Entertainment" ? "selected" : ""}
                            onClick={() => handleCategory("Entertainment")}> <MdMovie></MdMovie> <br></br> Entertainment</button>
                        <button
                            className={category === "Education" ? "selected" : ""}
                            onClick={() => handleCategory("Education")}> <FaBook></FaBook> <br></br> Education</button>
                        <button
                            className={category === "Shopping" ? "selected" : ""}
                            onClick={() => handleCategory("Shopping")}> <FaBagShopping></FaBagShopping> <br></br> Shopping</button>
                        <button
                            className={category === "Other" ? "selected" : ""}
                            onClick={() => handleCategory("Other")}> <FaCube></FaCube> <br></br> Other</button>
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
        </div >
    )
}

export default ExpenseTracker;

