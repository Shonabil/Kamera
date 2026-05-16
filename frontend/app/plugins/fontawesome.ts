import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faCamera, faQrcode, faDownload, faPrint, faPlay, faImages, faRunning, faPlus, faArrowRight, faTimes, faExpand } from '@fortawesome/free-solid-svg-icons'

library.add(faCamera, faQrcode, faDownload, faPrint, faPlay, faImages, faRunning, faPlus, faArrowRight, faTimes, faExpand)

export default defineNuxtPlugin(() => {
  config.autoAddCss = false
})