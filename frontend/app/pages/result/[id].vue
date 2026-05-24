<template>
  <div class="min-h-screen h-screen max-h-screen overflow-hidden flex flex-col justify-between p-4 md:p-6 select-none bg-[#f8f9fa] text-black font-sans relative">
    
    <!-- Timeout Indicator Bar -->
    <div class="absolute top-0 left-0 w-full h-2 bg-black z-50">
      <div 
        class="h-full bg-[#fc4c02] transition-all duration-1000"
        :style="{ width: `${(timeoutSeconds / 60) * 100}%` }"
      ></div>
    </div>

    <!-- High-Octane Creative Studio Dot Grid Backdrop -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f9fa]">
      <div class="absolute inset-0 opacity-[0.08]" style="background-image: radial-gradient(#000 1.5px, transparent 1.5px); background-size: 24px 24px;"></div>
    </div>

    <!-- Active Telemetry Header Bar -->
    <header class="relative z-50 w-full flex items-center justify-between bg-white border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_#fc4c02]">
      <div class="flex items-center gap-3">
        <!-- Slanted navigation button -->
        <NuxtLink to="/" class="w-11 h-9 bg-[#fc4c02] border-2 border-black flex items-center justify-center transform -skew-x-12 cursor-pointer shadow-[2px_2px_0px_#d8ff00] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#d8ff00] active:translate-x-[1px] active:translate-y-[1px] transition-all">
          <i class="fa-solid fa-arrow-left text-black transform skew-x-12 text-sm"></i>
        </NuxtLink>
        <div class="text-left">
          <span class="text-[10px] font-black uppercase tracking-[0.25em] text-[#fc4c02] block leading-none">HIDDENGEM BOOTH</span>
          <h2 class="text-lg md:text-xl font-black text-black uppercase italic mt-1 tracking-wider leading-none">CREATIVE FINISH LINE</h2>
        </div>
      </div>

      <!-- Right controls: Multi-Language Switcher -->
      <div class="flex bg-white border-2 border-black p-1 gap-1">
        <button 
          @click="lang = 'id'" 
          class="px-2.5 py-1 text-[10px] font-black rounded transition-all flex items-center gap-1"
          :class="lang === 'id' ? 'bg-[#fc4c02] text-black border border-black shadow-[1px_1px_0px_#000]' : 'text-gray-500 hover:text-black'"
        >
          <span>🇮🇩</span><span>ID</span>
        </button>
        <button 
          @click="lang = 'en'" 
          class="px-2.5 py-1 text-[10px] font-black rounded transition-all flex items-center gap-1"
          :class="lang === 'en' ? 'bg-[#fc4c02] text-black border border-black shadow-[1px_1px_0px_#000]' : 'text-gray-500 hover:text-black'"
        >
          <span>🇬🇧</span><span>EN</span>
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="z-10 flex flex-col items-center justify-center min-h-[70vh]">
      <div class="w-16 h-16 border-8 border-black border-t-[#fc4c02] animate-spin mb-6"></div>
      <p class="text-black text-lg font-black uppercase tracking-widest italic animate-pulse">Loading Studio Run...</p>
    </div>

    <!-- Main Content Workspace -->
    <div v-else-if="session && parsedUrls" class="z-10 flex-1 grid grid-cols-12 gap-6 min-h-0 overflow-hidden mb-4">
      
      <!-- LEFT COLUMN: Run replay video & photos podium grid (60% Width) -->
      <div class="col-span-7 flex flex-col gap-4 overflow-hidden h-full min-h-0">
        <!-- Run Replay Behind-The-Scenes video card (White base) -->
        <div class="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000] relative overflow-hidden flex-1 flex flex-col min-h-0 justify-between">
          <div class="flex items-center justify-between border-b-2 border-black pb-3 mb-3 text-left">
            <div>
              <span class="text-[10px] font-black text-[#fc4c02] uppercase tracking-[0.2em] leading-none">STUDIO SESSION 1</span>
              <h3 class="text-base font-black text-black uppercase italic mt-1 leading-none">BEHIND-THE-SCENES TIMELAPSE</h3>
            </div>
            <span class="text-[10px] bg-red-600 text-white border border-black font-black px-2 py-0.5 rounded-none uppercase tracking-wider leading-none">HD SESSION REPLAY</span>
          </div>

          <div class="relative overflow-hidden border-2 border-black bg-black flex items-center justify-center shadow-[2px_2px_0px_#fc4c02] flex-1 min-h-0">
            <div class="absolute inset-0 opacity-[0.04] pointer-events-none z-10" style="background-image: radial-gradient(#fff 1.5px, transparent 1.5px); background-size: 20px 20px;"></div>
            <video :src="parsedUrls.video" controls class="w-full h-full object-contain relative z-0" preload="metadata"></video>
          </div>
        </div>

        <!-- Championship Podium cards list (Photo Strip & Boomerang GIF) -->
        <div class="grid grid-cols-2 gap-4 h-[210px] min-h-0">
          <!-- GIF Card -->
          <div class="bg-white border-4 border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000] overflow-hidden min-h-0 h-full">
            <div class="flex items-center justify-between mb-2 text-left leading-none">
              <span class="text-[10px] font-black text-[#fc4c02] uppercase tracking-widest leading-none">BOOMERANG GIF</span>
              <i class="fa-solid fa-video text-sm text-black"></i>
            </div>
            
            <div class="cursor-pointer bg-neutral-100 border-2 border-black p-2 flex items-center justify-center shadow-[2px_2px_0px_#ff007f] flex-1 min-h-0 overflow-hidden" @click="openPreview('image', parsedUrls.gif)">
              <img :src="parsedUrls.gif" alt="GIF Boomerang" class="max-h-full max-w-full object-contain rounded" />
            </div>
          </div>

          <!-- Photo Strip Card -->
          <div class="bg-white border-4 border-black p-4 flex flex-col justify-between shadow-[4px_4px_0px_#000] overflow-hidden min-h-0 h-full">
            <div class="flex items-center justify-between mb-2 text-left leading-none">
              <span class="text-[10px] font-black text-[#fc4c02] uppercase tracking-widest leading-none">PRINT STRIP</span>
              <i class="fa-solid fa-images text-sm text-black"></i>
            </div>
            
            <div class="cursor-pointer bg-neutral-100 border-2 border-black p-2 flex items-center justify-center shadow-[2px_2px_0px_#00ff66] flex-1 min-h-0 overflow-hidden" @click="openPreview('image', parsedUrls.strip)">
              <img :src="parsedUrls.strip" alt="Photo Strip" class="max-h-full max-w-full object-contain rounded" />
            </div>

            <!-- Print Trigger Button -->
            <button @click.stop="openPrintConfig" class="w-full mt-3 py-2.5 bg-[#fc4c02] text-black border-2 border-black font-black rounded-none text-[10px] transition-all uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]">
              <span>Cetak Strip Fisik</span> <i class="fa-solid fa-print"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Standing Podium Leaderboard & Sharing -->
      <div class="col-span-5 bg-white border-4 border-black p-6 flex flex-col justify-between shadow-[6px_6px_0px_#fc4c02] relative overflow-hidden h-full min-h-0">
        
        <div class="overflow-y-auto pr-1 space-y-4 scrollbar-thin flex-1 min-h-0">
          <div class="flex items-center justify-between border-b-2 border-black pb-3 mb-4 text-left leading-none">
            <div>
              <span class="text-[10px] font-black text-[#fc4c02] uppercase tracking-widest mb-0.5 leading-none">HIDDENGEM STUDIO</span>
              <h3 class="text-lg font-black text-black uppercase italic mt-1 leading-none">FINISH ENGINE</h3>
            </div>
            <i class="fa-solid fa-bolt text-2xl text-black"></i>
          </div>

          <!-- QR code section display -->
          <div class="flex flex-col items-center justify-center bg-neutral-50 border-2 border-black p-3.5 rounded-none relative overflow-hidden text-center shadow-[3px_3px_0px_#00f0ff]">
            <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(#000 1.5px, transparent 1.5px); background-size: 15px 15px;"></div>
            
            <span class="text-[9px] text-[#fc4c02] font-black tracking-widest uppercase mb-3 leading-none">SCAN DENGAN HP UNTUK SOFTFILE</span>
            
            <div class="relative group cursor-pointer" @click="openPreview('image', qrCodeImageUrl)">
              <div class="relative bg-white p-2 border-2 border-black shadow-[2px_2px_0px_#fc4c02]">
                <img :src="qrCodeImageUrl" alt="QR Code" class="w-24 h-24" />
              </div>
            </div>
            <span class="text-[9px] text-gray-500 mt-3 font-black uppercase tracking-wider leading-none">Video BTS • GIF • Photo Strip</span>
          </div>

          <!-- Sharing digital softfiles Form -->
          <div class="space-y-3.5 text-left">
            <span class="text-[10px] font-black text-orange-600 uppercase tracking-widest block border-b-2 border-black pb-2 mb-2">KIRIM SOFTFILE DIGITAL</span>
            
            <!-- WA fields -->
            <div>
              <label class="block text-[9px] font-black uppercase tracking-wider text-gray-700 mb-1 leading-none">WhatsApp (WA) Nomor</label>
              <div class="flex gap-2">
                <input 
                  v-model="waNumber" 
                  type="text" 
                  placeholder="Contoh: 081234567890" 
                  class="flex-1 bg-white border-2 border-black py-2 px-3 text-xs text-black placeholder:text-gray-400 focus:border-[#fc4c02] focus:outline-none transition-colors"
                />
                <button @click="shareViaWA" class="px-4 py-2 bg-green-500 border-2 border-black text-black font-black text-xs transition-all uppercase tracking-wider flex items-center gap-1 shadow-[1px_1px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]">
                  <span>Kirim</span> <i class="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>

            <!-- Email fields -->
            <div>
              <label class="block text-[9px] font-black uppercase tracking-wider text-gray-700 mb-1 leading-none">Alamat Email</label>
              <div class="flex gap-2">
                <input 
                  v-model="emailAddress" 
                  type="email" 
                  placeholder="Contoh: atlet@email.com" 
                  class="flex-1 bg-white border-2 border-black py-2 px-3 text-xs text-black placeholder:text-gray-400 focus:border-[#fc4c02] focus:outline-none transition-colors"
                />
                <button @click="shareViaEmail" :disabled="isSendingEmail" class="px-4 py-2 bg-[#00f0ff] border-2 border-black text-black font-black text-xs transition-all uppercase tracking-wider flex items-center gap-1 disabled:opacity-50 shadow-[1px_1px_0px_#000]">
                  <span v-if="isSendingEmail">Kirim...</span>
                  <span v-else>Kirim</span> <i class="fa-solid fa-envelope"></i>
                </button>
              </div>
              <p v-if="emailStatus" class="text-[9px] text-green-600 mt-1 font-black uppercase tracking-wider">✓ {{ emailStatus }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom Action CTA Buttons -->
        <div class="space-y-2.5 mt-4">
          <NuxtLink :to="downloadAllUrl" class="w-full py-4.5 bg-[#d8ff00] text-black font-black border-4 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <i class="fa-solid fa-download text-sm"></i>
            <span>Download Semua Softfile</span>
          </NuxtLink>

          <NuxtLink to="/" class="w-full py-3.5 bg-white border-4 border-black text-black transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#fc4c02] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#fc4c02] active:translate-x-[1px] active:translate-y-[1px]">
            <span>MULAI SESI BARU</span> <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- Error State -->
    <div v-else class="z-10 text-center max-w-md mx-auto mt-10 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#ef4444] flex flex-col items-center">
      <div class="w-14 h-14 bg-red-500 border-2 border-black text-black flex items-center justify-center mb-5 shadow-[2px_2px_0px_#000]">
        <i class="fa-solid fa-triangle-exclamation text-2xl text-black"></i>
      </div>
      <h3 class="text-lg font-black text-black mb-1 uppercase tracking-wide italic">Opps, Run Not Found</h3>
      <p class="text-gray-500 text-xs mb-5">Sesi foto tidak ditemukan atau telah kadaluarsa.</p>
      
      <NuxtLink to="/" class="w-full py-3 bg-[#fc4c02] text-black border-2 border-black font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5">
        <span>Kembali ke Home</span> <i class="fa-solid fa-arrow-right"></i>
      </NuxtLink>
    </div>

    <!-- Teleport Modal: Premium Preview Modal -->
    <Teleport to="body">
      <div v-if="preview.show" class="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-8" @click.self="closePreview">
        <button @click="closePreview" class="absolute top-5 right-5 w-12 h-12 bg-white border-2 border-black text-black flex items-center justify-center transition-all hover:rotate-90 shadow-[2px_2px_0px_#000] z-10">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
        <div class="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center animate-scale-up">
          <img v-if="preview.type === 'image'" :src="preview.url" class="max-w-full max-h-[85vh] object-contain border-4 border-black bg-white shadow-[8px_8px_0px_#fc4c02]" />
          <video v-else-if="preview.type === 'video'" :src="preview.url" controls autoplay class="max-w-full max-h-[85vh] border-4 border-black bg-white shadow-[8px_8px_0px_#fc4c02]"></video>
        </div>
      </div>
    </Teleport>

    <!-- Teleport Modal: PRINT CONFIGURATION & PROGRESS MODAL -->
    <Teleport to="body">
      <div v-if="showPrintModal" class="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
        <div class="w-full max-w-lg bg-white border-4 border-black p-8 md:p-10 shadow-[8px_8px_0px_#fc4c02] relative text-center">
          
          <button @click="showPrintModal = false" class="absolute top-4 right-4 text-gray-500 hover:text-black bg-neutral-100 p-1.5 rounded-full border border-black shadow-[2px_2px_0px_#000]">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- Stage 1: Configure Prints -->
          <div v-if="printStage === 'config'">
            <div class="w-14 h-14 bg-[#fc4c02] border-2 border-black text-black flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_#000]">
              <i class="fa-solid fa-print text-2xl text-black"></i>
            </div>
            <h3 class="text-2xl font-black text-black mb-2.5 uppercase tracking-wide italic font-sans leading-none">Konfigurasi Cetak</h3>
            <p class="text-sm text-gray-500 mb-8 uppercase tracking-widest font-black">Pilih jumlah salinan strip foto yang ingin dicetak</p>

            <!-- Copies Selector -->
            <div class="flex items-center justify-center gap-6 mb-6">
              <button 
                @click="printCopies = Math.max(1, printCopies - 1)" 
                class="w-16 h-16 bg-white border-2 border-black text-black text-2xl font-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                -
              </button>
              <span class="text-5xl font-mono font-black text-black w-16">{{ printCopies }}</span>
              <button 
                @click="printCopies = Math.min(5, printCopies + 1)" 
                class="w-16 h-16 bg-[#d8ff00] border-2 border-black text-black text-2xl font-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                +
              </button>
            </div>

            <!-- Neo-Brutalist Confirmation Widget -->
            <div class="bg-neutral-50 border-2 border-black p-5 mb-8 text-left text-xs font-black uppercase tracking-wider space-y-2.5 shadow-[3px_3px_0px_#fc4c02]">
              <div class="flex justify-between text-black">
                <span>SELECTED LAYOUT:</span>
                <span class="text-[#fc4c02]">CREATIVE STRIP</span>
              </div>
              <div class="flex justify-between text-black">
                <span>PRINT COPIES:</span>
                <span class="text-black">{{ printCopies }} STRIPS</span>
              </div>
              <div class="w-full h-px bg-neutral-300 my-2"></div>
              <div class="flex justify-between text-black font-black text-sm">
                <span>CHARGES & TARIFF:</span>
                <span class="text-green-600 font-bold">FREE / COMPLIMENTARY</span>
              </div>
            </div>

            <button @click="startPrinterQueue" class="w-full py-5 bg-[#fc4c02] text-black border-4 border-black font-black shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2">
              <span>Cetak Sekarang</span> <i class="fa-solid fa-print"></i>
            </button>
          </div>

          <!-- Stage 2: Spooling Queue Simulation -->
          <div v-else class="py-4">
            <div class="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center border-4 border-black bg-neutral-50 shadow-[3px_3px_0px_#fc4c02]">
              <div class="absolute inset-0 border-4 border-transparent border-t-[#fc4c02] animate-spin" style="animation-duration: 0.8s;"></div>
              <i class="fa-solid fa-compact-disc fa-spin text-2xl text-[#fc4c02]"></i>
            </div>
            
            <h3 class="text-2xl font-black text-black mb-2.5 uppercase italic">Sedang Mencetak...</h3>
            <p class="text-sm text-gray-500 font-mono mb-8">Status: {{ printQueueLog }}</p>

            <!-- Spooling Progress Bar -->
            <div class="w-full h-5 bg-white border-2 border-black overflow-hidden mb-2 shadow-[2px_2px_0px_#fc4c02]">
              <div 
                class="h-full bg-[#00ff66] transition-all duration-300"
                :style="{ width: `${printProgress}%` }"
              ></div>
            </div>
            <p class="text-right text-xs text-gray-500 font-mono font-black">{{ printProgress }}%</p>
          </div>

        </div>
      </div>
    </Teleport>

    <!-- Hidden Printable Image Area -->
    <div id="print-frame" style="display: none;">
      <img id="print-image" style="max-width: 100%; max-height: 100%;" />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import { useAsyncData, useHead } from '#imports'

const route = useRoute()
const router = useRouter()
const sessionId = route.params.id
const API_URL = 'http://photobooth.test/api'

// Inject Font Awesome 6 CDN styles dynamically inside head
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
  ]
})

