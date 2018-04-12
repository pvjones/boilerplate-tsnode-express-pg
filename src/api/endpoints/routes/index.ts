import { Application } from 'express'
// import * as path from 'path'
// import * as fs from 'fs'

import securityRoutes from './security.routes'
import usersRoutes from './users.routes'

// const splitName = (fileName: string): { name: string, extension: string } => {
//   const split = fileName.lastIndexOf('.')
//   return {
//     name: fileName.substr(0, split),
//     extension: fileName.substr(split),
//   }
// }

export default (app: Application): void => {
  securityRoutes(app)
  usersRoutes(app)

  /**
   * Reading files in the current directory will not work with node debugging protocol
   */

  // fs.readdirSync(path.resolve(__dirname))
  //   .filter(item => splitName(item).extension !== 'js' && item !== 'index.js')
  //   .forEach(item => {
  //     const name = splitName(item).name
  //     const router = require(`./${name}`).default

  //     if (router && typeof router === 'function') {
  //       router(app)
  //     }
  //   })

}
