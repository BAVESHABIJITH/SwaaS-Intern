const express = require("express");
const { createLoan, returnLoan, payFine, getActiveLoans, getLibrarianStats } = require("../controllers/loanController");
const router = express.Router();

router.post("/", createLoan);
router.patch("/:id/return", returnLoan);
router.patch("/:id/pay", payFine);
router.get("/active", getActiveLoans);
router.get("/stats", getLibrarianStats);

module.exports = router;
