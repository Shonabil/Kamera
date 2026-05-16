<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-sans">
    
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <!-- Main Content Area -->
      <div class="w-full max-w-5xl aspect-[4/3] md:aspect-video bg-gray-900 rounded-3xl border-4 border-[#fc4c02]/20 shadow-[0_0_50px_rgba(252,76,2,0.15)] relative overflow-hidden flex items-center justify-center">
        
        <!-- ======================= -->
        <!-- LIVE CAMERA VIEWFINDER  -->
        <!-- ======================= -->
        <video 
          v-show="['idle', 'capturing'].includes(state)"
          ref="videoEl" 
          class="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" 
          autoplay 
          playsinline 
          muted
        ></video>

        <!-- Canvas for snapping photos (hidden) -->
        <canvas ref="canvasEl" class="hidden"></canvas>

        <!-- Canvas for recording BTS video continuously (hidden) -->
        <canvas ref="recordingCanvasEl" class="hidden"></canvas>

        <!-- ======================= -->
        <!-- IDLE STATE              -->
        <!-- ======================= -->
        <div v-if="state === 'idle'" class="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4">
          <!-- Template Picker First -->
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-tight">Pick Your Frame</h2>
          <p class="text-gray-400 mb-5 text-sm">Select a template before you start shooting</p>
          
          <div class="flex gap-3 md:gap-5 items-center justify-center mb-4 h-36 md:h-44">
            <div 
              v-for="template in templates" 
              :key="template"
              @click="selectedTemplate = template"
              class="relative h-full aspect-[1/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 shrink-0 bg-white/5"
              :class="selectedTemplate === template ? 'border-[#fc4c02] shadow-[0_0_20px_rgba(252,76,2,0.6)] scale-105' : 'border-white/20 opacity-60 hover:opacity-90 hover:border-white/40'"
            >
              <img :src="`http://photobooth.test/images/${template}`" class="w-full h-full object-contain" />
              <div v-if="selectedTemplate === template" class="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#fc4c02] rounded-full w-2 h-2"></div>
            </div>
          </div>

          <p class="text-[#fc4c02] font-bold text-sm mb-5">
            📸 {{ requiredPhotos }} foto diperlukan untuk frame ini
          </p>
          
          <button 
            @click="startSession"
            class="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-[#fc4c02] rounded-full overflow-hidden hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(252,76,2,0.7)] focus:outline-none"
          >
            <span class="mr-2 text-lg">Start Camera</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>

        <!-- ======================= -->
        <!-- CAPTURING STATE         -->
        <!-- ======================= -->
        <div v-if="state === 'capturing'" class="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <h1 class="text-[12rem] leading-none font-extrabold text-white drop-shadow-[0_0_30px_rgba(252,76,2,0.8)]" :key="countdown">
            {{ countdown }}
          </h1>
          <p class="text-3xl mt-4 font-bold text-orange-200 drop-shadow-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            Pose {{ capturedPhotos.length + 1 }}
          </p>
        </div>

        <div v-if="['capturing', 'previewing'].includes(state)" class="absolute top-6 left-6 flex space-x-2 z-20">
          <!-- Counter dots representing up to maxPhotos -->
          <div v-for="i in maxPhotos" :key="i" class="w-3 h-3 md:w-4 md:h-4 rounded-full border border-white transition-colors duration-300" 
               :class="i <= capturedPhotos.length ? 'bg-[#fc4c02] border-[#fc4c02]' : (state === 'capturing' && i === capturedPhotos.length + 1 ? 'bg-white border-white animate-pulse' : 'bg-transparent')">
          </div>
        </div>

        <!-- Flash Effect -->
        <div v-if="flash" class="absolute inset-0 bg-white z-50 transition-opacity duration-75" :class="flash ? 'opacity-100' : 'opacity-0'"></div>

        <!-- ======================= -->
        <!-- PREVIEWING STATE        -->
        <!-- ======================= -->
        <div v-if="state === 'previewing'" class="absolute inset-0 z-20 flex flex-col">
          <img :src="currentPreviewPhoto" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          
          <div class="absolute bottom-8 left-0 w-full flex justify-center gap-4 px-4 z-30">
            <!-- Retake Button -->
            <button @click="retakePhoto" class="px-6 md:px-8 py-4 rounded-full font-bold text-white bg-neutral-800/80 backdrop-blur-md border border-white/10 hover:bg-neutral-700 transition-colors flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
              Retake
            </button>
            
            <!-- Keep & Next (while below required count) -->
            <button v-if="capturedPhotos.length < requiredPhotos - 1" @click="keepPhotoAndNext" class="px-6 md:px-8 py-4 rounded-full font-bold text-white bg-[#fc4c02] hover:bg-orange-600 transition-colors shadow-lg shadow-[#fc4c02]/40 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Keep & Next
            </button>

            <!-- Take Another (when we have enough but can still add more) -->
            <button v-if="capturedPhotos.length >= requiredPhotos - 1 && capturedPhotos.length < maxPhotos - 1" @click="keepPhotoAndNext" class="px-6 md:px-8 py-4 rounded-full font-bold text-white bg-[#fc4c02] hover:bg-orange-600 transition-colors shadow-lg shadow-[#fc4c02]/40 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Take Another
            </button>

            <!-- Finish & Select (once we have enough) -->
            <button v-if="capturedPhotos.length >= requiredPhotos - 1" @click="keepPhotoAndFinish" class="px-6 md:px-8 py-4 rounded-full font-bold text-[#fc4c02] bg-white hover:bg-gray-100 transition-colors shadow-lg flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Finish & Select
            </button>
          </div>
        </div>

        <!-- ======================= -->
        <!-- SELECTION STATE         -->
        <!-- ======================= -->
        <div v-if="state === 'selection'" class="absolute inset-0 bg-neutral-900 z-30 flex flex-col p-6 overflow-y-auto">
          <div class="text-center mb-6">
            <h2 class="text-3xl font-bold text-white">Choose Your Best {{ requiredPhotos }}</h2>
            <p class="text-gray-400">Selected: <span class="font-bold text-[#fc4c02]">{{ selectedPhotoIndices.length }}</span> / {{ requiredPhotos }}</p>
          </div>

          <div class="grid gap-4 mb-24 max-w-4xl mx-auto w-full" :class="requiredPhotos === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'">
            <div 
              v-for="(photo, index) in capturedPhotos" 
              :key="index"
              @click="toggleSelection(index)"
              class="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border-4 transition-all duration-300"
              :class="selectedPhotoIndices.includes(index) ? 'border-[#fc4c02] scale-95 shadow-[0_0_20px_rgba(252,76,2,0.4)]' : 'border-transparent hover:border-gray-600'"
            >
              <img :src="photo" class="w-full h-full object-cover" />
              
              <!-- Checkmark Overlay -->
              <div v-if="selectedPhotoIndices.includes(index)" class="absolute top-2 right-2 bg-[#fc4c02] text-white rounded-full p-1 shadow-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-mono">
                Pose {{ index + 1 }}
              </div>
            </div>
          </div>

          <!-- Bottom Action Bar for Selection -->
          <div class="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 p-6 flex justify-center items-center z-40">
            <button 
              @click="processMedia"
              :disabled="selectedPhotoIndices.length !== requiredPhotos"
              class="px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              :class="selectedPhotoIndices.length === requiredPhotos ? 'bg-[#fc4c02] hover:bg-orange-600 hover:scale-105 shadow-[0_0_30px_rgba(252,76,2,0.4)]' : 'bg-neutral-800'"
            >
              <span v-if="selectedPhotoIndices.length === requiredPhotos">Generate My Strip 🚀</span>
              <span v-else>Select {{ requiredPhotos - selectedPhotoIndices.length }} more</span>
            </button>
          </div>
        </div>

