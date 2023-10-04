import { networkInterfaces } from "node:os";

export function getIPAddress(): string {
  let address = "";
  const interfaces = networkInterfaces();

  for (let interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName] || [];
    for (let networkInstance of networkInterface) {
      address = networkInstance.address;
      if (address.startsWith("192")) return address;
    }
  }

  return address;
}
