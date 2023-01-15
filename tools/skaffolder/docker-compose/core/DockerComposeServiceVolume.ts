export interface IDockerComposeServiceVolume {
    type: string
    source: string
    target: string
}

export class DockerComposeServiceVolume implements IDockerComposeServiceVolume {
    type;
    source;
    target;

    static TYPES = {
        BIND: "bind",
        TMPFS: "tmpfs",
        DEFAULT: "volume"
    };

    setType(type) {
        this.type = type;
        return this;
    }

    setSource(source) {
        this.source = source;
        return this;
    }

    setTarget(target) {
        this.target = target;
        return this;
    }

    makeDefault() {
        this.type = DockerComposeServiceVolume.TYPES.DEFAULT;

        return this;
    }

    makeBind() {
        this.type = DockerComposeServiceVolume.TYPES.BIND;
        return this;
    }

    makeTmpfs() {
        this.type = DockerComposeServiceVolume.TYPES.TMPFS;
        return this;
    }
}

