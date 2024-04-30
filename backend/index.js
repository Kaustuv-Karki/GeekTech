import express from "express";
import orderRoutes from "./routes/order.route.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/order", orderRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
