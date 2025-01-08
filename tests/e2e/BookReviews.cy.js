describe('Reading Details Page', () => {
  it('allows the user to view and interact with a reading list', () => {

    // Paso 1: Navegar al login y autenticarse
    cy.visit('http://localhost:3000');
    cy.get('input[id="email"]').type('admin@test.com'); 
    cy.get('input[id="password"]').type('admintest'); 
    cy.get('button[type="submit"]').click(); 

    // Verifica que el usuario está autenticado y redirigido
    cy.url().should('include', '/homePage');

    // Paso 2: Navegar al libro
    cy.get('.book-item').first().click(); 

    // Verifica que se carga la página de detalles
    cy.url().should('include', '/catalogue/book-details');
    cy.wait(1000);
    cy.contains('La paciente silenciosa');

    cy.get('#rev-score').invoke('text').then((text) => {
      const scoreInicial = text.trim();
      cy.wrap(scoreInicial).as('scoreInicial');
    });

    cy.get('#num-rev').invoke('text').then((text) => {
      const numRevInicial = text.trim();
      cy.wrap(numRevInicial).as('numRevInicial');
    });

    // Como paso intermedio vamos a probar a hacer una reseña mal hecha
    cy.get('button[type="submit"]').click();
    cy.get('#num-rev').invoke('text') .then((textoActualizado) => { cy.get('@numRevInicial').then((valorInicial) => {
          expect(textoActualizado.trim()).to.equal(valorInicial);}); // El num de reviews debe ser igual
      });
    // Paso 3: Probar la funcionalidad de agregar una reseña
    cy.get('input[id="title"]').type('Este es el titulo de una reseña de prueba.');
    cy.get('textarea[id="comment"]').type('Esta es una reseña de prueba.');
    cy.get('select[id="score"]').select('5'); 
    cy.get('button[type="submit"]').click();

    // Verifica que la reseña aparece en la lista
    cy.contains('Este es el titulo de una reseña de prueba.');
    cy.wait(1000);
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
    cy.get('input[id="edit-title"]').clear().type('Reseña editada.');
    cy.get('textarea[id="edit-comment"]').clear().type('Titulo de reseña editada.');
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
