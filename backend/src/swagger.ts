
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BeanCounter APIs',
            version: '1.0.0',
            description: 'API documentation for your project',
        },
        servers: [
            {
                url: `http://${process.env.API_HOST}:${process.env.PORT}/api`,
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default {
    swaggerUi,
    swaggerDocs,
};