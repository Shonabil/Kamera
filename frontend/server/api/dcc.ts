import { defineEventHandler, getQuery, createError, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const port = (query.port as string) || '5513'
  const path = (query.path as string) || ''
  
  // Extract other query params to forward
  const forwardParams = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (key !== 'port' && key !== 'path') {
      forwardParams.append(key, value as string)
    }
  }
  
  const queryString = forwardParams.toString()
  const targetUrl = `http://127.0.0.1:${port}/${path}${queryString ? '?' + queryString : ''}`
  
  try {
    return await proxyRequest(event, targetUrl)
  } catch (err: any) {
    throw createError({
      statusCode: 502,
      statusMessage: `Failed to proxy to digiCamControl at ${targetUrl}: ${err.message}`
    })
  }
})