// Operator state configuration
const eventName = ref('HiddenGemBooth')
const timeoutSeconds = ref(60)
let timeoutInterval = null
const lang = ref('id')

// Preview modal config
const preview = ref({ show: false, type: '', url: '' })

// Share Form fields
const waNumber = ref('')
const emailAddress = ref('')
const isSendingEmail = ref(false)
const emailStatus = ref('')

// Print Modal states
const showPrintModal = ref(false)
const printStage = ref('config') // 'config' or 'spooling'
const printCopies = ref(1)
const printProgress = ref(0)
const printQueueLog = ref('Mengompresi file cetak...')

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

onMounted(() => {
  if (process.client) {
    const savedEvent = localStorage.getItem('booth_event_name')
    if (savedEvent) eventName.value = savedEvent
  }

  window.addEventListener('keydown', handleKeydown)
  startTimeout()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopTimeout()
})

// Inactivity Session Timeout
function startTimeout() {
  stopTimeout()
  timeoutSeconds.value = 60
  timeoutInterval = setInterval(() => {
    timeoutSeconds.value--
    if (timeoutSeconds.value <= 0) {
      stopTimeout()
      router.push('/')
    }
  }, 1000)
}

function stopTimeout() {
  if (timeoutInterval) {
    clearInterval(timeoutInterval)
    timeoutInterval = null
  }
}

