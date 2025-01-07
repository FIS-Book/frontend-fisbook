describe('Reading Details Page', () => {
  it('allows the user to view and interact with a reading list', () => {
    // Paso 1: Navegar al login y autenticarse
    cy.visit('http://localhost:3000'); 
    cy.get('input[id="email"]').type('admin@test.com'); 
    cy.get('input[id="password"]').type('admintest'); 
    cy.get('button[type="submit"]').click(); 

    // Verifica que el usuario está autenticado y redirigido
    cy.url().should('include', '/homePage');

    // Paso 2: Navegar a la lista de lecturas
    cy.visit('http://localhost:3000/readings-list/all');
    cy.get('.genre-block').first().click(); 

    // Verifica que se carga la página de detalles
    cy.url().should('include', '/reading-list');
    cy.contains('Género'); // Comprueba que el género aparece en la página

    cy.get('#rev-score').invoke('text').then((text) => {
      const scoreInicial = text.trim();
      cy.wrap(scoreInicial).as('scoreInicial');
    });

    cy.get('#num-rev').invoke('text').then((text) => {
      const numRevInicial = text.trim();
      cy.wrap(numRevInicial).as('numRevInicial');
    });

    cy.get('button[type="submit"]').click();
    cy.get('#num-rev').invoke('text') .then((textoActualizado) => { cy.get('@numRevInicial').then((valorInicial) => {
          expect(textoActualizado.trim()).to.equal(valorInicial);}); // El num de reviews debe ser igual
      });

    // Paso 3: Probar la funcionalidad de agregar una reseña
    cy.get('textarea[id="comment"]').type('Esta es una reseña de prueba.');
    cy.get('select[id="score"]').select('5'); 
    cy.get('button[type="submit"]').click();

    // Verifica que la reseña aparece en la lista
    cy.contains('Esta es una reseña de prueba.');
    cy.wait(2000);
    // Comprobamos que el numero de reseñas y el score han cambiado
    cy.get('#rev-score') 
  .invoke('text')
  .then((textoActualizado) => {
    cy.get('@scoreInicial').then((valorInicial) => {
      expect(textoActualizado.trim()).to.not.equal(valorInicial); 
    });
  });
  cy.get('#num-rev') 
  .invoke('text') 
  .then((textoActualizado) => {
    cy.get('@numRevInicial').then((valorInicial) => {
      expect(textoActualizado.trim()).to.not.equal(valorInicial);
    });
  });

    // Paso 4: Probar la funcionalidad de editar una reseña
    cy.get('#edit-button-677d522e2fc9a1ab877ed7df').click(); 
    cy.get('textarea[id="edit-comment"]').clear().type('Reseña editada.');
    cy.get('#save-button-677d522e2fc9a1ab877ed7df').click();

    // Verifica que la reseña ha sido actualizada
    cy.contains('Reseña editada.');

    // Paso 5: Probar la funcionalidad de eliminar una reseña
    cy.get('#delete-button-677d522e2fc9a1ab877ed7df').click(); 
    cy.contains('Reseña editada.').should('not.exist'); 

    cy.wait(1000);
    // Comprobamos que el numero de reseñas y el score es igual que al inicio
    cy.get('#rev-score') 
      .invoke('text')
      .then((textoActualizado) => {
        cy.get('@scoreInicial').then((valorInicial) => {
          expect(textoActualizado.trim()).to.equal(valorInicial); 
        });
      });
    cy.get('#num-rev') 
      .invoke('text') 
      .then((textoActualizado) => {
        cy.get('@numRevInicial').then((valorInicial) => {
          expect(textoActualizado.trim()).to.equal(valorInicial);
        });
      });

  });
});
