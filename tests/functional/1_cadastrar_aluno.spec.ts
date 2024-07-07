import { test } from '@japa/runner'

test.group('Cadastrar aluno', () => {
  test('RN01 (RF01): Deve ser coletado do aluno os seguintes dados: Nome, e-mail, matrícula, data de nascimento.', async ({ client }) => {
    const resposta1 = await client.post('/alunos').json({
      nome: "aluno1",
      email: "aluno1@gmail.com",
      matricula: "a1",
      dataDeNascimento: "2000/01/01"
    })

    const resposta2 = await client.post('/alunos').json({
      nome: "aluno2",
      email: "aluno2@gmail.com",
      matricula: "a2",
      dataDeNascimento: "2000/01/01"
    })

    const resposta3 = await client.post('/alunos').json({
      nome: "aluno3",
      email: "aluno3@gmail.com",
      matricula: "a3",
      dataDeNascimento: "2000/01/01"
    })

    resposta1.assertStatus(201)
    resposta2.assertStatus(201)
    resposta3.assertStatus(201)
  })
})
