import ipAddress, {IpAddress} from '../../domain/IpAddress'
import ipPort, {IpPort} from '../../domain/IpPort'
import {Configuration} from '../interfaces'

export type VmixConfigurationSaveType = {
    ip: string
    port: number
}

class VmixConfiguration extends Configuration {
    ip: IpAddress
    port: IpPort

    constructor() {
        super()
        this.ip = VmixConfiguration.defaultIp
        this.port = VmixConfiguration.defaultPort
    }

    fromSave(data: VmixConfigurationSaveType): void {
        this.loadIpAddress("ip", this.setIp.bind(this), data)
        this.loadIpPort("port", this.setPort.bind(this), data)
    }
    toSave(): VmixConfigurationSaveType {
        return {
            ip: this.ip.toString(),
            port: this.port.toNumber(),
        }
    }
    clone(): VmixConfiguration {
        const clone = new VmixConfiguration()
        clone.fromSave(this.toSave())
        return clone
    }

    setIp(ip: IpAddress | string | null) {
        if (typeof ip === "string") {
            ip = ipAddress(ip)
        } else if (ip === null) {
            ip = VmixConfiguration.defaultIp
        }
        this.ip = ip
        
        return this
    }
    getIp() {
        return this.ip
    }

    setPort(port: IpPort | number | null) {
        if (typeof port === "number") {
            port = ipPort(port)
        } else if (port === null) {
            port = VmixConfiguration.defaultPort
        }
        this.port = port
        
        return this
    }
    getPort() {
        return this.port
    }

    private static readonly defaultIp = ipAddress("127.0.0.1")
    private static readonly defaultPort = ipPort(8099)
}

export default VmixConfiguration
