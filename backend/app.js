import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import turfRouter from './routes/turf-routes.js';
import bookingRouter from './routes/booking-routes.js';
import cors from 'cors';
dotenv.config();

const app = express();

let allowedOrigins;
if (process.env.NODE_ENV === 'development') {
  allowedOrigins = [process.env.FRONTEND_URL];
} else if (process.env.NODE_ENV === 'production') {
  allowedOrigins = [process.env.FRONTEND_URL];
} else {
  allowedOrigins = [];
}

app.use(cors({
    origin: (origin, callback) => {
    //   does not allow request with no origin (postman like tools)
    //   if (process.env.NODE_ENV === 'production' && !origin) {
    //     const msg = 'The CORS policy for this site does not allow access from requests without an origin.';
    //     return callback(new Error(msg), false);
    //   }
      if (process.env.NODE_ENV === 'production' && !allowedOrigins.includes(origin)) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    optionsSuccessStatus: 200
  }));


//middlewares
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/turf",turfRouter);
app.use("/booking",bookingRouter);

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.oxuhthb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(()=>
    app.listen(process.env.BACKEND_PORT || 5000,()=>
        console.log("Connected to DB & server is running")
    )
)
.catch((e)=>console.log(e));


app.use("/",(req,res,next)=>{
    res.send("<h1>Hi!!</h1>");
});


