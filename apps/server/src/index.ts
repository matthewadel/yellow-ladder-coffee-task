import "dotenv/config";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routes";
import { globalErrorHandler } from "./middlewares";
import path from "path";
import { NotFoundError, getEnv } from "./utils";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

const app = express();

app.use(express.json());
app.use(hpp());
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, "uploads")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too many requests, please try again after 15 minutes"
});

if (getEnv().NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use("/api", limiter, rootRouter);
app.all("/*splat", () => {
  throw new NotFoundError("Route not found");
});

// handle express errors
app.use(globalErrorHandler);


const PORT = getEnv().PORT ?? 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
