import {DockerComposeServicePort} from "../core/DockerComposeServicePort";

export const DockerComposeServicePortsSamples = {
    EXPRESS:
        new DockerComposeServicePort()
            .setHost(3000)
            .setContainer(3000),
    MONGODB:
        new DockerComposeServicePort()
            .setHost(27017)
            .setContainer(27017),
    MONGO_MONITOR:
        new DockerComposeServicePort()
            .setHost(3001)
            .setContainer(3001)
}