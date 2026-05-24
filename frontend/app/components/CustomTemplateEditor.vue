<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in select-none">
      <div class="w-full max-w-[95vw] h-[92vh] bg-[#1e1e1e] border-2 border-neutral-850 shadow-2xl relative text-left flex flex-col overflow-hidden rounded-md">
        
        <!-- Photoshop/Canva Style Top Header Bar -->
        <div class="h-12 bg-[#121212] border-b border-neutral-800 flex items-center justify-between px-4 shrink-0">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-wand-magic-sparkles text-[#00f0ff] text-base animate-pulse"></i>
            <span class="text-xs font-black uppercase text-white tracking-widest">HIDDENGEM PHOTO CREATIVE EDITOR</span>
            <span class="text-[8px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono font-bold tracking-normal uppercase">v1.2.0-PRO</span>
          </div>
          
          <!-- Dummy Header Menus for Pro Editor Vibe -->
          <div class="hidden md:flex items-center gap-4 text-[9px] font-black text-neutral-400 uppercase tracking-widest ml-6">
            <span class="hover:text-white cursor-pointer transition-all">File</span>
            <span class="hover:text-white cursor-pointer transition-all">Edit</span>
            <span class="hover:text-white cursor-pointer transition-all">Canvas</span>
            <span class="hover:text-white cursor-pointer transition-all">Layers</span>
            <span class="hover:text-white cursor-pointer transition-all">Bypass</span>
            <span class="hover:text-white cursor-pointer transition-all text-[#00ff66]">Active</span>
          </div>

          <div class="flex items-center gap-3">
            <span v-if="localFrame.isAdmin" class="text-[8px] px-2 py-0.5 bg-green-900/50 text-[#00ff66] border border-green-700/50 rounded font-black uppercase tracking-wider">
              ✓ BYPASS ACTIVE
            </span>
            <span v-else class="text-[8px] px-2 py-0.5 bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/30 rounded font-black uppercase tracking-wider">
              Rp 15.000 (VOUCHER)
            </span>
            
            <!-- Close button -->
            <button 
              @click="closeEditor" 
              class="text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 p-1.5 border border-neutral-700 rounded transition-all"
              title="Tutup Editor"
            >
              <i class="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Main Workspace Area -->
        <div class="flex-1 flex overflow-hidden">
          
          <!-- SIDEBAR: Tool Selection Deck (Canva Style Left Toolbar) -->
          <div class="w-[75px] bg-[#121212] border-r border-neutral-800 flex flex-col justify-start items-center py-4 gap-4 shrink-0">
            <button 
              @click="selectEditorTab('layout')"
              class="w-12 h-12 flex flex-col justify-center items-center rounded-lg transition-all text-center group"
              :class="activeEditorTab === 'layout' ? 'bg-[#2c2c2c] text-[#00f0ff] border-l-2 border-[#00f0ff]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#2c2c2c]/30'"
              title="Atur Tata Letak Slots"
            >
              <i class="fa-solid fa-table-cells-large text-base group-hover:scale-105 transition-transform"></i>
              <span class="text-[7px] font-black uppercase mt-1 tracking-wider">Slots</span>
            </button>

            <button 
              @click="selectEditorTab('backdrop')"
              class="w-12 h-12 flex flex-col justify-center items-center rounded-lg transition-all text-center group"
              :class="activeEditorTab === 'backdrop' ? 'bg-[#2c2c2c] text-[#00f0ff] border-l-2 border-[#00f0ff]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#2c2c2c]/30'"
              title="Atur Warna Latar"
            >
              <i class="fa-solid fa-fill-drip text-base group-hover:scale-105 transition-transform"></i>
              <span class="text-[7px] font-black uppercase mt-1 tracking-wider">Latar</span>
            </button>

            <button 
              @click="selectEditorTab('doodle')"
              class="w-12 h-12 flex flex-col justify-center items-center rounded-lg transition-all text-center group"
              :class="activeEditorTab === 'doodle' ? 'bg-[#2c2c2c] text-[#00f0ff] border-l-2 border-[#00f0ff]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#2c2c2c]/30'"
              title="Peralatan Spidol Gambar"
            >
              <i class="fa-solid fa-pen-nib text-base group-hover:scale-105 transition-transform"></i>
              <span class="text-[7px] font-black uppercase mt-1 tracking-wider">Spidol</span>
            </button>

            <button 
              @click="selectEditorTab('sticker')"
              class="w-12 h-12 flex flex-col justify-center items-center rounded-lg transition-all text-center group"
              :class="activeEditorTab === 'sticker' ? 'bg-[#2c2c2c] text-[#00f0ff] border-l-2 border-[#00f0ff]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#2c2c2c]/30'"
              title="Stiker Stamp & Elemen"
            >
              <i class="fa-solid fa-face-smile text-base group-hover:scale-105 transition-transform"></i>
              <span class="text-[7px] font-black uppercase mt-1 tracking-wider">Stiker</span>
            </button>

            <button 
              @click="selectEditorTab('text')"
              class="w-12 h-12 flex flex-col justify-center items-center rounded-lg transition-all text-center group"
              :class="activeEditorTab === 'text' ? 'bg-[#2c2c2c] text-[#00f0ff] border-l-2 border-[#00f0ff]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#2c2c2c]/30'"
              title="Ketik & Tempel Tulisan"
            >
              <i class="fa-solid fa-font text-base group-hover:scale-105 transition-transform"></i>
              <span class="text-[7px] font-black uppercase mt-1 tracking-wider">Teks</span>
            </button>
          </div>

          <!-- CENTER VIEWPORT: Document Canvas Area (Photoshop Classic Checkerboard) -->
          <div class="flex-1 bg-[#242424] flex items-center justify-center p-6 relative overflow-hidden select-none" style="background-image: conic-gradient(#1e1e1e 0.25turn, #2c2c2c 0.25turn 0.5turn, #1e1e1e 0.5turn 0.75turn, #2c2c2c 0.75turn); background-size: 20px 20px;">
            
            <!-- Subtle Canvas Grid Overlay and Zoom status info -->
            <div class="absolute bottom-4 left-4 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              Viewport: 100% Fit • 280x680 px • RGB/8bit
            </div>
            <div class="absolute bottom-4 right-4 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              Active Tool: {{ currentTool.toUpperCase() }}
            </div>

            <!-- Rendered Mockup Canva/Photoshop Document Card -->
            <div 
              class="w-[180px] h-[430px] border-4 border-black p-3.5 flex flex-col justify-between relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 select-none bg-white"
              :style="{ backgroundColor: localFrame.bgColor }"
            >
              <!-- Dot grid/stripe textures -->
              <div v-if="localFrame.pattern === 'dot'" class="absolute inset-0 opacity-[0.15] pointer-events-none" style="background-image: radial-gradient(#000 1.5px, transparent 1.5px); background-size: 10px 10px;"></div>
              <div v-if="localFrame.pattern === 'stripes'" class="absolute inset-0 opacity-[0.10] pointer-events-none" style="background-image: repeating-linear-gradient(45deg, #000, #000 4px, transparent 4px, transparent 8px);"></div>

              <!-- Upright Slots -->
              <div class="grid gap-1.5 flex-1 relative z-10 pointer-events-none" :class="localFrame.slots === 3 ? 'grid-rows-3' : 'grid-rows-4'">
                <div v-for="s in localFrame.slots" :key="s" class="bg-white border-2 border-black w-full h-full flex flex-col items-center justify-center shadow-[1px_1px_0px_#000] relative">
                  <i class="fa-solid fa-camera text-[10px] text-gray-400"></i>
                  <span class="text-[6px] text-gray-400 font-bold uppercase mt-0.5">POSE {{ s }}</span>
                </div>
              </div>
              
              <!-- Bottom text brand -->
              <span class="text-[8px] font-black uppercase tracking-wider text-black text-center mt-2 border-t border-black/20 pt-2 truncate relative z-10 pointer-events-none">
                {{ localFrame.title || 'STUDIO STRIP' }}
              </span>

              <!-- Translucent drawing canvas overlay -->
              <canvas 
                ref="customDrawingCanvasEl"
                @pointerdown="handleCanvasPointerDown"
                @pointermove="handleCanvasPointerMove"
                @pointerup="handleCanvasPointerUp"
                @pointerleave="handleCanvasPointerUp"
                class="absolute inset-0 z-20 cursor-crosshair touch-none"
                :class="currentTool === 'none' ? 'pointer-events-none' : ''"
              ></canvas>
            </div>

            <!-- Context Warning if drawing is locked -->
            <div v-if="currentTool === 'none'" class="absolute top-4 bg-neutral-900/80 border border-neutral-700/50 text-neutral-300 text-[8px] font-black px-3 py-1 uppercase tracking-widest rounded shadow-md backdrop-blur-sm animate-pulse">
              ℹ️ Klik Tab "Spidol", "Stiker" atau "Teks" untuk menggambar di kanvas
            </div>
          </div>

          <!-- RIGHT PANEL: Inspector Panel (Contextual parameters editor) -->
          <div class="w-[340px] bg-[#181818] border-l border-neutral-800 flex flex-col justify-between h-full p-5 text-neutral-300 shrink-0">
            
            <div class="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-thin">
              
              <!-- Panel Header based on Tab -->
              <div class="border-b border-neutral-800 pb-3">
                <span class="text-[8px] text-[#00f0ff] font-black uppercase tracking-widest font-mono">Properties Inspector</span>
                
                <h3 v-if="activeEditorTab === 'layout'" class="text-xs font-black text-white uppercase mt-0.5 tracking-wider flex items-center gap-1.5">
                  <i class="fa-solid fa-table-cells-large text-[#00f0ff]"></i> TATA LETAK STRIP
                </h3>
                <h3 v-else-if="activeEditorTab === 'backdrop'" class="text-xs font-black text-white uppercase mt-0.5 tracking-wider flex items-center gap-1.5">
                  <i class="fa-solid fa-fill-drip text-[#00f0ff]"></i> WARNA LATAR & FILL
                </h3>
                <h3 v-else-if="activeEditorTab === 'doodle'" class="text-xs font-black text-white uppercase mt-0.5 tracking-wider flex items-center gap-1.5">
                  <i class="fa-solid fa-pen-nib text-[#00f0ff]"></i> DOODLE & GAMBAR SPIDOL
                </h3>
                <h3 v-else-if="activeEditorTab === 'sticker'" class="text-xs font-black text-white uppercase mt-0.5 tracking-wider flex items-center gap-1.5">
                  <i class="fa-solid fa-face-smile text-[#00f0ff]"></i> STIKER STAMP PALETTE
                </h3>
                <h3 v-else-if="activeEditorTab === 'text'" class="text-xs font-black text-white uppercase mt-0.5 tracking-wider flex items-center gap-1.5">
                  <i class="fa-solid fa-font text-[#00f0ff]"></i> TEKS OVERLAY KANVAS
                </h3>
              </div>

              <!-- DYNAMIC TAB 1: LAYOUT & SLOTS -->
              <div v-if="activeEditorTab === 'layout'" class="space-y-4">
                <!-- Text Title Input -->
                <div class="space-y-1">
                  <label class="block text-[8px] font-black uppercase text-neutral-400 tracking-wider">TULISAN BRAND DI BAWAH FRAME</label>
                  <input 
                    v-model="localFrame.title" 
                    type="text" 
                    maxlength="20"
                    placeholder="Contoh: MUFID WEDDING" 
                    class="w-full px-3 py-2 bg-[#242424] border border-neutral-700 font-black uppercase text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <!-- Slots count selector -->
                <div class="space-y-1.5">
                  <label class="block text-[8px] font-black uppercase text-neutral-400 tracking-wider">JUMLAH POSE FOTO (SLOTS)</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button 
                      @click="localFrame.slots = 3"
                      class="py-2 border border-neutral-700 text-[10px] font-black uppercase tracking-wider transition-all"
                      :class="localFrame.slots === 3 ? 'bg-[#00f0ff] text-black border-[#00f0ff]' : 'bg-[#242424] text-neutral-400 hover:text-white'"
                    >
                      3 Poses
                    </button>
                    <button 
                      @click="localFrame.slots = 4"
                      class="py-2 border border-neutral-700 text-[10px] font-black uppercase tracking-wider transition-all"
                      :class="localFrame.slots === 4 ? 'bg-[#00f0ff] text-black border-[#00f0ff]' : 'bg-[#242424] text-neutral-400 hover:text-white'"
                    >
                      4 Poses
                    </button>
                  </div>
                </div>

                <!-- Background Patterns Selector -->
                <div class="space-y-1.5">
                  <label class="block text-[8px] font-black uppercase text-neutral-400 tracking-wider">PILIH MOTIF/POLA LATAR</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      v-for="pattern in ['solid', 'dot', 'stripes']" 
                      :key="pattern"
                      @click="localFrame.pattern = pattern"
                      class="py-2 border border-neutral-700 text-[9px] font-black uppercase tracking-wider transition-all"
                      :class="localFrame.pattern === pattern ? 'bg-[#00f0ff] text-black border-[#00f0ff]' : 'bg-[#242424] text-neutral-400 hover:text-white'"
                    >
                      {{ pattern }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- DYNAMIC TAB 2: BACKDROP / FILL COLOR -->
              <div v-else-if="activeEditorTab === 'backdrop'" class="space-y-4">
                <div class="space-y-1.5">
                  <label class="block text-[8px] font-black uppercase text-neutral-400 tracking-wider">PILIH WARNA LATAR STRIP</label>
                  <div class="grid grid-cols-6 gap-2">
                    <button 
                      v-for="color in ['#fc4c02', '#d8ff00', '#00f0ff', '#ff007f', '#ffffff', '#000000']" 
                      :key="color"
                      @click="localFrame.bgColor = color"
                      class="h-8 border border-neutral-700 rounded transition-all active:scale-95 relative"
                      :style="{ backgroundColor: color }"
                    >
                      <div v-if="localFrame.bgColor === color" class="absolute inset-0 flex items-center justify-center bg-black/20 border border-white/20 rounded">
                        <i class="fa-solid fa-circle-check text-[10px]" :class="color === '#000000' ? 'text-white' : 'text-black'"></i>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div class="bg-neutral-900 border border-neutral-800 p-3 rounded text-[9px] text-neutral-400 leading-relaxed uppercase tracking-wider">
                  💡 <span class="text-white font-bold">INFO PRO:</span> PILIH WARNA YANG KONTRAS DENGAN PILIHAN FILTER KAMERA AGAR MOCKUP BINGKAI FOTO TERLIHAT LEBIH MENONJOL DAN AESTHETIC.
                </div>
              </div>

              <!-- DYNAMIC TAB 3: DOODLE PICTURE DECK -->
              <div v-else-if="activeEditorTab === 'doodle'" class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-[8px] font-black text-neutral-400 uppercase tracking-wider">MODE SPIDOL GAMBAR:</span>
                  <div class="flex gap-1.5">
                    <button 
                      @click="currentTool = 'pen'"
                      class="px-3 py-1 text-[9px] font-black uppercase border rounded transition-all"
                      :class="currentTool === 'pen' ? 'bg-[#d8ff00] text-black border-[#d8ff00]' : 'bg-[#242424] text-neutral-400 border-neutral-700'"
                    >
                      Pencil
                    </button>
                    <button 
                      @click="currentTool = 'eraser'"
                      class="px-3 py-1 text-[9px] font-black uppercase border rounded transition-all"
                      :class="currentTool === 'eraser' ? 'bg-[#ff007f] text-white border-[#ff007f]' : 'bg-[#242424] text-neutral-400 border-neutral-700'"
                    >
                      Eraser
                    </button>
                  </div>
                </div>

                <div class="space-y-1">
                  <div class="flex justify-between items-center">
                    <span class="text-[8px] text-neutral-400 font-black uppercase">UKURAN GORESAN PENA</span>
                    <span class="text-[9px] font-mono text-[#00f0ff] font-bold">{{ brushSize }}px</span>
                  </div>
                  <input 
                    v-model.number="brushSize" 
                    type="range" 
                    min="2" 
                    max="24" 
                    step="2" 
                    class="w-full accent-[#00f0ff] bg-neutral-900 border border-neutral-700 h-1.5 rounded cursor-pointer"
                  />
                </div>

                <div class="space-y-1.5" v-if="currentTool === 'pen'">
                  <span class="text-[8px] text-neutral-400 font-black uppercase tracking-wider block mb-1">PILIH WARNA SPIDOL CORET</span>
                  <div class="flex gap-2">
                    <button 
                      v-for="c in ['#000000', '#ffffff', '#fc4c02', '#d8ff00', '#00f0ff', '#ff007f']" 
                      :key="c"
                      @click="brushColor = c"
                      class="w-7 h-7 rounded-full border border-neutral-700 transition-all active:scale-95 relative"
                      :style="{ backgroundColor: c }"
                    >
                      <div v-if="brushColor === c" class="absolute inset-0 flex items-center justify-center">
                        <span class="w-1.5 h-1.5 rounded-full" :class="c === '#ffffff' || c === '#d8ff00' ? 'bg-black' : 'bg-white'"></span>
                      </div>
                    </button>
                  </div>
                </div>

                <div class="pt-2 border-t border-neutral-800">
                  <button 
                    @click="clearDrawingCanvas"
                    class="w-full py-2 bg-neutral-900 border border-red-900 hover:bg-red-950/20 text-red-400 text-[9px] font-black uppercase tracking-widest rounded transition-all"
                  >
                    <i class="fa-solid fa-trash-can mr-1"></i> HAPUS SEMUA CORETAN DI KANVAS
                  </button>
                </div>
              </div>

              <!-- DYNAMIC TAB 4: STICKERS stamp -->
              <div v-else-if="activeEditorTab === 'sticker'" class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-[8px] text-neutral-400 font-black uppercase tracking-wider">UKURAN SKALA STIKER:</span>
                  <span class="text-[9px] font-mono text-[#00f0ff] font-bold">{{ brushSize * 4 }}px</span>
                </div>

                <input 
                  v-model.number="brushSize" 
                  type="range" 
                  min="4" 
                  max="20" 
                  step="2" 
                  class="w-full accent-[#00f0ff] bg-neutral-900 border border-neutral-700 h-1.5 rounded cursor-pointer"
                />

                <div class="space-y-1.5">
                  <span class="text-[8px] text-neutral-400 font-black uppercase tracking-wider block">PILIH ICON STIKER:</span>
                  <div class="grid grid-cols-5 gap-2">
                    <button 
                      v-for="sticker in stickersList" 
                      :key="sticker"
                      @click="selectedSticker = sticker"
                      class="h-10 text-lg border border-neutral-700 bg-neutral-900 rounded flex items-center justify-center transition-all hover:bg-neutral-800"
                      :class="selectedSticker === sticker ? 'bg-[#00f0ff]/20 border-[#00f0ff]' : ''"
                    >
                      {{ sticker }}
                    </button>
                  </div>
                </div>

                <div class="bg-neutral-900 border border-neutral-800 p-2 rounded text-[8px] text-neutral-400 leading-normal uppercase">
                  📌 <span class="text-white font-bold">CARA PAKAI:</span> PILIH STIKER DI ATAS, KEMUDIAN KLIK/TENTUKAN TITIK PADA PREVIEW BINGKAI FOTO DI TENGAH UNTUK MENEMPELKAN STIKER!
                </div>
              </div>

              <!-- DYNAMIC TAB 5: TEXT WRITE -->
              <div v-else-if="activeEditorTab === 'text'" class="space-y-4">
                <!-- Text Typing Input -->
                <div class="space-y-1">
                  <label class="block text-[8px] font-black uppercase text-neutral-400 tracking-wider">KATA YANG INGIN DITEMPEL</label>
                  <input 
                    v-model="customCanvasText" 
                    type="text" 
                    placeholder="Contoh: BOOM!" 
                    class="w-full px-3 py-2 bg-[#242424] border border-neutral-700 font-black uppercase text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <!-- Typography style selection -->
                <div class="space-y-1.5">
                  <label class="block text-[8px] font-black uppercase text-neutral-400 tracking-wider">STYLE FONTS</label>
                  <select 
                    v-model="selectedFont" 
                    class="w-full px-2 py-2 bg-[#242424] border border-neutral-700 text-xs font-black focus:outline-none text-white"
                  >
                    <option v-for="font in fontOptions" :key="font" :value="font">{{ font }}</option>
                  </select>
                </div>

                <!-- Text Color picker -->
                <div class="space-y-1.5">
                  <span class="text-[8px] text-neutral-400 font-black uppercase tracking-wider block">WARNA TEKS KANVAS</span>
                  <div class="flex gap-2">
                    <button 
                      v-for="c in ['#000000', '#ffffff', '#fc4c02', '#d8ff00', '#00f0ff', '#ff007f']" 
                      :key="c"
                      @click="brushColor = c"
                      class="w-6 h-6 rounded-full border border-neutral-700 transition-all active:scale-95 relative"
                      :style="{ backgroundColor: c }"
                    >
                      <div v-if="brushColor === c" class="absolute inset-0 flex items-center justify-center">
                        <span class="w-1 h-1 rounded-full" :class="c === '#ffffff' || c === '#d8ff00' ? 'bg-black' : 'bg-white'"></span>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Text size adjuster -->
                <div class="space-y-1">
                  <div class="flex justify-between items-center">
                    <span class="text-[8px] text-neutral-400 font-black uppercase">UKURAN TEKS KANVAS</span>
                    <span class="text-[9px] font-mono text-[#00f0ff] font-bold">{{ brushSize * 3 }}px</span>
                  </div>
                  <input 
                    v-model.number="brushSize" 
                    type="range" 
                    min="4" 
                    max="16" 
                    step="2" 
                    class="w-full accent-[#00f0ff] bg-neutral-900 border border-neutral-700 h-1.5 rounded cursor-pointer"
                  />
                </div>

                <div class="bg-neutral-900 border border-neutral-800 p-2 rounded text-[8px] text-neutral-400 leading-normal uppercase">
                  📌 <span class="text-white font-bold">CARA PAKAI:</span> KETIK TEKS DI ATAS, KEMUDIAN KLIK/KETUK PADA GAMBAR MOCKUP KANVAS DI TENGAH UNTUK MENENTUKAN POSISI TEMPEL!
                </div>
              </div>

            </div>

            <!-- BOTTOM: Passcode Bypass Admin (Surcharge waiver check) -->
            <div class="border-t border-neutral-850 pt-4 mt-4 space-y-3 shrink-0">
              <div v-if="localFrame.isAdmin" class="bg-green-950/40 border border-green-800/80 p-3 rounded flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-circle-check text-[#00ff66]"></i>
                  <div>
                    <h4 class="text-[9px] font-black text-white uppercase leading-none">✓ BYPASS OPERATOR AKTIF</h4>
                    <span class="text-[7px] text-neutral-400 uppercase tracking-widest font-mono mt-1 block">TANGGUNGAN TARIF BINGKAI DIHAPUS (Rp 0)</span>
                  </div>
                </div>
                <button @click="localFrame.isAdmin = false" class="text-[7px] px-2 py-1 bg-red-950/80 border border-red-800 hover:bg-red-900 text-red-400 font-black uppercase rounded transition-all">
                  Logout
                </button>
              </div>
              
              <div v-else class="bg-[#1c1c1c] border border-neutral-800 p-3 rounded flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <span class="text-[8px] font-black text-neutral-400 uppercase tracking-wider">BIAYA TEMPLATE KUSTOMISASI:</span>
                  <span class="text-[10px] font-mono font-black text-[#ff007f]">Rp 15.000</span>
                </div>
                
                <div class="border-t border-neutral-800 pt-2.5 flex items-center justify-between gap-2">
                  <span class="text-[8px] text-neutral-500 font-black uppercase whitespace-nowrap">PIN Operator:</span>
                  <input 
                    v-model="creatorPasscodeText" 
                    type="password" 
                    placeholder="Passcode" 
                    class="flex-1 max-w-[80px] px-2 py-1 bg-[#121212] border border-neutral-700 font-mono text-[9px] focus:border-[#00f0ff] focus:outline-none rounded text-white"
                  />
                  <button 
                    @click="applyCustomCreatorPasscode"
                    class="px-2.5 py-1 bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-[8px] font-black uppercase shadow-sm rounded"
                  >
                    Bypass
                  </button>
                </div>
                <p class="text-[8px] text-red-500 font-bold uppercase mt-0.5" v-if="creatorPasscodeError">
                  ✗ PIN Operator salah! Bypass dibatalkan.
                </p>
              </div>

              <!-- Modal footer buttons -->
              <div class="grid grid-cols-2 gap-3 pt-2">
                <button 
                  @click="closeEditor" 
                  class="py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-black border border-neutral-750 rounded uppercase tracking-wider text-[9px] transition-all"
                >
                  Kembali
                </button>
                
                <button 
                  @click="saveEditorTemplate"
                  class="py-2.5 bg-[#00ff66] text-black font-black border border-[#00ff66] hover:bg-[#00e055] rounded uppercase tracking-wider text-[9px] shadow-[0_4px_15px_rgba(0,255,102,0.3)] transition-all"
                >
                  Terapkan 🏁
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:show', 'update:modelValue', 'save'])

const localFrame = reactive({ ...props.modelValue })

// Watch prop updates to keep local copy in sync
watch(() => props.modelValue, (newVal) => {
  Object.assign(localFrame, newVal)
}, { deep: true })

// Bubble updates back up if local state changes
watch(localFrame, (newVal) => {
  emit('update:modelValue', { ...newVal })
}, { deep: true })

const creatorPasscodeText = ref('')
const creatorPasscodeSuccess = ref(false)
const creatorPasscodeError = ref(false)

// Doodle Drawing Canvas States
const customDrawingCanvasEl = ref(null)
const isDrawing = ref(false)
const brushColor = ref('#000000')
const brushSize = ref(6)
const lastX = ref(0)
const lastY = ref(0)

// Sticker & Custom Text Tool states
const currentTool = ref('none')
const selectedSticker = ref('❤️')
const stickersList = ['❤️', '⭐', '✨', '🔥', '⚡', '👑', '🚀', '📸', '🍀', '🍕', '🎉', '💎', '🌈', '💀', '👽']

const customCanvasText = ref('')
const selectedFont = ref('Impact')
const fontOptions = ['Impact', 'Courier New', 'Georgia', 'Arial Black']

// Canva / Adobe Photoshop style workspace panel controls
const activeEditorTab = ref('layout')

const selectEditorTab = (tab) => {
  activeEditorTab.value = tab
  if (tab === 'doodle') {
    currentTool.value = 'pen'
  } else if (tab === 'sticker') {
    currentTool.value = 'sticker'
  } else if (tab === 'text') {
    currentTool.value = 'text'
  } else {
    currentTool.value = 'none'
  }
}

// Watch 'show' to trigger canvas loading/redrawing
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    activeEditorTab.value = 'layout'
    currentTool.value = 'none'
    nextTick(() => {
      const canvas = customDrawingCanvasEl.value
      if (canvas) {
        canvas.width = 280
        canvas.height = 680
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        if (localFrame.drawing) {
          const img = new Image()
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
          img.src = localFrame.drawing
        }
      }
    })
  }
})

