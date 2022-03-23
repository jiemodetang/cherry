describe('Send', () => {
  it('should redirect', () => {
    cy.visit('/send')
    cy.url().should('include', '/swap')
  })

  it('should redirect with url params', () => {
    cy.visit(
      '/send?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x6dC4aA8e2F8826E2DE6BD1Fad8D5451aebB5b7D3',
    )
    cy.url().should(
      'contain',
      '/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x6dC4aA8e2F8826E2DE6BD1Fad8D5451aebB5b7D3',
    )
  })
})
