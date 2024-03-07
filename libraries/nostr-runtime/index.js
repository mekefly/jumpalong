'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/nostr-runtime.cjs.prod.js')
} else {
  module.exports = require('./dist/nostr-runtime.cjs.js')
}
