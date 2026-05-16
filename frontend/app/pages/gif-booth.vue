<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
    
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl border-4 border-gray-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
        
        <div v-if="state === 'idle'" class="text-gray-500 text-lg flex flex-col items-center">
          <svg class="w-16 h-16 mb-4 opacity-50 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
          <p>Ready to make some moves!</p>
        </div>

        <!-- Recording Indicator -->
        <div v-if="state === 'recording'" class="absolute top-6 right-6 flex items-center bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30">
          <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse mr-2"></div>
          <span class="text-purple-400 font-mono font-bold tracking-widest">BURST {{ recordTimer }}s</span>
        </div>

        <!-- Countdown Overlay -->
        <div v-if="state === 'countdown'" class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <h1 class="text-9xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-ping">
            {{ countdown }}
          </h1>
        </div>

        <!-- Processing Overlay -->
        <div v-if="state === 'processing'" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30">
          <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Looping Frames...</h2>
          <p class="text-gray-400 mt-2">Generating GIF</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute bottom-10 left-0 w-full flex justify-center z-40">
      <button 
        v-if="state === 'idle'" 
        @click="startSession"
        class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-purple-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 hover:bg-purple-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]"
      >
        <span class="mr-2">Start GIF Booth</span>
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
const recordTimer = ref(2)
const errorMessage = ref('')
let currentSessionId = null

const API_URL = 'http://localhost:8000/api'
const NODE_URL = 'http://localhost:3001'

const startSession = async () => {
  try {
    state.value = 'idle'
    errorMessage.value = ''
    
    // 1. Create session in Laravel
    const { data } = await $fetch(`${API_URL}/sessions`, {
      method: 'POST',
      body: { mode: 'gif' }
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
    errorMessage.value = 'Failed to create session.'
  }
}

const startRecording = async () => {
  state.value = 'recording'
  recordTimer.value = 2 // GIF duration is 2 seconds
  
  try {
    $fetch(`${API_URL}/record-gif`, {
      method: 'POST',
      body: { session_id: currentSessionId, duration_seconds: 2 }
    }).catch(err => console.error("Camera service error", err))

    // UI Timer
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

const pollForCompletion = () => {
  const pollInterval = setInterval(async () => {
    try {
      const res = await $fetch(`${API_URL}/sessions/${currentSessionId}`)
      if (res.data.status === 'completed') {
        clearInterval(pollInterval)
        router.push(`/result/${currentSessionId}`)
      }
    } catch (err) {
      console.error(err)
    }
  }, 2000)
}
</script>
