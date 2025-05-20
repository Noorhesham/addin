/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office Word */

Office.onReady(() => {
  // If needed, Office.js is ready to be called.
});

/**
 * Summarizes the document
 * @param event
 */
function summarizeDocument(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph(
      "Document Summary: This document is a legal agreement between two parties...",
      Word.InsertLocation.start
    );
    paragraph.font.bold = true;
    paragraph.font.color = "blue";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

/**
 * Highlights missing clauses in the document
 * @param event
 */
function highlightMissingClauses(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph(
      "MISSING CLAUSES: Confidentiality clause, Indemnification clause",
      Word.InsertLocation.end
    );
    paragraph.font.bold = true;
    paragraph.font.color = "red";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

/**
 * Validates clauses in the document
 * @param event
 */
function validateClauses(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph(
      "VALIDATION COMPLETE: All present clauses conform to standard templates.",
      Word.InsertLocation.end
    );
    paragraph.font.bold = true;
    paragraph.font.color = "green";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

/**
 * Explains the selected section
 * @param event
 */
function explainSection(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    // Get selected text
    const selection = context.document.getSelection();
    selection.load("text");
    await context.sync();

    // Insert explanation after selection
    const range = selection.getRange();
    const explanation = range.insertParagraph(
      "EXPLANATION: This section discusses the terms and conditions of the agreement.",
      Word.InsertLocation.after
    );
    explanation.font.italic = true;
    explanation.font.color = "purple";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

/**
 * Generates an audit log
 * @param event
 */
function generateAuditLog(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph(
      "AUDIT LOG: Document created on 2023-06-15. Last modified on 2023-06-20. 5 revisions total.",
      Word.InsertLocation.end
    );
    paragraph.font.color = "gray";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

/**
 * Tracks AI actions
 * @param event
 */
function trackAIActions(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph(
      "AI ACTIONS: 2 summaries generated, 1 clause validation, 3 section explanations.",
      Word.InsertLocation.end
    );
    paragraph.font.color = "teal";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

/**
 * Prepares a review package
 * @param event
 */
function prepareReviewPackage(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph(
      "REVIEW PACKAGE PREPARED: Document is ready for review. Package ID: REV-2023-06-21-001",
      Word.InsertLocation.end
    );
    paragraph.font.bold = true;
    paragraph.font.color = "blue";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

/**
 * Sends document for signature
 * @param event
 */
function sendForSignature(event: Office.AddinCommands.Event) {
  Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph(
      "SENT FOR SIGNATURE: Document has been sent to all parties for electronic signature.",
      Word.InsertLocation.end
    );
    paragraph.font.bold = true;
    paragraph.font.color = "green";

    await context.sync();
    event.completed();
  }).catch((error) => {
    console.log("Error: " + error);
    event.completed();
  });
}

// Register the functions with Office.
Office.actions.associate("summarizeDocument", summarizeDocument);
Office.actions.associate("highlightMissingClauses", highlightMissingClauses);
Office.actions.associate("validateClauses", validateClauses);
Office.actions.associate("explainSection", explainSection);
Office.actions.associate("generateAuditLog", generateAuditLog);
Office.actions.associate("trackAIActions", trackAIActions);
Office.actions.associate("prepareReviewPackage", prepareReviewPackage);
Office.actions.associate("sendForSignature", sendForSignature);
