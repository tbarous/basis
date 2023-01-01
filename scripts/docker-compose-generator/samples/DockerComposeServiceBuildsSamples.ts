import {DockerComposeServiceBuild} from "../core/DockerComposeServiceBuild";

export const DockerComposeServiceBuildsSamples = {
    LOCAL: new DockerComposeServiceBuild()
        .setContext(".")
        .setDockerfile("Dockerfile")
        .setTarget("base")
};