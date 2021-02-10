export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fieldsets: [
    {
      name: 'header',
      title: 'Header'
    },
    {
      name: 'footer',
      title: 'Footer'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
      fieldset: 'header',
    },
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      fieldset: 'header',
      type: 'array',
      of: [
        {
          type: 'navigation'
        }
      ]
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image'
    },
    {
      name: 'twitterImage',
      type: 'image',
      title: 'Twitter Image'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'author'}]
    },
    {
      name: 'info',
      type: 'bodyPortableText',
      title: 'Info',
      fieldset: 'footer'
    },
    {
      title: 'Navigation',
      name: 'footerNavigation',
      fieldset: 'footer',
      type: 'array',
      of: [
        {
          type: 'navigation'
        }
      ]
    },
    {
      title: 'Social',
      name: 'socialFooter',
      type: 'array',
      fieldset: 'footer',
      of: [{type: 'socialItem'}]
    }
  ]
}
