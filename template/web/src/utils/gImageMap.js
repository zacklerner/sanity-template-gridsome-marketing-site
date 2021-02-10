import urlForImage from './urlForImage'

const gImageMap = (source, data, columns) => ({
  dataUri: source.asset.url,
  alt: source.alt,
  srcset: [
    `${urlForImage(source, data).width(480).auto('format').toString()} 480w`,
    `${urlForImage(source, data).width(1024).auto('format').toString()} 1024w`,
    `${urlForImage(source, data).width(Math.round(1920 / columns)).auto('format').toString()} 1920w`,
    `${urlForImage(source, data).width(Math.round(2560 / columns)).auto('format').toString()} 2560w`,
  ],
  src: `${urlForImage(source, data).width(480).auto('format').toString()} 480w`
})

export default gImageMap
