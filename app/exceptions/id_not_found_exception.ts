import { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export default class IdNotFoundException extends Exception {
  public async handle(_error: this, ctx: HttpContext) {
    ctx.response
      .status(404)
      .send({
        message: `Um ou mais ids não foram encontrados na base de dados.`,
        status: 404,
      })
  }
}
