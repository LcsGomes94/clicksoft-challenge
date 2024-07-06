import vine from '@vinejs/vine'
import { checarResultado } from './utilities.js'

export const professorValidator = (id?: number) => vine.compile(
    vine.object({
        nome: vine.string().maxLength(50),

        email: vine.string().email().normalizeEmail().unique(async (db, valor) => {
            const resultado = await db.from('professores').select('id').where('email', valor)
            return checarResultado(resultado, id)
        }),

        matricula: vine.string().maxLength(50).unique(async (db, valor) => {
            const resultado = await db.from('professores').select('id').where('matricula', valor)
            return checarResultado(resultado, id)
        }),

        dataDeNascimento: vine.date({ formats: { utc: true } })
    })
)
