import mongoose from 'mongoose'
import custommers from 'router/custommers'

const costummerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    nik: { type: String, required: true },
    noKamar: { type: String, required: true },
    autentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
    checkOut: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Costummer = mongoose.model('Costummer', costummerSchema)

export const getCustommer = () => Costummer.find()
export const getCustommerByNik = (nik: string) => Costummer.findOne({ nik })
export const getCustommerByEmail = (email: string) => Costummer.findOne({ email })
export const getCustommerBySessionToken = (sessionToken: string) => Costummer.findOne({ 'autentication.sessionToken': sessionToken })
export const saveCustommer = (Custommer: any) => Costummer.create(Custommer)
export const getCustommerById = (id: string) => Costummer.findById(id)
export const createCustommer = (value: Record<string, any>) => new Costummer(value).save().then((custommer) => custommer.toObject())
export const getCustommerNotBookRoom = () => Costummer.find({ noKamar: 0})
export const getCustommerCheckOut = () => Costummer.find({ checkOut: true })
export const getCustommerNotCheckOut = () => Costummer.find({ checkOut: false })
export const updateCustommer = (id: string, Custommer: Record<string, any>) => Costummer.findByIdAndUpdate(id, Custommer)
export const deleteCustommer = (id: string) => Costummer.findByIdAndDelete(id)