const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const jobRoutes = require("./routes/job.routes")
const app = express();
app.use(express.json());
app.use(cors(
    {origin: "http://localhost:5173",
  credentials: true}
));
app.use('/api/auth/',authRoutes);
app.use('/api/users/',userRoutes);
app.use('/api/jobs/', jobRoutes);
app.listen(3000,()=>{console.log("Server is running")});