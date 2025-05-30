describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Estudar Cypress{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .check()
      .should('be.checked');

    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .uncheck()
      .should('not.be.checked');

    cy.get('[data-cy=todos-list] > li')
      .should('not.have.class', 'completed');
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Revisar conteúdo{enter}');

    cy.get('[data-cy=todos-list] > li')
      .dblclick();

    cy.get('[data-cy=todos-list] > li .edit')
      .clear()
      .type('Revisar conteúdo atualizado{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .first()
      .should('have.text', 'Revisar conteúdo atualizado');
  });

  it('Limpa todas as tarefas concluídas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Fazer exercício 1{enter}')
      .type('Fazer exercício 2{enter}');

    cy.get('[data-cy=todos-list] > li [type="checkbox"]')
      .first()
      .check();

    cy.contains('Clear completed')
      .should('be.visible')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Fazer exercício 2');
  });
});