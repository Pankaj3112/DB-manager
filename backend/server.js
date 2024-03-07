const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
require("./db");

app.use(express.json());
app.use(cors());

app.use("/", require("./routes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;