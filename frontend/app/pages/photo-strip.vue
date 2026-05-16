<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
    
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl border-4 border-gray-800 shadow-2xl relative overflow-hidden flex items-center justify-center">
        
        <div v-if="state === 'idle'" class="text-gray-500 text-lg flex flex-col items-center">
          <svg class="w-16 h-16 mb-4 opacity-50 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
          <p>Get ready for 4 poses!</p>
        </div>

        <!-- Flash Effect -->
        <div v-if="flash" class="absolute inset-0 bg-white z-50 transition-opacity duration-100" :class="flash ? 'opacity-100' : 'opacity-0'"></div>

        <!-- Pose Counter -->
        <div v-if="state === 'capturing'" class="absolute top-6 left-6 flex space-x-2">
          <div v-for="i in 4" :key="i" class="w-4 h-4 rounded-full border-2 border-white" :class="currentPose >= i ? 'bg-blue-500 border-blue-500' : 'bg-transparent'"></div>
        </div>

        <!-- Countdown Overlay -->
        <div v-if="state === 'capturing'" class="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1 class="text-9xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" :key="countdown">
            {{ countdown }}
          </h1>
          <p class="text-2xl mt-4 font-bold text-blue-300 drop-shadow-md">Pose {{ currentPose }} of 4</p>
        </div>

        <!-- Processing Overlay -->
        <div v-if="state === 'processing'" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30">
          <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Printing Strip...</h2>
          <p class="text-gray-400 mt-2">Merging your photos</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute bottom-10 left-0 w-full flex justify-center z-40">
      <button 
        v-if="state === 'idle'" 
        @click="startSession"
        class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
      >
        <span class="mr-2">Start Photo Strip</span>
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
const state = ref('idle') // idle, capturing, processing, error
const countdown = ref(5)
const currentPose = ref(1)
const flash = ref(false)
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
      body: { mode: 'photo' }
    })
    
    currentSessionId = data.id

    // 2. Tell Backend to start the automated 4-shot sequence
    $fetch(`${API_URL}/record-photo-strip`, {
      method: 'POST',
      body: { session_id: currentSessionId, interval: 5, poses: 4 }
    }).catch(err => console.error("Camera service error", err))

    // 3. Start local synchronized countdown UI
    state.value = 'capturing'
    currentPose.value = 1
    countdown.value = 5
    runPoseCycle()

  } catch (err) {
    console.error(err)
    state.value = 'error'
    errorMessage.value = 'Failed to create session.'
  }
}

const runPoseCycle = () => {
  const interval = setInterval(() => {
    countdown.value--
    
    if (countdown.value === 0) {
      clearInterval(interval)
      
      // Trigger flash UI
      flash.value = true
      setTimeout(() => { flash.value = false }, 150)

      if (currentPose.value < 4) {
        currentPose.value++
        countdown.value = 5
        runPoseCycle()
      } else {
        state.value = 'processing'
        pollForCompletion()
      }
    }
  }, 1000)
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
