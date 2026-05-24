<template>
  <div class="min-h-screen h-screen max-h-screen overflow-hidden flex flex-col justify-between p-4 md:p-6 select-none bg-[#f8f9fa] text-black font-sans relative">
    
    <!-- High-Octane Creative Studio Dot Grid Backdrop -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f9fa]">
      <div class="absolute inset-0 opacity-[0.08]" style="background-image: radial-gradient(#000 1.5px, transparent 1.5px); background-size: 24px 24px;"></div>
    </div>

    <!-- Premium Navigation Bar -->
    <nav class="relative z-50 w-full px-6 py-4 md:px-12 flex items-center justify-between bg-white border-4 border-black shadow-[4px_4px_0px_#000]">
      <div class="cursor-pointer group flex items-center gap-3" @click="scrollToTop">
        <div class="relative">
          <div class="w-10 h-8 bg-[#fc4c02] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#d8ff00] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_#d8ff00] transition-all transform -skew-x-12">
            <i class="fa-solid fa-camera text-black text-sm transform skew-x-12"></i>
          </div>
        </div>
        <div class="flex flex-col text-left">
          <span class="text-xl font-black tracking-tighter text-black leading-none uppercase italic">HiddenGem</span>
          <span class="text-[8px] font-black uppercase tracking-[0.25em] text-[#fc4c02] mt-0.5 leading-none">Creative Studio</span>
        </div>
      </div>

      <div class="flex items-center gap-3 relative z-50">
        <NuxtLink to="/gallery" class="px-4 py-2 text-xs font-black bg-[#ff007f] text-black border-2 border-black shadow-[2px_2px_0px_#00f0ff] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#00f0ff] transition-all flex items-center gap-2 tracking-widest uppercase">
          <i class="fa-solid fa-images"></i> <span>VIEW GALLERY</span>
        </NuxtLink>
        <button @click="openPasscodeModal" class="p-2 bg-white border-2 border-black text-[#fc4c02] shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] transition-all" title="Operator Settings">
          <i class="fa-solid fa-cogs text-base"></i>
        </button>
      </div>
    </nav>

    <!-- Passcode Drawer Modal -->
    <Teleport to="body">
      <div v-if="showPasscodeModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
        <div class="w-full max-w-sm bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#d8ff00] relative">
          <button @click="showPasscodeModal = false" class="absolute top-4 right-4 text-gray-500 hover:text-black bg-neutral-100 p-1.5 rounded-full border border-black">
            <i class="fa-solid fa-xmark"></i>
          </button>
          
          <div class="text-center mb-5">
            <div class="w-12 h-12 bg-[#fc4c02] border-2 border-black text-black flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#000]">
              <i class="fa-solid fa-lock text-xl"></i>
            </div>
            <h3 class="text-lg font-black text-black uppercase tracking-wider italic font-sans leading-none">Operator Passcode</h3>
            <p class="text-gray-600 text-xs mt-1">Masukkan kode otorisasi 4 digit</p>
          </div>

          <form @submit.prevent="submitPasscode">
            <input 
              v-model="passcodeInput" 
              type="password" 
              placeholder="••••" 
              maxlength="4" 
              class="w-full bg-neutral-50 border-4 border-black py-2.5 px-4 text-center text-2xl font-mono tracking-widest text-black mb-4 focus:border-[#fc4c02] focus:outline-none"
              autofocus
            />
            <p v-if="passcodeError" class="text-red-600 text-sm text-center mb-4 uppercase tracking-wider font-black">Passcode tidak valid!</p>
            <button type="submit" class="w-full py-3.5 bg-[#fc4c02] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
              <span>Masuk Settings</span> <i class="fa-solid fa-key"></i>
            </button>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Admin Settings Drawer Modal -->
    <Teleport to="body">
      <div v-if="showAdminModal" class="fixed inset-0 z-[100] flex items-center justify-end bg-black/70 backdrop-blur-sm">
        <div class="w-full max-w-lg h-full bg-[#f8f9fa] border-l-4 border-black p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-slide-in">
          <div>
            <div class="flex items-center justify-between border-b-4 border-black pb-3 mb-5">
              <div class="flex items-center gap-3 text-left">
                <i class="fa-solid fa-sliders text-xl text-[#fc4c02]"></i>
                <div>
                  <h2 class="text-lg font-black text-black uppercase tracking-wider italic leading-none">HiddenGem Console</h2>
                  <p class="text-gray-600 text-[10px] mt-0.5">Ubah parameter operasional mesin booth</p>
                </div>
              </div>
              <button @click="showAdminModal = false" class="text-gray-500 hover:text-black bg-neutral-200 p-1.5 border border-black shadow-[1px_1px_0px_#000]">
                <i class="fa-solid fa-xmark text-base"></i>
              </button>
            </div>

            <!-- Form parameters -->
            <div class="space-y-4 text-left">
              <div>
                <label class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1">Nama Event / Lokasi</label>
                <input v-model="settings.eventName" type="text" class="w-full bg-white border-2 border-black py-2 px-3 text-black text-xs focus:border-[#fc4c02] focus:outline-none" />
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1">Tarif Sesi (IDR)</label>
                  <input v-model.number="settings.activePrice" type="number" class="w-full bg-white border-2 border-black py-2 px-3 text-black text-xs focus:border-[#fc4c02] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1">DCC Server Port</label>
                  <input v-model="settings.dccPort" type="text" placeholder="5513" class="w-full bg-white border-2 border-black py-2 px-3 text-black text-xs focus:border-[#fc4c02] focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1">Kode Tiket Bypass (Koma)</label>
                <input v-model="settings.ticketString" type="text" placeholder="TKT01,TKT02" class="w-full bg-white border-2 border-black py-2 px-3 text-black text-xs focus:border-[#fc4c02] focus:outline-none" />
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1">Kode Promo Voucher (Koma)</label>
                <input v-model="settings.voucherString" type="text" placeholder="VCHR20,PROMO" class="w-full bg-white border-2 border-black py-2 px-3 text-black text-xs focus:border-[#fc4c02] focus:outline-none" />
              </div>

              <div class="border-t-2 border-black pt-3">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <label class="block text-xs font-black text-black uppercase italic leading-none">Promo Pop-Up Banner</label>
                    <p class="text-gray-500 text-[9px] mt-0.5">Tampilkan splash promosi saat load beranda</p>
                  </div>
                  <input v-model="settings.enablePromo" type="checkbox" class="w-4 h-4 rounded accent-orange-600 bg-white border-2 border-black" />
                </div>
                <div v-if="settings.enablePromo">
                  <label class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1">Pesan Promo Banner</label>
                  <textarea v-model="settings.promoText" rows="2" class="w-full bg-white border-2 border-black py-2 px-3 text-black text-xs focus:border-[#fc4c02] focus:outline-none"></textarea>
                </div>
              </div>

              <div class="border-t-2 border-black pt-3">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <label class="block text-xs font-black text-black uppercase italic leading-none">QR Payment</label>
                    <p class="text-gray-500 text-[9px] mt-0.5">Aktifkan pembayaran via QR code</p>
                  </div>
                  <input v-model="settings.enablePaymentQR" type="checkbox" class="w-4 h-4 rounded accent-orange-600 bg-white border-2 border-black" />
                </div>
                <div v-if="settings.enablePaymentQR">
                  <label class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1">URL Gambar QR Payment</label>
                  <input v-model="settings.paymentQRUrl" type="text" placeholder="https://contoh.com/qr-payment.png" class="w-full bg-white border-2 border-black py-2 px-3 text-black text-xs focus:border-[#fc4c02] focus:outline-none" />
                  <p class="text-[9px] text-gray-500 mt-1">Masukkan link gambar QR payment (QRIS, DANA, dll)</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex gap-3 border-t-4 border-black pt-3">
            <button @click="showAdminModal = false" class="flex-1 py-2.5 bg-neutral-200 border-2 border-black text-black font-black hover:bg-neutral-300 transition-colors uppercase tracking-widest text-[10px]">
              Batal
            </button>
            <button @click="saveSettings" class="flex-1 py-2.5 bg-[#fc4c02] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-1.5">
              <span>Simpan</span> <i class="fa-solid fa-floppy-disk"></i>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Asymmetrical Split-Screen Hero Main Section -->
    <main class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 grid grid-cols-12 gap-8 items-center min-h-0 overflow-hidden my-4">
      
      <!-- LEFT COLUMN: Creative Telemetry Panel (60% width) -->
      <div class="col-span-7 text-left flex flex-col justify-center h-full min-h-0 overflow-hidden animate-fade-in-up">
        
        <!-- Premium Experience Header Badge -->
        <div class="inline-flex items-center gap-2.5 px-4 py-2 bg-[#d8ff00] border-4 border-black text-black font-black uppercase tracking-widest mb-4 self-start shadow-[3px_3px_0px_#ff007f]">
          <span class="w-2.5 h-2.5 bg-black rounded-full animate-pulse"></span>
          <span class="text-xs font-black tracking-widest uppercase"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> HIDDENGEM PREMIUM PHOTO EXPERIENCE</span>
        </div>
        
        <!-- Left-Aligned Premium Creative Typography -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-[0.95] uppercase italic font-sans text-black">
          CAPTURE YOUR<br />
          <span class="relative inline-block mt-1 transform skew-x-1 font-black">
            <span class="bg-[#fc4c02] text-black px-3 py-1 border-4 border-black shadow-[4px_4px_0px_#d8ff00] inline-block">MOMENTS</span>
          </span>
        </h1>
        
        <!-- Dynamic Creative Stats Dashboard Widget -->
        <div class="grid grid-cols-3 gap-4 bg-white border-4 border-black p-4 mb-4 relative max-w-xl shadow-[6px_6px_0px_#00ff66]">
          <div class="absolute top-2.5 right-2.5 text-[9px] font-mono font-black text-orange-600 uppercase tracking-widest bg-neutral-100 px-1.5 py-0.5 border border-black">STUDIO TELEMETRY</div>
          
          <div class="text-left">
            <span class="text-[9px] text-gray-500 font-mono tracking-widest uppercase block font-black">COMPL. SESSIONS</span>
            <span class="text-xl md:text-2xl font-mono font-black text-[#fc4c02] block mt-0.5">14,820 Runs</span>
            <span class="text-[9px] text-green-600 font-black block mt-0.5">▲ Peak System Capacity</span>
          </div>
          <div class="text-left border-l-4 border-black pl-4">
            <span class="text-[9px] text-gray-500 font-mono tracking-widest uppercase block font-black">CAMERA SYSTEM</span>
            <span class="text-xl md:text-2xl font-mono font-black text-black block mt-0.5">DSLR + WEB</span>
            <span class="text-[9px] text-gray-600 block mt-0.5">Dual Stream Support</span>
          </div>
          <div class="text-left border-l-4 border-black pl-4">
            <span class="text-[9px] text-gray-500 font-mono tracking-widest uppercase block font-black">STUDIO SYSTEM</span>
            <span class="text-xl md:text-2xl font-mono font-black text-[#00ff66] block mt-0.5">ACTIVE</span>
            <span class="text-[9px] text-green-600 block mt-0.5">● Kiosk Mode Online</span>
          </div>
        </div>

        <p class="text-sm md:text-base text-neutral-800 max-w-xl mb-4 font-black uppercase leading-relaxed italic">
          Bukan sekadar foto biasa. Sesi foto HiddenGem memadukan photostrip cetak fisik premium, video behind-the-scenes sinematik, dan boomerang GIF estetik dalam satu langkah instan.
        </p>

        <!-- Premium Lifestyle Indicators -->
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1.5 bg-[#fc4c02] border-2 border-black text-[10px] md:text-xs font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_#000]"><i class="fa-solid fa-camera mr-1"></i> Premium Capture</span>
          <span class="px-3 py-1.5 bg-[#d8ff00] border-2 border-black text-[10px] md:text-xs font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_#ff007f]"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> AI Smart Shaders</span>
          <span class="px-3 py-1.5 bg-[#00f0ff] border-2 border-black text-[10px] md:text-xs font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_#00ff66]"><i class="fa-solid fa-mobile-screen-button mr-1"></i> QR Touchless</span>
          <span class="px-3 py-1.5 bg-[#ff007f] border-2 border-black text-[10px] md:text-xs font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_#d8ff00]"><i class="fa-solid fa-crown mr-1"></i> Luxury Photostrips</span>
        </div>
      </div>

      <!-- RIGHT COLUMN: Premium Action Arena Gate Card -->
      <div class="col-span-5 relative w-full flex items-center justify-center min-h-0 animate-fade-in-up" style="animation-delay: 0.2s">
        
        <!-- 3D Creative Portal Card Stack -->
        <div class="relative w-full max-w-[370px] z-10 bg-white border-4 border-black p-5 shadow-[10px_10px_0px_#00f0ff] flex flex-col justify-between">
          
          <div>
            <!-- Studio details -->
            <div class="flex items-center justify-between border-b-4 border-black pb-3 mb-4 text-left">
              <div>
                <span class="text-[10px] font-black uppercase tracking-widest text-[#fc4c02]">HIDDENGEM STUDIO</span>
                <h3 class="text-xl font-black text-black uppercase italic mt-0.5 leading-none">CREATIVE PORTAL</h3>
              </div>
              <i class="fa-solid fa-bolt text-2xl text-black"></i>
            </div>

            <!-- Central timer dashboard -->
            <div class="relative w-full aspect-video bg-neutral-50 border-4 border-black p-4 flex flex-col justify-center items-center overflow-hidden mb-4 shadow-[3px_3px_0px_#ff007f]">
              <div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(#000 1.5px, transparent 1.5px); background-size: 15px 15px;"></div>
              
              <span class="text-[9px] text-[#fc4c02] font-black tracking-widest uppercase">STUDIO SESSION TIMER</span>
              <div class="text-4xl font-mono font-black text-black mt-1 flex items-baseline gap-1">
                <span>05:00</span>
                <span class="text-sm text-[#fc4c02]">.00s</span>
              </div>
              <span class="text-[9px] text-gray-500 mt-1 uppercase font-bold">CREATIVE ENGINE READY</span>
            </div>

            <!-- Feature summary specs list -->
            <div class="space-y-2 text-left mb-4 text-xs text-black">
              <div class="flex justify-between items-center bg-neutral-50 border-2 border-black px-4 py-2.5 shadow-[2px_2px_0px_#00f0ff]">
                <span class="font-black text-black"><i class="fa-solid fa-image-portrait mr-1"></i> Studio Pose Slots</span>
                <span class="text-[#00ff66] font-mono font-black text-sm filter invert">3 - 4 Poses</span>
              </div>
              <div class="flex justify-between items-center bg-neutral-50 border-2 border-black px-4 py-2.5 shadow-[2px_2px_0px_#ff007f]">
                <span class="font-black text-black"><i class="fa-solid fa-sliders mr-1"></i> AI Smart Filters</span>
                <span class="text-orange-600 font-mono font-black text-sm">Active</span>
              </div>
            </div>
          </div>

          <!-- Solid studio action buttons stack -->
          <div class="space-y-3">
            <NuxtLink to="/session" class="w-full text-center inline-block py-3.5 bg-[#d8ff00] text-black font-black border-4 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-xs">
              ENTER STUDIO 🚀
            </NuxtLink>
            
            <NuxtLink to="/gallery" class="w-full text-center inline-block py-2.5 bg-[#ff007f] text-black font-black border-4 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all text-xs uppercase tracking-widest">
              VIEW GALLERY 🏆
            </NuxtLink>
          </div>
        </div>

      </div>

    </main>

    <!-- Footer -->
    <footer class="relative z-50 py-3 border-t-4 border-black bg-white">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-gray-600 text-[10px] tracking-widest uppercase">
          <span class="font-black text-black">HiddenGem</span>
          <span class="font-black text-[#fc4c02]">Studio</span> 
          <span class="text-gray-400 mx-2">•</span> 
          <span>Luxury Photobooth Platform © 2026 ✦</span>
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'nuxt/app'
import { useHead } from '#imports'

const router = useRouter()

// Inject Font Awesome 6 CDN dynamically into the page head
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
  ]
})

