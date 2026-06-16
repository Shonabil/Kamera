<template>
    <div
        class="min-h-screen h-screen max-h-screen overflow-hidden flex flex-col justify-between p-4 select-none bg-[#f8f9fa] text-black font-sans relative"
    >
        <!-- High-Octane Creative Studio Dot Grid Backdrop -->
        <div
            class="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f9fa]"
        >
            <div
                class="absolute inset-0 opacity-[0.08]"
                style="
                    background-image: radial-gradient(
                        #000 1.5px,
                        transparent 1.5px
                    );
                    background-size: 24px 24px;
                "
            ></div>
        </div>

        <!-- Active Telemetry Header Bar -->
        <header
            class="relative z-50 w-full flex items-center justify-between bg-white border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_#ff007f]"
        >
            <div class="flex items-center gap-3">
                <!-- Slanted navigation back button -->
                <NuxtLink
                    to="/"
                    class="w-11 h-9 bg-[#fc4c02] border-2 border-black flex items-center justify-center transform -skew-x-12 cursor-pointer shadow-[2px_2px_0px_#d8ff00] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#d8ff00] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                    <i
                        class="fa-solid fa-arrow-left text-black transform skew-x-12 text-sm"
                    ></i>
                </NuxtLink>
                <div class="text-left">
                    <span
                        class="text-[10px] font-black uppercase tracking-[0.25em] text-[#fc4c02] block leading-none"
                        >HIDDENGEM BOOTH</span
                    >
                    <h2
                        class="text-lg md:text-xl font-black text-black uppercase italic mt-1 tracking-wider leading-none"
                    >
                        CREATIVE STUDIO
                    </h2>
                </div>
            </div>

            <!-- Right controls: Multi-Language Selector Flag Icons -->
            <div class="flex items-center gap-3">
                <!-- Session Recovery Badge -->
                <div
                    v-if="hasRecoverableSession"
                    @click="recoverSavedSession"
                    class="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-green-500 border-2 border-black text-black font-black uppercase tracking-widest shadow-[2px_2px_0px_#fff] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                    <span
                        class="w-2 h-2 bg-black rounded-full animate-ping"
                    ></span>
                    <span
                        class="text-[10px] font-black uppercase tracking-widest"
                        >{{ translation.resumeSession }}</span
                    >
                </div>

                <div class="flex bg-white border-2 border-black p-1 gap-1">
                    <button
                        @click="lang = 'id'"
                        class="px-2.5 py-1 text-[10px] font-black rounded transition-all flex items-center gap-1"
                        :class="
                            lang === 'id'
                                ? 'bg-[#fc4c02] text-black border border-black shadow-[1px_1px_0px_#000]'
                                : 'text-gray-400 hover:text-black'
                        "
                    >
                        <span>🇮🇩</span><span>ID</span>
                    </button>
                    <button
                        @click="lang = 'en'"
                        class="px-2.5 py-1 text-[10px] font-black rounded transition-all flex items-center gap-1"
                        :class="
                            lang === 'en'
                                ? 'bg-[#fc4c02] text-black border border-black shadow-[1px_1px_0px_#000]'
                                : 'text-gray-400 hover:text-black'
                        "
                    >
                        <span>🇬🇧</span><span>EN</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- Main Workspace Segment -->
        <div
            class="relative z-20 flex-1 grid grid-cols-12 gap-6 min-h-0 overflow-hidden mb-4"
        >
            <!-- ======================= -->
            <!-- STATE A: IDLE (TEMPLATE SELECT) -->
            <!-- ======================= -->
            <template v-if="state === 'idle'">
                <!-- LEFT COLUMN: Studio Settings Panel (50% Width, White Backdrop) -->
                <div
                    class="col-span-6 bg-white border-4 border-black p-5 flex flex-col justify-between shadow-[6px_6px_0px_#fc4c02] relative overflow-hidden h-full min-h-0"
                >
                    <div class="overflow-y-auto pr-1 space-y-4 scrollbar-thin">
                        <div
                            class="flex items-center gap-3 border-b-2 border-black pb-3 text-left"
                        >
                            <i
                                class="fa-solid fa-sliders text-xl text-[#fc4c02]"
                            ></i>
                            <div>
                                <h3
                                    class="text-base font-black text-black uppercase tracking-wider italic leading-none"
                                >
                                    {{ translation.kioskSettings }}
                                </h3>
                                <span
                                    class="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-0.5 block"
                                    >SELF-SERVICE DECK ACTIVE</span
                                >
                            </div>
                        </div>

                        <!-- Touchless QR Remote Simulator Panel -->
                        <div
                            class="bg-neutral-50 border-2 border-black p-3.5 text-left relative shadow-[3px_3px_0px_#00f0ff]"
                        >
                            <div class="flex items-center justify-between mb-2">
                                <span
                                    class="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5"
                                >
                                    <i
                                        class="fa-solid fa-mobile-screen-button text-[#fc4c02]"
                                    ></i>
                                    {{ translation.touchlessMode }}
                                </span>
                                <!-- Switch -->
                                <button
                                    @click="isTouchlessMode = !isTouchlessMode"
                                    class="w-12 h-6 rounded p-0.5 transition-colors duration-300 relative border-2 border-black"
                                    :class="
                                        isTouchlessMode
                                            ? 'bg-[#00f0ff]'
                                            : 'bg-neutral-300'
                                    "
                                >
                                    <div
                                        class="w-3.5 h-3.5 bg-white rounded transition-transform duration-300 shadow border border-black"
                                        :class="
                                            isTouchlessMode
                                                ? 'translate-x-5'
                                                : 'translate-x-0'
                                        "
                                    ></div>
                                </button>
                            </div>
                            <p
                                class="text-[10px] text-gray-600 leading-relaxed mb-3"
                            >
                                {{ translation.touchlessDesc }}
                            </p>

                            <!-- Touchless QR Code Simulator Display -->
                            <div
                                v-if="isTouchlessMode"
                                class="flex gap-4 items-center bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_#00ff66] animate-scale-up"
                            >
                                <div
                                    class="bg-white p-1 w-14 h-14 flex-shrink-0 flex items-center justify-center border-2 border-black"
                                >
                                    <div class="flex flex-col items-center">
                                        <div class="flex gap-2 mb-1">
                                            <button
                                                @click="
                                                    setUseLanTouchless(false)
                                                "
                                                :class="
                                                    useLanIpTouchless
                                                        ? 'bg-neutral-200 text-black'
                                                        : 'bg-[#00f0ff] text-black'
                                                "
                                                class="px-2 py-1 rounded text-[10px]"
                                            >
                                                Use Host
                                            </button>
                                            <button
                                                @click="
                                                    setUseLanTouchless(true)
                                                "
                                                :class="
                                                    useLanIpTouchless
                                                        ? 'bg-[#00f0ff] text-black'
                                                        : 'bg-neutral-200 text-black'
                                                "
                                                class="px-2 py-1 rounded text-[10px]"
                                            >
                                                Use LAN
                                            </button>
                                        </div>
                                        <img
                                            :src="`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(touchlessQrLink)}&color=00f0ff`"
                                            class="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                <div class="flex-1 text-left">
                                    <span
                                        class="text-[8px] bg-[#00ff66] text-black font-black px-1.5 py-0.5 border border-black uppercase tracking-wider"
                                        >Mobile Remote Ready</span
                                    >
                                    <p
                                        class="text-[9px] text-gray-500 mt-1 leading-relaxed font-black uppercase"
                                    >
                                        Pindai dengan kamera HP untuk jepret
                                        jarak jauh.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Camera Status Panel -->
                        <div
                            class="bg-neutral-50 border-2 border-black p-3.5 text-left shadow-[3px_3px_0px_#ff007f]"
                        >
                            <label
                                class="block text-[9px] font-black uppercase tracking-wider text-orange-600 mb-2"
                                >STATUS KAMERA</label
                            >
                            <div
                                class="flex items-center justify-between gap-2"
                            >
                                <button
                                    @click="changeCameraSource('dslr')"
                                    class="w-full py-2 px-2.5 border-2 border-black text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                                    :class="
                                        cameraReady
                                            ? 'bg-[#fc4c02] text-black border-[#fc4c02]'
                                            : 'bg-white text-gray-500 hover:text-black'
                                    "
                                >
                                    <i class="fa-solid fa-camera"></i>
                                    <span>Canon DSLR</span>
                                </button>
                            </div>
                            <div class="mt-2 flex items-center gap-1.5">
                                <span
                                    class="w-1.5 h-1.5 rounded-full"
                                    :class="
                                        cameraReady
                                            ? 'bg-green-500'
                                            : 'bg-red-500 animate-ping'
                                    "
                                ></span>
                                <span
                                    class="text-[8px] text-gray-500 font-black uppercase"
                                >
                                    {{
                                        cameraReady
                                            ? "✓ DSLR Terhubung"
                                            : "✗ DSLR Terputus"
                                    }}
                                </span>
                            </div>
                        </div>

                        <!-- AI Auto-Beautify Switch Panel -->
                        <div
                            class="bg-neutral-50 border-2 border-black p-3.5 text-left shadow-[3px_3px_0px_#d8ff00]"
                        >
                            <div class="flex items-center justify-between mb-2">
                                <span
                                    class="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5"
                                >
                                    <i
                                        class="fa-solid fa-wand-magic-sparkles text-[#fc4c02]"
                                    ></i>
                                    {{ translation.aiBeautify }}
                                </span>
                                <button
                                    @click="
                                        isAiBeautifyActive = !isAiBeautifyActive
                                    "
                                    class="w-12 h-6 rounded p-0.5 transition-colors duration-300 relative border-2 border-black"
                                    :class="
                                        isAiBeautifyActive
                                            ? 'bg-[#d8ff00]'
                                            : 'bg-neutral-300'
                                    "
                                >
                                    <div
                                        class="w-3.5 h-3.5 bg-white rounded transition-transform duration-300 shadow border border-black"
                                        :class="
                                            isAiBeautifyActive
                                                ? 'translate-x-5'
                                                : 'translate-x-0'
                                        "
                                    ></div>
                                </button>
                            </div>
                            <p
                                class="text-[10px] text-gray-600 leading-relaxed"
                            >
                                {{ translation.aiDesc }}
                            </p>
                        </div>

                        <!-- Kiosk Size & Prints selections -->
                        <div class="grid grid-cols-2 gap-4 text-left">
                            <!-- Paper Size Grid Selector -->
                            <div>
                                <label
                                    class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1.5"
                                    >{{ translation.paperSize }}</label
                                >
                                <div class="grid grid-cols-1 gap-1.5">
                                    <button
                                        v-for="size in [
                                            'strip',
                                            'newspaper',
                                            'a4',
                                        ]"
                                        :key="size"
                                        @click="selectedPaperSize = size"
                                        class="py-2.5 bg-white border-2 border-black font-black text-[10px] uppercase tracking-wider transition-all text-black text-left px-3 flex items-center justify-between"
                                        :class="
                                            selectedPaperSize === size
                                                ? size === 'strip'
                                                    ? 'bg-[#fc4c02] text-black shadow-[2px_2px_0px_#000]'
                                                    : size === 'newspaper'
                                                      ? 'bg-[#00ff66] text-black shadow-[2px_2px_0px_#000]'
                                                      : 'bg-[#ff007f] text-black shadow-[2px_2px_0px_#000]'
                                                : 'text-gray-500 hover:border-black hover:text-black shadow-[2px_2px_0px_#000]'
                                        "
                                    >
                                        <span v-if="size === 'strip'"
                                            >Classic Strip</span
                                        >
                                        <span v-if="size === 'newspaper'"
                                            >Newspaper</span
                                        >
                                        <span v-if="size === 'a4'"
                                            >A4 Poster</span
                                        >
                                        <span class="text-xs">🏁</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Extra Prints selection -->
                            <div class="flex flex-col justify-between">
                                <div>
                                    <label
                                        class="block text-[10px] font-black uppercase tracking-wider text-orange-600 mb-1.5"
                                        >{{ translation.printCopies }}</label
                                    >
                                    <div
                                        class="flex items-center gap-3 bg-white border-2 border-black p-1 max-w-[150px]"
                                    >
                                        <button
                                            @click="
                                                extraPrints = Math.max(
                                                    0,
                                                    extraPrints - 1,
                                                )
                                            "
                                            class="w-8 h-8 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 border-2 border-black text-black rounded transition-colors text-base font-bold shadow-[1px_1px_0px_#000]"
                                        >
                                            -
                                        </button>
                                        <span
                                            class="flex-1 text-center font-mono font-black text-sm text-black"
                                            >{{ extraPrints }}</span
                                        >
                                        <button
                                            @click="
                                                extraPrints = Math.min(
                                                    5,
                                                    extraPrints + 1,
                                                )
                                            "
                                            class="w-8 h-8 flex items-center justify-center bg-[#d8ff00] border-2 border-black text-black rounded transition-colors text-base font-bold shadow-[1px_1px_0px_#000]"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <span
                                    class="text-[9px] text-gray-500 font-black uppercase tracking-wider block mt-2"
                                    >+ Rp 10.000 per lembar ekstra</span
                                >
                            </div>
                        </div>
                    </div>

                    <!-- Checkout Summary & Direct Start CTA -->
                    <div
                        class="mt-4 border-t-2 border-black pt-3 space-y-4 text-left"
                    >
                        <div
                            class="bg-neutral-50 border-2 border-black p-3.5 shadow-[3px_3px_0px_#00f0ff] text-xs font-black uppercase space-y-1.5"
                        >
                            <span
                                class="text-[10px] text-orange-600 tracking-widest block mb-1"
                                >🏁 SYSTEM CALIBRATION</span
                            >
                            <div class="flex justify-between">
                                <span>Selected Frame:</span>
                                <span class="font-mono text-[#fc4c02]">
                                    {{
                                        selectedTemplate === "custom"
                                            ? "CUSTOM TEMPLATE"
                                            : selectedTemplate
                                                  .split(".")[0]
                                                  .replace("frame_", "")
                                                  .replace("_", " ")
                                    }}
                                </span>
                            </div>
                            <div
                                class="flex justify-between"
                                v-if="selectedTemplate === 'custom'"
                            >
                                <span>Custom Surcharge:</span>
                                <span class="font-mono text-[#ff007f]">{{
                                    activeCustomFrame.isAdmin
                                        ? "Rp 0 (Admin Bypass)"
                                        : "Rp 15.000"
                                }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Camera Feed:</span>
                                <span class="font-mono text-green-600"
                                    >DSLR 1100D</span
                                >
                            </div>
                            <div class="flex justify-between">
                                <span>Paper Format:</span>
                                <span class="font-mono text-[#ff007f]">{{
                                    selectedPaperSize
                                }}</span>
                            </div>
                            <div
                                class="flex justify-between border-t border-black/10 pt-1 mt-1 font-bold text-black"
                            >
                                <span>Total Payment:</span>
                                <span class="font-mono text-[#fc4c02]"
                                    >Rp
                                    {{
                                        payableAmountComputed.toLocaleString(
                                            "id-ID",
                                        )
                                    }}</span
                                >
                            </div>
                        </div>

                        <!-- Start Session Button -->
                        <div class="flex gap-3">
                            <button
                                @click="startSession"
                                class="flex-1 py-4 bg-[#d8ff00] text-black border-4 border-black font-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-xs"
                            >
                                {{ translation.startSession }}
                            </button>

                            <button
                                v-if="hasRecoverableSession"
                                @click="recoverSavedSession"
                                class="px-4 py-4 bg-green-500 text-black border-4 border-black font-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-xs"
                            >
                                RESUME 🏆
                            </button>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Upright Grid template locker -->
                <div
                    class="col-span-6 bg-white border-4 border-black p-5 flex flex-col shadow-[6px_6px_0px_#00f0ff] overflow-hidden h-full min-h-0"
                >
                    <div
                        class="flex items-center justify-between mb-4 border-b-2 border-black pb-3 text-left"
                    >
                        <div>
                            <h3
                                class="text-base font-black text-black uppercase tracking-wider italic leading-none"
                            >
                                {{ translation.selectFrame }}
                            </h3>
                            <span
                                class="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-0.5 block"
                                >SELECT A FRAME MOCKUP FROM THE GALLERY
                                BELOW</span
                            >
                        </div>
                        <i class="fa-solid fa-images text-xl text-black"></i>
                    </div>

                    <!-- Custom Frame Creator Trigger -->
                    <button
                        @click="openCustomFrameCreator"
                        class="w-full mb-4 py-3 bg-[#d8ff00] text-black font-black border-4 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        <i class="fa-solid fa-palette text-sm"></i>
                        <span>BUAT TEMPLATE KUSTOM (RP 15K) 🎨</span>
                    </button>

                    <!-- Vertical locker scroll track -->
                    <div class="flex-1 overflow-y-auto pr-1 scrollbar-thin">
                        <div class="grid grid-cols-2 gap-4 pb-2">
                            <div
                                v-for="(template, index) in templates"
                                :key="template"
                                @click="selectTemplateAndProceed(template)"
                                class="group relative bg-white border-4 border-black p-3.5 cursor-pointer transition-all duration-300 flex flex-col justify-between"
                                :class="
                                    selectedTemplate === template
                                        ? 'border-[#fc4c02] bg-[#fc4c02]/5 shadow-[3px_3px_0px_#000]'
                                        : 'border-black opacity-85 hover:opacity-100 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]'
                                "
                                :style="{
                                    boxShadow:
                                        selectedTemplate === template
                                            ? ''
                                            : `3px 3px 0px ${alternatingColors[index % alternatingColors.length]}`,
                                }"
                            >
                                <!-- High-res preview container (Upright Frame Mockup) -->
                                <div
                                    class="w-full aspect-[2/3] p-1.5 flex items-center justify-center bg-[#f8f9fa] border-2 border-black rounded group-hover:scale-103 transition-transform shadow-[1px_1px_0px_#000] overflow-hidden mb-3 relative"
                                >
                                    <!-- Live CSS Custom Mockup -->
                                    <div
                                        v-if="template === 'custom'"
                                        class="w-full h-full flex flex-col justify-between p-2 relative rounded overflow-hidden"
                                        :style="{
                                            backgroundColor:
                                                activeCustomFrame.bgColor,
                                        }"
                                    >
                                        <!-- Texture overlays -->
                                        <div
                                            v-if="
                                                activeCustomFrame.pattern ===
                                                'dot'
                                            "
                                            class="absolute inset-0 opacity-[0.12] pointer-events-none"
                                            style="
                                                background-image: radial-gradient(
                                                    #000 1.5px,
                                                    transparent 1.5px
                                                );
                                                background-size: 10px 10px;
                                            "
                                        ></div>
                                        <div
                                            v-if="
                                                activeCustomFrame.pattern ===
                                                'stripes'
                                            "
                                            class="absolute inset-0 opacity-[0.08] pointer-events-none"
                                            style="
                                                background-image: repeating-linear-gradient(
                                                    45deg,
                                                    #000,
                                                    #000 4px,
                                                    transparent 4px,
                                                    transparent 8px
                                                );
                                            "
                                        ></div>

                                        <!-- Placeholder Slots -->
                                        <div
                                            class="grid gap-1 flex-1 relative z-10"
                                            :class="
                                                activeCustomFrame.slots === 3
                                                    ? 'grid-rows-3'
                                                    : 'grid-rows-4'
                                            "
                                        >
                                            <div
                                                v-for="s in activeCustomFrame.slots"
                                                :key="s"
                                                class="bg-white/40 border border-black/20 w-full h-full flex items-center justify-center text-[7px] font-black text-black/60"
                                            >
                                                POSE
                                            </div>
                                        </div>
                                        <span
                                            class="text-[7px] font-black uppercase tracking-wider text-black text-center mt-1 border-t border-black/20 pt-1 truncate relative z-10 block"
                                        >
                                            {{
                                                activeCustomFrame.title ||
                                                "STUDIO STRIP"
                                            }}
                                        </span>

                                        <!-- Live Doodle drawing overlay if exists -->
                                        <img
                                            v-if="activeCustomFrame.drawing"
                                            :src="activeCustomFrame.drawing"
                                            class="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
                                        />
                                    </div>

                                    <img
                                        v-else
                                        :src="`http://photobooth.test/images/${template}`"
                                        class="h-full object-contain"
                                    />
                                </div>

                                <!-- Specs and Name Tag -->
                                <div class="text-left">
                                    <span
                                        class="px-2 py-0.5 border border-black text-[9px] font-black text-black uppercase tracking-widest rounded-none mb-1 inline-block shadow-[1px_1px_0px_#000]"
                                        :class="[
                                            alternatingBgColors[
                                                index %
                                                    alternatingBgColors.length
                                            ],
                                        ]"
                                    >
                                        {{
                                            template === "frame_newspaper.png"
                                                ? "RETRO NEWSPAPER"
                                                : template === "custom"
                                                  ? "LIVE CREATOR"
                                                  : "CREATIVE CARD"
                                        }}
                                    </span>
                                    <h4
                                        class="text-xs font-black text-black uppercase tracking-wide italic leading-none mt-1"
                                    >
                                        {{
                                            template === "custom"
                                                ? "CUSTOM STRIP"
                                                : template
                                                      .split(".")[0]
                                                      .replace("frame_", "")
                                                      .replace("_", " ")
                                        }}
                                    </h4>
                                    <div
                                        class="text-[8px] text-gray-500 space-y-0.5 uppercase font-black mt-2"
                                    >
                                        <p>
                                            Slots:
                                            <span class="text-black font-black"
                                                >{{
                                                    TEMPLATE_CONFIG[template]
                                                        ?.slots
                                                }}
                                                Poses</span
                                            >
                                        </p>
                                        <p>
                                            Max Shots:
                                            <span class="text-black font-black"
                                                >{{
                                                    TEMPLATE_CONFIG[template]
                                                        ?.maxPhotos
                                                }}
                                                snaps</span
                                            >
                                        </p>
                                    </div>
                                </div>

                                <!-- Active check icon -->
                                <div
                                    v-if="selectedTemplate === template"
                                    class="absolute top-2 right-2 w-6 h-6 bg-[#fc4c02] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000] z-20 animate-scale-up"
                                >
                                    <i
                                        class="fa-solid fa-circle-check text-black text-sm"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- ======================= -->
            <!-- STATE B: CAPTURING      -->
            <!-- ======================= -->
            <template v-if="state === 'capturing'">
                <!-- LEFT COLUMN: Capturing Stats HUD Panel -->
                <div
                    class="col-span-4 bg-white border-4 border-black p-5 flex flex-col justify-between shadow-[6px_6px_0px_#00f0ff] h-full min-h-0 overflow-hidden"
                >
                    <div class="space-y-4">
                        <div
                            class="flex items-center gap-3 border-b-2 border-black pb-3 text-left"
                        >
                            <i
                                class="fa-solid fa-clock text-xl text-[#fc4c02] animate-pulse"
                            ></i>
                            <div>
                                <h3
                                    class="text-base font-black text-black uppercase tracking-wider italic leading-none"
                                >
                                    {{ translation.capturingTitle }}
                                </h3>
                                <span
                                    class="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-0.5 block"
                                    >TELEMETRY SYSTEM ACTIVE</span
                                >
                            </div>
                        </div>

                        <!-- telemetry widgets list -->
                        <div class="space-y-4 text-left">
                            <div
                                class="bg-neutral-50 border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]"
                            >
                                <span
                                    class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest block mb-0.5"
                                    >POSE INDEX</span
                                >
                                <div
                                    class="text-4xl font-mono font-black text-[#fc4c02]"
                                >
                                    {{ capturedPhotos.length + 1 }} /
                                    {{ maxPhotos }}
                                </div>
                            </div>

                            <div
                                class="bg-neutral-50 border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]"
                            >
                                <span
                                    class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest block mb-0.5"
                                    >SESSION TIMER</span
                                >
                                <div
                                    class="text-4xl font-mono font-black text-black"
                                >
                                    {{ countdown
                                    }}<span
                                        class="text-sm text-[#fc4c02] font-black"
                                        >.00s</span
                                    >
                                </div>
                                <!-- Green progress track -->
                                <div
                                    class="w-full bg-white border-2 border-black h-4 overflow-hidden mt-2 shadow-[1px_1px_0px_#00ff66]"
                                >
                                    <div
                                        class="bg-[#00ff66] h-full transition-all duration-1000"
                                        :style="{
                                            width: `${(countdown / 5) * 100}%`,
                                        }"
                                    ></div>
                                </div>
                            </div>

                            <div
                                class="bg-neutral-50 border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]"
                            >
                                <span
                                    class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest block mb-0.5"
                                    >ACTIVE CAMERA</span
                                >
                                <div
                                    class="text-xs font-black text-black mt-1 uppercase"
                                >
                                    📸 Canon DSLR 1100D
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Touchless simulation snap trigger -->
                    <div
                        v-if="isTouchlessMode"
                        class="bg-neutral-50 border-2 border-black p-3.5 text-left shadow-[2px_2px_0px_#00ff66]"
                    >
                        <span
                            class="text-[9px] font-black text-black uppercase tracking-widest block mb-1"
                            >📲 REMOTE SHUTTER</span
                        >
                        <button
                            @click="triggerTouchlessSnap"
                            class="w-full py-2.5 bg-[#00f0ff] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all text-[10px] uppercase tracking-widest"
                        >
                            Simulate Snap ⚡
                        </button>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Viewfinder stream -->
                <div
                    class="col-span-8 relative bg-white border-4 border-black overflow-hidden shadow-[6px_6px_0px_#ff007f] flex items-center justify-center h-full"
                >
                    <div
                        class="w-full h-full relative aspect-video flex items-center justify-center bg-neutral-900 overflow-hidden"
                    >
                        <div
                            class="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
                            style="
                                background-image: radial-gradient(
                                    #fff 1.5px,
                                    transparent 1.5px
                                );
                                background-size: 30px 30px;
                            "
                        ></div>

                        <img
                            ref="videoEl"
                            v-show="dslrLiveViewUrl && !liveViewError"
                            :src="dslrLiveViewUrl"
                            @load="handleLiveViewLoad"
                            @error="handleLiveViewError"
                            class="w-full h-full object-cover relative z-0"
                            :style="viewfinderStyle"
                        />

                        <!-- Processing overlay when taking picture -->
                        <div
                            v-if="isCapturingPhoto"
                            class="absolute inset-0 z-30 bg-black/85 flex flex-col items-center justify-center text-center animate-scale-up"
                        >
                            <div class="relative w-16 h-16 mb-4 flex items-center justify-center border-4 border-black bg-[#d8ff00] shadow-[3px_3px_0px_#fc4c02]">
                                <div class="absolute inset-0 border-4 border-transparent border-t-[#fc4c02] animate-spin" style="animation-duration: 0.8s;"></div>
                                <i class="fa-solid fa-camera text-xl text-black"></i>
                            </div>
                            <span class="text-sm font-black text-white uppercase tracking-widest italic animate-pulse">PROCESSING PHOTO...</span>
                            <span class="text-[9px] text-gray-400 font-mono mt-1 uppercase tracking-wider">LENS SHUTTER OPEN • RETRIEVING FRAME</span>
                        </div>

                        <!-- Massive dynamic countdown overlap -->
                        <div
                            v-if="countdown >= 0 && !isCapturingPhoto"
                            class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        >
                            <span
                                class="text-[12rem] font-mono font-black italic text-[#d8ff00] filter drop-shadow-[0_8px_0px_#000] animate-ping"
                                style="animation-duration: 1s"
                            >
                                {{ countdown }}
                            </span>
                        </div>

                        <!-- Running telemetry labels -->
                        <div
                            class="absolute bottom-3 left-3 z-20 bg-black border-2 border-black px-3 py-1.5 flex items-center gap-2 shadow-[1px_1px_0px_#fc4c02]"
                        >
                            <span
                                class="w-2.5 h-2.5 bg-[#fc4c02] rounded-full animate-pulse"
                            ></span>
                            <span
                                class="text-[9px] font-mono font-black text-white uppercase tracking-widest"
                                >RECORDING HUD INDEX</span
                            >
                        </div>
                    </div>

                    <!-- Flash frame screen visualizer -->
                    <div
                        v-if="flash"
                        class="absolute inset-0 bg-white z-40 animate-fade-out"
                        style="animation-duration: 0.15s"
                    ></div>
                </div>
            </template>

            <!-- ======================= -->
            <!-- STATE C: PREVIEWING     -->
            <!-- ======================= -->
            <template v-if="state === 'previewing'">
                <!-- LEFT COLUMN: Photo Preview Viewport -->
                <div
                    class="col-span-8 bg-white border-4 border-black overflow-hidden shadow-[6px_6px_0px_#00ff66] flex items-center justify-center relative h-full"
                >
                    <div
                        class="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
                        style="
                            background-image: radial-gradient(
                                #000 1.5px,
                                transparent 1.5px
                            );
                            background-size: 25px 25px;
                        "
                    ></div>
                    <img
                        :src="currentPreviewPhoto"
                        class="w-full h-full object-contain relative z-0"
                    />

                    <!-- Dynamic watermark details label -->
                    <div
                        class="absolute top-3 left-3 z-20 flex flex-col text-left"
                    >
                        <span
                            class="px-3 py-1 bg-[#fc4c02] text-black border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#000]"
                        >
                            PREVIEW HUD INDEX
                        </span>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Creative Filter Controls & Actions Sidebar -->
                <div
                    class="col-span-4 bg-white border-4 border-black p-5 flex flex-col justify-between shadow-[6px_6px_0px_#ff007f] h-full min-h-0 overflow-hidden"
                >
                    <div class="flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div
                            class="flex items-center gap-3 mb-4 border-b-2 border-black pb-3 text-left"
                        >
                            <i
                                class="fa-solid fa-wand-magic-sparkles text-xl text-black"
                            ></i>
                            <div>
                                <h3
                                    class="text-base font-black text-black uppercase tracking-wider italic leading-none"
                                >
                                    PREVIEW SHADERS
                                </h3>
                                <span
                                    class="text-[9px] text-gray-500 font-mono tracking-widest uppercase font-bold block mt-0.5"
                                    >SELECT EFFECT SHADERS</span
                                >
                            </div>
                        </div>

                        <!-- Custom filter selector columns -->
                        <div
                            class="flex-1 overflow-y-auto pr-1 text-left space-y-2 scrollbar-thin"
                        >
                            <button
                                v-for="(filter, index) in [
                                    'original',
                                    'mono',
                                    'sepia',
                                    'vivid',
                                    'warm',
                                    'cold',
                                ]"
                                :key="filter"
                                @click="
                                    activeFilter = filter;
                                    applyFilterToPhotoData(currentPreviewPhoto);
                                "
                                class="w-full px-3 py-2.5 bg-neutral-50 border-2 border-black text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between text-black"
                                :class="
                                    activeFilter === filter
                                        ? 'bg-[#d8ff00] text-black shadow-[2px_2px_0px_#000]'
                                        : 'text-gray-500 hover:border-black hover:text-black shadow-[2px_2px_0px_#000]'
                                "
                                :style="{
                                    borderLeftColor:
                                        activeFilter === filter
                                            ? ''
                                            : alternatingColors[
                                                  index %
                                                      alternatingColors.length
                                              ],
                                    borderLeftWidth:
                                        activeFilter === filter ? '' : '5px',
                                }"
                            >
                                <span>🏁 {{ filter }}</span>
                                <i
                                    class="fa-solid fa-circle-check text-black"
                                    v-if="activeFilter === filter"
                                ></i>
                            </button>
                        </div>
                    </div>

                    <!-- Telemetry action gear shifts stack -->
                    <div class="space-y-3 mt-4">
                        <button
                            @click="retakePhoto"
                            class="w-full py-3 bg-neutral-200 text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-1.5"
                        >
                            <i class="fa-solid fa-rotate-left"></i>
                            <span>{{ translation.retake }}</span>
                        </button>

                        <button
                            v-if="capturedPhotos.length + 1 < requiredPhotos"
                            @click="keepPhotoAndNext"
                            class="w-full py-3.5 bg-[#00ff66] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-1.5"
                        >
                            <span>{{ translation.keepNext }}</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>

                        <button
                            v-else
                            @click="keepPhotoAndFinish"
                            class="w-full py-3.5 bg-[#d8ff00] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-1.5"
                        >
                            <span>{{ translation.finishSelect }}</span>
                            <i class="fa-solid fa-circle-check"></i>
                        </button>
                    </div>
                </div>
            </template>

            <!-- ======================= -->
            <!-- STATE D: SELECTION      -->
            <!-- ======================= -->
            <template v-if="state === 'selection'">
                <!-- LEFT COLUMN: Polaroid Selection Deck -->
                <div
                    class="col-span-8 bg-white border-4 border-black p-6 flex flex-col justify-between shadow-[6px_6px_0px_#000] h-full min-h-0 overflow-hidden"
                >
                    <div class="flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div
                            class="flex items-center justify-between border-b-2 border-black pb-3 mb-4 text-left"
                        >
                            <div>
                                <h3
                                    class="text-lg font-black text-black uppercase italic leading-none font-sans"
                                >
                                    {{ translation.selectBest }}
                                </h3>
                                <span
                                    class="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-0.5 block"
                                    >CHOOSE EXACTLY {{ requiredPhotos }} POSES
                                    TO OVERLAY</span
                                >
                            </div>
                            <span
                                class="px-4 py-2 bg-neutral-50 border-2 border-black text-[#fc4c02] font-mono font-black text-xs shadow-[2px_2px_0px_#ff007f] uppercase tracking-wider flex items-center gap-1"
                            >
                                <i class="fa-solid fa-image"></i>
                                <span
                                    >CHOSEN: {{ selectedPhotoIndices.length }} /
                                    {{ requiredPhotos }}</span
                                >
                            </span>
                        </div>

                        <!-- Polaroid Grid Selection Shelf -->
                        <div
                            class="flex-1 overflow-y-auto pr-1 grid grid-cols-3 gap-4 scrollbar-thin"
                        >
                            <div
                                v-for="(photo, index) in capturedPhotos"
                                :key="index"
                                @click="toggleSelection(index)"
                                class="group relative bg-neutral-50 p-2.5 border-4 cursor-pointer transition-all duration-300 transform"
                                :class="[
                                    selectedPhotoIndices.includes(index)
                                        ? 'border-[#fc4c02] bg-[#fc4c02]/5 shadow-[3px_3px_0px_#000]'
                                        : 'border-black opacity-85 hover:opacity-100 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]',
                                ]"
                            >
                                <div
                                    class="aspect-[3/4] bg-white border-2 border-black overflow-hidden relative"
                                >
                                    <img
                                        :src="photo"
                                        class="w-full h-full object-cover"
                                    />

                                    <div
                                        v-if="
                                            selectedPhotoIndices.includes(index)
                                        "
                                        class="absolute top-1.5 right-1.5 w-6 h-6 bg-[#00ff66] border-2 border-black text-black font-mono font-black flex items-center justify-center shadow-[1px_1px_0px_#000] z-10 text-xs"
                                    >
                                        {{
                                            selectedPhotoIndices.indexOf(
                                                index,
                                            ) + 1
                                        }}
                                    </div>
                                </div>

                                <div
                                    class="mt-2 flex justify-between items-center text-[9px] uppercase font-black"
                                >
                                    <span
                                        :style="{
                                            color: alternatingColors[
                                                index % alternatingColors.length
                                            ],
                                        }"
                                        >POSE {{ index + 1 }}</span
                                    >
                                    <span class="text-black"
                                        >SLOT {{ index + 1 }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Final Checkout -->
                <div
                    class="col-span-4 bg-white border-4 border-black p-5 flex flex-col justify-between shadow-[6px_6px_0px_#d8ff00] h-full min-h-0 overflow-hidden"
                >
                    <div class="space-y-4">
                        <div
                            class="flex items-center gap-3 mb-3 border-b-2 border-black pb-3 text-left"
                        >
                            <i
                                class="fa-solid fa-bag-shopping text-xl text-black"
                            ></i>
                            <div>
                                <h3
                                    class="text-base font-black text-black uppercase tracking-wider italic leading-none"
                                >
                                    CHECKOUT
                                </h3>
                                <span
                                    class="text-[9px] text-gray-500 font-mono tracking-widest uppercase font-bold block mt-0.5"
                                    >FINALIZE LAP RUN</span
                                >
                            </div>
                        </div>

                        <!-- Checklist guidelines -->
                        <div
                            class="space-y-2.5 text-[10px] font-black uppercase text-black text-left"
                        >
                            <div
                                class="flex items-center gap-2 bg-[#f8f9fa] border border-black p-2.5 shadow-[1px_1px_0px_#00ff66]"
                            >
                                <i
                                    class="fa-solid fa-circle-check text-green-600"
                                ></i>
                                <span
                                    >Select exactly
                                    {{ requiredPhotos }} shots</span
                                >
                            </div>
                            <div
                                class="flex items-center gap-2 bg-[#f8f9fa] border border-black p-2.5 shadow-[1px_1px_0px_#ff007f]"
                            >
                                <i
                                    class="fa-solid fa-circle-check text-[#ff007f]"
                                ></i>
                                <span>Watermarks applied</span>
                            </div>
                        </div>

                        <!-- Consent settings -->
                        <div class="border-t-2 border-black pt-3 text-left">
                            <div
                                class="flex items-center justify-between mb-1.5"
                            >
                                <span
                                    class="text-[10px] font-black uppercase tracking-wider text-orange-600"
                                    >Public Gallery Consent</span
                                >
                                <input
                                    v-model="publicationConsent"
                                    type="checkbox"
                                    class="w-4.5 h-4.5 accent-orange-600 bg-white border-2 border-black"
                                />
                            </div>
                            <p
                                class="text-[9px] text-gray-500 uppercase font-black leading-relaxed"
                            >
                                Tampilkan hasil cetak Anda di papan peringkat
                                galeri publik.
                            </p>
                        </div>
                    </div>

                    <div class="space-y-2.5 mt-4">
                        <button
                            @click="resetCamera"
                            class="w-full py-2.5 bg-neutral-100 text-black font-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-1.5"
                        >
                            <i class="fa-solid fa-arrow-rotate-left"></i>
                            <span>Reset Session</span>
                        </button>
                        <button
                            @click="processMedia"
                            :disabled="
                                selectedPhotoIndices.length !== requiredPhotos
                            "
                            class="w-full py-3.5 font-black border-4 border-black transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                            :class="
                                selectedPhotoIndices.length === requiredPhotos
                                    ? 'bg-[#00ff66] text-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]'
                                    : 'bg-neutral-200 text-gray-400 cursor-not-allowed shadow-none border-neutral-200'
                            "
                        >
                            <span>{{ translation.checkoutSession }}</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </template>

            <!-- ======================= -->
            <!-- STATE E: PROCESSING     -->
            <!-- ======================= -->
            <template v-if="state === 'processing'">
                <div
                    class="col-span-12 bg-white border-4 border-black p-10 flex flex-col justify-center items-center shadow-[10px_10px_0px_#d8ff00] h-full"
                >
                    <!-- Brutalist progress spinner -->
                    <div class="relative w-20 h-20 mb-6">
                        <div
                            class="absolute inset-0 border-8 border-black animate-spin"
                            style="
                                border-top-color: #fc4c02;
                                animation-duration: 0.8s;
                            "
                        ></div>
                        <div
                            class="absolute inset-2 border-4 border-black bg-white flex items-center justify-center"
                        >
                            <i
                                class="fa-solid fa-compact-disc fa-spin text-xl text-[#fc4c02]"
                            ></i>
                        </div>
                    </div>

                    <h3
                        class="text-2xl font-black text-black uppercase italic tracking-wider font-sans mb-2 text-center"
                    >
                        {{ translation.processing }}
                    </h3>
                    <p
                        class="text-gray-500 text-xs font-black uppercase tracking-widest text-center max-w-md mb-6"
                    >
                        {{ translation.processingSub }}
                    </p>

                    <!-- Simulated step calibration grid -->
                    <div class="grid grid-cols-3 gap-3 w-full max-w-md">
                        <div
                            class="bg-neutral-50 border-2 border-black p-3 text-center shadow-[1px_1px_0px_#fc4c02] flex flex-col items-center gap-0.5"
                        >
                            <i
                                class="fa-solid fa-layer-group text-base text-[#fc4c02]"
                            ></i>
                            <span
                                class="text-xs text-black font-black uppercase mt-1"
                                >GRID OVERLAY</span
                            >
                        </div>
                        <div
                            class="bg-neutral-50 border-2 border-black p-3 text-center shadow-[1px_1px_0px_#00ff66] flex flex-col items-center gap-0.5"
                        >
                            <i
                                class="fa-solid fa-film text-base text-[#00ff66]"
                            ></i>
                            <span
                                class="text-xs text-black font-black uppercase mt-1"
                                >GIF EXPORT</span
                            >
                        </div>
                        <div
                            class="bg-neutral-50 border-2 border-black p-3 text-center shadow-[1px_1px_0px_#00f0ff] flex flex-col items-center gap-0.5"
                        >
                            <i
                                class="fa-solid fa-print text-base text-[#00f0ff]"
                            ></i>
                            <span
                                class="text-xs text-black font-black uppercase mt-1"
                                >PRINT SPOOL</span
                            >
                        </div>
                    </div>
                </div>
            </template>

            <!-- ======================= -->
            <!-- STATE G: PAYMENT       -->
            <!-- ======================= -->
            <template v-if="state === 'payment'">
                <div
                    class="col-span-12 bg-white border-4 border-black p-8 flex flex-col justify-center items-center shadow-[10px_10px_0px_#00f0ff] h-full"
                >
                    <div class="text-center mb-8">
                        <h3
                            class="text-2xl font-black text-black uppercase italic tracking-wider mb-2"
                        >
                            💳 Pembayaran
                        </h3>
                        <p
                            class="text-gray-500 text-xs font-black uppercase tracking-widest"
                        >
                            Silakan scan QR untuk membayar
                        </p>
                    </div>

                    <div
                        v-if="paymentQRUrl"
                        class="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#fc4c02] mb-6"
                    >
                        <img
                            :src="paymentQRUrl"
                            alt="QR Payment"
                            class="w-64 h-64 object-contain"
                        />
                    </div>
                    <div
                        v-else
                        class="bg-neutral-100 border-4 border-black p-8 mb-6 shadow-[4px_4px_0px_#fc4c02]"
                    >
                        <i
                            class="fa-solid fa-qrcode text-6xl text-gray-400"
                        ></i>
                        <p class="text-gray-500 text-xs mt-2">
                            QR Payment belum dikonfigurasi
                        </p>
                    </div>

                    <div
                        class="bg-neutral-50 border-2 border-black p-4 text-left w-full max-w-md mb-6 shadow-[2px_2px_0px_#000]"
                    >
                        <div
                            class="flex justify-between text-xs font-black uppercase"
                        >
                            <span>Total Pembayaran:</span>
                            <span class="text-[#fc4c02] text-lg"
                                >Rp
                                {{
                                    payableAmountComputed.toLocaleString(
                                        "id-ID",
                                    )
                                }}</span
                            >
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button
                            @click="resetCamera"
                            class="px-6 py-3 bg-neutral-200 text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all uppercase tracking-widest text-xs"
                        >
                            Batal
                        </button>
                        <button
                            @click="confirmPayment"
                            class="px-8 py-3 bg-[#00ff66] text-black border-4 border-black font-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-xs"
                        >
                            <span>Konfirmasi Pembayaran ✓</span>
                        </button>
                    </div>
                </div>
            </template>

            <!-- ======================= -->
            <!-- STATE F: ERROR          -->
            <!-- ======================= -->
            <template v-if="state === 'error'">
                <div
                    class="col-span-12 bg-white border-4 border-black p-10 flex flex-col justify-center items-center shadow-[10px_10px_0px_#ef4444] h-full"
                >
                    <div
                        class="w-16 h-16 bg-red-500 border-4 border-black text-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000]"
                    >
                        <i
                            class="fa-solid fa-triangle-exclamation text-3xl text-black"
                        ></i>
                    </div>

                    <h3
                        class="text-xl font-black text-black uppercase italic tracking-wider mb-2 leading-none"
                    >
                        RUN ENCOUNTERED ERROR!
                    </h3>
                    <p
                        class="text-red-600 text-xs font-black uppercase tracking-widest max-w-lg mb-6 text-center bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]"
                    >
                        {{ errorMessage }}
                    </p>

                    <div class="flex gap-3">
                        <button
                            @click="resetCamera"
                            class="px-6 py-3 bg-[#fc4c02] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all uppercase tracking-widest text-[10px]"
                        >
                            Kembali ke Menu Utama 🏠
                        </button>
                    </div>
                </div>
            </template>
        </div>

        <!-- Hidden canvas templates -->
        <div class="hidden">
            <canvas ref="canvasEl"></canvas>
            <canvas ref="recordingCanvasEl"></canvas>
        </div>

        <!-- Interactive Help Tutorial Drawer Overlay -->
        <Teleport to="body">
            <div
                v-if="showTutorial"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in"
            >
                <div
                    class="w-full max-w-xl bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#d8ff00] relative text-left"
                >
                    <button
                        @click="showTutorial = false"
                        class="absolute top-4 right-4 text-gray-500 hover:text-black bg-neutral-100 p-1.5 border border-black shadow-[1px_1px_0px_#000]"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div
                        class="flex items-center gap-3 mb-5 border-b-2 border-black pb-3"
                    >
                        <i
                            class="fa-solid fa-wand-magic-sparkles text-2xl text-black"
                        ></i>
                        <div>
                            <h2
                                class="text-xl font-black text-black uppercase italic leading-none"
                            >
                                HIDDENGEM STUDIO GUIDE
                            </h2>
                            <span
                                class="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-0.5 block"
                                >READ RULES BEFORE ENTERING STUDIO</span
                            >
                        </div>
                    </div>

                    <!-- Step rules grid -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        <div
                            class="bg-neutral-50 border-2 border-black p-4 shadow-[2px_2px_0px_#ff007f] text-left"
                        >
                            <div
                                class="w-8 h-8 bg-[#d8ff00] border border-black text-black flex items-center justify-center font-black text-sm mb-2 shadow-[1px_1px_0px_#000]"
                            >
                                01
                            </div>
                            <h4
                                class="font-black text-black text-xs uppercase mb-1 leading-none"
                            >
                                SELECT FRAME
                            </h4>
                            <p
                                class="text-[9px] text-gray-600 leading-relaxed uppercase font-black"
                            >
                                Pilih bingkai cetak strip favorit Anda pada
                                locker shelf di kanan.
                            </p>
                        </div>

                        <div
                            class="bg-neutral-50 border-2 border-black p-4 shadow-[2px_2px_0px_#00f0ff] text-left"
                        >
                            <div
                                class="w-8 h-8 bg-[#ff007f] border border-black text-black flex items-center justify-center font-black text-sm mb-2 shadow-[1px_1px_0px_#000]"
                            >
                                02
                            </div>
                            <h4
                                class="font-black text-black text-xs uppercase mb-1 leading-none"
                            >
                                POSE DECK LAPS
                            </h4>
                            <p
                                class="text-[9px] text-gray-600 leading-relaxed uppercase font-black"
                            >
                                Ambil total 5-6 pose laps. Setiap lap kamera
                                digiCamControl memotret otomatis.
                            </p>
                        </div>

                        <div
                            class="bg-neutral-50 border-2 border-black p-4 shadow-[2px_2px_0px_#00ff66] text-left"
                        >
                            <div
                                class="w-8 h-8 bg-[#00f0ff] border border-black text-black flex items-center justify-center font-black text-sm mb-2 shadow-[1px_1px_0px_#000]"
                            >
                                03
                            </div>
                            <h4
                                class="font-black text-black text-xs uppercase mb-1 leading-none"
                            >
                                PICK CHAMPION
                            </h4>
                            <p
                                class="text-[9px] text-gray-600 leading-relaxed uppercase font-black"
                            >
                                Pilih 3 atau 4 foto polaroid terbaik untuk
                                disinkronkan ke dalam strip cetak.
                            </p>
                        </div>
                    </div>

                    <button
                        @click="showTutorial = false"
                        class="w-full py-3.5 bg-[#d8ff00] text-black border-4 border-black font-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all uppercase tracking-widest text-xs text-center"
                    >
                        SAYA MENGERTI & MASUK STUDIO! 🚀
                    </button>
                </div>
            </div>
        </Teleport>

        <!-- Custom Frame Creator Modal (Extracted to components/CustomTemplateEditor.vue) -->
        <CustomTemplateEditor
            v-model:show="showCustomCreator"
            v-model="activeCustomFrame"
            @save="saveCustomTemplate"
        />

        <!-- Footer -->
        <footer class="relative z-50 py-3 border-t-4 border-black bg-white">
            <div class="max-w-7xl mx-auto text-center">
                <p
                    class="text-gray-500 text-[9px] tracking-widest uppercase font-black leading-none"
                >
                    <span class="text-black">HiddenGem</span>
                    <span class="text-[#fc4c02]">Studio</span>
                    <span class="text-gray-400 mx-2">•</span>
                    <span>LUXURY CREATIVE PHOTO KIOSK SYSTEM v2.0 ✦</span>
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import {
    ref,
    reactive,
    computed,
    onMounted,
    onBeforeUnmount,
    watch,
} from "vue";
import { useRouter } from "nuxt/app";
import { useHead } from "#imports";
import { applyWebGLFilter } from "~/utils/webgl-filters";

const router = useRouter();

// Load Font Awesome 6 CDN styles dynamically inside head
useHead({
    link: [
        {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        },
    ],
});

// Visual helpers for locker list
const alternatingColors = [
    "#d8ff00",
    "#ff007f",
    "#00f0ff",
    "#00ff66",
    "#fc4c02",
];
const alternatingBgColors = [
    "bg-[#d8ff00] text-black shadow-[1px_1px_0px_#000]",
    "bg-[#ff007f] text-black shadow-[1px_1px_0px_#000]",
    "bg-[#00f0ff] text-black shadow-[1px_1px_0px_#000]",
    "bg-[#00ff66] text-black shadow-[1px_1px_0px_#000]",
    "bg-[#fc4c02] text-black shadow-[1px_1px_0px_#000]",
];

// Reactive State Controllers
const state = ref("idle");
const countdown = ref(5);
const flash = ref(false);
const errorMessage = ref("");

const videoEl = ref(null);
const canvasEl = ref(null);
const recordingCanvasEl = ref(null);

const cameraReady = ref(false);
const dslrLiveViewUrl = ref("");
const liveViewError = ref(false);
const isCapturingPhoto = ref(false);
const dccPort = ref("5513");

// Remote configurations
const eventName = ref("HiddenGemBooth");
const activePrice = ref(25000);
const voucherList = ref(["HGEM100", "VCHR20", "DISC10"]);
const ticketList = ref(["TICKET01", "TICKET02"]);

// Inactivity Timeout & Consent
const timeoutSeconds = ref(60);
let timeoutInterval = null;
const publicationConsent = ref(true);

// Camera Rotation & Mirroring
const cameraRotation = ref(0);
const isMirrored = ref(true);

// Kiosk States
const lang = ref("id");
const isTouchlessMode = ref(false);
const isAiBeautifyActive = ref(true);
const selectedPaperSize = ref("strip");
const extraPrints = ref(0);
const hasRecoverableSession = ref(false);

// Payment & Voucher System
const showTutorial = ref(true);
const appliedDiscount = ref(0);

// QR Payment Settings
const paymentQREnabled = ref(false);
const paymentQRUrl = ref("");
let pendingSessionId = null;

const payableAmountComputed = computed(() => {
    const base = activePrice.value * (1 - appliedDiscount.value);
    const prints = extraPrints.value * 10000;
    const customSurcharge = customFrameSurcharge.value;
    return Math.max(0, base + prints + customSurcharge);
});

// Translation vocabularies computed
const translation = computed(() => {
    const list = {
        id: {
            selectFrame: "PILIH BINGKAI FOTO",
            kioskSettings: "📊 PENGATURAN KIOSK MANDIRI",
            touchlessMode: "MODE NIR-SENTUH",
            touchlessDesc:
                "Kendalikan sesi foto secara nirsentuh menggunakan smartphone Anda. Pindai kode QR.",
            aiBeautify: "AI AUTO-BEAUTIFY SENSOR",
            aiDesc: "Otomatis meningkatkan kecerahan, kontras kulit, & ketajaman kamera.",
            paperSize: "UKURAN KERTAS DINAMIS",
            printCopies: "EKSTRA PRINT (SALINAN)",
            priceSummary: "🏁 RINCIAN BIAYA",
            basePrice: "Tarif Sesi Foto",
            extraPrintCost: "Ekstra Cetak",
            payableAmount: "Total Pembayaran",
            startSession: "MULAI SESI STUDIO 🚀",
            resumeSession: "🏆 RESUME UNFINISHED RUN",
            capturingTitle: "SESSION TIME",
            retake: "RETAKE FOTO 🔁",
            keepNext: "SIMPAN & POSE SELANJUTNYA ➡️",
            finishSelect: "SELESAI & POSE SELESAI 🏆",
            selectBest: "PILIH KARTU FOTO TERBAIK!",
            checkoutSession: "PROSES PHOTOSTRIP 🏁",
            processing: "Sedang Merender Momenmu...",
            processingSub:
                "Mempersiapkan Photo Strip, GIF Boomerang, dan Video Behind-The-Scenes",
        },
        en: {
            selectFrame: "CHOOSE CREATIVE FRAME",
            kioskSettings: "📊 SELF-SERVICE KIOSK DECK",
            touchlessMode: "TOUCHLESS REMOTE MODE",
            touchlessDesc:
                "Control the camera capturing deck remotely using your smartphone. Scan the QR.",
            aiBeautify: "AI AUTO-BEAUTIFY SHADER",
            aiDesc: "Auto-optimize athletic contrast, skin tones, and camera sharpness.",
            paperSize: "DYNAMIC PAPER SIZE",
            printCopies: "ADDITIONAL PRINT COPIES",
            priceSummary: "🏁 STUDIO COST DETAILS",
            basePrice: "Session Base Tariff",
            extraPrintCost: "Extra Print Sheets",
            payableAmount: "Total Payable",
            startSession: "START RUN CAPTURE 🚀",
            resumeSession: "🏆 RESUME PREVIOUS RUN",
            capturingTitle: "SESSION TIMER",
            retake: "RETAKE CAPTURE 🔁",
            keepNext: "KEEP & NEXT POSE ➡️",
            finishSelect: "FINISH & CHOOSE 🏆",
            selectBest: "SELECT CHAMPION POSES!",
            checkoutSession: "PROCESS PHOTOSTRIP 🏁",
            processing: "Rendering Your Moments...",
            processingSub:
                "Preparing Photo Strip, Boomerang GIF, and Behind-The-Scenes Video",
        },
    };
    return list[lang.value];
});

// Custom Filter Effects
const activeFilter = ref("original");
const filterClasses = {
    original: "",
    mono: "grayscale contrast-125 brightness-95",
    sepia: "sepia contrast-110 brightness-95",
    vivid: "saturate-150 contrast-110 brightness-105",
    warm: "sepia-[0.25] saturate-110 hue-rotate-15 contrast-105",
    cold: "saturate-90 hue-rotate-[340deg] contrast-105 brightness-100",
};
const activeFilterClass = computed(() => filterClasses[activeFilter.value]);

// Video BTS Recorders
let mediaRecorder = null;
let recordedChunks = [];
let timerInterval = null;
let finalVideoBlob = null;
let recordingAnimationFrame = null;
let connectionInterval = null;

// Session pose variables
const capturedPhotos = ref([]);
const currentPreviewPhoto = ref(null);
const selectedPhotoIndices = ref([]);

// Custom Frame Creator States & Logic
const showCustomCreator = ref(false);
const creatorPasscodeText = ref("");
const creatorPasscodeSuccess = ref(false);
const creatorPasscodeError = ref(false);

const activeCustomFrame = reactive({
    active: false,
    bgColor: "#fc4c02",
    title: "CREATIVE SESSION",
    slots: 4,
    pattern: "dot",
    isAdmin: false,
    drawing: null,
});

// Custom Template Creator controls
const openCustomFrameCreator = () => {
    showCustomCreator.value = true;
};

const saveCustomTemplate = () => {
    activeCustomFrame.active = true;
    selectedTemplate.value = "custom";
    showCustomCreator.value = false;
};

// Template configurations
const TEMPLATE_CONFIG = reactive({
    "frame_1.png": { slots: 4, maxPhotos: 6, aspectRatio: "530/304" },
    "frame_2.png": { slots: 3, maxPhotos: 5, aspectRatio: "421/335" },
    "frame_3.png": { slots: 3, maxPhotos: 5, aspectRatio: "489/260" },
    "frame_newspaper.png": { slots: 4, maxPhotos: 6, aspectRatio: "460/310" },
    custom: { slots: 4, maxPhotos: 6, aspectRatio: "500/300" },
});

watch(
    () => activeCustomFrame.slots,
    (newSlots) => {
        TEMPLATE_CONFIG.custom.slots = newSlots;
        TEMPLATE_CONFIG.custom.maxPhotos = newSlots + 2;
    },
);

const templates = ref([
    "frame_1.png",
    "frame_2.png",
    "frame_3.png",
    "frame_newspaper.png",
    "custom",
]);
const selectedTemplate = ref(templates.value[0]);
const requiredPhotos = computed(
    () => TEMPLATE_CONFIG[selectedTemplate.value]?.slots || 3,
);
const maxPhotos = computed(
    () => TEMPLATE_CONFIG[selectedTemplate.value]?.maxPhotos || 5,
);

const customFrameSurcharge = computed(() => {
    if (selectedTemplate.value === "custom") {
        return activeCustomFrame.isAdmin ? 0 : 15000;
    }
    return 0;
});

const API_URL = "http://photobooth.test/api";
// LAN QR fallback for touchless remote
const devLanIp = ref("192.168.1.15");
const useLanIpTouchless = ref(true);
const touchlessQrLink = computed(() => {
    if (!process.client) return "";
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : "";
    const base = useLanIpTouchless.value
        ? `${protocol}//${devLanIp.value}${port}`
        : window.location.origin;
    return `${base}/remote-control?session=active`;
});

const setUseLanTouchless = (v) => {
    useLanIpTouchless.value = !!v;
};

const loadDevLanIp = async () => {
    if (!process.client) return;
    try {
        const response = await fetch("/api/host");
        if (!response.ok) return;
        const data = await response.json();
        if (data?.lanIp) {
            devLanIp.value = data.lanIp;
        }
    } catch (err) {
        console.warn("Could not load LAN IP for touchless QR", err);
    }
};
const DCC_BASE_URL = computed(() => `http://localhost:${dccPort.value}`);

const viewfinderStyle = computed(() => {
    let transform = "";
    if (isMirrored.value) transform += "scaleX(-1) ";
    if (cameraRotation.value !== 0)
        transform += `rotate(${cameraRotation.value}deg) `;
    return {
        transform,
        transition: "transform 0.3s ease",
    };
});

// Auto-caching for Session Recovery
watch([state, capturedPhotos, selectedPhotoIndices, selectedTemplate], () => {
    if (process.client) {
        if (state.value !== "idle") {
            const activeRun = {
                state: state.value,
                capturedPhotos: capturedPhotos.value,
                selectedPhotoIndices: selectedPhotoIndices.value,
                selectedTemplate: selectedTemplate.value,
                selectedPaperSize: selectedPaperSize.value,
                extraPrints: extraPrints.value,
                publicationConsent: publicationConsent.value,
            };
            localStorage.setItem(
                "booth_active_session",
                JSON.stringify(activeRun),
            );
        } else {
            localStorage.removeItem("booth_active_session");
        }
    }
});

onMounted(async () => {
    if (process.client) {
        // Load persisted parameters
        const savedEvent = localStorage.getItem("booth_event_name");
        const savedPrice = localStorage.getItem("booth_active_price");
        let savedPort = localStorage.getItem("dcc_port");
        const savedTickets = localStorage.getItem("booth_tickets");
        const savedVouchers = localStorage.getItem("booth_vouchers");

        if (savedEvent) eventName.value = savedEvent;
        if (savedPrice) activePrice.value = Number(savedPrice);
        if (savedPort === "8080" || savedPort === "5514") {
            savedPort = "5513";
            localStorage.setItem("dcc_port", "5513");
        }
        if (savedPort) dccPort.value = savedPort;
        if (savedTickets) {
            ticketList.value = savedTickets
                .split(",")
                .map((t) => t.trim().toUpperCase());
        }
        if (savedVouchers) {
            voucherList.value = savedVouchers
                .split(",")
                .map((v) => v.trim().toUpperCase());
        }

        const savedEnablePaymentQR = localStorage.getItem(
            "booth_enable_payment_qr",
        );
        const savedPaymentQRUrl = localStorage.getItem("booth_payment_qr_url");
        if (savedEnablePaymentQR)
            paymentQREnabled.value = savedEnablePaymentQR === "true";
        if (savedPaymentQRUrl) paymentQRUrl.value = savedPaymentQRUrl;

        const savedSession = localStorage.getItem("booth_active_session");
        if (savedSession) {
            hasRecoverableSession.value = true;
        }
    }

    if (process.client) {
        loadDevLanIp();
    }

    checkCanonConnection();
    connectionInterval = setInterval(checkCanonConnection, 5000);

    // Tutorial display dismissal check
    if (process.client) {
        const seenTutorial = sessionStorage.getItem("seen_tutorial");
        if (seenTutorial === "true") {
            showTutorial.value = false;
        }
    }
});

let liveViewInterval = null;

const startLiveViewPolling = () => {
    stopLiveViewPolling();
    liveViewError.value = false;
    // Trigger LiveViewWnd_Show to start the live view on the camera
    fetch(`/api/dcc?port=${dccPort.value}&CMD=LiveViewWnd_Show`).catch(
        () => {},
    );
    // Note: LiveViewWnd_Hide actually stops the live view stream entirely on the camera,
    // so we should NOT call it here. The digiCamControl window can be minimized manually
    // or set to "Start minimized" / "Minimize to tray" in digiCamControl settings.

    // Start polling the frame endpoint on the main port 5513
    liveViewInterval = setInterval(() => {
        if (cameraReady.value) {
            dslrLiveViewUrl.value = `/api/dcc?port=${dccPort.value}&path=liveview.jpg&t=${Date.now()}`;
        }
    }, 150); // 150ms = ~7 FPS (smooth and highly stable)
};

const stopLiveViewPolling = () => {
    if (liveViewInterval) {
        clearInterval(liveViewInterval);
        liveViewInterval = null;
    }
    dslrLiveViewUrl.value = "";
};

const handleLiveViewLoad = () => {
    liveViewError.value = false;
};

onBeforeUnmount(() => {
    stopCamera();
    stopTimeout();
    stopLiveViewPolling();
    if (connectionInterval) clearInterval(connectionInterval);
});

// Camera Source Switching
const changeCameraSource = async (source) => {
    checkCanonConnection();
    startLiveViewPolling();
};

const checkCanonConnection = async () => {
    try {
        // Check connection via proxy, add cache-busting timestamp
        const response = await fetch(
            `/api/dcc?port=${dccPort.value}&path=&t=${Date.now()}`,
            { cache: "no-store" },
        );
        if (!response.ok) throw new Error("Offline");

        const wasReady = cameraReady.value;
        cameraReady.value = true;

        if (!wasReady) {
            startLiveViewPolling();
        }
    } catch (err) {
        console.warn("Canon not detected via digiCamControl", err);
        cameraReady.value = false;
        dslrLiveViewUrl.value = "";
        stopLiveViewPolling();
    }
};

const handleLiveViewError = () => {
    liveViewError.value = true;
    console.warn("Live view frame fetch error.");
};

// Timeout Management
const startTimeout = () => {
    stopTimeout();
    timeoutSeconds.value = 60;
    timeoutInterval = setInterval(() => {
        timeoutSeconds.value--;
        if (timeoutSeconds.value <= 0) {
            stopTimeout();
            alert("Sesi Berakhir!");
            resetCamera();
        }
    }, 1000);
};

const stopTimeout = () => {
    if (timeoutInterval) {
        clearInterval(timeoutInterval);
        timeoutInterval = null;
    }
};

const recoverSavedSession = () => {
    if (process.client) {
        const saved = localStorage.getItem("booth_active_session");
        if (saved) {
            const data = JSON.parse(saved);
            state.value = data.state;
            capturedPhotos.value = data.capturedPhotos;
            selectedPhotoIndices.value = data.selectedPhotoIndices;
            selectedTemplate.value = data.selectedTemplate;
            selectedPaperSize.value = data.selectedPaperSize;
            extraPrints.value = data.extraPrints;
            publicationConsent.value = data.publicationConsent;
            hasRecoverableSession.value = false;
            alert("Progres sesi terakhir Anda berhasil dipulihkan!");

            if (state.value === "capturing") {
                startSession();
            } else {
                startTimeout();
            }
        }
    }
};

function triggerTouchlessSnap() {
    if (state.value === "capturing" && countdown.value > 1) {
        countdown.value = 1;
    }
}

const selectTemplateAndProceed = (template) => {
    selectedTemplate.value = template;
};

const startSession = () => {
    if (!cameraReady.value) {
        errorMessage.value =
            "Kamera DSLR tidak terdeteksi. Silakan aktifkan digiCamControl.";
        return;
    }

    if (process.client) {
        sessionStorage.setItem("seen_tutorial", "true");
    }

    capturedPhotos.value = [];
    selectedPhotoIndices.value = [];
    recordedChunks = [];
    finalVideoBlob = null;

    const img = videoEl.value;
    const recCanvas = recordingCanvasEl.value;
    if (img && recCanvas) {
        const updateCanvasSize = () => {
            recCanvas.width = img.naturalWidth || 1280;
            recCanvas.height = img.naturalHeight || 720;
        };
        updateCanvasSize();

        const renderRecordingFrame = () => {
            if (
                state.value === "selection" ||
                state.value === "processing" ||
                state.value === "error"
            ) {
                return;
            }

            const ctx = recCanvas.getContext("2d");
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            if (width) {
                if (recCanvas.width !== width) updateCanvasSize();
                ctx.clearRect(0, 0, recCanvas.width, recCanvas.height);

                ctx.save();
                if (isMirrored.value) {
                    ctx.translate(recCanvas.width, 0);
                    ctx.scale(-1, 1);
                }
                if (cameraRotation.value !== 0) {
                    ctx.translate(recCanvas.width / 2, recCanvas.height / 2);
                    ctx.rotate((cameraRotation.value * Math.PI) / 180);
                    ctx.translate(-recCanvas.width / 2, -recCanvas.height / 2);
                }

                ctx.drawImage(img, 0, 0, recCanvas.width, recCanvas.height);
                ctx.restore();
            }

            recordingAnimationFrame =
                requestAnimationFrame(renderRecordingFrame);
        };

        renderRecordingFrame();
    }

    const canvasStream = recCanvas.captureStream(30);
    const options = { mimeType: "video/webm; codecs=vp8,opus" };
    mediaRecorder = new MediaRecorder(
        canvasStream,
        MediaRecorder.isTypeSupported(options.mimeType) ? options : {},
    );

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
        finalVideoBlob = new Blob(recordedChunks, { type: "video/webm" });
        if (state.value === "processing") {
            executeUpload();
        }
    };

    mediaRecorder.start();
    startTimeout();
    startCountdown();
};

