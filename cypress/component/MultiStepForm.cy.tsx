import React from "react";
import {Home} from "@/pages";
import {cartInfo} from "@/components/multi-step-form/context";

describe("Home.cy.tsx", () => {
  it("All Step & Sidebar Step (Positive Assertion)", () => {
    cy.mount(<Home />);

    // Active step-1 (sidebar)
    cy.verifyActiveStep(1);

    //fill form
    cy.get("[data-cy='name-input']").type("Shweta");
    cy.get("[data-cy='email-input']").type("shweta@gmail.com");
    cy.get("[data-cy='phone-input']").type("9547689089");
    cy.get('[data-cy="step-1-next-btn"]').click();

    // Active step-2 (sidebar)
    cy.verifyActiveStep(2);

    let total = 0;
    const ADDONS = cartInfo.addOns;
    let isBillYearly = false;

    cy.get('[data-cy="bill-type-switch"]')
      .click()
      .then(() => {
        isBillYearly = true;
      });

    cy.get('[data-cy="pack-arcade"]')
      .click()
      .within(() => {
        cy.contains("$").then((data) => {
          const packPrice = data.text()?.replace(/\D/g, "") ?? 0;
          total += Number(packPrice);
        });
      });

    cy.get('[data-cy="step-2-next-btn"]').click();

    // Active step-3 (sidebar)
    cy.verifyActiveStep(3);
    ADDONS.slice(1).forEach((addOn) => {
      cy.get(`[data-cy="add-on-${addOn.id}"]`)
        .click()
        .within(() => {
          cy.contains("$").then((data) => {
            const addOnPrice = data.text()?.replace(/\D/g, "") ?? 0;
            total += Number(addOnPrice);
          });
        });
    });
    cy.get('[data-cy="step-3-next-btn"]')
      .click()
      .then(() => {
        cy.contains(`$${total}/${isBillYearly ? "yr" : "mo"}`);
      });

    // Active step-4 (sidebar)
    cy.verifyActiveStep(4);

    cy.get('[data-cy="step-4-confirm-btn"]')
      .click()
      .then(() => {
        cy.contains("Thank you!");
      });

    // No Active step (sidebar)
    cy.verifyActiveStep();
  });

  it("Step 1 (all empty input)", () => {
    cy.mount(<Home />);

    //fill form
    cy.get('[data-cy="step-1-next-btn"]').click();
    cy.get('[data-cy="name-input"]').parent().siblings().contains("Please fill the field");
    cy.get('[data-cy="email-input"]').parent().siblings().contains("Please fill the field");
    cy.get('[data-cy="phone-input"]').parent().siblings().contains("Please fill the field");
  });
  it("Step 1 (empty name input)", () => {
    cy.mount(<Home />);

    //fill form
    cy.get("[data-cy='email-input']").type("shweta@gmail.com");
    cy.get("[data-cy='phone-input']").type("9547689089");
    cy.get('[data-cy="step-1-next-btn"]').click();
    cy.get('[data-cy="name-input"]').parent().siblings().contains("Please fill the field");
  });
  it("Step 1 (empty email input)", () => {
    cy.mount(<Home />);

    //fill form
    cy.get("[data-cy='name-input']").type("Shweta");
    cy.get("[data-cy='phone-input']").type("9547689089");
    cy.get('[data-cy="step-1-next-btn"]').click();
    cy.get('[data-cy="email-input"]').parent().siblings().contains("Please fill the field");
  });
  it("Step 1 (empty phone input)", () => {
    cy.mount(<Home />);

    //fill form
    cy.get("[data-cy='name-input']").type("Shweta");
    cy.get("[data-cy='email-input']").type("shweta@gmail.com");
    cy.get('[data-cy="step-1-next-btn"]').click();
    cy.get('[data-cy="phone-input"]').parent().siblings().contains("Please fill the field");
  });
  it("Step 1 (wrong email input)", () => {
    cy.mount(<Home />);

    //fill form
    cy.get("[data-cy='name-input']").type("Shweta");
    cy.get("[data-cy='phone-input']").type("9547689089");
    cy.get('[data-cy="email-input"]').type("shweta@gmmm");
    cy.get('[data-cy="step-1-next-btn"]').click();

    cy.get('[data-cy="email-input"]').parent().parent().contains("Invalid input");
    cy.get('[data-cy="name-input"]').parent().parent().should("not.contain", "Invalid input");
    cy.get('[data-cy="phone-input"]').parent().parent().should("not.contain", "Invalid input");
  });
  it("Step 1 (wrong phone input)", () => {
    cy.mount(<Home />);

    //fill form
    cy.get("[data-cy='name-input']").type("Shweta");
    cy.get("[data-cy='phone-input']").type("54678990");
    cy.get('[data-cy="email-input"]').type("shweta@gmail.com");
    cy.get('[data-cy="step-1-next-btn"]').click();

    cy.get('[data-cy="phone-input"]').parent().parent().contains("Invalid input");
    cy.get('[data-cy="name-input"]').parent().parent().should("not.contain", "Invalid input");
    cy.get('[data-cy="email-input"]').parent().parent().should("not.contain", "Invalid input");
  });
  it("Step 1 (wrong name input)", () => {
    cy.mount(<Home />);

    //fill form
    cy.get("[data-cy='name-input']").type("Shweta Kumari");
    cy.get("[data-cy='phone-input']").type("9674678990");
    cy.get('[data-cy="email-input"]').type("shweta@gmail.com");
    cy.get('[data-cy="step-1-next-btn"]').click();

    cy.get('[data-cy="name-input"]').parent().parent().contains("Invalid input");
    cy.get('[data-cy="email-input"]').parent().parent().should("not.contain", "Invalid input");
    cy.get('[data-cy="phone-input"]').parent().parent().should("not.contain", "Invalid input");
  });

  it("Default value submit", () => {
    cy.mount(<Home />);

    //fill form
    cy.get("[data-cy='name-input']").type("Shweta");
    cy.get("[data-cy='email-input']").type("shweta@gmail.com");
    cy.get("[data-cy='phone-input']").type("9547689089");
    cy.get('[data-cy="step-1-next-btn"]').click();

    let total = 0;
    const isBillYearly = false;

    cy.get('[data-cy="pack-advanced"]').within(() => {
      cy.contains("$").then((data) => {
        const packPrice = data.text()?.replace(/\D/g, "") ?? 0;
        total += Number(packPrice);
      });
    });

    cy.get('[data-cy="step-2-next-btn"]').click();

    cy.get('[data-cy="step-3-next-btn"]')
      .click()
      .then(() => {
        cy.contains(`$${total}/${isBillYearly ? "yr" : "mo"}`);
      });

    // Active step-4 (sidebar)
    cy.verifyActiveStep(4);

    cy.get('[data-cy="step-4-confirm-btn"]')
      .click()
      .then(() => {
        cy.contains("Thank you!");
      });
  });
});
