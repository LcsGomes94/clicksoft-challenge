# clicksoft-challenge
Desafio para a vaga de estágio Desenvolvedor Backend Node.js na empresa ClickSoft 

- Foi utilizado o SQLite.
    
- Todas as regras de negócio tem teste automatizado implementado, basta rodar o comando "node ace test".
- Todas as rotas estão documentadas individualmente.
- O banco de dados será **truncado** no início de cada teste, então todos os dados anteriores serão **perdidos**.


- Abaixo estão os comandos que serão necessários para clonar, preparar, testar e inicializar o servidor: 
- git clone [https://github.com/LcsGomes94/clicksoft-challenge.git](https://github.com/LcsGomes94/clicksoft-challenge.git)
- cd clicksoft-challenge 
- npm install  
- node ace migration:run  
- node ace test  
- node ace serve
