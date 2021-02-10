export default {
  title: 'Navigation',
  name: 'navigation',
  type: 'object',
  fields: [
    {
      title: 'Menu Text',
      name: 'menuText',
      type: 'string'
    },
    {
      title: 'Menu Link',
      name: 'menuLink',
      type: 'url'
    },
    {
      title: 'New Tab',
      name: 'newTab',
      type: 'boolean',
      description: 'Flip this switch on to open this link in a new tab'
    }
  ],
  preview: {
    select: {
      title: 'menuText'
    },
    prepare({ title }) {
      return {
        title
      }
    }
  }
}
