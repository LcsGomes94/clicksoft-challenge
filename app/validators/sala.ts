import vine from '@vinejs/vine'
import Professor from '../models/professor.js'
import { checarResultado } from './utilities.js'

export const salaValidator = (id?: number) => vine.compile(
    vine.object({
        numero: vine.string().maxLength(10).unique(async (db, valor) => {
            const resultado = await db.from('salas').select('id').where('numero', valor)
            return checarResultado(resultado, id)
        }),

        capacidade: vine.number(),

        disponibilidade: vine.boolean()
    })
)
