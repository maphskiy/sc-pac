shadowSocksDefaultProxySettings = "SOCKS5 127.0.0.1:1080";

// Define the list of domains to be proxied
var proxyDomains = [
    // ChatGPT
    "openai.com",
    "chatgpt.com",
    "oaistatic.com",
    // Youtube
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
];


function FindProxyForURL(url, host) {

    // Iterate through your list to check if the host matches any entry
    for (var i = 0; i < proxyDomains.length; i++) {
        if (dnsDomainIs(host, "." + proxyDomains[i]) || host === proxyDomains[i]) {
            return shadowSocksDefaultProxySettings; // Shadowsocks default proxy settings
        }
    }

    // Default to direct connection for all other URLs
    return "DIRECT";
}