<!-- ======================= -->
        <!-- PROCESSING STATE        -->
        <!-- ======================= -->
        <div v-if="state === 'processing'" class="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg z-50">
          <div class="w-20 h-20 border-4 border-[#fc4c02] border-t-transparent rounded-full animate-spin mb-8"></div>
          <h2 class="text-3xl font-bold text-white mb-2">Creating Magic...</h2>
          <p class="text-gray-400">Rendering Strip, GIF, and Video</p>
        </div>

        <!-- Recording Indicator (BTS) -->
        <div v-if="['capturing', 'previewing'].includes(state)" class="absolute top-6 right-6 flex items-center bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/30 z-20">
          <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
          <span class="text-red-500 font-mono font-bold tracking-widest text-xs md:text-sm">BTS REC</span>
        </div>
      </div>
    </div>

    <!-- Error Display -->
    <div class="absolute bottom-10 left-0 w-full flex justify-center z-50 pointer-events-none">
      <div v-if="errorMessage" class="bg-red-500/90 text-white px-6 py-4 rounded-xl backdrop-blur-md border border-red-500 flex items-center shadow-2xl pointer-events-auto">
        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span class="font-medium">{{ errorMessage }}</span>
        <button @click="resetCamera" class="ml-6 px-4 py-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors font-bold text-sm">Retry</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'nuxt/app'

