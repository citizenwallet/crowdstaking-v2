// before(() => {
//   cy.visit("/");
//   cy.disconnectMetamaskWalletFromAllDapps();
//   cy.changeMetamaskNetwork("hardhat");
// });

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
    // cy.get("button", "Approve Contract").should("exist");
    cy.get('[data-test="approve_contract_btn"]').should("exist");
  });

  // it("Approve Contract", () => {
  //   cy.visit("/");
  //   cy.contains("button").contains("Approve Contract").should("exist").click();
  // });

  // it("Shows but ton to switch to correct network", () => {
  //   cy.changeMetamaskNetwork("ethereum");
  //   cy.contains("button:visible", "Connect").should("exist").click();
  //   cy.contains("button:visible", "MetaMask").should("exist").click();
  //   cy.acceptMetamaskAccess();
  //   cy.contains("button", "Switch to Polygon").should("exist").click();
  // });
});

// describe("Unsupported Network", () => {
//   it("displays a message if not connected to a supported network", () => {
//     cy.changeMetamaskNetwork("ethereum");
//     cy.get("@connectWalletButton").click();
//     cy.acceptMetamaskAccess();

//     cy.contains("Unsupported Network").should("exist");
//   });
// });

// describe("Approve Contract", () => {
//   it("Allows user to approve contract", () => {
//     cy.get("[data-test='connect-wallet-metamask']").as("connectWalletButton");
//     cy.changeMetamaskNetwork("localhost");

//     // connect wallet
//     cy.get("@connectWalletButton").click();
//     cy.acceptMetamaskAccess();

//     cy.contains("Approve Contract").should("exist");

//     // approve contract
//     cy.get("[data-test='approve-contract-button']").click();

//     cy.get("[data-test='modal']").should("exist");

//     cy.confirmMetamaskPermissionToSpend();

//     cy.contains("Approve Contract").should("not.exist");
//   });
// });
