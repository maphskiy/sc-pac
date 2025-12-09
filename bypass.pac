// PAC file to bypass the proxy for a specific set of domains.
// Uses the same proxy settings as main.pac.
const proxySettings = "SOCKS5 127.0.0.1:12334";

// Domains that must skip the proxy (suffix match, so "example.com" also covers "api.example.com").
const bypassDomains = new Set([
    // "example.com",
    // "internal.corp",
    // Add more domains here
    "ts.net"
]);

function FindProxyForURL(url, host) {
    const normalizedHost = host.toLowerCase();

    // Keep plain hostnames (no dots) off the proxy
    if (isPlainHostName(normalizedHost)) {
        return "DIRECT";
    }

    // Check domain suffixes against the bypass list
    const parts = normalizedHost.split(".");
    for (let i = 0; i < parts.length; i++) {
        const candidate = parts.slice(i).join(".");
        if (bypassDomains.has(candidate)) {
            return "DIRECT";
        }
    }

    // Everything else uses the system proxy
    return proxySettings;
}
