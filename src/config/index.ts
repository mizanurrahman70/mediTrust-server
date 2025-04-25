import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL || "",
  port: process.env.PORT || 3000,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },

  nodemailer_host: process.env.NODEMAILER_HOST,
  nodemailer_port: process.env.NODEMAILER_PORT,
  nodemailer_user_email: process.env.NODEMAILER_USER_EMAIL,
  nodemailer_user_pass: process.env.NODEMAILER_USER_PASS,
};
