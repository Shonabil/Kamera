<template>
  <div class="min-h-screen bg-[#070707] flex flex-col items-center justify-start py-8 px-4 md:px-8 relative overflow-x-hidden font-sans">
    
    <!-- Navigation Back Button -->
    <div class="fixed top-6 left-6 z-50">
      <NuxtLink to="/" class="group flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-[#fc4c02] backdrop-blur-xl rounded-full border border-white/10 hover:border-[#fc4c02] transition-all duration-300">
        <svg class="w-5 h-5 text-white transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span class="text-white font-medium">Kembali ke Home</span>
      </NuxtLink>
    </div>

    <!-- Premium Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#fc4c02]/5 rounded-full blur-[120px] animate-orb-1"></div>
      <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] animate-orb-2"></div>
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
    </div>

    <!-- Header Section -->
    <div class="z-10 w-full max-w-7xl text-center mt-12 mb-10 animate-fade-in-up">
      <div class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#fc4c02]/10 border border-[#fc4c02]/25 mb-6">
        <span class="text-3xl">🖼️</span>
        <span class="text-xs font-bold text-[#fc4c02] uppercase tracking-widest">Galeri Publik</span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
        Multi-Event <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#fc4c02] to-orange-500">Gallery</span>
      </h1>
      <p class="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
        Kumpulan momen keseruan dan senyuman berharga dari berbagai event MEDYA Photobooth!
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="z-10 flex flex-col items-center justify-center min-h-[50vh]">
      <div class="w-16 h-16 border-4 border-gray-800 border-t-[#fc4c02] rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500 text-sm">Memuat galeri foto...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredSessions.length === 0" class="z-10 text-center max-w-md mx-auto py-20 animate-fade-in-up">
      <div class="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="text-3xl">📸</span>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">Belum Ada Foto</h3>
      <p class="text-gray-500 text-sm mb-6">Belum ada strip foto publik atau diizinkan tayang untuk saat ini.</p>
      <NuxtLink to="/session" class="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#fc4c02] to-orange-600 text-white rounded-xl font-bold transition-all hover:scale-105">
        Mulai Foto Sekarang!
      </NuxtLink>
    </div>

    <!-- Main Content Panel -->
    <div v-else class="z-10 w-full max-w-7xl">
      
      <!-- Filter Bar -->
      <div class="mb-8 flex flex-wrap gap-3 justify-center items-center bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md max-w-xl mx-auto animate-fade-in-up" style="animation-delay: 0.1s;">
        <span class="text-xs text-gray-500 uppercase tracking-widest font-bold mr-2">Filter Event:</span>
        <button 
          @click="selectedEventFilter = 'ALL'"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all border uppercase tracking-wider"
          :class="selectedEventFilter === 'ALL' ? 'bg-[#fc4c02] border-[#fc4c02] text-white' : 'bg-white/5 border-transparent text-gray-300 hover:text-white'"
        >
          Semua Event
        </button>
        <button 
          v-for="event in uniqueEvents" 
          :key="event"
          @click="selectedEventFilter = event"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all border uppercase tracking-wider"
          :class="selectedEventFilter === event ? 'bg-[#fc4c02] border-[#fc4c02] text-white' : 'bg-white/5 border-transparent text-gray-300 hover:text-white'"
        >
          {{ event }}
        </button>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up" style="animation-delay: 0.2s;">
        
        <div 
          v-for="item in filteredSessions" 
          :key="item.id"
          @click="openShowcase(item)"
          class="group relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-[#fc4c02]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#fc4c02]/20 hover:-translate-y-1"
        >
          <!-- Frame Wrapper -->
          <div class="aspect-[1/3] p-4 flex items-center justify-center">
            <img :src="item.urls.strip" alt="Photo Strip" class="max-h-full w-auto object-contain rounded-lg shadow-lg group-hover:scale-[1.03] transition-transform duration-500" />
          </div>

          <!-- Hover Overlay Details -->
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-[9px] font-bold text-[#fc4c02] uppercase tracking-wider block mb-0.5">
              {{ item.meta?.eventName || 'MEDYA Photobooth' }}
            </span>
            <span class="text-white font-extrabold text-sm block truncate">
              Sesi {{ item.session_code }}
            </span>
            <span class="text-gray-500 text-[10px] block mt-1">
              {{ formatDate(item.completed_at) }}
            </span>
          </div>

          <!-- Date badge on default view -->
          <div class="absolute top-3 right-3 bg-[#070707]/60 backdrop-blur-md px-2 py-0.5 border border-white/10 rounded text-[9px] text-gray-400 font-mono group-hover:opacity-0 transition-opacity">
            {{ formatDateShort(item.completed_at) }}
          </div>
        </div>

      </div>

    </div>

    <!-- Teleport Modal: Premium Showcase and Downloads -->
    <Teleport to="body">
      <div v-if="showcase.show" class="fixed inset-0 z-[100] bg-[#070707]/95 backdrop-blur-md flex items-center justify-center p-4" @click.self="closeShowcase">
        
        <!-- Close Button -->
        <button @click="closeShowcase" class="absolute top-5 right-5 w-12 h-12 bg-white/5 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all hover:rotate-90 hover:scale-110">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <!-- Showcase Panel -->
        <div class="w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
          
          <!-- Left Column: Big Strip Display -->
          <div class="flex-1 flex items-center justify-center bg-[#070707]/40 p-4 rounded-2xl border border-white/5 h-[65vh]">
            <img :src="showcase.item.urls.strip" alt="Photo Strip" class="max-h-full w-auto object-contain rounded-xl shadow-2xl" />
          </div>

          <!-- Right Column: Interactive details -->
          <div class="w-full md:w-80 flex flex-col justify-between py-2 text-left">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#fc4c02]/10 border border-[#fc4c02]/25 rounded-full mb-4">
                <span class="w-2 h-2 bg-[#fc4c02] rounded-full animate-ping"></span>
                <span class="text-[9px] font-bold text-[#fc4c02] uppercase tracking-wider">Momen Terpilih</span>
              </div>
              
              <h3 class="text-2xl font-black text-white mb-1">
                Event {{ showcase.item.meta?.eventName || 'MEDYA Booth' }}
              </h3>
              <p class="text-xs text-gray-500 font-mono">Session Code: {{ showcase.item.session_code }}</p>
              
              <div class="w-full h-px bg-white/5 my-4"></div>

              <div class="space-y-4">
                <!-- Timestamp details -->
                <div>
                  <span class="text-[10px] text-gray-500 uppercase tracking-widest block">Tanggal Cetak</span>
                  <span class="text-white text-sm font-bold">{{ formatDate(showcase.item.completed_at) }}</span>
                </div>
                
                <!-- Applied Filter -->
                <div v-if="showcase.item.meta?.activeFilter">
                  <span class="text-[10px] text-gray-500 uppercase tracking-widest block">Filter Efek</span>
                  <span class="text-[#fc4c02] text-sm font-bold uppercase tracking-wider">
                    ✨ {{ showcase.item.meta.activeFilter }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Download Button in showcase -->
            <div class="mt-8 space-y-3">
              <a 
                :href="showcase.item.urls.strip" 
                download 
                class="w-full py-3.5 bg-gradient-to-r from-[#fc4c02] to-orange-600 text-white font-bold rounded-xl text-sm hover:scale-105 transition-all shadow-lg shadow-[#fc4c02]/20 flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>Unduh Strip Foto</span>
              </a>
              <NuxtLink 
                :to="`/result/${showcase.item.id}`" 
                class="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Lihat Halaman Sesi Lengkap</span>
                <span>➡️</span>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAsyncData } from '#imports'

const API_URL = 'http://photobooth.test/api'
const selectedEventFilter = ref('ALL')

// Showcase modal reactive
const showcase = ref({ show: false, item: null })

const { data: responseData, pending, error } = await useAsyncData('gallery-sessions', () => {
  return $fetch(`${API_URL}/sessions`)
})

// Parsed and clean session lists
const sessions = computed(() => {
  if (!responseData.value || !responseData.value.data) return []
  
  return responseData.value.data.map(session => {
    let urls = { strip: '', gif: '', video: '' }
    if (session.final_file) {
      try {
        urls = JSON.parse(session.final_file)
      } catch (e) {
        urls = { strip: session.final_file, gif: session.final_file, video: session.final_file }
      }
    }

    let meta = { eventName: 'MEDYA Photobooth', consent: true, activeFilter: 'original' }
    if (session.metadata) {
      try {
        meta = JSON.parse(session.metadata)
      } catch (e) {
        meta = { eventName: 'MEDYA Photobooth', consent: true, activeFilter: 'original' }
      }
    }

    return {
      ...session,
      urls,
      meta
    }
  }).filter(session => {
    // Only display completed sessions with valid files and publication consent
    return session.status === 'completed' && session.urls.strip && (session.meta.consent !== false)
  })
})

// Dynamic Event list grouping
const uniqueEvents = computed(() => {
  const list = new Set()
  sessions.value.forEach(s => {
    if (s.meta?.eventName) {
      list.add(s.meta.eventName.toUpperCase().trim())
    }
  })
  return Array.from(list)
})

// Filtered grid display
const filteredSessions = computed(() => {
  if (selectedEventFilter.value === 'ALL') return sessions.value
  
  return sessions.value.filter(s => {
    return s.meta?.eventName?.toUpperCase().trim() === selectedEventFilter.value
  })
})

// Date formating helpers
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatDateShort(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Showcase modal methods
function openShowcase(item) {
  showcase.value = { show: true, item }
}

function closeShowcase() {
  showcase.value = { show: false, item: null }
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

.animate-orb-1 {
  animation: orb-1 12s ease-in-out infinite;
}

.animate-orb-2 {
  animation: orb-2 10s ease-in-out infinite;
  animation-delay: -3s;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}
</style>