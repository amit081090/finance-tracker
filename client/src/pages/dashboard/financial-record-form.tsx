"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";
import Link from 'next/link'
import { useFinancialRecords } from "../../contexts/financial-record-context";
import React from "react";

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { addRecord } = useFinancialRecords();

  const { user, isSignedIn } = useUser();
  // const router = useRouter();

  // Log to ensure that isSignedIn is working correctly
  // useEffect(() => {
  //   const redirectToDashboard = async () => {
      
  //     if (isSignedIn) {
  //      <Link href={{pathname:'/dashboard'}}/>
  //     }
  //   };

  //   redirectToDashboard();
  // }, [isSignedIn, user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    };

    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container">
      {/* Sign In/Out Button */}
      {isSignedIn ? (
        <div className="auth-buttons">
          <SignOutButton>
            <button className="button">Sign Out</button>
          </SignOutButton>
        </div>
      ) : (
        <div className="auth-buttons">
          <SignInButton>
            <button className="button">Sign In</button>
          </SignInButton>
        </div>
      )}

      {/* Form to Add Financial Record */}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};
