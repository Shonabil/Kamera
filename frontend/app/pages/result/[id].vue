<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-start py-6 md:py-10 px-3 md:px-5 relative overflow-x-hidden font-sans">
    
    <!-- Premium Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <!-- Base gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      
      <!-- Animated orbs -->
      <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#fc4c02]/5 rounded-full blur-[150px] animate-orb-1"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] animate-orb-2"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fc4c02]/3 rounded-full blur-[180px] animate-orb-3"></div>
      
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
      
      <!-- Noise overlay -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>
    </div>

    <!-- Loading State - Premium -->
    <div v-if="pending" class="z-10 flex flex-col items-center justify-center min-h-[80vh]">
      <div class="relative mb-10">
        <div class="w-28 h-28 rounded-full bg-gray-900 border border-gray-800"></div>
        <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-[#fc4c02] animate-spin-fast"></div>
        <div class="absolute inset-2 rounded-full bg-black flex items-center justify-center">
          <div class="w-16 h-16 bg-gradient-to-br from-[#fc4c02] to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-[#fc4c02]/30">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
          </div>
        </div>
      </div>
      <div class="text-center">
        <p class="text-white text-xl font-semibold mb-2">Memuat Momenmu</p>
        <p class="text-gray-500 text-sm">Tunggu sebentar...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="session && parsedUrls" class="z-10 w-full max-w-7xl">
      
      <!-- Premium Header -->
      <div class="text-center mb-10 animate-fade-in-up">
        <!-- Success Badge -->
        <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#fc4c02]/20 to-orange-600/20 border border-[#fc4c02]/30 mb-8">
          <div class="w-2.5 h-2.5 bg-[#fc4c02] rounded-full animate-pulse"></div>
          <span class="text-sm font-semibold text-[#fc4c02] uppercase tracking-widest">Sesi Selesai</span>
        </div>
        
        <!-- Main Title -->
        <h1 class="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
          Momen<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#fc4c02] to-orange-500">Mu</span>
          <span class="inline-block ml-2">✨</span>
        </h1>
        
        <!-- Subtitle -->
        <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Momen terbaikmu telah tersimpan. Klik untuk melihat lebih detail • Download semua file • Cetak langsung
        </p>
      </div>

      <!-- Media Showcase - Premium Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">
        
        <!-- Video Section - Large -->
        <div class="lg:col-span-7 animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="group relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 hover:border-[#fc4c02]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#fc4c02]/10">
            <!-- Video Badge -->
            <div class="absolute top-4 left-4 z-20">
              <div class="flex items-center gap-2.5 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-lg">
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-bold text-white uppercase tracking-wider">Video</span>
              </div>
            </div>
            
            <!-- Video Player -->
            <div class="relative cursor-pointer group/video" @click="openPreview('video', parsedUrls.video)">
              <video :src="parsedUrls.video" controls class="w-full aspect-[16/9] object-cover" preload="metadata"></video>
              
              <!-- Hover Effect Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-all duration-500 pointer-events-none"></div>
              
              <!-- Expand Icon -->
              <div class="absolute bottom-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center opacity-0 group-hover/video:opacity-100 scale-75 group-hover/video:scale-100 transition-all duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-5 flex flex-col gap-5">
          
          <!-- GIF Card -->
          <div class="flex-1 animate-fade-in-up" style="animation-delay: 0.2s;">
            <div class="group relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 hover:border-[#fc4c02]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#fc4c02]/5 h-full min-h-[220px]">
              <!-- Badge -->
              <div class="absolute top-4 left-4 z-20">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
                  <span class="text-xs font-bold text-[#fc4c02] uppercase tracking-wider">GIF</span>
                </div>
              </div>
              
              <!-- Image -->
              <div class="cursor-pointer h-full flex items-center justify-center p-5" @click="openPreview('image', parsedUrls.gif)">
                <img :src="parsedUrls.gif" alt="GIF" class="max-h-[200px] w-auto object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          <!-- Photo Strip Card -->
          <div class="flex-1 animate-fade-in-up" style="animation-delay: 0.3s;">
            <div class="group relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 hover:border-[#fc4c02]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#fc4c02]/5 h-full min-h-[280px]">
              <!-- Badge -->
              <div class="absolute top-4 left-4 z-20">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
                  <svg class="w-3.5 h-3.5 text-[#fc4c02]" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>
                  <span class="text-xs font-bold text-[#fc4c02] uppercase tracking-wider">Photo Strip</span>
                </div>
              </div>
              
              <!-- Image -->
              <div class="cursor-pointer h-full flex items-center justify-center p-5 pt-12" @click="openPreview('image', parsedUrls.strip)">
                <img :src="parsedUrls.strip" alt="Photo Strip" class="max-h-[180px] w-auto object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <!-- Print Button -->
              <div class="absolute bottom-4 left-4 right-4">
                <button @click.stop="printMedia(parsedUrls.strip)" class="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-gray-800/90 to-gray-900/90 hover:from-[#fc4c02] hover:to-orange-600 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-xl border border-white/10 hover:border-[#fc4c02]/50 hover:shadow-lg hover:shadow-[#fc4c02]/20 group/print">
                  <svg class="w-5 h-5 group-hover/print:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                  <span>Cetak Photo Strip</span>
                  <svg class="w-4 h-4 opacity-0 group-hover/print:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Download & QR Section - Premium Card -->
      <div class="animate-fade-in-up" style="animation-delay: 0.4s;">
        <div class="bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/50 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-gray-800/30 shadow-2xl">
          <div class="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
            
            <!-- QR Section -->
            <div class="flex flex-col items-center order-2 lg:order-1">
              <p class="text-gray-500 text-sm mb-5 uppercase tracking-widest">Scan untuk Download</p>
              <div class="relative group cursor-pointer" @click="openPreview('image', qrCodeUrl)">
                <div class="absolute -inset-4 bg-gradient-to-r from-[#fc4c02] to-orange-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
                <div class="relative bg-white p-5 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                  <img :src="qrCodeImageUrl" alt="QR Code" class="w-40 h-40 rounded-xl" />
                </div>
              </div>
              <p class="text-gray-600 text-xs mt-4">Arahkan kamera ke QR ini</p>
            </div>

            <!-- Divider -->
            <div class="hidden lg:block w-px h-40 bg-gradient-to-b from-transparent via-gray-700 to-transparent order-3"></div>

            <!-- Download Button -->
            <div class="flex flex-col items-center order-1 lg:order-2">
              <p class="text-gray-500 text-sm mb-5 uppercase tracking-widest">Atau Klik</p>
              <NuxtLink :to="downloadAllUrl" class="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#fc4c02] via-[#ff6b2c] to-orange-600 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-[#fc4c02]/40 focus:outline-none focus:ring-2 focus:ring-[#fc4c02] focus:ring-offset-2 focus:ring-offset-black focus:ring-offset-4">
                <!-- Animated shine effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span class="relative z-10 flex items-center text-lg">
                  <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download Semua File
                </span>
              </NuxtLink>
              <p class="text-gray-600 text-xs mt-4">Video • GIF • Photo Strip</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-10 text-center animate-fade-in-up" style="animation-delay: 0.5s;">
        <NuxtLink to="/" class="inline-flex items-center gap-3 text-gray-500 hover:text-white transition-colors group px-6 py-3 rounded-full hover:bg-gray-900/50">
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path></svg>
          <span class="font-medium">Mulai Sesi Baru</span>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-else class="z-10 text-center max-w-md mx-auto mt-20">
      <div class="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
        <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h2 class="text-3xl font-black text-white mb-3">Oops!</h2>
      <p class="text-gray-400 mb-8">Sesi yang kamu cari tidak ditemukan</p>
      <NuxtLink to="/" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fc4c02] to-orange-600 hover:from-orange-600 hover:to-[#fc4c02] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
        Kembali ke Home
      </NuxtLink>
    </div>

    <!-- Premium Fullscreen Preview Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="preview.show" class="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-8" @click.self="closePreview">
          <!-- Close Button -->
          <button @click="closePreview" class="absolute top-5 right-5 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:rotate-90 hover:scale-110 z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <!-- Content -->
          <div class="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center">
            <Transition name="content" mode="out-in">
              <img v-if="preview.type === 'image'" :src="preview.url" class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl shadow-black/50" :key="'img-' + preview.url" />
              <video v-else-if="preview.type === 'video'" :src="preview.url" controls autoplay class="max-w-full max-h-[85vh] rounded-2xl shadow-2xl shadow-black/50" :key="'vid-' + preview.url"></video>
            </Transition>
          </div>

          <!-- Hint -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            <kbd class="px-2 py-1 bg-white/10 rounded text-xs text-white/70">Esc</kbd>
            <span class="text-white/70 text-sm">untuk menutup</span>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Print Frame -->
    <div id="print-frame" style="display: none;">
      <img id="print-image" style="max-width: 100%; max-height: 100%;" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'nuxt/app'
import { useAsyncData } from '#imports'

const route = useRoute()
const sessionId = route.params.id
const API_URL = 'http://photobooth.test/api'
const preview = ref({ show: false, type: '', url: '' })

const { data: responseData, pending, error } = await useAsyncData(`session-${sessionId}`, () => {
  return $fetch(`${API_URL}/sessions/${sessionId}`)
})

const session = computed(() => responseData.value?.data)
const parsedUrls = computed(() => {
  if (!session.value || !session.value.final_file) return null
  try {
    return JSON.parse(session.value.final_file)
  } catch(e) {
    return { strip: session.value.final_file, gif: session.value.final_file, video: session.value.final_file }
  }
})

const downloadAllUrl = computed(() => {
  if (!session.value) return '#'
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  return `${baseUrl}/download-all/${session.value.id}`
})

const qrCodeImageUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(downloadAllUrl.value)}&bgcolor=ffffff&color=000000`
})

const qrCodeUrl = computed(() => downloadAllUrl.value)

function openPreview(type, url) {
  preview.value = { show: true, type, url }
}

function closePreview() {
  preview.value = { show: false, type: '', url: '' }
}

function handleKeydown(e) {
  if (e.key === 'Escape' && preview.value.show) {
    closePreview()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function printMedia(url) {
  const printFrame = document.getElementById('print-frame')
  const printImage = document.getElementById('print-image')
  printImage.src = url
  printFrame.style.display = 'block'
  
  // Add print class to body for print-specific styles
  document.body.classList.add('printing')
  
  setTimeout(() => {
    window.print()
    printFrame.style.display = 'none'
    document.body.classList.remove('printing')
  }, 500)
}
</script>

<style scoped>
/* Premium Orb Animations */
@keyframes orb-1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  50% { transform: translate(30px, -30px) scale(1.1); opacity: 0.7; }
}

@keyframes orb-2 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  50% { transform: translate(-20px, 20px) scale(1.05); opacity: 0.6; }
}

@keyframes orb-3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
}

.animate-orb-1 {
  animation: orb-1 12s ease-in-out infinite;
}

.animate-orb-2 {
  animation: orb-2 10s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-orb-3 {
  animation: orb-3 15s ease-in-out infinite;
  animation-delay: -5s;
}

/* Spin Animation */
@keyframes spin-fast {
  to { transform: rotate(360deg); }
}

.animate-spin-fast {
  animation: spin-fast 1s linear infinite;
}

/* Fade In Up */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.content-enter-active,
.content-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.content-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.content-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Print Styles - Only show photo strip */
@media print {
  body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  body.printing > *:not(#print-frame) {
    display: none !important;
  }
  
  #print-frame {
    display: flex !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background: white !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  #print-image {
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain !important;
  }
}
</style>