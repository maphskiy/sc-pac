const shadowSocksDefaultProxySettings = "SOCKS5 127.0.0.1:1080";

// Create a set of domains for quick O(1) lookups
const proxyDomains = new Set([
    // ChatGPT
    "openai.com",
    "chatgpt.com",
    "oaistatic.com",
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
    // OTHER
    "kino.pub",
    "rutracker.org",
    "miro.com",
    "sense.com",
    "nicehash.com",
    "medium.com",
    "computegrid.ai",
    "x.com",
    "metamask.io",
    "zendesk.com",
    "slack.com",
    "databricks.com",
    "github.com",
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
