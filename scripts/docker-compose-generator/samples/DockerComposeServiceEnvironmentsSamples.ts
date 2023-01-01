export const DockerComposeServiceEnvironmentsSamples = {
    MONGO: {
        MONGO_INITDB_ROOT_USERNAME: "${DB_USERNAME}",
        MONGO_INITDB_ROOT_PASSWORD: "${DB_PASSWORD}",
        MONGO_INITDB_DATABASE: "${DB_NAME}",
    },
    MONGO_CREDENTIALS: {
        PORT: "${BACKEND_PORT}",
        MONGO_USERNAME: "${DB_USERNAME}",
        MONGO_PASSWORD: "${DB_PASSWORD}",
    },
    MONGO_MONITOR: {
         ME_CONFIG_MONGODB_AUTH_USERNAME: "${DB_USERNAME}",
            ME_CONFIG_MONGODB_AUTH_PASSWORD: "${DB_PASSWORD}",
            ME_CONFIG_MONGODB_ENABLE_ADMIN: true,
            ME_CONFIG_MONGODB_SERVER: "mongodb",
    },
};