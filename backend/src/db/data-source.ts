import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false, // set to false on PROD    
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: true,
    ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false, // Add SSL for Azure

});

AppDataSource.initialize()
    .then(() => console.log("✅ Database Connected"))
    .catch((err) => console.error("❌ Database Connection Error:", err));