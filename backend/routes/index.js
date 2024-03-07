const { Router } = require("express");
const router = Router();
const { login, isLoggedIn } = require("../controllers/loginController");
const { getRecords, addRecord } = require("../controllers/recordsController");

router.get("/", (req, res) => {
  return res.status(200).json("Server is up and running!!!");
});

router.post("/login", login);

//Protecting the routes below this middleware
router.use(isLoggedIn);

router.get("/records", getRecords);
router.post("/records/add", addRecord);

module.exports = router;