const stampSticker = (x, y) => {
  const canvas = customDrawingCanvasEl.value
  if (!canvas || !selectedSticker.value) return
  const ctx = canvas.getContext('2d')
  ctx.globalCompositeOperation = 'source-over'
  ctx.font = `${brushSize.value * 4}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(selectedSticker.value, x, y)
}

const stampText = (x, y) => {
  const canvas = customDrawingCanvasEl.value
  if (!canvas || !customCanvasText.value) return
  const ctx = canvas.getContext('2d')
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = brushColor.value
  ctx.font = `italic bold ${brushSize.value * 3}px ${selectedFont.value}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(customCanvasText.value.toUpperCase(), x, y)
}

const handleCanvasPointerDown = (e) => {
  const canvas = customDrawingCanvasEl.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  
  const x = (e.clientX - rect.left) * (canvas.width / rect.width)
  const y = (e.clientY - rect.top) * (canvas.height / rect.height)
  
  if (currentTool.value === 'sticker') {
    stampSticker(x, y)
  } else if (currentTool.value === 'text') {
    stampText(x, y)
  } else {
    isDrawing.value = true
    lastX.value = x
    lastY.value = y
    
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
}

const handleCanvasPointerMove = (e) => {
  if (!isDrawing.value) return
  const canvas = customDrawingCanvasEl.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  
  const x = (e.clientX - rect.left) * (canvas.width / rect.width)
  const y = (e.clientY - rect.top) * (canvas.height / rect.height)
  
  const ctx = canvas.getContext('2d')
  
  if (currentTool.value === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out'
  } else {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = brushColor.value
  }
  
  ctx.lineWidth = brushSize.value
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  
  ctx.lineTo(x, y)
  ctx.stroke()
  
  lastX.value = x
  lastY.value = y
}

const handleCanvasPointerUp = () => {
  isDrawing.value = false
}

const clearDrawingCanvas = () => {
  const canvas = customDrawingCanvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const applyCustomCreatorPasscode = () => {
  if (creatorPasscodeText.value === '1234') {
    localFrame.isAdmin = true
    creatorPasscodeSuccess.value = true
    creatorPasscodeError.value = false
    creatorPasscodeText.value = ''
  } else {
    creatorPasscodeError.value = true
    creatorPasscodeSuccess.value = false
  }
}

const closeEditor = () => {
  emit('update:show', false)
}

const saveEditorTemplate = () => {
  localFrame.active = true
  
  const canvas = customDrawingCanvasEl.value
  if (canvas) {
    localFrame.drawing = canvas.toDataURL()
  }
  
  emit('update:modelValue', { ...localFrame })
  emit('save')
}
</script>
