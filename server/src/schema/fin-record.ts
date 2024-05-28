import mongoose from "mongoose";

interface FinRecord {
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

const finRecordSchema = new mongoose.Schema<FinRecord>({
userId: { type: String, required: true },
date: { type: Date, required: true },
description: { type: String, required: true },
amount: { type: Number, required: true },
category: { type: String, required: true },
paymentMethod: { type: String, required: true },
});

const FinRecordModel = mongoose.model<FinRecord>(
  'FinRecord', 
  finRecordSchema
  );

  export default FinRecordModel;