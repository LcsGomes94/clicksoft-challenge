import { HttpContext } from '@adonisjs/core/http'
import IdNotFoundException from '../exceptions/id_not_found_exception.js'
import Professor from '../models/professor.js'
import { professorValidator } from '../validators/professor.js'

export default class ProfessorController {
    async cadastrarProfessor({ request, response }: HttpContext) {
        const data = request.only(['nome', 'email', 'matricula', 'dataDeNascimento'])
        await professorValidator().validate(data)
        
        const professor = await Professor.create(data)
        return response.status(201).json(professor)
    }

    async buscarProfessor({ params, response }: HttpContext) {
        try {
            const professor = await Professor.findOrFail(params.id)
            return response.status(200).json(professor)
        } catch {
            throw new IdNotFoundException
        }
    }
    
    async atualizarProfessor({ params, request, response }: HttpContext) {
        let professor

        try {
            professor = await Professor.findOrFail(params.id)
        } catch {
            throw new IdNotFoundException
        }

        const data = request.only(['nome', 'email', 'matricula', 'dataDeNascimento'])
        await professorValidator(params.id).validate(data)
    
        professor.merge(data)
        await professor.save()
    
        return response.status(200).json(professor)
    }

    async deletarProfessor({ params, response }: HttpContext) {
        try {
            const professor = await Professor.findOrFail(params.id)
            await professor.delete()

            return response.status(204).json(null)
        } catch {
            throw new IdNotFoundException
        }
    }
}