const router = useRouter()
const videoEl = ref(null)
const canvasEl = ref(null)
const recordingCanvasEl = ref(null)

const state = ref('idle') // idle, capturing, previewing, selection, processing, error
const countdown = ref(5)
const flash = ref(false)
const errorMessage = ref('')

let stream = null
let mediaRecorder = null
let recordedChunks = []
let timerInterval = null
let finalVideoBlob = null
let recordingAnimationFrame = null

// New Variables for Flow
const capturedPhotos = ref([])
const currentPreviewPhoto = ref(null)
const selectedPhotoIndices = ref([])

// Template config: define slots, maxPhotos, and Y positions for each template
const TEMPLATE_CONFIG = {
  'frame_1.png':      { slots: 4, maxPhotos: 6, aspectRatio: '530/304' }, // 4 landscape slots
  'frame_2.png':      { slots: 3, maxPhotos: 5, aspectRatio: '421/335' }, // 3 square-ish slots
  'frame_3.png':      { slots: 3, maxPhotos: 5, aspectRatio: '489/260' }, // 3 landscape slots
  'frame_sample.png': { slots: 4, maxPhotos: 6, aspectRatio: '500/281' }, // 4 landscape slots (test)
}

const templates = Object.keys(TEMPLATE_CONFIG)
const selectedTemplate = ref(templates[0])
const requiredPhotos = computed(() => TEMPLATE_CONFIG[selectedTemplate.value]?.slots || 3)
const maxPhotos = computed(() => TEMPLATE_CONFIG[selectedTemplate.value]?.maxPhotos || 5)

const API_URL = 'http://photobooth.test/api'

onMounted(async () => {
  await initCamera()
})

onBeforeUnmount(() => {
  stopCamera()
})

const initCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { width: { ideal: 1920 }, height: { ideal: 1080 } }, 
      audio: false 
    })
    if (videoEl.value) {
      videoEl.value.srcObject = stream
    }
  } catch (err) {
    console.error("Camera access denied or unavailable", err)
    errorMessage.value = "Unable to access camera. Please allow permissions."
    state.value = 'error'
  }
}

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
  if (timerInterval) clearInterval(timerInterval)
  if (recordingAnimationFrame) cancelAnimationFrame(recordingAnimationFrame)
}

const resetCamera = async () => {
  errorMessage.value = ''
  state.value = 'idle'
  capturedPhotos.value = []
  selectedPhotoIndices.value = []
  await initCamera()
}

const startSession = () => {
  if (!stream) {
    errorMessage.value = "Camera is not ready."
    return
  }
  
  capturedPhotos.value = []
  selectedPhotoIndices.value = []
  recordedChunks = []
  finalVideoBlob = null

  // Setup the hidden recording canvas to match video dimensions
  const video = videoEl.value
  const recCanvas = recordingCanvasEl.value
  if (video && recCanvas) {
    recCanvas.width = video.videoWidth
    recCanvas.height = video.videoHeight
    
    const renderRecordingFrame = () => {
      if (state.value === 'selection' || state.value === 'processing' || state.value === 'error') {
        return // stop drawing if we're done
      }
      
      const ctx = recCanvas.getContext('2d')
      ctx.clearRect(0, 0, recCanvas.width, recCanvas.height)
      
      // Draw mirrored!
      ctx.save()
      ctx.translate(recCanvas.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0, recCanvas.width, recCanvas.height)
      ctx.restore()
      
      recordingAnimationFrame = requestAnimationFrame(renderRecordingFrame)
    }
    
    // Start drawing loop
    renderRecordingFrame()
  }

  // Initialize MediaRecorder for BTS video using the CANVAS stream instead of raw webcam stream
  // This ensures the BTS video is also flipped!
  const canvasStream = recCanvas ? recCanvas.captureStream(30) : stream
  const options = { mimeType: 'video/webm; codecs=vp8,opus' }
  mediaRecorder = new MediaRecorder(canvasStream, MediaRecorder.isTypeSupported(options.mimeType) ? options : {})
  
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data)
  }
  
  mediaRecorder.onstop = () => {
    finalVideoBlob = new Blob(recordedChunks, { type: 'video/webm' })
    // If we've already clicked "Process Media", trigger upload now
    if (state.value === 'processing') {
      executeUpload()
    }
  }

  // Start recording video immediately
  mediaRecorder.start()

  startCountdown()
}

