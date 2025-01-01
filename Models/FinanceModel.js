const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["credits", "Debits"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: [
        'Salary', 'Family', 'Bonus', 'Investment Returns', 'Freelance Income', 
        'Rental Income', 'Gift', 'Interest', 'Dividends', 
        'Business Revenue', 'Pension', 'Utility Bills', 'Groceries', 
        'Rent', 'Transportation', 'Healthcare', 'Education Fees', 
        'Loan Repayment', 'Insurance Premiums', 'Entertainment', 
        'Dining Out', 'Shopping', 'Travel', 'Charity', 'Taxes', 
        'Subscriptions' , 'Other'
      ],
      required: true,
    },
    purpose: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const FinanceModel = mongoose.model("finance", FinanceSchema);
module.exports = FinanceModel;
