<template>
  <div class="min-h-screen bg-[#070707] flex flex-col items-center justify-start py-8 px-4 relative overflow-x-hidden font-sans">
    
    <!-- Premium Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#fc4c02]/5 rounded-full blur-[120px] animate-orb-1"></div>
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] animate-orb-2"></div>
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="z-10 flex flex-col items-center justify-center min-h-[70vh]">
      <div class="relative mb-8">
        <div class="w-20 h-20 border-4 border-gray-800 rounded-full"></div>
        <div class="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[#fc4c02] rounded-full animate-spin-fast"></div>
        <div class="absolute inset-2 rounded-full bg-[#070707] flex items-center justify-center">
          <div class="w-12 h-12 bg-gradient-to-br from-[#fc4c02] to-orange-600 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </div>
        </div>
      </div>
      <p class="text-gray-500 text-sm">Memuat...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="z-10 text-center max-w-md mx-auto mt-20">
      <div class="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
        <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h1 class="text-3xl font-black text-white mb-3">Oops!</h1>
      <p class="text-gray-400 mb-8">Sesi tidak ditemukan</p>
      <NuxtLink to="/" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fc4c02] to-orange-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
        Kembali ke Home
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <div v-else-if="parsedUrls" class="z-10 w-full max-w-2xl">
      
      <!-- Premium Header -->
      <div class="text-center mb-10 animate-fade-in-up">
        <div class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#fc4c02]/20 to-orange-600/20 border border-[#fc4c02]/30 mb-8">
          <svg class="w-4 h-4 text-[#fc4c02]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span class="text-sm font-semibold text-[#fc4c02] uppercase tracking-widest">{{ eventName }} • Download Center</span>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-black text-white mb-4">
          Pilih <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#fc4c02] to-orange-500">File</span>
        </h1>
        <p class="text-gray-400 text-lg">Pilih file yang ingin kamu download secara gratis</p>
      </div>

      <!-- File Options - Premium Cards -->
      <div class="space-y-4">
        
        <!-- Video -->
        <div class="group animate-fade-in-up" style="animation-delay: 0.1s;">
          <button @click="downloadFile(parsedUrls.video, 'photobooth-video.mp4')" class="w-full flex items-center gap-5 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-[#fc4c02] hover:bg-gray-800/60 transition-all duration-500 text-left group-hover:scale-[1.02]">
            <div class="w-16 h-16 bg-gradient-to-br from-[#fc4c02]/20 to-orange-600/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg class="w-8 h-8 text-[#fc4c02]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white group-hover:text-[#fc4c02] transition-colors">Behind The Scenes Video</h3>
              <p class="text-gray-500 text-sm mt-1">Video momen lengkap kamu</p>
            </div>
            <div class="w-14 h-14 bg-[#fc4c02]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
              <svg class="w-6 h-6 text-[#fc4c02]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </div>
          </button>
        </div>

        <!-- GIF -->
        <div class="group animate-fade-in-up" style="animation-delay: 0.2s;">
          <button @click="downloadFile(parsedUrls.gif, 'photobooth-gif.gif')" class="w-full flex items-center gap-5 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-[#fc4c02] hover:bg-gray-800/60 transition-all duration-500 text-left group-hover:scale-[1.02]">
            <div class="w-16 h-16 bg-gradient-to-br from-[#fc4c02]/20 to-orange-600/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg class="w-8 h-8 text-[#fc4c02]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white group-hover:text-[#fc4c02] transition-colors">Boomerang GIF</h3>
              <p class="text-gray-500 text-sm mt-1">Animasi bergerak yang bisa langsung share</p>
            </div>
            <div class="w-14 h-14 bg-[#fc4c02]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
              <svg class="w-6 h-6 text-[#fc4c02]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </div>
          </button>
        </div>

        <!-- Photo Strip -->
        <div class="group animate-fade-in-up" style="animation-delay: 0.3s;">
          <button @click="downloadFile(parsedUrls.strip, 'photobooth-strip.jpg')" class="w-full flex items-center gap-5 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-[#fc4c02] hover:bg-gray-800/60 transition-all duration-500 text-left group-hover:scale-[1.02]">
            <div class="w-16 h-16 bg-gradient-to-br from-[#fc4c02]/20 to-orange-600/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg class="w-8 h-8 text-[#fc4c02]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white group-hover:text-[#fc4c02] transition-colors">Photo Strip</h3>
              <p class="text-gray-500 text-sm mt-1">4 pose terbaik dalam satu strip</p>
            </div>
            <div class="w-14 h-14 bg-[#fc4c02]/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
              <svg class="w-6 h-6 text-[#fc4c02]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Back Link -->
      <div class="mt-10 text-center animate-fade-in-up" style="animation-delay: 0.4s;">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors px-5 py-3 rounded-full hover:bg-gray-900/50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path></svg>
          <span class="font-medium">Kembali</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'nuxt/app'

const eventName = ref('MEDYA Photobooth')

onMounted(() => {
  if (process.client) {
    const savedEvent = localStorage.getItem('booth_event_name')
    if (savedEvent) eventName.value = savedEvent
  }
})

const route = useRoute()
const sessionId = route.params.id
const API_URL = 'http://photobooth.test/api'

const { data: responseData, pending, error } = await useFetch(`${API_URL}/sessions/${sessionId}`)

const session = computed(() => responseData.value?.data)

const parsedUrls = computed(() => {
  if (!session.value || !session.value.final_file) return null
  try {
    return JSON.parse(session.value.final_file)
  } catch(e) {
    return { strip: session.value.final_file, gif: session.value.final_file, video: session.value.final_file }
  }
})

async function downloadFile(url, filename) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch (e) {
    console.error('Download failed:', e)
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
@keyframes orb-1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  50% { transform: translate(30px, -30px) scale(1.1); opacity: 0.7; }
}

@keyframes orb-2 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  50% { transform: translate(-20px, 20px) scale(1.05); opacity: 0.6; }
}

@keyframes spin-fast {
  to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-orb-1 {
  animation: orb-1 12s ease-in-out infinite;
}

.animate-orb-2 {
  animation: orb-2 10s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-spin-fast {
  animation: spin-fast 1s linear infinite;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>