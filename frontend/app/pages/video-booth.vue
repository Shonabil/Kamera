<template>
    <div
        class="min-h-screen bg-[#050816] flex flex-col items-center justify-center relative overflow-hidden"
    >
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute top-12 left-10 w-44 h-44 rounded-full bg-pink-500/20 blur-3xl"
            ></div>
            <div
                class="absolute bottom-16 right-10 w-56 h-56 rounded-full bg-cyan-400/15 blur-3xl"
            ></div>
            <div
                class="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/10 to-transparent"
            ></div>
        </div>

        <div class="absolute inset-0 flex items-center justify-center px-4">
            <div
                class="w-full max-w-5xl aspect-video bg-[#111827] rounded-4xl border-4 border-slate-800 shadow-[0_0_80px_rgba(34,211,238,0.12)] relative overflow-hidden flex flex-col"
            >
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.15),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_25%)] pointer-events-none"
                ></div>
                <div class="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    <div
                        class="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-2 rounded-full backdrop-blur text-[11px] uppercase tracking-[0.3em] text-slate-100 font-black shadow-sm"
                    >
                        <span
                            class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]"
                        ></span>
                        LIVE BOOTH
                    </div>
                    <div
                        class="inline-flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-2 rounded-full text-xs text-slate-300"
                    >
                        <span>Status</span>
                        <span
                            :class="
                                state === 'idle'
                                    ? 'bg-emerald-500/20 text-emerald-200'
                                    : state === 'countdown'
                                      ? 'bg-amber-500/20 text-amber-200'
                                      : state === 'recording'
                                        ? 'bg-red-500/20 text-red-200'
                                        : 'bg-sky-500/20 text-sky-200'
                            "
                            class="rounded-full px-2 py-0.5 font-semibold"
                        >
                            {{ state.toUpperCase() }}
                        </span>
                    </div>
                </div>

                <div class="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2">
                    <span
                        class="bg-white/10 border border-white/10 text-slate-200 text-[11px] uppercase px-3 py-2 rounded-full"
                        >HiddenGem Studio</span
                    >
                    <span
                        class="bg-white/10 border border-white/10 text-slate-200 text-[11px] uppercase px-3 py-2 rounded-full"
                        >Canon DSLR Ready</span
                    >
                </div>

                <div
                    class="absolute inset-0 flex items-center justify-center px-8"
                >
                    <div
                        class="w-full h-full rounded-3xl border border-white/5 overflow-hidden relative bg-slate-950/70 backdrop-blur-sm flex items-center justify-center"
                    >
                        <div
                            class="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%)] pointer-events-none"
                        ></div>

                        <!-- Live camera feed appears here -->
                        <div
                            v-if="state === 'idle'"
                            class="text-slate-300 text-center px-8"
                        >
                            <svg
                                class="mx-auto w-20 h-20 mb-5 text-slate-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                ></path>
                            </svg>
                            <p
                                class="text-2xl font-semibold tracking-widest text-white/80 mb-2"
                            >
                                Ready to capture.
                            </p>
                            <p class="text-sm text-slate-400 max-w-xl mx-auto">
                                Tekan tombol mulai untuk mengambil video booth
                                dengan Canon DSLR. Pastikan kamera terpasang dan
                                digiCamControl sedang aktif.
                            </p>
                        </div>

                        <div
                            v-if="state === 'recording'"
                            class="w-full h-full flex flex-col items-center justify-center text-white/90"
                        >
                            <div
                                class="w-32 h-32 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(239,68,68,0.2)]"
                            >
                                <span class="text-6xl font-black">REC</span>
                            </div>
                            <div class="text-7xl font-extrabold">
                                {{ recordTimer }}s
                            </div>
                            <p class="mt-4 text-sm text-slate-300">
                                Recording in progress. Please hold still.
                            </p>
                        </div>

                        <div
                            v-if="state === 'countdown'"
                            class="w-full h-full flex flex-col items-center justify-center text-white"
                        >
                            <div
                                class="text-[10rem] font-extrabold tracking-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.35)]"
                            >
                                {{ countdown }}
                            </div>
                            <p
                                class="mt-4 text-sm text-slate-300 uppercase tracking-[0.35em]"
                            >
                                Get ready
                            </p>
                        </div>

                        <div
                            v-if="state === 'processing'"
                            class="w-full h-full flex flex-col items-center justify-center text-white/90"
                        >
                            <div
                                class="w-20 h-20 rounded-full border-4 border-pink-400 border-t-transparent animate-spin mb-6"
                            ></div>
                            <h2 class="text-2xl font-bold text-white">
                                Processing your capture
                            </h2>
                            <p class="mt-2 text-sm text-slate-300">
                                Menghasilkan video booth dan menyiapkan hasil
                                akhir.
                            </p>
                        </div>

                        <div
                            v-if="state === 'error'"
                            class="w-full h-full flex flex-col items-center justify-center text-white/90"
                        >
                            <div
                                class="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-red-500/15 border border-red-500/30 text-red-400"
                            >
                                <svg
                                    class="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h2 class="text-2xl font-bold mb-2">Oops!</h2>
                            <p
                                class="text-sm text-slate-300 max-w-md text-center"
                            >
                                {{
                                    errorMessage ||
                                    "Terjadi kesalahan saat memulai sesi."
                                }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Controls -->
        <div
            class="absolute bottom-10 left-0 w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-4 z-40"
        >
            <div class="flex flex-col sm:flex-row gap-3 items-center">
                <button
                    v-if="state === 'idle'"
                    @click="startSession"
                    class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-pink-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 hover:bg-pink-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)]"
                >
                    <span class="mr-2">Start Video Booth</span>
                    <svg
                        class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                    </svg>
                </button>
                <button
                    v-if="state === 'idle'"
                    @click="toggleRemoteQrPanel"
                    class="inline-flex items-center justify-center px-6 py-4 font-bold text-slate-900 transition-all duration-200 bg-cyan-400 rounded-xl shadow-[0_0_30px_-10px_rgba(34,211,238,0.45)] hover:bg-cyan-300"
                >
                    <i class="fa-solid fa-qrcode mr-2"></i>
                    Remote QR Start
                </button>
            </div>

            <div
                v-if="state === 'error'"
                class="bg-red-500/20 text-red-400 px-6 py-3 rounded-lg backdrop-blur-md border border-red-500/30 flex items-center"
            >
                <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                {{ errorMessage }}
                <button
                    @click="state = 'idle'"
                    class="ml-4 underline text-white"
                >
                    Retry
                </button>
            </div>
        </div>

        <div
            v-if="showRemoteQrPanel"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        >
            <div
                class="relative w-full max-w-md rounded-4xl bg-slate-950/95 border border-slate-700 p-6 shadow-[0_0_60px_rgba(15,23,42,0.85)]"
            >
                <button
                    @click="showRemoteQrPanel = false"
                    class="absolute top-4 right-4 text-slate-300 hover:text-white"
                >
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
                <div class="text-left">
                    <h3 class="text-xl font-black text-white mb-2">
                        Remote Start via QR
                    </h3>
                    <p class="text-sm text-slate-400 mb-4">
                        Scan QR ini dengan HP untuk mengirim perintah start ke
                        booth dari jarak jauh.
                    </p>
                </div>
                <div class="flex flex-col items-center gap-4">
                    <div class="flex items-center gap-2">
                        <button
                            @click="setUseLan(false)"
                            :class="
                                useLanIp
                                    ? 'bg-neutral-700 text-white'
                                    : 'bg-cyan-400 text-black'
                            "
                            class="px-3 py-1 rounded"
                        >
                            Use Host
                        </button>
                        <button
                            @click="setUseLan(true)"
                            :class="
                                useLanIp
                                    ? 'bg-cyan-400 text-black'
                                    : 'bg-neutral-700 text-white'
                            "
                            class="px-3 py-1 rounded"
                        >
                            Use LAN IP
                        </button>
                    </div>
                    <div class="text-xs text-slate-400">
                        Link:
                        <span class="text-white break-all">{{
                            qrDecodedLink
                        }}</span>
                    </div>
                    <img
                        :src="remoteQrUrl"
                        alt="Remote start QR code"
                        class="w-56 h-56 rounded-3xl border border-slate-700 bg-white p-3"
                    />
                    <p class="text-xs text-slate-500 text-center">
                        Jika perangkat mendukung, buka tautan QR untuk memulai
                        sesi secara remote.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "nuxt/app";

