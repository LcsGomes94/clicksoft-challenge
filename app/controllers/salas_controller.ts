import { HttpContext } from '@adonisjs/core/http'
import CapacidadeMaximaAtingida from '../exceptions/capacidade_insuficiente_exception.js'
import IdNotFoundException from '../exceptions/id_not_found_exception.js'
import Professor from '../models/professor.js'
import Sala from '../models/sala.js'
import { salaValidator } from '../validators/sala.js'

export default class SalasController {
    async cadastrarSala({ request, response, params }: HttpContext) {
        try {
            await Professor.findOrFail(params.id)
        } catch {
            throw new IdNotFoundException
        }

        const data = request.only(['numero', 'capacidade', 'disponibilidade', 'professorId'])
        data.professorId = params.id
        await salaValidator().validate(data)

        const sala = await Sala.create(data)
        return response.status(201).json(sala)
    }

    async buscarSala({ params, response }: HttpContext) {
        try {
            const sala = await Sala.findOrFail(params.id)
            return response.status(200).json(sala)
        } catch {
            throw new IdNotFoundException
        }
    }

    async atualizarSala({ params, request, response }: HttpContext) {
        let sala

        try {
            sala = await Sala.findOrFail(params.id)
        } catch {
            throw new IdNotFoundException
        }

        const data = request.only(['numero', 'capacidade', 'disponibilidade', 'professorId'])

        await sala.load('alunos')
        if (sala.alunos.length > data.capacidade) throw new CapacidadeMaximaAtingida(sala.alunos.length)

        await salaValidator(params.id).validate(data)
    
        sala.merge(data)
        await sala.save()
    
        return response.status(200).json(sala.$original)
    }

    async deletarSala({ params, response }: HttpContext) {
        try {
            const sala = await Sala.findOrFail(params.id)
            await sala.delete()

            return response.status(204).json(null)
        } catch {
            throw new IdNotFoundException
        }
    }
}