const startCountdown = () => {
    state.value = "capturing";
    countdown.value = 5;
    activeFilter.value = "original";

    // Restart live view polling for the countdown
    startLiveViewPolling();

    timerInterval = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
            clearInterval(timerInterval);
            // Delay 300ms showing "0" so the user has time to smile, then trigger snap
            setTimeout(() => {
                snapPhoto();
            }, 300);
        }
    }, 1000);
};

const snapPhoto = async () => {
    isCapturingPhoto.value = true;
    try {
        flash.value = true;
        setTimeout(() => {
            flash.value = false;
        }, 150);

        // Stop polling during capture to avoid broken frames
        stopLiveViewPolling();

        // 1. Get the name of the last captured photo before taking a new one
        let prevCaptured = "";
        try {
            const res = await fetch(`/api/dcc?port=${dccPort.value}&slc=get&param1=lastcaptured`);
            prevCaptured = (await res.text()).trim();
        } catch (e) {
            console.warn("Failed to get last captured photo name", e);
        }

        // 2. Turn off live view window in digiCamControl to release the camera mirror for capture
        await fetch(`/api/dcc?port=${dccPort.value}&CMD=LiveViewWnd_Hide`).catch(
            () => {},
        );
        // Wait 100ms (very fast) for the camera command queue to register
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 3. Trigger capture command via proxy
        await fetch(`/api/dcc?port=${dccPort.value}&slc=capture`);

        // 4. Poll lastcaptured until it changes to a new filename (and is not "-")
        const maxPollAttempts = 30; // 30 * 200ms = 6 seconds max timeout
        for (let attempt = 0; attempt < maxPollAttempts; attempt++) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            try {
                const res = await fetch(`/api/dcc?port=${dccPort.value}&slc=get&param1=lastcaptured`);
                const current = (await res.text()).trim();
                if (current && current !== "-" && current !== prevCaptured) {
                    break;
                }
            } catch (e) {
                console.warn("Polling lastcaptured error", e);
            }
        }

        // Fetch photo from proxy
        const photoUrl = `/api/dcc?port=${dccPort.value}&path=preview.jpg&t=${Date.now()}`;
        const response = await fetch(photoUrl);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            applyFilterToPhotoData(reader.result);
        };
    } catch (err) {
        console.error("Capture error", err);
        errorMessage.value = "Gagal mengambil foto.";
        state.value = "error";
        isCapturingPhoto.value = false;
    }
};

