
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TTB COLA Search APIs',
            version: '1.0.0',
            description: 'API documentation for the ttb-cola-search-service service',
        },
        servers: [
            {
                url: `http://${process.env.API_HOST}:${process.env.PORT}/api`,
            },
        ],
    },
    apis: ['./src/*.controller.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default {
    swaggerUi,
    swaggerDocs,
};