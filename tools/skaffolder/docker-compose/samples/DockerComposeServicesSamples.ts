import {DockerComposeService} from "../core/DockerComposeService";
import {DockerComposeServiceVolumesSamples} from "./DockerComposeServiceVolumesSamples";
import {DockerComposeServiceNetworksSamples} from "./DockerComposeServiceNetworksSamples";
import {DockerComposeServiceBuildsSamples} from "./DockerComposeServiceBuildsSamples";
import {DockerComposeServiceRestart} from "../core/DockerComposeServiceRestart";
import {DockerComposeServiceNames} from "../core/DockerComposeServiceNames";
import {DockerComposeServicePortsSamples} from "./DockerComposeServicePortsSamples";
import {DockerComposeServiceImagesSamples} from "./DockerComposeServiceImagesSamples";
import {DockerComposeServiceEnvironmentsSamples} from "./DockerComposeServiceEnvironmentsSamples";
import * as path from "path";

const currentPath = path.resolve(`${__dirname}`)

export const DockerComposeServicesSamples = {
    // EXPRESS SERVER
    EXPRESS:
        new DockerComposeService()
            .setName(DockerComposeServiceNames.EXPRESS_SERVER)
            .setContainerName(DockerComposeServiceNames.EXPRESS_SERVER)
            .setVolumes([DockerComposeServiceVolumesSamples.APP_BIND_VOLUME])
            .setRestart(DockerComposeServiceRestart.ALWAYS)
            .setPorts([DockerComposeServicePortsSamples.EXPRESS])
            .setNetworks([DockerComposeServiceNetworksSamples.BACKEND])
            .setBuild(DockerComposeServiceBuildsSamples.LOCAL)
            .setEnvironment(DockerComposeServiceEnvironmentsSamples.MONGO_CREDENTIALS)
            .setCustomDockerfile(`${currentPath}/../dockerfiles/Dockerfile.node`),

    // MONGODB
    MONGO: new DockerComposeService()
        .setName(DockerComposeServiceNames.MONGODB)
        .setContainerName(DockerComposeServiceNames.MONGODB)
        .setVolumes([DockerComposeServiceVolumesSamples.MONGO_STORAGE_VOLUME, DockerComposeServiceVolumesSamples.MONGO_INIT_SCRIPT,])
        .setImage(DockerComposeServiceImagesSamples.MONGO)
        .setRestart(DockerComposeServiceRestart.ALWAYS)
        .setPorts([DockerComposeServicePortsSamples.MONGODB])
        .setNetworks([DockerComposeServiceNetworksSamples.BACKEND])
        .setEnvironment(DockerComposeServiceEnvironmentsSamples.MONGO),

    // MONGO MONITOR
    MONGO_MONITOR: new DockerComposeService()
        .setName(DockerComposeServiceNames.MONGO_MONITOR)
        .setContainerName(DockerComposeServiceNames.MONGO_MONITOR)
        .setImage(DockerComposeServiceImagesSamples.MONGO_MONITOR)
        .setRestart(DockerComposeServiceRestart.ALWAYS)
        .setPorts([DockerComposeServicePortsSamples.MONGO_MONITOR])
        .setNetworks([DockerComposeServiceNetworksSamples.BACKEND])
        .setEnvironment(DockerComposeServiceEnvironmentsSamples.MONGO_MONITOR),
};
