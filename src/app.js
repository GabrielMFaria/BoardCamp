import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import router from "./routers/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);


app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
