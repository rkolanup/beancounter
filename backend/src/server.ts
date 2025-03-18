import express from "express";
import swagger from "./swagger";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const server = express();
const PORT = process.env.PORT;
const HOST = process.env.API_HOST;

server.use(cors());

// Middleware
server.use(express.json());

// Use the user registration routes
//server.use("/api", searchRoutes); // Mount the router on /api

// Set up Swagger UI
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swagger.swaggerDocs));

// Default welcome message for `/api`
server.get('/api', (req, res) => {
    res.json({
        message: `Welcome to the TTB Colas API. Please refer http://${process.env.API_HOST}:${process.env.PORT}/api/docs for the available APIs.`
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Swagger docs available at http://${HOST}:${PORT}/api-docs`);
});