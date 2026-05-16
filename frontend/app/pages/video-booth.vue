<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
    <!-- Camera Preview Placeholder (In a real app, use getUserMedia to show feed) -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl border-4 border-gray-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
        <!-- Live Camera feed would go here via <video autoplay> -->
        <div v-if="state === 'idle'" class="text-gray-500 text-lg flex flex-col items-center">
          <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
          <p>Camera Ready</p>
        </div>

        <!-- Recording Indicator -->
        <div v-if="state === 'recording'" class="absolute top-6 right-6 flex items-center bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/30">
          <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
          <span class="text-red-500 font-mono font-bold tracking-widest">REC {{ recordTimer }}s</span>
        </div>

        <!-- Countdown Overlay -->
        <div v-if="state === 'countdown'" class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <h1 class="text-9xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-bounce">
            {{ countdown }}
          </h1>
        </div>

        <!-- Processing Overlay -->
        <div v-if="state === 'processing'" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30">
          <div class="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">Applying Magic...</h2>
          <p class="text-gray-400 mt-2">Processing your video</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute bottom-10 left-0 w-full flex justify-center z-40">
      <button 
        v-if="state === 'idle'" 
        @click="startSession"
        class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-pink-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 hover:bg-pink-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)]"
      >
        <span class="mr-2">Start Video Booth</span>
        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>

      <div v-if="state === 'error'" class="bg-red-500/20 text-red-400 px-6 py-3 rounded-lg backdrop-blur-md border border-red-500/30 flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        {{ errorMessage }}
        <button @click="state = 'idle'" class="ml-4 underline text-white">Retry</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'

const router = useRouter()
const state = ref('idle') // idle, countdown, recording, processing, error
const countdown = ref(3)
const recordTimer = ref(5)
const errorMessage = ref('')
let currentSessionId = null

// Note: Replace with your actual Laravel Herd domain
const API_URL = 'http://localhost:8000/api'
const NODE_URL = 'http://localhost:3001'

const startSession = async () => {
  try {
    state.value = 'idle'
    errorMessage.value = ''
    
    // 1. Create session in Laravel
    const { data } = await $fetch(`${API_URL}/sessions`, {
      method: 'POST',
      body: { mode: 'video' }
    })
    
    currentSessionId = data.id

    // 2. Start Countdown
    state.value = 'countdown'
    countdown.value = 3
    
    const countInterval = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(countInterval)
        startRecording()
      }
    }, 1000)

  } catch (err) {
    console.error(err)
    state.value = 'error'
    errorMessage.value = 'Failed to create session. Backend is down?'
  }
}

const startRecording = async () => {
  state.value = 'recording'
  recordTimer.value = 5 // Record for 5 seconds
  
  // 3. Tell Node.js to start recording
  try {
    // We don't await this immediately so the UI doesn't block
    $fetch(`${API_URL}/record-video`, {
      method: 'POST',
      body: { session_id: currentSessionId, duration_seconds: 5 }
    }).catch(err => {
        console.error("Camera service error", err)
    })

    // UI Timer for recording
    const recInterval = setInterval(() => {
      recordTimer.value--
      if (recordTimer.value === 0) {
        clearInterval(recInterval)
        state.value = 'processing'
        pollForCompletion()
      }
    }, 1000)

  } catch (err) {
    state.value = 'error'
    errorMessage.value = 'Failed to connect to Camera Service'
  }
}

// 4. Poll Laravel Backend to check if session is completed
const pollForCompletion = () => {
  const pollInterval = setInterval(async () => {
    try {
      const res = await $fetch(`${API_URL}/sessions/${currentSessionId}`)
      if (res.data.status === 'completed') {
        clearInterval(pollInterval)
        // Navigate to Result Page
        router.push(`/result/${currentSessionId}`)
      }
    } catch (err) {
      console.error(err)
    }
  }, 2000) // Poll every 2 seconds
}
</script>
