import { HttpContext } from '@adonisjs/core/http'
import IdNotFoundException from '../exceptions/id_not_found_exception.js'
import Aluno from '../models/aluno.js'
import { alunoValidator } from '../validators/aluno.js'

export default class AlunosController {
    async cadastrarAluno({ request, response }: HttpContext) {
        const data = request.only(['nome', 'email', 'matricula', 'dataDeNascimento'])
        await alunoValidator().validate(data)
        
        const aluno = await Aluno.create(data)
        return response.status(201).json(aluno)
    }

    async buscarAluno({ params, response }: HttpContext) {
        try {
            const aluno = await Aluno.findOrFail(params.id)
            return response.status(200).json(aluno)
        } catch {
            throw new IdNotFoundException
        }
    }
    
    async atualizarAluno({ params, request, response }: HttpContext) {
        let aluno

        try {
            aluno = await Aluno.findOrFail(params.id)
        } catch {
            throw new IdNotFoundException
        }

        const data = request.only(['nome', 'email', 'matricula', 'dataDeNascimento'])
        await alunoValidator(params.id).validate(data)
    
        aluno.merge(data)
        await aluno.save()
    
        return response.status(200).json(aluno)
    }

    async deletarAluno({ params, response }: HttpContext) {
        try {
            const aluno = await Aluno.findOrFail(params.id)
            await aluno.delete()

            return response.status(204).json(null)
        } catch {
            throw new IdNotFoundException
        }
    }
}
