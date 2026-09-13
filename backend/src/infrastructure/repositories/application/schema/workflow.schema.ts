import { Schema } from "mongoose";

const workflowSchema = new Schema({
  context: { type: Schema.Types.Mixed, require: true },
  currentNodeId: { type: String, require: true },
});

export default workflowSchema;
