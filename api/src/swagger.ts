// src/swagger.ts
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'APIs List',
            version: '1.0.0',
            description: 'API documentation for Bean-Counter service',
        },
        servers: [
            {
                url: `http://${process.env.API_HOST}:${process.env.PORT}/api`,
            },
        ],
    },
    apis: ['./src/controllers/*.ts'], // Adjust this path based on your folder structure
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default {
    swaggerUi,
    swaggerDocs,
};