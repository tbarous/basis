export interface IDockerComposeServiceBuild {
    context: string
    dockerfile: string
    target: string
}

export class DockerComposeServiceBuild implements IDockerComposeServiceBuild {
    context;
    dockerfile;
    target;

    setContext(context) {
        this.context = context
        return this
    }

    setDockerfile(dockerfile) {
        this.dockerfile = dockerfile
        return this

    }

    setTarget(target) {
        this.target = target
        return this
    }
}