const isProd = process.env.NODE_ENV === 'production'
const envUrl = isProd ? 'https://heavy-dev-sanity-gridsome-base-studio.netlify.app' : 'http://localhost:8080'
const isDraft = id => id.includes('drafts')

export default function resolveProductionUrl(document) {
  return `${envUrl}/preview?type=${document._type}&pageId=${document._id}${isDraft(document._id) ? '&isDraft=true' : ''}`
}