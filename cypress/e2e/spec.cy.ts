import { RobotOrientation } from "~/types";

describe("E2E", () => {
  it("should run tests", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Robots on Mars").should("be.visible");

    cy.get('input[name="x"]').clear().type("1");
    cy.get('input[name="y"]').clear().type("1");
    cy.get('select[name="orientation"]').select(RobotOrientation.E);
    cy.get('input[name="command"]').clear().type("RFRFRFRF");
    cy.get('button[type="submit"]').click();

    cy.get("table tr")
      .eq(1)
      .contains("td", "1 1 E")
      .next()
      .contains("td", "OK");

    cy.get('input[name="x"]').clear().type("3");
    cy.get('input[name="y"]').clear().type("2");
    cy.get('select[name="orientation"]').select(RobotOrientation.N);
    cy.get('input[name="command"]').clear().type("FRRFLLFFRRFLL");
    cy.get('button[type="submit"]').click();

    cy.get("table tr")
      .eq(2)
      .contains("td", "N/A")
      .next()
      .contains("td", "LOST");

    cy.get('input[name="x"]').clear().type("0");
    cy.get('input[name="y"]').clear().type("3");
    cy.get('select[name="orientation"]').select(RobotOrientation.W);
    cy.get('input[name="command"]').clear().type("LLFFFLFLFL");
    cy.get('button[type="submit"]').click();

    cy.get("table tr")
      .eq(3)
      .contains("td", "2 3 S")
      .next()
      .contains("td", "OK");
  });
});
