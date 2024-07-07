import { test } from '@japa/runner'

test.group('Criar matricula', () => {
  test('RN03 (RF13): A sala não pode possuir o mesmo aluno mais de uma vez.', async ({ client }) => {
    const resposta1 = await client.post('/salas/1/matriculas').json({
      alunoId: 1,
      professoreId: 1
    })
    
    const resposta2 = await client.post('/salas/1/matriculas').json({
      alunoId: 1,
      professoreId: 1
    })

    resposta1.assertStatus(201)
    resposta2.assertStatus(403)
  }),
  test('RN04 (RF13): A sala não pode exceder sua capacidade de alunos.', async ({ client }) => {
    const resposta1 = await client.post('/salas/1/matriculas').json({
      alunoId: 2,
      professoreId: 1
    })
    
    const resposta2 = await client.post('/salas/1/matriculas').json({
      alunoId: 3,
      professoreId: 1
    })

    resposta1.assertStatus(201)
    resposta2.assertStatus(403)
  }),
  test('RN05 (RF13): O professor não poderá alocar um aluno para uma sala que não tenha sido criada por ele.', async ({ client }) => {
    const resposta = await client.post('/salas/1/matriculas').json({
      alunoId: 3,
      professoreId: 2
    })

    resposta.assertStatus(403)
  }),
  test('RN0EXTRA (RF13): O professor não poderá alocar um aluno para uma sala que não tenha disponibilidade', async ({ client }) => {
    const resposta1 = await client.post('/salas/3/matriculas').json({
      alunoId: 1,
      professoreId: 2
    })

    const resposta2 = await client.post('/salas/4/matriculas').json({
      alunoId: 1,
      professoreId: 2
    })

    resposta1.assertStatus(403)
    resposta2.assertStatus(201)
  })
})
