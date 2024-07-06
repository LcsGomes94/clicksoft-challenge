import router from '@adonisjs/core/services/router'
import AlunosController from '../app/controllers/alunos_controller.js'
import ProfessoresController from '../app/controllers/professores_controller.js'
import SalasController from '../app/controllers/salas_controller.js'

router.post('/alunos', [AlunosController, 'cadastrarAluno'])
router.get('/alunos/:id', [AlunosController, 'buscarAluno'])
router.put('/alunos/:id', [AlunosController, 'atualizarAluno'])
router.delete('/alunos/:id', [AlunosController, 'deletarAluno'])

router.post('/professores', [ProfessoresController, 'cadastrarProfessor'])
router.get('/professores/:id', [ProfessoresController, 'buscarProfessor'])
router.put('/professores/:id', [ProfessoresController, 'atualizarProfessor'])
router.delete('/professores/:id', [ProfessoresController, 'deletarProfessor'])

router.post('/salas/:id', [SalasController, 'cadastrarSala'])
router.get('/salas/:id', [SalasController, 'buscarSala'])
router.put('/salas/:id', [SalasController, 'atualizarSala'])
router.delete('/salas/:id', [SalasController, 'deletarSala'])
