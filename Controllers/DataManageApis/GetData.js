const FinanceModel = require("../../Models/FinanceModel");

const GetData = async (req, res) => {
  try {
    const { type, category, startDate, endDate, amountRange } = req.query;
    let query = {};

    if (type) {
      query.type = type;
    }
    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

    if (amountRange) {
      const ranges = {
        "1-99": { $gte: 1, $lte: 99 },
        "100-999": { $gte: 100, $lte: 999 },
        "1k-50k": { $gte: 1000, $lte: 50000 },
        "50k-1M": { $gte: 50001, $lte: 1000000 },
        "1M-infinity": { $gte: 1000001 },
      };

      if (ranges[amountRange]) {
        query.amount = ranges[amountRange];
      } else {
        return res
          .status(400)
          .json({ message: "Invalid amount range provided." });
      }
    }

    const financeData = await FinanceModel.find(query);

    res.status(200).json({
      message: "Finance data fetched successfully.",
      count: financeData.length,
      data: financeData,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error. Unable to fetch data.",
        error: error.message,
      });
  }
};
