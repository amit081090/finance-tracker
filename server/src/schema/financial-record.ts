import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the financial record, extending Mongoose's Document
interface FinancialRecord extends Document {
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

// Define the schema with Mongoose's type for each field
const financialRecordSchema = new Schema<FinancialRecord>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

// Create the Mongoose model and use the FinancialRecord interface to type it
const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord",
  financialRecordSchema
);

export default FinancialRecordModel;
