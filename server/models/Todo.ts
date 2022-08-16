import { ITodo } from "../types/todo";
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);