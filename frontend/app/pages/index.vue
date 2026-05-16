<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
    
    <!-- Premium Animated Background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-30%] left-[-15%] w-[80vw] h-[80vw] bg-gradient-to-br from-[#ff6b2c]/20 via-[#fc4c02]/15 to-transparent rounded-full blur-[150px] animate-pulse-slow"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tl from-[#ff8c42]/15 to-transparent rounded-full blur-[120px] animate-pulse-slow-delayed"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-radial from-[#fc4c02]/5 to-transparent rounded-full blur-[200px]"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.03]" 
           style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;">
      </div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 w-full px-6 py-5 md:px-12 flex items-center justify-between bg-black/30 backdrop-blur-xl border-b border-white/5">
      <div class="cursor-pointer group flex items-center gap-4" @click="scrollToTop">
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
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4 max-w-5xl mx-auto">
      
      <!-- Hero Badge -->
      <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 animate-fade-in-up">
        <div class="w-2 h-2 rounded-full bg-[#fc4c02] animate-ping"></div>
        <span class="text-sm font-semibold text-white/80 tracking-wider uppercase">Premium Experience</span>
      </div>
      
      <!-- Main Title -->
      <h1 class="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] animate-fade-in-up" style="animation-delay: 0.1s;">
        Abadikan <br/>
        <span class="relative">
          <span class="bg-gradient-to-r from-[#fc4c02] via-[#ff6b2c] to-[#fc4c02] bg-clip-text text-transparent">Momen Berharga</span>
          <svg class="absolute -bottom-2 left-0 w-full h-3 text-[#fc4c02] opacity-30" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path d="M0 8 Q 50 12, 100 8 T 200 8 L 200 12 L 0 12 Z" fill="currentColor"/>
          </svg>
        </span>
      </h1>
      
      <!-- Subtitle -->
      <p class="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s;">
        Satu kali klik, Dapatkan segalanya. Photo strip estetik, 
        animasi GIF unik, dan video keseruanmu — semua dalam satu sesi!
      </p>
      
      <!-- CTA Buttons -->
      <div class="animate-fade-in-up flex flex-col sm:flex-row gap-5" style="animation-delay: 0.3s;">
        <!-- Start Session Button -->
        <NuxtLink to="/session" class="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-500 bg-gradient-to-r from-[#fc4c02] to-[#ff6b2c] rounded-2xl overflow-hidden hover:scale-105 hover:shadow-[0_20px_60px_-10px_rgba(252,76,2,0.6)] focus:outline-none focus:ring-2 focus:ring-[#fc4c02] focus:ring-offset-2 focus:ring-offset-black">
          <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span class="relative z-10 flex items-center text-lg">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Mulai Sesi
            <svg class="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </NuxtLink>
        
        <!-- Gallery Button -->
        <NuxtLink to="/gallery" class="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-500 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] focus:outline-none backdrop-blur-sm">
          <span class="relative z-10 flex items-center text-lg">
            <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Lihat Gallery
            <svg class="w-5 h-5 ml-3 text-gray-500 group-hover:translate-x-1 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </NuxtLink>
      </div>

      <!-- Stats / Features -->
      <div class="mt-20 flex flex-wrap justify-center gap-12 animate-fade-in-up" style="animation-delay: 0.5s;">
        <div class="text-center">
          <div class="text-4xl font-black text-[#fc4c02] mb-1">4</div>
          <div class="text-sm text-gray-500 uppercase tracking-wider">Pose Photos</div>
        </div>
        <div class="w-px h-12 bg-white/10 hidden sm:block"></div>
        <div class="text-center">
          <div class="text-4xl font-black text-[#fc4c02] mb-1">GIF</div>
          <div class="text-sm text-gray-500 uppercase tracking-wider">Boomerang</div>
        </div>
        <div class="w-px h-12 bg-white/10 hidden sm:block"></div>
        <div class="text-center">
          <div class="text-4xl font-black text-[#fc4c02] mb-1">Video</div>
          <div class="text-sm text-gray-500 uppercase tracking-wider">Behind Scenes</div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-10 px-6 border-t border-white/5 bg-black/50">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-gray-500 text-sm">
          <span class="font-bold text-white">HiddenGem</span><span class="text-[#fc4c02]">Booth</span> © 2026 • Premium Photobooth Experience
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
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
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>