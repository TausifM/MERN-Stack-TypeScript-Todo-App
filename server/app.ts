import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(todoRoutes);
console.log(process.env.MONGO_URI);
mongoose
  .connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
