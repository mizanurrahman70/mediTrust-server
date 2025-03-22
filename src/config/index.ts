import dotenv from "dotenv"
import path from "path"
dotenv.config({path:path.join(process.cwd(),".env")})

console.log("Loaded DATABASE_URL from .env:", process.env.DATABASE_URL); 
export default {
    database_url:process.env.DATABASE_URL || '',
    port :process.env.PORT || 3000}