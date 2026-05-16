<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

    <div class="relative z-10 text-center max-w-3xl w-full">
      <h1 class="text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-sm">
        MEDYA Photobooth
      </h1>
      <p class="text-xl text-gray-300 mb-12 font-light">Capture your moment, make it eternal.</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Photo Booth Card -->
        <NuxtLink to="/photo-strip" class="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] shadow-xl ring-1 ring-blue-500/30 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors duration-500"></div>
          
          <div class="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <h2 class="text-2xl font-semibold mb-2 text-white">Photo Strip</h2>
          <p class="text-gray-300 text-sm">Classic 4-grid photos</p>
          <div class="mt-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <span class="text-blue-400 font-medium text-sm">Start Shooting &rarr;</span>
          </div>
        </NuxtLink>

        <!-- Video Booth Card -->
        <NuxtLink to="/video-booth" class="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.3)] shadow-xl ring-1 ring-pink-500/30 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl group-hover:bg-pink-500/30 transition-colors duration-500"></div>
          
          <div class="relative w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </div>
          <h2 class="text-2xl font-semibold mb-2 text-white">Video Booth</h2>
          <p class="text-gray-300 text-sm">Record a fun moment with overlay templates.</p>
          
          <div class="mt-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <span class="text-pink-400 font-medium text-sm">Start Recording &rarr;</span>
          </div>
        </NuxtLink>

        <!-- GIF Booth Card -->
        <NuxtLink to="/gif-booth" class="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] shadow-xl ring-1 ring-purple-500/30 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors duration-500"></div>
          
          <div class="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
          </div>
          <h2 class="text-2xl font-semibold mb-2 text-white">GIF Booth</h2>
          <p class="text-gray-300 text-sm">Moving fun in a loop</p>
          <div class="mt-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <span class="text-purple-400 font-medium text-sm">Create GIF &rarr;</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
