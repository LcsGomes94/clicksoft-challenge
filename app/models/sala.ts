import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Professor from './professor.js'
import Aluno from './aluno.js'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero: string

  @column()
  declare capacidade: number

  @column()
  declare disponibilidade: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Professor)
  declare professor: BelongsTo<typeof Professor>

  @manyToMany(() => Aluno, {
    pivotTable: 'salas_alunos'
  })
  declare alunos: ManyToMany<typeof Aluno>
}
