import { getQuery } from "h3";

const remoteControlQueue = new Map<string, string>();

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const token = Array.isArray(query.token) ? query.token[0] : query.token;
    const action = Array.isArray(query.action) ? query.action[0] : query.action;
    const method = event.req.method?.toUpperCase();

    if (!token || typeof token !== "string") {
        return {
            success: false,
            message: "Token parameter is required.",
        };
    }

    if (method === "POST") {
        const validActions = new Set(["start", "retake", "finish"]);
        if (!action || !validActions.has(action)) {
            return {
                success: false,
                message: "Invalid action.",
            };
        }

        remoteControlQueue.set(token, action);
        return {
            success: true,
            action,
            token,
        };
    }

    if (method === "GET") {
        const queuedAction = remoteControlQueue.get(token) || null;
        if (queuedAction) {
            remoteControlQueue.delete(token);
        }

        return {
            success: true,
            action: queuedAction,
            token,
        };
    }

    return {
        success: false,
        message: "Unsupported method.",
    };
});
