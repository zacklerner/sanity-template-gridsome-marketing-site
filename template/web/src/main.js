// Add Assets CSS Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// Import main css
import '~/assets/style/index.scss'

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// Import plain text conversion utility for use with portable text
import toPlainText from './utils/toPlainText'

// Import image url builder
import urlForImage from './utils/urlForImage'

// Import custom g-image srcset mapper
import gImageMap from './utils/gImageMap'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient }) {
  Vue.use(Buefy)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Inject plain text conversion utility
  Vue.prototype.$toPlainText = toPlainText

  // Inject global image URL builder
  Vue.prototype.$urlForImage = urlForImage

  // Inject global g-image srcset builder
  Vue.prototype.$gImageMap = gImageMap

  // Delay the scroll-to-top behavior caused by Vue Router to eliminate nasty flash on page transitions
  router.options.scrollBehavior = function(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 200)
    })
  }
}
