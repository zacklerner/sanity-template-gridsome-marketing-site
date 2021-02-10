import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdPerson } from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['category', 'author', 'post', 'siteSettings', 'homepage'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Homepage')
        .child(
          S.editor()
            .id('10862252-5fa3-11eb-ae93-0242ac130002')
            .schemaType('homepage')
            .documentId('10862252-5fa3-11eb-ae93-0242ac130002')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
