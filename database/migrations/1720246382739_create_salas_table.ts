import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unique()

      table.string('numero', 10).notNullable().unique()
      table.integer('capacidade').notNullable()
      table.boolean('disponibilidade').notNullable()
      table.integer('professor_id').unsigned().references('id').inTable('professores').onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
