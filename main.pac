const shadowSocksDefaultProxySettings = "SOCKS5 127.0.0.1:1080";

// Create a set of domains for quick O(1) lookups
const proxyDomains = new Set([
    // ChatGPT
    "openai.com",
    "chatgpt.com",
    "oaistatic.com",
    // YouTube
    "youtube.com",
    "yt.be",
    "ytimg.com",
    "ggpht.com",
    "googlevideo.com",
    "wide-youtube.l.google.com",
    "withyoutube.com",
    "youtu.be",
    "youtube-nocookie.com",
    "youtube-ui.l.google.com",

    // OTHER
    "kino.pub",
]);

function FindProxyForURL(url, host) {
    // Split the host into its domain parts
    const domainParts = host.split('.');
    
    // Check from the top-level domain backward for matches
    for (let i = 0; i < domainParts.length; i++) {
        const currentDomain = domainParts.slice(i).join('.');
        
        if (proxyDomains.has(currentDomain)) {
            return shadowSocksDefaultProxySettings;
        }
    }

    // Default to direct connection
    return "DIRECT";
}
