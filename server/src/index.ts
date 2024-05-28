import express, {Express} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import finRecordRouter from './routes/fin-records';
import cors from 'cors';

dotenv.config({ path: '.env.local' });

const app: Express = express();
const port = process.env.PORT || 3001;



app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGO_URI || "default_connection_uri";

mongoose
.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB!"))
.catch((err) => console.error("Failed to Connect to MongoDB", err));

app.use("/fin-records", finRecordRouter)

app.listen(port,() => {
  console.log(`Server Running on Port ${port}`);
})