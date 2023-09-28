import express from 'express'
import autentication from './autentication'
import custommer from './custommers'


const router = express.Router()


export default  (): express.Router => {
    autentication(router)
    custommer(router)
    return router
}