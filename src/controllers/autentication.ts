import { createCustommer, getCustommerByEmail, getCustommerByNik } from '../db/custommer'
import express from 'express'
import { autentication, random } from '../helpers'

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, nik, noKamar, password, checkOut } = req.body
    if (!name || !email || !nik || !password) {
      return res.sendStatus(400)
    }

    const noKamarValidate = !noKamar ? '0' : String(noKamar)

    const checkOutValidate = !checkOut ? false : true
    const existCustommer = await getCustommerByNik(nik)
    if (existCustommer) {
      return res.sendStatus(400)
    }
    const exisEmail = await getCustommerByEmail(email)
    if (exisEmail) {
      return res.sendStatus(400)
    }
    const salt = random()
    const custommer = await createCustommer({
      name,
      email,
      nik,
      noKamar: noKamarValidate,
      autentication: { salt, password: autentication(salt, password) },
      checkOut: checkOutValidate,
    })
    const { checkOut: destroyCheckOut, noKamar: destroyNoKamar, ...filteredCustommer } = custommer
    return res.status(201).json(filteredCustommer).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.sendStatus(400)
    }
    const custommer = await getCustommerByEmail(email).select('+autentication.salt +autentication.password')
    if (!custommer) {
      return res.sendStatus(400)
    }
    if (!custommer.autentication?.salt) {
      return res.status(400).json({ message: 'autentication not found'})
    }
    const expectedHash = autentication(custommer.autentication.salt, password)
    if (expectedHash !== custommer.autentication.password) {
      return res.sendStatus(400)
    }
    const salt = random()
    custommer.autentication.sessionToken = autentication(salt, custommer._id.toString())
    await custommer.save()
    res.cookie('sessionToken', custommer.autentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    })
    return res.status(200).json(custommer).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}
