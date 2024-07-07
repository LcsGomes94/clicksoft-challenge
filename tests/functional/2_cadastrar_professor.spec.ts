import { test } from '@japa/runner'

test.group('Cadastrar professor', () => {
  test('RN02 (RF05): Deve ser coletado do professor os seguintes dados: Nome, e-mail, matrícula, data de nascimento.', async ({ client }) => {
    const resposta1 = await client.post('/professores').json({
      nome: "professor1",
      email: "professor1@gmail.com",
      matricula: "p1",
      dataDeNascimento: "2000/01/01"
    })

    const resposta2 = await client.post('/professores').json({
      nome: "professor2",
      email: "professor2@gmail.com",
      matricula: "p2",
      dataDeNascimento: "2000/01/01"
    })

    resposta1.assertStatus(201)
    resposta2.assertStatus(201)
  })
})
