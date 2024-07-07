import { HttpContext } from '@adonisjs/core/http'
import IdNotFoundException from '../exceptions/id_not_found_exception.js'
import Aluno from '../models/aluno.js'
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

        const data = request.only(['numero', 'capacidade', 'disponibilidade', 'professoreId'])
        await salaValidator().validate(data)

        data.professoreId = params.id

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
        const data = request.only(['numero', 'capacidade', 'disponibilidade', 'professoreId'])

        try {
            sala = await Sala.findOrFail(params.id)
            await Professor.findOrFail(data.professoreId)
        } catch {
            throw new IdNotFoundException
        }

        await salaValidator(params.id).validate(data)

        const alunosCount = await sala.related('alunos').query().count('* as total')
        if (alunosCount[0].$extras.total > data.capacidade) {
            return response.status(403).json({erro: `A nova capacidade é baixa de mais. O mínimo aceitável no momento é ${alunosCount[0].$extras.total}.`})
        }
    
        sala.merge(data)
        await sala.save()
    
        return response.status(200).json(sala)
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

    async criarMatricula({ params, request, response }: HttpContext) {
        let sala
        let aluno
        const data = request.only(['alunoId', 'professoreId'])

        try {
            sala = await Sala.findOrFail(params.id)
            aluno = await Aluno.findOrFail(data.alunoId)
        } catch {
            throw new IdNotFoundException
        }

        if (sala.professoreId != data.professoreId) {
            return response.status(403).json({ erro: `A sala número ${sala.numero} não pertence ao professor de id ${data.professoreId}.`})
        }

        if (!sala.disponibilidade) {
            return response.status(403).json({erro: `Esta sala não está aceitando novas matrículas no momento.`})
        }

        await sala.load('alunos')

        if (sala.capacidade <= sala.alunos.length) {
            return response.status(403).json({erro: `Esta sala já está cheia.`})
        }

        if (sala.alunos.find(aluno => aluno.id == data.alunoId)) {
            return response.status(403).json({erro: `Este aluno já está matriculado nesta sala.`})
        }

        await sala.related('alunos').attach([data.alunoId])
        return response.status(201).json({mensagem: `O aluno ${aluno.nome} foi cadastrado na sala número ${sala.numero}.`})
    }

    async cancelarMatricula({ params, request, response }: HttpContext) {
        let sala
        let aluno
        const data = request.only(['alunoId', 'professoreId'])

        try {
            sala = await Sala.findOrFail(params.id)
            aluno = await Aluno.findOrFail(data.alunoId)
        } catch {
            throw new IdNotFoundException
        }

        if (sala.professoreId != data.professoreId) {
            return response.status(403).json({ erro: `A sala número ${sala.numero} não pertence ao professor de id ${data.professoreId}.`})
        }

        const existe = await sala.related('alunos').query().where('alunos.id', params.id).select('id').first()
        if (!existe) {
            return response.status(403).json({erro: `O aluno ${aluno.nome} não pertence à sala número ${sala.numero}.`})
        }

        sala.related('alunos').detach([data.alunoId])
        return response.status(201).json(null)
    }

    async buscarAlunos({ params, response }: HttpContext) {
        let sala

        try {
            sala = await Sala.findOrFail(params.id)
        } catch {
            throw new IdNotFoundException
        }

        await sala.load('alunos')

        return response.status(201).json(sala.alunos)
    }
}
