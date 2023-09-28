import express from 'express'
import { getCustommer, getCustommerCheckOut, getCustommerNotCheckOut } from '../db/custommer'

export const getAllCustommer = async (req: express.Request, res: express.Response) => {
  try {
    const custommer = await getCustommer()
    return res.status(200).json(custommer).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const getCustommerIsCheckOut = async (req: express.Request, res: express.Response) => {
  try {
    const custommerCheckOut = await getCustommerCheckOut()
    return res.status(200).json(custommerCheckOut).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}


export const getCustommerIsNotCheckOut = async (req: express.Request, res: express.Response) => {
  try {
    const custommerNotCheckOut = await getCustommerNotCheckOut()
    return res.status(200).json(custommerNotCheckOut).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}