const startCountdown = () => {
  state.value = 'capturing'
  countdown.value = 5
  
  timerInterval = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(timerInterval)
      snapPhoto()
    }
  }, 1000)
}

const snapPhoto = () => {
  const video = videoEl.value
  const canvas = canvasEl.value
  if (!video || !canvas) return

  // Crop a perfect SQUARE from the center of the video feed
  const side = Math.min(video.videoWidth, video.videoHeight)
  const sx = (video.videoWidth - side) / 2
  const sy = (video.videoHeight - side) / 2

  canvas.width = side
  canvas.height = side
  
  const ctx = canvas.getContext('2d')
  
  // Mirror the drawing
  ctx.translate(canvas.width, 0)
  ctx.scale(-1, 1)
  
  ctx.drawImage(video, sx, sy, side, side, 0, 0, side, side)
  
  // Get base64 string
  currentPreviewPhoto.value = canvas.toDataURL('image/jpeg', 0.9)
  
  // Flash UI
  flash.value = true
  setTimeout(() => { flash.value = false }, 150)

  // Go to preview state
  state.value = 'previewing'
}

const retakePhoto = () => {
  currentPreviewPhoto.value = null
  startCountdown()
}

const keepPhotoAndNext = () => {
  capturedPhotos.value.push(currentPreviewPhoto.value)
  currentPreviewPhoto.value = null

  if (capturedPhotos.value.length === maxPhotos.value) {
    goToSelection()
  } else {
    startCountdown()
  }
}

const keepPhotoAndFinish = () => {
  capturedPhotos.value.push(currentPreviewPhoto.value)
  currentPreviewPhoto.value = null
  goToSelection()
}

const goToSelection = () => {
  state.value = 'selection'
  // Stop recording BTS video so it doesn't include the lengthy selection process
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }
}

const toggleSelection = (index) => {
  const selIdx = selectedPhotoIndices.value.indexOf(index)
  if (selIdx > -1) {
    // Deselect
    selectedPhotoIndices.value.splice(selIdx, 1)
  } else {
    // Select (if limit not reached)
    if (selectedPhotoIndices.value.length < requiredPhotos.value) {
      selectedPhotoIndices.value.push(index)
    }
  }
}

const processMedia = () => {
  if (selectedPhotoIndices.value.length !== requiredPhotos.value) return
  
  state.value = 'processing'
  
  // If finalVideoBlob is already ready, upload. Otherwise, it will trigger from onstop.
  if (finalVideoBlob) {
    executeUpload()
  } else if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }
}

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while(n--){
      u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type:mime})
}

const executeUpload = async () => {
  try {
    const formData = new FormData()
    
    // Add video
    formData.append('video', finalVideoBlob, 'session.webm')
    
    // Add photos (sorted by capture order)
    const sortedSelectedIndices = [...selectedPhotoIndices.value].sort((a,b) => a - b)
    
    sortedSelectedIndices.forEach((index, i) => {
      const base64 = capturedPhotos.value[index]
      const file = dataURLtoFile(base64, `photo_${i+1}.jpg`)
      formData.append(`photos[]`, file)
    })

    // Add selected template
    formData.append('template', selectedTemplate.value)

    // Create session initially
    const sessionResponse = await $fetch(`${API_URL}/sessions`, {
      method: 'POST',
      body: { mode: 'photo' } 
    })

    const sessionId = sessionResponse.id || sessionResponse.data?.id || sessionResponse.data?.session?.id
    formData.append('session_id', sessionId)

    // Upload to our new processing endpoint
    const response = await $fetch(`${API_URL}/process-session`, {
      method: 'POST',
      body: formData
    })

    if (response.success) {
      // Done! Go to result page
      router.push(`/result/${sessionId}`)
    } else {
      throw new Error(response.message || "Failed to process session")
    }

  } catch (err) {
    console.error("Upload error", err, err.data)
    state.value = 'error'
    errorMessage.value = err.data?.message || err.message || "Failed to upload session data. Server error."
  }
}
</script>
