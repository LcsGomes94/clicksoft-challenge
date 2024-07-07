import { test } from '@japa/runner'

test.group('Cadastrar sala', () => {
  test('RN03 (RF09): Deve ser coletado da sala: Número da sala, capacidade de alunos, disponibilidade.', async ({ client }) => {
    const resposta1 = await client.post('/salas/1').json({
      numero: "sala1",
      capacidade: 2,
      disponibilidade: true
    })

    const resposta2 = await client.post('/salas/2').json({
      numero: "sala2",
      capacidade: 1,
      disponibilidade: true
    })

    const resposta3 = await client.post('/salas/2').json({
      numero: "sala3",
      capacidade: 100,
      disponibilidade: false
    })

    const resposta4 = await client.post('/salas/2').json({
      numero: "sala4",
      capacidade: 7,
      disponibilidade: true
    })

    resposta1.assertStatus(201)
    resposta2.assertStatus(201)
    resposta3.assertStatus(201)
    resposta4.assertStatus(201)
  })
})
