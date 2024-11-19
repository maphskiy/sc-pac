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
    // Autodesk
    "autodesk.com",
    "autodesk360.com",
    "akamaiedge.net",
    // Tailscale
    "tailscale.com",
    "ts.net",
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

    // OTHER
    "kino.pub",
    "rutracker.org",
    "miro.com",
    "sense.com",
    "nicehash.com",
    "discord.com",
    "medium.com",
    "arturia.com",
    "computegrid.ai",
    "native-instruments.com",
    "ableton.com",
    "x.com",
    "metamask.io",
    "slack.com",
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
