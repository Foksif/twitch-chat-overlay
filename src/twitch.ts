import tmi from "tmi.js";

export interface ChatMessage {
    id: string;
    username: string;
    color: string;
    text: string;
}

export function connectToTwitch(
    channel: string,
    onMessage: (message: ChatMessage) => void,
) {
    const client = new tmi.Client({
        channels: [channel],
    });

    client.connect();

    client.on("message", (_, tags, message, self) => {
        if (self) return;

        onMessage({
            id: crypto.randomUUID(),
            username: tags["display-name"] ?? tags.username ?? "Unknown",
            color: tags.color ?? "#9146ff",
            text: message,
        });
    });

    return () => {
        client.disconnect();
    };
}