const router = useRouter();
const route = useRoute();
const state = ref("idle"); // idle, countdown, recording, processing, error
const countdown = ref(3);
const recordTimer = ref(5);
const errorMessage = ref("");
const showRemoteQrPanel = ref(false);
const remoteToken = ref("");
const origin = ref("");
// LAN QR fallback (change to your dev machine IP if needed)
const lanIp = ref("192.168.1.15");
const useLanIp = ref(true);
const remotePolling = ref(null);
let currentSessionId = null;
let countInterval = null;
let recInterval = null;

const remoteQrUrl = computed(() => {
    if (!origin.value || !remoteToken.value) return "";
    if (!process.client) return "";

    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : "";
    const base = useLanIp.value
        ? `${protocol}//${lanIp.value}${port}`
        : origin.value;
    const remoteLink = `${base}/remote-control?token=${remoteToken.value}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(remoteLink)}&bgcolor=ffffff&color=000000`;
});

const qrDecodedLink = computed(() => {
    try {
        const parts = remoteQrUrl.value.split("data=");
        if (!parts[1]) return "";
        return decodeURIComponent(parts[1].split("&")[0]);
    } catch (e) {
        return "";
    }
});

const setUseLan = (v) => {
    useLanIp.value = !!v;
};

const loadLanIp = async () => {
    if (!process.client) return;
    try {
        const response = await fetch("/api/host");
        if (!response.ok) return;
        const data = await response.json();
        if (data?.lanIp) {
            lanIp.value = data.lanIp;
        }
    } catch (err) {
        console.warn("Could not load LAN IP for QR fallback", err);
    }
};

