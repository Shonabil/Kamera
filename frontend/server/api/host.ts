import os from "os";

const getPrivateLanIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const addrs = interfaces[name] || [];
        for (const addr of addrs) {
            if (addr.family === "IPv4" && !addr.internal) {
                if (
                    addr.address.startsWith("10.") ||
                    addr.address.startsWith("172.") ||
                    addr.address.startsWith("192.168.")
                ) {
                    return addr.address;
                }
            }
        }
    }
    return "127.0.0.1";
};

export default defineEventHandler(() => {
    return {
        lanIp: getPrivateLanIp(),
    };
});
