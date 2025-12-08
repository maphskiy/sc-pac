const defaultProxySettings = "SOCKS5 127.0.0.1:12334";

// Create a set of individual IP addresses to be proxied
const proxyIPs = new Set([
    // Add individual IP addresses here
    // Example: "203.0.113.0", "198.51.100.0"
]);

// Create an array of CIDR ranges to be proxied
const proxyCIDRs = [
    // Add CIDR ranges here
    "160.79.104.0/23"
];

// Create a set of domains for quick O(1) lookups
const proxyDomains = new Set([
    // ChatGPT
    "openai.com",
    "chatgpt.com",
    "oaistatic.com",
    // Facebook
    "facebook.com",
    "fbcdn.net",
    "facebook.net",
    "fbsbx.com",
    "fbpigeon.com",
    "fb.com",
    "facebook-hardware.com",
    // YouTube & Google
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
    "google.com",
    "pkg.dev",
    "gstatic.com",
    "googleusercontent.com",
    "meet.google.com",
    "googleapis.com",
    // JetBrains
    "jetbrains.com",
    "jetbrains.dev",
    "jetbrains.net",
    "jetbrains.org",
    "jetbrains.ru",
    "jetbrains.space",
    "intellij.net",
    "jb.gg",
    "kotl.in",
    "kotlinlang.org",
    "talkingkotlin.com",
    "kotlinconf.com",
    "jetbrains.com.cn",
    "myjetbrains.com",
    // Claude
    "anthropic.com",
    "claude.ai",
    "claude.com",
    // Autodesk
    "autodesk.com",
    "autodesk360.com",
    "akamaiedge.net",
    // Tailscale
    "tailscale.com",
    // Windows
    "microsoft.com",
    "skype.com",
    "visualstudio.com",
    "exp-tas.com",
    "msftncsi.com",
    "windowsupdate.com",
    "msftconnecttest.com",
    "msedge.net",
    "azure.com",
    "azureedge.com",
    "bing.com",
    // Music
    "babyaud.io",
    "arturia.com",
    "native-instruments.com",
    "ableton.com",
    "spitfireaudio.com",
    "native-cloud.com",
    "soundcloud.com",
    // Discord
    "dis.gd",
    "discord.co",
    "discord.com",
    "discord.design",
    "discord.dev",
    "discord.gg",
    "discord.gift",
    "discord.gift",
    "discord.media",
    "discord.new",
    "discord.store",
    "discord.tools",
    "discordapp.com",
    "discordapp.net",
    "discordmerch.com",
    "discordpartygames.com",
    "discord-activities.com",
    "discordactivities.com",
    "discordsays.com",
    "discordstatus.com",
    "airhorn.solutions",
    "airhornbot.com",
    "bigbeans.solutions",
    "watchanimeattheoffice.com",
    "discordapp.io",
    "discordcdn.com",
    // LUCIDCHARTS
    "lucid.co",
    "lucidextensions.app",
    "lucidchart.com",
    "lucid.app",
    "lucidspark.com",
    "lucidscale.com",
    "lucidforeducation.com",
    "lucid.readme.io",
    // CURSOR
    "cursor.ai",
    "cursor.com",
    "cursor.sh",
    // NOTION
    "notion.so",
    "notion.app",
    "notion.com",
    "notionusercontent.com",
    "notion-static.com",
    "notion.site",
    // INSTAGRAM
    "instagram.com",
    "cdninstagram.com",
    "ig.me",
    "instagr.am",
    "igsonar.com",
    // OTHER
    "kino.pub",
    "rutracker.org",
    "rutracker.cc",
    "miro.com",
    "sense.com",
    "nicehash.com",
    "medium.com",
    "computegrid.ai",
    "x.com",
    "metamask.io",
    "zendesk.com",
    "databricks.com",
    "github.com",
    "arkoselabs.com",
    "nvidia.com",
    "developer.nvidia.com",
    "linkedin.com",
    "packagist.org",
    "facebook.com",
    "composio.dev",
    "fast.com",
    "bitsearch.to",
    "t-ru.org",
    "d3js.org",
    // Amazone
    "amazonaws.com",
    "amazon.com",
    "api.aws",
    "awsstatic.com",
    "awsstatic.com",
    // AI
    "midjourney.com",
    "klingai.com",
    "kechuangai.com",
    "openrouter.ai",
    // JIRA
    "atlassian.net",
    "atl-paas.net",
    "ramensoftware.com",
    "windhawk.net",
    // QuickBooks (Intuit)
    "intuit.com",
    "intuitcdn.net",
    "tsheets.com",
    "quickbooksconnect.com",
    "mint.com",
    "intuit.ca",
    "intuit.com",
    "intuit.launchdarkly.com",
    // Mixcloud
    "mixcloud.com",
    // Other
    "sentry.io",
    "patreon.com",
    "hashicorp.com",
    "terraform.io",
    "emclient.com",
    "ollama.com",
    "perplexity.ai",
    "vdsina.com",
    "auth0.com",
    "openkg.cn",
    "headshotpro.com",
    "headshotpror2.com",
    "qdrant.tech",
    "neo4j.com",
    "neo4j.org",
    "stripe.com",
    "chainguard.dev",
    "gofile.me",
    "docusign.com",
    "datacamp.com",
    "cloudflare.com",
    "introserv.com",
    // APPLE
    "icloud.com",
    "apple.com",
    "apple-cloudkit.com",
    // Lektra
    "glaid.net"
]);

// Helper function to convert IP address to 32-bit integer
function ipToInt(ip) {
    const parts = ip.split('.');
    return (parseInt(parts[0]) << 24) +
           (parseInt(parts[1]) << 16) +
           (parseInt(parts[2]) << 8) +
           parseInt(parts[3]);
}

// Helper function to check if IP is in CIDR range
function isIPInCIDR(ip, cidr) {
    const [range, bits] = cidr.split('/');
    const mask = -1 << (32 - parseInt(bits));
    return (ipToInt(ip) & mask) === (ipToInt(range) & mask);
}

// Helper function to check if a string is a valid IPv4 address
function isIPv4(str) {
    const parts = str.split('.');
    if (parts.length !== 4) return false;
    return parts.every(function(part) {
        const num = parseInt(part);
        return num >= 0 && num <= 255 && part === num.toString();
    });
}

function FindProxyForURL(url, host) {
    // Check if the host is an individual IP address
    if (proxyIPs.has(host)) {
        return defaultProxySettings;
    }

    // Check if the host is an IPv4 address and matches any CIDR range
    if (isIPv4(host)) {
        for (let i = 0; i < proxyCIDRs.length; i++) {
            if (isIPInCIDR(host, proxyCIDRs[i])) {
                return defaultProxySettings;
            }
        }
    }

    // Split the host into its domain parts
    const domainParts = host.split('.');

    // Check from the top-level domain backward for matches
    for (let i = 0; i < domainParts.length; i++) {
        const currentDomain = domainParts.slice(i).join('.');

        if (proxyDomains.has(currentDomain)) {
            return defaultProxySettings;
        }
    }

    // Default to direct connection
    return "DIRECT";
}
