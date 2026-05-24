import { getQuery } from "h3";

const remoteStartQueue = new Map<string, boolean>();

export default defineEventHandler((event) => {
    const query = getQuery(event);
    const token = Array.isArray(query.token) ? query.token[0] : query.token;
    const action = Array.isArray(query.action) ? query.action[0] : query.action;

    if (!token || typeof token !== "string") {
        return {
            success: false,
            message: "Token parameter is required.",
        };
    }

    if (action === "start") {
        remoteStartQueue.set(token, true);
        return {
            success: true,
            started: true,
            token,
        };
    }

    const started = remoteStartQueue.get(token) === true;
    if (started) {
        remoteStartQueue.delete(token);
    }

    return {
        success: true,
        started,
        token,
    };
});
