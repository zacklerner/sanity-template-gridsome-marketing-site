// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const clientConfig = require('./client-config')
const sanityFlatIndex = require('./static/flatIndex.json')
const fs = require('fs')

module.exports = function(api) {
  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    store.addMetadata('sanityOptions', clientConfig.sanity)
  })
  const flatIndex = []

  // Create a flat index from Sanity
  function toPlainText(blocks = []) {
    if (blocks && blocks.length > 0) {
      return blocks
        // loop through each block
        .map(block => {
          // if it's not a text block with children,
          // return nothing
          if (block._type !== 'block' || !block.children) {
            return ''
          }
          // loop through the children spans, and join the
          // text strings
          return block.children.map(child => child.text).join('')
        })
        // join the parapgraphs leaving split by two linebreaks
        .join('\n\n')
    }
  }

  // Add Post to search index
  api.createPages(async ({ graphql }) => {

    const { data } = await graphql(`
      {
        allSanityPost {
          edges {
            node {
              id
              title
              path
              _rawExcerpt
            }
          }
        }
      }
    `)

    data.allSanityPost.edges.forEach(({ node }) => {
      const doc = {
        title: node.title,
        id: node.id,
        path: node.path,
        body: toPlainText(node._rawExcerpt)
      }

      flatIndex.push(doc)
    })

    console.log('*** FLATTENING SANITY POSTS!!! ***')

    let flatIndexData = JSON.stringify(flatIndex)
    fs.writeFileSync('static/flatIndex.json', flatIndexData)
  })
  // End Post to search index

  // Add Homepage to search index
  api.createPages(async ({ graphql }) => {

    const { data } = await graphql(`
      {
        allSanityHomepage {
          edges {
            node {
              id
              title
              _rawIntroText
            }
          }
        }
      }
    `)

    data.allSanityHomepage.edges.forEach(({ node }) => {
      const doc = {
        title: node.title,
        id: node.id,
        path: '/',
        body: toPlainText(node._rawIntroText)
      }

      flatIndex.push(doc)
    })

    console.log('*** FLATTENING SANITY HOMEPAGE!!! ***')

    let flatIndexData = JSON.stringify(flatIndex)
    fs.writeFileSync('static/flatIndex.json', flatIndexData)
  })
  // End Homepage to search index

  api.loadSource(store => {
    const contentType = store.addCollection({
      typeName: 'SanityFlatIndex'
    })

    for (const item of sanityFlatIndex) {
      contentType.addNode({
        id: item.id,
        title: item.title,
        path: item.path,
        body: item.body
      })
    }
  })
  // Issue: https://github.com/sanity-io/gridsome-source-sanity/issues/10
  api.createSchema(({ addSchemaTypes }) => {
    addSchemaTypes(`
      type SanityDocument implements Node @infer {
        id: ID!
      }
    `)
  })
}
