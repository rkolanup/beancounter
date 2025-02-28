import express from "express";
//import basicSearchRoutes from "../src/routes/basic-search.routes";
import swagger from "../src/swagger";
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";

dotenv.config();

const server = express();
const PORT = process.env.PORT;
const HOST = process.env.API_HOST;

// Set up Swagger UI
server.use('/apis', swaggerUi.serve, swaggerUi.setup(swagger.swaggerDocs));


// Middleware
server.use(express.json());

// Use the user registration routes
//server.use("/api", basicSearchRoutes); // Mount the router on /api

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Swagger docs available at http://${HOST}:${PORT}/apis`);
});