const createRemoteToken = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const toggleRemoteQrPanel = () => {
    showRemoteQrPanel.value = !showRemoteQrPanel.value;
};

const stopRemotePolling = () => {
    if (remotePolling.value) {
        clearInterval(remotePolling.value);
        remotePolling.value = null;
    }
};

const processRemoteCommand = (command) => {
    if (!command) return;
    if (command === "start" && state.value === "idle") {
        startSession();
        return;
    }
    if (command === "retake") {
        if (state.value !== "idle") {
            abortCountdown();
            abortRecording();
        }
        startSession();
        return;
    }
    if (command === "finish") {
        if (state.value === "countdown") {
            countdown.value = 1;
        }
        if (state.value === "recording") {
            recordTimer.value = 1;
        }
        return;
    }
};

const abortCountdown = () => {
    if (countInterval) {
        clearInterval(countInterval);
        countInterval = null;
    }
};

const abortRecording = () => {
    if (recInterval) {
        clearInterval(recInterval);
        recInterval = null;
    }
};

const startRemotePolling = () => {
    stopRemotePolling();
    if (!remoteToken.value) return;

    remotePolling.value = setInterval(async () => {
        try {
            const response = await $fetch(
                `/api/remote-control?token=${encodeURIComponent(
                    remoteToken.value,
                )}`,
                { method: "GET" },
            );
            if (response?.action) {
                processRemoteCommand(response.action);
            }
        } catch (err) {
            console.warn("Remote polling failed", err);
        }
    }, 1800);
};

// Note: Replace with your actual Laravel Herd domain
const API_URL = "http://localhost:8000/api";
const NODE_URL = "http://localhost:3001";

const startSession = async () => {
    try {
        stopRemotePolling();
        abortCountdown();
        abortRecording();
        state.value = "idle";
        errorMessage.value = "";

        // 1. Create session in Laravel
        const { data } = await $fetch(`${API_URL}/sessions`, {
            method: "POST",
            body: { mode: "video" },
        });

        currentSessionId = data.id;

        // 2. Start Countdown
        state.value = "countdown";
        countdown.value = 3;
        countInterval = setInterval(() => {
            countdown.value--;
            if (countdown.value === 0) {
                abortCountdown();
                startRecording();
            }
        }, 1000);
    } catch (err) {
        console.error(err);
        state.value = "error";
        errorMessage.value = "Failed to create session. Backend is down?";
    }
};

const startRecording = async () => {
    abortCountdown();
    state.value = "recording";
    recordTimer.value = 5; // Record for 5 seconds

    // 3. Tell Node.js to start recording
    try {
        // We don't await this immediately so the UI doesn't block
        $fetch(`${API_URL}/record-video`, {
            method: "POST",
            body: { session_id: currentSessionId, duration_seconds: 5 },
        }).catch((err) => {
            console.error("Camera service error", err);
        });

        // UI Timer for recording
        recInterval = setInterval(() => {
            recordTimer.value--;
            if (recordTimer.value === 0) {
                abortRecording();
                state.value = "processing";
                pollForCompletion();
            }
        }, 1000);
    } catch (err) {
        state.value = "error";
        errorMessage.value = "Failed to connect to Camera Service";
    }
};

// 4. Poll Laravel Backend to check if session is completed
const pollForCompletion = () => {
    const pollInterval = setInterval(async () => {
        try {
            const res = await $fetch(`${API_URL}/sessions/${currentSessionId}`);
            if (res.data.status === "completed") {
                clearInterval(pollInterval);
                // Navigate to Result Page
                router.push(`/result/${currentSessionId}`);
            }
        } catch (err) {
            console.error(err);
        }
    }, 2000); // Poll every 2 seconds
};

onMounted(() => {
    if (process.client) {
        origin.value = window.location.origin;
        remoteToken.value = createRemoteToken();
        loadLanIp();
        startRemotePolling();

        if (route.query.remoteStart === "1" && state.value === "idle") {
            startSession();
        }
    }
});
</script>
