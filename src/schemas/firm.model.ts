import { Document, Model, model, Schema } from "mongoose";

export interface IFirm extends Document {
  name: string;
  code: string;
  system: string;
  description: string;
}
export interface IFirmDocument extends IFirm, Document {
  name: string;
  code: string;
  system: string;
  description: string;
}

const firmSchema = new Schema({
  name: { type: String, trim: true, required: true, lowercase: true },
  code: {
    type: String,
    unique: [true, "Code must be unique per firm."],
    trim: true,
    required: true,
    lowercase: true,
  },
  system: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  description: { type: String, trim: true, required: true, lowercase: true },
});

export const Firm: Model<IFirmDocument> = model("Firm", firmSchema);
