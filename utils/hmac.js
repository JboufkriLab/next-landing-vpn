// hmac.js
const crypto = require('crypto')

const SHARED_SECRET = 'dqyS6Do7B6gsMD-LXEmIKerQhM9f0hHAAvNRY9pH'

const generateHmac = (data) => {
  const hmac = crypto.createHmac('sha256', SHARED_SECRET)
  hmac.update(data)
  return hmac.digest('hex')
}

module.exports = generateHmac
