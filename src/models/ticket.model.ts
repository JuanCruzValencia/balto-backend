import { Document, Schema, model } from "mongoose";
import { generateCode } from "../utils/utils.ts";
import { Ticket } from "../interface/interfaces.ts";

type TicketDocument = Document & Ticket;

const ticketSchema: Schema<TicketDocument> = new Schema({
  id: Schema.Types.ObjectId,
  code: {
    type: String,
    default: generateCode(),
    unique: true,
  },
  amount: Number,
  purchaser: String,
});

ticketSchema.set("timestamps", {
  createdAt: "purchased_datetime",
});

const ticketModel = model<TicketDocument>("Tickets", ticketSchema);

export default ticketModel;
