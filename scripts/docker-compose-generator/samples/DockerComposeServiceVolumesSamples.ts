import {DockerComposeServiceVolume} from "../core/DockerComposeServiceVolume";

export const DockerComposeServiceVolumesSamples = {
    APP_BIND_VOLUME: new DockerComposeServiceVolume()
        .makeBind()
        .setSource("./src")
        .setTarget("/app/src"),
    MONGO_STORAGE_VOLUME: new DockerComposeServiceVolume()
        .makeDefault()
        .setSource("mongodata")
        .setTarget("/data/db"),
    MONGO_INIT_SCRIPT: new DockerComposeServiceVolume()
        .makeBind()
        .setSource("./mongo/init-mongo.js")
        .setTarget("/docker-entrypoint-initdb.d/init-mongo.js:ro"),
};
