import { Request } from 'express'

export const getUser = async (request: Request) => {
  const foo = await Promise.resolve('foo')
  return Promise.resolve('request recieved')
}
