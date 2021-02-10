export default {
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Add the SEO friendly title of this page here. For example, "Home".'
    },
    {
      name: 'heroVideo',
      type: 'string',
      title: 'Hero Video URL',
      description: 'If a video isn\'t included, the hero section will default to the video poster image below. If using Dropbox, append "?raw=1" to the end of the URL. For example: "https://www.dropbox.com/s/askqmnv1zrti476/BUTTERFLY_MRC_30.mp4?raw=1".',
      fieldset: 'hero'
    },
    {
      name: 'heroPoster',
      type: 'mainImage',
      title: 'Hero Video Poster',
      description: 'Make sure your poster images are cropped to the aspect ratio of your videos to prevent the video container from resizing on load.',
      fieldset: 'hero'
    },
    {
      name: 'introText',
      type: 'excerptPortableText',
      title: 'Intro Text'
    },
    {
      name: 'imageGallery',
      title: 'Image Gallery',
      description: 'Use the optional caption fields to provide details on each image.',
      type: 'array',
      of: [
        { type: 'mainImage' }
      ]
    },
    {
      name: 'imageGalleryText',
      type: 'excerptPortableText',
      title: 'Gallery Text',
      description: 'This text appears after the image gallery.'
    }
  ]
}
