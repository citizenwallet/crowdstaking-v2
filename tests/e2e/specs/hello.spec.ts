beforeEach(() => {
  cy.visit("/");
  cy.disconnectMetamaskWalletFromAllDapps();
  cy.changeMetamaskNetwork("hardhat");
});

describe("Connect Wallet", () => {
  it("wallet successfully connects", () => {
    cy.contains("button:visible", "Connect").should("exist").click();
    cy.contains("button:visible", "MetaMask").should("exist").click();
    cy.acceptMetamaskAccess();

    cy.changeMetamaskNetwork("ethereum");

    cy.contains("button:visible", "Switch Chain").should("exist").click();
    cy.contains("button:visible", "Hardhat").should("exist").click();
    cy.allowMetamaskToSwitchNetwork();

    // check balance

    // input some amount

    // etc
  });
});
