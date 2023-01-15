import {IDockerComposeService} from "./DockerComposeService";
import {DockerComposeServiceVolume} from "./DockerComposeServiceVolume";

export class DockerCompose {
    protected version = "3.8";
    protected services = {};
    protected volumes = {};
    protected networks = {};

    setVersion(version) {
        this.version = version;
    }

    addService(service: IDockerComposeService) {
        if (service.volumes) {
            for (const volume of service.volumes) {
                if (volume.type === DockerComposeServiceVolume.TYPES.DEFAULT) {
                    this.addVolume({[volume.source]: null});
                }
            }
        }

        if (service.networks) {
            for (const network of service.networks) {
                if (this.networks[network]) return;
                this.addNetwork({[network]: null});
            }
        }

        this.services = {...this.services, ...service.export()};
        return this;
    }

    addVolume(volume) {
        this.volumes = {...this.volumes, ...volume};

        return this;
    }

    addNetwork(network) {
        this.networks = {...this.networks, ...network};

        return this;
    }
}
