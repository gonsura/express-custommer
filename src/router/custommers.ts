import express from 'express'

import { getAllCustommer, getCustommerIsCheckOut, getCustommerIsNotCheckOut } from '../controllers/custommers'


export default (router: express.Router) => {
    router.get('/custommers', getAllCustommer)
    router.get('/custommers/checkOut', getCustommerIsCheckOut)
    router.get('/custommers/notCheckOut', getCustommerIsNotCheckOut)
}