function applyFilterToPhotoData(srcData) {
    const canvas = canvasEl.value;
    const tempImg = new Image();
    tempImg.src = srcData;
    tempImg.onload = () => {
        canvas.width = tempImg.width;
        canvas.height = tempImg.height;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        if (isAiBeautifyActive.value) {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * 1.05);
                data[i + 1] = Math.min(255, data[i + 1] * 1.04);
                data[i + 2] = Math.min(255, data[i + 2] * 1.02);

                const contrastFactor = 1.15;
                data[i] = Math.max(
                    0,
                    Math.min(255, 128 + (data[i] - 128) * contrastFactor),
                );
                data[i + 1] = Math.max(
                    0,
                    Math.min(255, 128 + (data[i + 1] - 128) * contrastFactor),
                );
                data[i + 2] = Math.max(
                    0,
                    Math.min(255, 128 + (data[i + 2] - 128) * contrastFactor),
                );
            }
            ctx.putImageData(imgData, 0, 0);
        }

        if (activeFilter.value !== "original") {
            const webglCanvas = document.createElement("canvas");
            const filteredDataUrl = applyWebGLFilter(
                canvas,
                activeFilter.value,
                webglCanvas,
            );
            if (filteredDataUrl) {
                currentPreviewPhoto.value = filteredDataUrl;
            } else {
                currentPreviewPhoto.value = canvas.toDataURL(
                    "image/jpeg",
                    0.95,
                );
            }
        } else {
            currentPreviewPhoto.value = canvas.toDataURL("image/jpeg", 0.95);
        }

        state.value = "previewing";
        isCapturingPhoto.value = false;
        startTimeout();
    };
}

