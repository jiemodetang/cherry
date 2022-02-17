describe('Send', () => {
  it('should redirect', () => {
    cy.visit('/send')
    cy.url().should('include', '/swap')
  })

  it('should redirect with url params', () => {
    cy.visit(
      '/send?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x1Fd69bFF6f8A6C6aDAe279837DD59a13976343F3',
    )
    cy.url().should(
      'contain',
      '/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x1Fd69bFF6f8A6C6aDAe279837DD59a13976343F3',
    )
  })
})
