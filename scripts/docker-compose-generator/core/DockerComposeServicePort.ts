export interface IDockerComposeServicePort {
    host: number
    container: number
    export: () => string
}

export class DockerComposeServicePort implements IDockerComposeServicePort {
    host;
    container;

    setHost(host: number) {
        this.host = host

        return this
    }

    setContainer(container: number) {
        this.container = container

        return this
    }

    export() {
        return `${this.host}:${this.container}`
    }
}