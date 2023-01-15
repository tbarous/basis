export interface IDockerComposeServiceNetwork {
    name: string
}

export class DockerComposeServiceNetwork implements IDockerComposeServiceNetwork {
    name;

    setName(name) {
        this.name = name;
        return this;
    }
}