// UI Control reactive elements
const showPasscodeModal = ref(false)
const showAdminModal = ref(false)
const passcodeInput = ref('')
const passcodeError = ref(false)

// Operator Settings persisted parameters
const settings = reactive({
  eventName: 'HiddenGemBooth',
  activePrice: 25000,
  dccPort: '5513',
  ticketString: 'HGEM-TKT,TICKET01,TICKET02',
  voucherString: 'HGEM100,VCHR20,DISC10',
  enablePromo: false,
  promoText: 'Dapatkan softfile berkualitas tinggi & cetakan estetik. Gunakan kode voucher di bawah untuk mendapatkan gratis 1 strip foto!',
  enablePaymentQR: false,
  paymentQRUrl: ''
})

onMounted(() => {
  if (process.client) {
    const savedEvent = localStorage.getItem('booth_event_name')
    const savedPrice = localStorage.getItem('booth_active_price')
    let savedPort = localStorage.getItem('dcc_port')
    const savedTickets = localStorage.getItem('booth_tickets')
    const savedVouchers = localStorage.getItem('booth_vouchers')
    const savedEnablePromo = localStorage.getItem('booth_enable_promo')
    const savedPromoText = localStorage.getItem('booth_promo_text')
    const savedEnablePaymentQR = localStorage.getItem('booth_enable_payment_qr')
    const savedPaymentQRUrl = localStorage.getItem('booth_payment_qr_url')

    if (savedEvent) settings.eventName = savedEvent
    if (savedPrice) settings.activePrice = Number(savedPrice)
    if (savedPort === '8080' || savedPort === '5514') {
      savedPort = '5513'
      localStorage.setItem('dcc_port', '5513')
    }
    if (savedPort) settings.dccPort = savedPort
    if (savedTickets) settings.ticketString = savedTickets
    if (savedVouchers) settings.voucherString = savedVouchers
    if (savedEnablePromo) settings.enablePromo = savedEnablePromo === 'true'
    if (savedPromoText) settings.promoText = savedPromoText
    if (savedEnablePaymentQR) settings.enablePaymentQR = savedEnablePaymentQR === 'true'
    if (savedPaymentQRUrl) settings.paymentQRUrl = savedPaymentQRUrl
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openPasscodeModal() {
  passcodeInput.value = ''
  passcodeError.value = false
  showPasscodeModal.value = true
}

function submitPasscode() {
  if (passcodeInput.value === '1234') {
    showPasscodeModal.value = false
    showAdminModal.value = true
  } else {
    passcodeError.value = true
    passcodeInput.value = ''
  }
}

function saveSettings() {
  if (process.client) {
    localStorage.setItem('booth_event_name', settings.eventName)
    localStorage.setItem('booth_active_price', settings.activePrice.toString())
    localStorage.setItem('dcc_port', settings.dccPort)
    localStorage.setItem('booth_tickets', settings.ticketString)
    localStorage.setItem('booth_vouchers', settings.voucherString)
    localStorage.setItem('booth_enable_promo', settings.enablePromo.toString())
    localStorage.setItem('booth_promo_text', settings.promoText)
    localStorage.setItem('booth_enable_payment_qr', settings.enablePaymentQR.toString())
    localStorage.setItem('booth_payment_qr_url', settings.paymentQRUrl)
  }
  showAdminModal.value = false
  alert('HiddenGemBooth settings updated successfully!')
}
</script>

<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
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

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.animate-slide-in {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>