const retakePhoto = () => {
    currentPreviewPhoto.value = null;
    startCountdown();
};

const keepPhotoAndNext = () => {
    capturedPhotos.value.push(currentPreviewPhoto.value);
    currentPreviewPhoto.value = null;

    if (capturedPhotos.value.length === maxPhotos.value) {
        goToSelection();
    } else {
        startCountdown();
    }
};

const keepPhotoAndFinish = () => {
    capturedPhotos.value.push(currentPreviewPhoto.value);
    currentPreviewPhoto.value = null;
    goToSelection();
};

const goToSelection = () => {
    state.value = "selection";
    startTimeout();
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    }
};

const toggleSelection = (index) => {
    startTimeout();
    const selIdx = selectedPhotoIndices.value.indexOf(index);
    if (selIdx > -1) {
        selectedPhotoIndices.value.splice(selIdx, 1);
    } else {
        if (selectedPhotoIndices.value.length < requiredPhotos.value) {
            selectedPhotoIndices.value.push(index);
        }
    }
};

const processMedia = async () => {
    if (selectedPhotoIndices.value.length !== requiredPhotos.value) return;
    stopTimeout();
    state.value = "processing";

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        // Disable the old onstop handler so we can replace the video
        mediaRecorder.onstop = null;
        mediaRecorder.stop();
    }

    // --- CLIENT-SIDE BOOMERANG GENERATOR (PixenzeBooth Logic) ---
    try {
        const sortedSelectedIndices = [...selectedPhotoIndices.value].sort(
            (a, b) => a - b,
        );
        const selectedImages = sortedSelectedIndices.map(
            (i) => capturedPhotos.value[i],
        );

        const boomCanvas = document.createElement("canvas");
        boomCanvas.width = 800;
        boomCanvas.height = 600;
        const boomCtx = boomCanvas.getContext("2d");

        const boomStream = boomCanvas.captureStream(10);
        const options = { mimeType: "video/webm; codecs=vp8,opus" };
        const boomRecorder = new MediaRecorder(
            boomStream,
            MediaRecorder.isTypeSupported(options.mimeType) ? options : {},
        );
        const boomChunks = [];
        boomRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) boomChunks.push(e.data);
        };

        const boomerangPromise = new Promise((resolve) => {
            boomRecorder.onstop = () =>
                resolve(new Blob(boomChunks, { type: "video/webm" }));
        });

        boomRecorder.start();

        // Ping-pong sequence (e.g. 1, 2, 3, 2)
        let sequence = [...selectedImages];
        if (selectedImages.length > 2) {
            sequence = [
                ...selectedImages,
                ...selectedImages.slice(1, -1).reverse(),
            ];
        }

        // Play 4 loops to create a solid 3-4 second Boomerang
        for (let l = 0; l < 4; l++) {
            for (const src of sequence) {
                const img = new Image();
                img.src = src;
                await new Promise((r) => {
                    img.onload = r;
                });

                boomCtx.fillStyle = "#000";
                boomCtx.fillRect(0, 0, boomCanvas.width, boomCanvas.height);

                const scale = Math.max(
                    boomCanvas.width / img.width,
                    boomCanvas.height / img.height,
                );
                const x = boomCanvas.width / 2 - (img.width / 2) * scale;
                const y = boomCanvas.height / 2 - (img.height / 2) * scale;
                boomCtx.drawImage(
                    img,
                    x,
                    y,
                    img.width * scale,
                    img.height * scale,
                );

                // Delay between frames (approx 5 fps effect)
                await new Promise((r) => setTimeout(r, 200));
            }
        }

        boomRecorder.stop();
        finalVideoBlob = await boomerangPromise;
    } catch (err) {
        console.error("Failed to generate boomerang", err);
        // Fallback to the raw BTS video if generation fails
        finalVideoBlob = new Blob(recordedChunks, { type: "video/webm" });
    }

    executeUpload();
};

