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
    cy.visit('http://localhost:3000/admin/reviews');
    cy.contains('Recargar Reseñas'); 

    // REVIEW DE UNA READING LIST 
    cy.get('#677cf240c64ee228070aea07').should('exist');
    // REVIEW DE UN LIBRO
    cy.get('#677c6aa20da4902aa61a1ae3').should('exist');

    cy.get('#book-reviews').click();

    // No debería existir la reseña de la lista de lectura
    cy.get('#677cf240c64ee228070aea07').should('not.exist');
    // Comprobamos que sí existe la reseña del libro
    cy.get('#677c6aa20da4902aa61a1ae3').should('exist');
    
    // Paso 3 : Comprobamos lo contrario, vamos a las reseñas de las listas de lectura
    cy.get('#reading-reviews').click();

     // ¿Existe la reading list review?
     cy.get('#677cf240c64ee228070aea07').should('exist');
     // ¿Existe la review del libro?
     cy.get('#677c6aa20da4902aa61a1ae3').should('not.exist');

    // Paso 4: Volvemos a todas las reseñas
    cy.get('#all-reviews').click();

    cy.get('#677cf240c64ee228070aea07').should('exist');
    cy.get('#677c6aa20da4902aa61a1ae3').should('exist');


    // Segunda parte del test: Crear una reseña

    cy.get('table tbody tr').its('length')
    .then((initialRowCount) => {
      cy.wrap(initialRowCount).as('initialRowCount')});

    cy.visit('http://localhost:3000/catalogue/book-details/9788466351935');
    cy.get('input[id="title"]').type('Este es el titulo de una reseña de prueba.');
    cy.get('textarea[id="comment"]').type('Esta es una reseña de prueba hecha por un admin.');
    cy.get('select[id="score"]').select('5'); 
    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:3000/admin/reviews');
    cy.contains("Esta es una reseña de prueba hecha por un admin.");

    // Contar que hay una reseña más
    cy.get('table tbody tr')
      .its('length')
      .then((newRowCount) => {
        // Compara los conteos
        cy.get('@initialRowCount').then((initialCount) => {
          expect(newRowCount).to.equal(initialCount + 1);
        });
      });
    
    // Paso 5: Eliminar la reseña
    cy.visit('http://localhost:3000/catalogue/book-details/9788466351935');
    cy.get('#delete-button-677d522e2fc9a1ab877ed7df').click(); 

    //Volvemos y contamos rows
    cy.visit('http://localhost:3000/admin/reviews');

    cy.get('table tbody tr')
    .its('length')
    .then((newRowCount) => {
      // Compara los conteos
      cy.get('@initialRowCount').then((initialCount) => {
        expect(newRowCount).to.equal(initialCount); // Ya que la hemos eliminado, deben ser iguales
      });
    });

  });
});
