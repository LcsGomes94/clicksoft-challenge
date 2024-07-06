import { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export default class CapacidadeInsuficienteException extends Exception {
  private capacidade: number

  constructor(capacidade: number) {
    super()
    this.capacidade = capacidade
  }

  public async handle(_error: this, ctx: HttpContext) {
    ctx.response
      .status(403)
      .send({
        message: `Capacidade insuficiente. Há ${this.capacidade} alunos matriculados nesta sala atualmente.`,
        status: 403,
      })
  }
}
