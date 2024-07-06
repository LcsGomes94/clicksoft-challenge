import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'salas_alunos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unique()

      table.integer('sala_id').unsigned().references('id').inTable('salas').onDelete('CASCADE')
      table.integer('aluno_id').unsigned().references('id').inTable('alunos').onDelete('CASCADE')

      table.unique(['sala_id', 'aluno_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}