const stopCamera = () => {
    if (timerInterval) clearInterval(timerInterval);
    if (recordingAnimationFrame) cancelAnimationFrame(recordingAnimationFrame);
    // Stop polling
    stopLiveViewPolling();
    // Turn off live view window in digiCamControl to save battery/hardware
    fetch(`/api/dcc?port=${dccPort.value}&CMD=LiveViewWnd_Hide`).catch(
        (e) => {},
    );
};

const resetCamera = async () => {
    errorMessage.value = "";
    state.value = "idle";
    capturedPhotos.value = [];
    selectedPhotoIndices.value = [];
    stopTimeout();
    checkCanonConnection();
    if (process.client) {
        localStorage.removeItem("booth_active_session");
    }
};

const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

const executeUpload = async () => {
    try {
        const formData = new FormData();
        formData.append("video", finalVideoBlob, "session.webm");
        const sortedSelectedIndices = [...selectedPhotoIndices.value].sort(
            (a, b) => a - b,
        );

        sortedSelectedIndices.forEach((index, i) => {
            const base64 = capturedPhotos.value[index];
            const file = dataURLtoFile(base64, `photo_${i + 1}.jpg`);
            formData.append(`photos[]`, file);
        });

        formData.append("template", selectedTemplate.value);

        const sessionResponse = await $fetch(`${API_URL}/sessions`, {
            method: "POST",
            body: {
                mode: "photo",
                metadata: JSON.stringify({
                    eventName: eventName.value,
                    consent: publicationConsent.value,
                    activeFilter: activeFilter.value,
                    paperSize: selectedPaperSize.value,
                    extraPrints: extraPrints.value,
                    isAiBeautify: isAiBeautifyActive.value,
                    customFrame:
                        selectedTemplate.value === "custom"
                            ? {
                                  bgColor: activeCustomFrame.bgColor,
                                  title: activeCustomFrame.title,
                                  slots: activeCustomFrame.slots,
                                  pattern: activeCustomFrame.pattern,
                                  drawing: activeCustomFrame.drawing,
                                  isAdmin: activeCustomFrame.isAdmin,
                                  surcharge: customFrameSurcharge.value,
                              }
                            : null,
                }),
            },
        });

        const sessionId =
            sessionResponse.id ||
            sessionResponse.data?.id ||
            sessionResponse.data?.session?.id;
        formData.append("session_id", sessionId);

        const response = await $fetch(`${API_URL}/process-session`, {
            method: "POST",
            body: formData,
        });

        if (response.success) {
            if (process.client) {
                localStorage.removeItem("booth_active_session");
            }

            if (
                paymentQREnabled.value &&
                paymentQRUrl.value &&
                payableAmountComputed.value > 0
            ) {
                pendingSessionId = sessionId;
                state.value = "payment";
            } else {
                router.push(`/result/${sessionId}`);
            }
        } else {
            throw new Error(
                response.message || "Gagal memproses sesi foto strip.",
            );
        }
    } catch (err) {
        console.error("Upload error", err);
        state.value = "error";
        errorMessage.value =
            err.data?.message ||
            err.message ||
            "Gagal mengunggah data sesi ke server.";
    }
};

const confirmPayment = () => {
    if (pendingSessionId) {
        router.push(`/result/${pendingSessionId}`);
        pendingSessionId = null;
    }
};
</script>

<style scoped>
@keyframes scaleUp {
    from {
        transform: scale(0.9);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-scale-up {
    animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.scrollbar-thin::-webkit-scrollbar {
    width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #fc4c02;
    border-radius: 0px;
}
.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}
</style>
