const { Record } = require("../db");

module.exports.getRecords = async (req, res) => {
  try {
    const db1 = await Record.find({ dbName: "1" });
    const db2 = await Record.find({ dbName: "2" });
    const db3 = await Record.find({ dbName: "3" });

    return res.status(200).json({ success: true, data: { db1, db2, db3 } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.addRecord = async (req, res) => {
  try {
    const { name, email, phone, dbName } = req.body;

    if (!name || !email || !phone || !dbName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (dbName != "1" && dbName != "2" && dbName != "3") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid dbName" });
    }

    const record = await Record.create({ name, email, phone, dbName });

    return res.status(200).json({ success: true, record });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
