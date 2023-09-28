import express from 'express'
import get from 'lodash.get'
import merge from 'lodash.merge'

import { getCustommerBySessionToken } from '../db/custommer'

export const isAutenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies('sessionToken')
    if (!sessionToken) {
      return res.sendStatus(403)
    }
    const existingCustommer = await getCustommerBySessionToken(sessionToken)
    if (!existingCustommer) return res.sendStatus(403)
    merge(req, { identity: existingCustommer })
    next()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}
