import { test } from '@japa/runner'

test.group('Buscar salas', () => {
  test('RN06 (RF16): Deverá ser retornado: Nome do aluno, array de objetos com nome do professor e o número da sala.', async ({ client }) => {
    const resposta = await client.get('/alunos/1/salas')

    resposta.assertBodyContains({
      aluno: "aluno1",
      salas: [
        {
          sala: "sala1",
          professor: "professor1"
        },
        {
          sala: "sala4",
          professor: "professor2"
        }
      ]
    })
  })
})
