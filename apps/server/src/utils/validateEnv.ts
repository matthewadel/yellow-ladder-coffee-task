import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().transform(Number).default("5001"),

});

let env: z.infer<typeof envSchema>;

const validatedEnv = () => {
  try {
    env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const getEnv = () => {
  if (!env) return validatedEnv();
  return env;
};
export { validatedEnv, getEnv };
