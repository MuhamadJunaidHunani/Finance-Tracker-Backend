const FinanceModel = require("../../Models/FinanceModel");

const addData = async (req, res) => {
  try {
    const { type, amount, category, purpose, date } = req.body;
    const {userId} = req.query

    if (!type || !amount || !category || !userId || !date) {
      return res
        .status(400)
        .json({ message: "Type, amount, category, Date and userId are required." });
    }

    const newFinance = new FinanceModel({
      type,
      amount,
      category,
      purpose: purpose || "",
      date: date,
      userId,
    });

    const savedFinance = await newFinance.save();

    res.status(201).json({
      message: "Finance data added successfully.",
      data: savedFinance,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error. Unable to add data.",
        error: error.message,
      });
  }
};

module.exports = addData;