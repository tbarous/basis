import merge from 'merge-deep'
import base from './base'

const config = merge(base, {
  mode: 'production',
})

export default config
