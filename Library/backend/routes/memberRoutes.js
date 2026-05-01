const express = require("express");
const { getMembers, getMemberStats } = require("../controllers/memberController");
const router = express.Router();

router.get("/", getMembers);
router.get("/:id/stats", getMemberStats);

module.exports = router;