// Key events
function handleKeydown(e) {
  if (e.key === 'Escape' && preview.value.show) {
    closePreview()
  }
}

// Media Preview Controls
function openPreview(type, url) {
  startTimeout() // Refresh timeout
  preview.value = { show: true, type, url }
}

function closePreview() {
  preview.value = { show: false, type: '', url: '' }
}

// Share via WhatsApp
function shareViaWA() {
  startTimeout() // Refresh timeout
  if (!waNumber.value) {
    alert("Masukkan nomor WhatsApp yang valid terlebih dahulu!")
    return
  }
  let number = waNumber.value.trim().replace(/[^0-9]/g, '')
  if (number.startsWith('0')) {
    number = '62' + number.slice(1)
  }
  const textMessage = `Hai! Ini softfile photobooth kamu dari *${eventName.value}* 📸✨\n\nDownload semua filemu (Video BTS, Boomerang GIF, Photo Strip) disini:\n${downloadAllUrl.value}\n\nTerima kasih sudah berpose bersama kami!`
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(textMessage)}`
  window.open(url, '_blank')
}

// Share via Email
function shareViaEmail() {
  startTimeout() // Refresh timeout
  if (!emailAddress.value || !emailAddress.value.includes('@')) {
    alert("Masukkan alamat email yang valid!")
    return
  }
  isSendingEmail.value = true
  emailStatus.value = ''
  
  setTimeout(() => {
    isSendingEmail.value = false
    emailStatus.value = `Softfile berhasil dikirim ke ${emailAddress.value}!`
    emailAddress.value = ''
  }, 2000)
}

// Print Modal Configurations & Spooling Queue Simulation
function openPrintConfig() {
  startTimeout() // Refresh timeout
  printCopies.value = 1
  printStage.value = 'config'
  showPrintModal.value = true
}

function startPrinterQueue() {
  stopTimeout() // Pause checkout timeout while printing sequence runs
  printStage.value = 'spooling'
  printProgress.value = 0
  printQueueLog.value = 'Mengompresi file cetak...'

  const steps = [
    { p: 15, log: 'Menghubungkan ke printer...' },
    { p: 35, log: 'Mengirim Dokumen Cetak ke Spooler...' },
    { p: 55, log: `Mencetak Salinan 1 dari ${printCopies.value}...` },
    { p: 75, log: printCopies.value > 1 ? `Mencetak Salinan 2 dari ${printCopies.value}...` : 'Finishing printing...' },
    { p: 90, log: 'Menggulung kertas cetakan...' },
    { p: 100, log: 'Selesai! Silakan ambil cetakanmu.' }
  ]

  let stepIndex = 0
  const interval = setInterval(() => {
    if (stepIndex < steps.length) {
      printProgress.value = steps[stepIndex].p
      printQueueLog.value = steps[stepIndex].log
      stepIndex++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        showPrintModal.value = false
        triggerSystemPrint(parsedUrls.value.strip)
        startTimeout() // Resume inactivity check
      }, 800)
    }
  }, 1000)
}

function triggerSystemPrint(url) {
  const printFrame = document.getElementById('print-frame')
  const printImage = document.getElementById('print-image')
  printImage.src = url
  printFrame.style.display = 'block'
  document.body.classList.add('printing')
  
  setTimeout(() => {
    window.print()
    printFrame.style.display = 'none'
    document.body.classList.remove('printing')
  }, 500)
}
</script>

<style scoped>
@keyframes scaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

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