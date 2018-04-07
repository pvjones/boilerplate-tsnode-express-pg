import { Application } from 'express'
import * as fs from 'fs'

const splitName = (fileName: string): { name: string, extension: string } => {
  const split = fileName.lastIndexOf('.')
  return {
    name: fileName.substr(0, split),
    extension: fileName.substr(split),
  }
}

export default (app: Application): void => {
  fs.readdirSync(__dirname)
    .filter(item => splitName(item).extension !== 'js' && item !== 'index.js')
    .forEach(item => {
      const name = splitName(item).name
      const router = require(`./${name}`).default

      if (router && typeof router === 'function') {
        router(app)
      }
    })
}
