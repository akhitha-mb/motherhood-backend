const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/Db.js');
const authRoutes = require('./Routes/Auth.js');
const dotenv = require('dotenv');
const userRouter = require('./Routes/UserRoutes.js')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user',userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});