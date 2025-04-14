import dotenv from "dotenv"
import path from "path"
dotenv.config({path:path.join(process.cwd(),".env")})
export default {
    database_url:process.env.DATABASE_URL || '',
        port: process.env.PORT || 3000,
        bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
        jwt_access_secret: process.env.JWT_ACCESS_SECRET,
        access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    };