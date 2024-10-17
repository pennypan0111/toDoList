// https://on.cypress.io/api

// const newItem = {
//   id: 4,
//   title: 'test add new item',
//   isDone: false
// }

// describe('create button', () => {
//   it('create to do item', () => {
//     cy.visit('/')

//     cy.get('[data-cy="addItemInput"]').type(newItem.title)

//     cy.intercept('POST', '/api/Todoes', {
//       statusCode: 201,
//       body: newItem
//     }).as('createTodo')

//     cy.contains('新增').click()

//     cy.wait('@createTodo').then((interception) => {
//       expect(interception.response.statusCode).to.eq(201)
//       expect(interception.response.body.id).to.eq(newItem.id)
//       expect(interception.response.body.title).to.eq(newItem.title)
//       expect(interception.response.body.isDone).to.eq(newItem.isDone)
//     })
//   })
// })

describe('create button', () => {
  it('create to do item', () => {
    cy.visit('/')

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/api/Todoes`
    }).then((response) => {
      expect(response.status).to.eq(200)

      const existingItems = response.body
      const maxId = existingItems.reduce((max, item) => Math.max(max, item.id), 0)

      const newItem = {
        id: maxId + 1,
        title: 'test add new item',
        isDone: false
      }

      cy.get('[data-cy="addItemInput"]').type(newItem.title)

      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/api/Todoes`,
        body: newItem,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.id).to.eq(newItem.id)
        expect(response.body.title).to.eq(newItem.title)
        expect(response.body.isDone).to.eq(newItem.isDone)
      })

      cy.get('[data-cy="addItemInput"]').clear()
    })
  })
})
