import NavBar from "../home/component/Navbar/Navbar";
import Footer from "../home/component/Footer/Footer";

import style from "./Transaction.module.css";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const Transaction = () => {
  const params = useParams();

  const userId = params.userId;

  const [transactions, setTransaction] = useState([]);

  const fetchTransactionData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/transaction/" + userId);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();
      console.log(data);

      setTransaction(data);
    } catch (error) {
      console.log(error.message);
    }
  }, [userId]);

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  return (
    <>
      <div className={style.header}>
        <div className={style["nav-container"]}>
          <NavBar />
        </div>
      </div>
      <div className={style.main}>
        <h3 className={style.title}>Your Transactions</h3>
        <table className={style.table}>
          <thead className={style["table-head"]}>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>0{index + 1}</td>
                  <td>{transaction.hotel.name}</td>
                  <td className={style.rooms}>
                    {transaction.room.map((item, i) => {
                      return (
                        <p key={i}>
                          {item}
                          {i !== transaction.room.length - 1 && ","}
                        </p>
                      );
                    })}
                  </td>
                  <td>
                    {format(new Date(transaction.dateStart), "MM/dd/yyyy")} -{" "}
                    {format(new Date(transaction.dateEnd), "MM/dd/yyyy")}
                  </td>
                  <td>${transaction.price}</td>
                  <td className={style.payment}>{transaction.payment}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Transaction;
