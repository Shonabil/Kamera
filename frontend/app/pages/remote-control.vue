<template>
    <div
        class="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4"
    >
        <div
            class="w-full max-w-2xl rounded-4xl border border-slate-700 bg-slate-950/95 p-8 shadow-[0_0_80px_rgba(15,23,42,0.85)]"
        >
            <div class="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h1 class="text-3xl font-black uppercase tracking-[0.2em]">
                        Remote Control
                    </h1>
                    <p class="mt-2 text-sm text-slate-400">
                        Perangkat kontrol untuk booth foto jarak jauh.
                    </p>
                </div>
                <div
                    class="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-200"
                >
                    Token
                    <span class="font-black text-cyan-300">{{
                        token || "N/A"
                    }}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                    @click="sendCommand('start')"
                    :disabled="!token"
                    class="rounded-3xl bg-cyan-400 py-5 text-black font-black uppercase tracking-[0.15em] shadow-[0_0_30px_-10px_rgba(34,211,238,0.6)] hover:bg-cyan-300 transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Start
                </button>

                <button
                    @click="sendCommand('retake')"
                    :disabled="!token"
                    class="rounded-3xl bg-amber-400 py-5 text-black font-black uppercase tracking-[0.15em] shadow-[0_0_30px_-10px_rgba(251,191,36,0.4)] hover:bg-amber-300 transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Retake
                </button>

                <button
                    @click="sendCommand('finish')"
                    :disabled="!token"
                    class="rounded-3xl bg-pink-500 py-5 text-white font-black uppercase tracking-[0.15em] shadow-[0_0_30px_-10px_rgba(236,72,153,0.45)] hover:bg-pink-400 transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Finish
                </button>
            </div>

            <div
                class="rounded-3xl border border-slate-700 bg-slate-900/80 p-5"
            >
                <p class="text-slate-400 text-sm mb-4">
                    Tekan tombol untuk mengirim perintah ke booth. Pastikan
                    token cocok dengan QR yang dipasang di panel.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <p
                            class="text-xs uppercase tracking-[0.3em] text-slate-500"
                        >
                            URL Remote
                        </p>
                        <p class="text-sm text-slate-200 break-all">
                            {{ remotePageUrl }}
                        </p>
                    </div>
                    <div class="space-y-2">
                        <p
                            class="text-xs uppercase tracking-[0.3em] text-slate-500"
                        >
                            Status
                        </p>
                        <p class="text-sm text-slate-200">
                            {{ statusMessage }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "nuxt/app";

const route = useRoute();
const token = ref("");
const statusMessage = ref("Ready to control the booth.");
const remotePageUrl = ref("");

watch(
    () => route.query.token,
    (value) => {
        token.value = Array.isArray(value) ? value[0] : value || "";
        if (process.client && token.value) {
            remotePageUrl.value = `${window.location.origin}/remote-control?token=${token.value}`;
        }
    },
    { immediate: true },
);

onMounted(() => {
    if (process.client && token.value) {
        remotePageUrl.value = `${window.location.origin}/remote-control?token=${token.value}`;
    }
});

const sendCommand = async (action) => {
    if (!token.value) return;
    try {
        const response = await $fetch(
            `/api/remote-control?token=${encodeURIComponent(token.value)}&action=${action}`,
            { method: "POST" },
        );
        if (response.success) {
            statusMessage.value = `Command '${action}' sent.`;
        } else {
            statusMessage.value = response.message || "Failed to send command.";
        }
    } catch (err) {
        console.error(err);
        statusMessage.value = "Could not send command. Try again.";
    }
};
</script>
