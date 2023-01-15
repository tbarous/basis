import {DockerComposeServiceEnvironment} from "./DockerComposeServiceEnvironment";
import {
    IDockerComposeServiceNetwork
} from "./DockerComposeServiceNetwork";
import {
    IDockerComposeServiceVolume
} from "./DockerComposeServiceVolume";
import {IDockerComposeServiceBuild} from "./DockerComposeServiceBuild";
import {DockerComposeServicePort, IDockerComposeServicePort} from "./DockerComposeServicePort";
import {DockerComposeServiceRestart} from "./DockerComposeServiceRestart";
import {toJS} from "yaml/util";

export interface IDockerComposeService {
    // if it has custom
    customDockerfile?: string

    volumes: any
    name: string
    containerName: string
    restart: DockerComposeServiceRestart
    ports: string[]
    networks: any
    export: any
}

export class DockerComposeService implements IDockerComposeService {
    // if it has custom
    customDockerfile?: string

    name: string;
    image: string;
    volumes: IDockerComposeServiceVolume[] = [];
    containerName: string = "";
    restart = DockerComposeServiceRestart.ALWAYS;
    ports: string[] = [];
    environment: DockerComposeServiceEnvironment[] = [];
    networks: string[] = [];
    build: IDockerComposeServiceBuild;

    setName(name) {
        this.name = name;

        return this;
    }

    setVolumes(volumes: IDockerComposeServiceVolume[]) {
        this.volumes = volumes.map((volume) => ({...volume}));

        return this;
    }

    setContainerName(containerName) {
        this.containerName = containerName;
        return this;
    }

    setImage(image) {
        this.image = image;
        return this;
    }

    setRestart(restart) {
        this.restart = restart;
        return this;
    }

    setEnvironment(environment) {
        this.environment = environment;
        return this;
    }

    setBuild(build: IDockerComposeServiceBuild) {
        this.build = build;

        return this;
    }

    setNetworks(networks: IDockerComposeServiceNetwork[]) {
        this.networks = networks.map((network: IDockerComposeServiceNetwork) => network.name);

        return this;
    }

    addVolume(volume: IDockerComposeServiceVolume) {
        this.volumes.push(volume);

        return this;
    }

    addEnvironmentVariable(variable) {
        this.environment.push(variable);
    }

    setPorts(ports: IDockerComposeServicePort[]) {
        this.ports = ports.map((port: IDockerComposeServicePort) => port.export());

        return this;
    }

    setCustomDockerfile(customDockerfile) {
        this.customDockerfile = customDockerfile

        return this
    }

    export() {
        const {name, containerName, ...props} = this;

        return {
            [this.name]: {...props, container_name: containerName},
        };
    }
}
