const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");
const bookRoutes = require("./routes/bookRoutes");
const loanRoutes = require("./routes/loanRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);
app.use("/borrowedBooks", loanRoutes);
app.use("/members", memberRoutes);

app.listen(3000, () => {
  console.log(`Server running...`);
});
