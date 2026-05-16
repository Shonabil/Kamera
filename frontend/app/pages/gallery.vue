<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
    
    <!-- Premium Background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-br from-[#fc4c02]/15 via-[#ff6b2c]/10 to-transparent rounded-full blur-[120px] animate-pulse-slow"></div>
      <div class="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tl from-[#ff8c42]/10 to-transparent rounded-full blur-[100px] animate-pulse-slow-delayed"></div>
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <!-- Header -->
    <nav class="relative z-50 w-full px-6 py-5 md:px-12 flex items-center justify-between bg-black/30 backdrop-blur-xl border-b border-white/5">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="cursor-pointer group flex items-center gap-3">
          <div class="relative">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fc4c02] to-[#ff6b2c] flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(252,76,2,0.5)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7.2 6.4c-.6-.5-1.5-.4-2 .2-.4.5-.4 1.2-.1 1.7l2.1 2.7-1 3.1.5.8c.6.4 1.5.3 2-.2l2.8-4.4c.3-.5.3-1.2-.1-1.6l-.4-.3c-.7-.5-1.5-.4-2 .2l-1.4 1.7 1.9 1.5 3.6-5.8-1.2-1.9-3.7 4.9-.2.3zM19.5 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fc4c02] to-[#ff6b2c] blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </div>
          <div class="flex items-baseline">
            <span class="text-2xl font-black tracking-tight text-white">HiddenGem</span>
            <span class="text-2xl font-black tracking-tight text-[#fc4c02]">Booth</span>
          </div>
        </NuxtLink>
        
        <!-- Back Button -->
        <NuxtLink to="/" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali
        </NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="relative z-10 py-16 px-4 max-w-7xl mx-auto">
      
      <!-- Page Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <div class="w-2 h-2 rounded-full bg-[#fc4c02] animate-ping"></div>
          <span class="text-sm font-semibold text-white/80 uppercase tracking-wider">Gallery</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-4">
          Koleksi <span class="bg-gradient-to-r from-[#fc4c02] to-[#ff6b2c] bg-clip-text text-transparent">Momen</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-xl mx-auto">Setiap momen berharga yang telah diabadikan dalam sesi photo booth</p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-20">
        <div class="w-16 h-16 border-4 border-white/10 border-t-[#fc4c02] rounded-full animate-spin"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!galleryData || galleryData.data.length === 0" class="text-center py-20">
        <div class="w-28 h-28 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
          <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <p class="text-2xl font-bold text-white mb-3">Belum Ada Momen</p>
        <p class="text-gray-500 mb-10">Ayo abadikan momen pertamamu sekarang!</p>
        <NuxtLink to="/session" class="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#fc4c02] to-[#ff6b2c] hover:scale-105 text-white rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(252,76,2,0.5)]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Mulai Sesi Pertama
        </NuxtLink>
      </div>

      <!-- Gallery Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="(session, index) in galleryData.data" :key="session.id" 
             class="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#fc4c02]/50 hover:bg-white/10 transition-all duration-500 animate-fade-in-up"
             :style="{ animationDelay: `${index * 0.05}s` }"
             @click="viewSession(session.id)">
          <!-- Thumbnail -->
          <div class="aspect-square bg-white/5 overflow-hidden">
            <img v-if="getThumbnail(session)" :src="getThumbnail(session)" alt="Session" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
          </div>
          
          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
            <div class="text-white">
              <p class="font-medium">{{ formatDate(session.completed_at) }}</p>
              <p class="text-xs text-gray-400 capitalize">{{ session.mode }}</p>
            </div>
          </div>
          
          <!-- Play Icon for Video -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
            <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-10 px-6 border-t border-white/5 bg-black/50">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-gray-500 text-sm">
          <span class="font-bold text-white">HiddenGem</span><span class="text-[#fc4c02]">Booth</span> © 2026
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const API_URL = 'http://photobooth.test/api'

const { data: galleryData, pending } = await useFetch(`${API_URL}/sessions`)

function viewSession(id) {
  router.push(`/result/${id}`)
}

function getThumbnail(session) {
  if (!session.final_file) return null
  try {
    const urls = JSON.parse(session.final_file)
    return urls.strip || urls.gif || urls.video
  } catch {
    return session.final_file
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<style>
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animate-pulse-slow-delayed {
  animation: pulse-slow 10s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>