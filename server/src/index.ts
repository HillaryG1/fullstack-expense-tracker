import express, {Express} from 'express';
import mongoose from 'mongoose';
import finRecordRouter from './routes/fin-records';

const app: Express = express();
const port = process.env.PORT || 3001;


app.use(express.json());

const mongoURI: string = process.env.MONGO_URI || "default_connection_uri";

mongoose
.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB!"))
.catch((err) => console.error("Failed to Connect to MongoDB", err));

app.use("/fin-records", finRecordRouter)

app.listen(port,() => {
  console.log(`Server Running on Port ${port}`);
})