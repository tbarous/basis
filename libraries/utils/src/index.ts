import path from 'path'

const root = path.resolve(__dirname, '../')

const fromRoot = (location: string) => path.resolve(root, location)

export { fromRoot }
