/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office Word */

Office.onReady(() => {
  // If needed, Office.js is ready to be called.
  // Initialize the buttons based on login state
  updateButtonsBasedOnLoginState();
});

/**
 * Check if user is logged in by reading from document settings
 * @returns {boolean} True if user is logged in, false otherwise
 */
function isUserLoggedIn(): boolean {
  // Try to get login state from document settings first (for persistence across sessions)
  let isLoggedIn = Office.context.document.settings.get("isLoggedIn");

  // If not found in settings, check localStorage as fallback
  if (isLoggedIn === null || isLoggedIn === undefined) {
    isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Sync with document settings for future use
    if (isLoggedIn) {
      Office.context.document.settings.set("isLoggedIn", true);
      Office.context.document.settings.saveAsync();
    }
  }

  return !!isLoggedIn;
}

/**
 * Updates the enabled/disabled state of all ribbon buttons based on login state
 */
function updateButtonsBasedOnLoginState() {
  const commandGroups = [
    "Bridge.ReviewGroup",
    "Bridge.AIGroup",
    "Bridge.LogsGroup",
    "Bridge.WorkflowGroup",
  ];

  const loggedIn = isUserLoggedIn();

  // We need to use the Office UI API to update the ribbon
  // @ts-ignore - Office.ribbon is available at runtime but TypeScript doesn't know about it
  if (typeof Office !== "undefined" && Office.ribbon) {
    // Update all ribbon groups
    commandGroups.forEach((groupId) => {
      // @ts-ignore - TypeScript doesn't know about Office.ribbon
      Office.ribbon.requestUpdate({
        tabs: [
          {
            id: "Bridge.Tab",
            groups: [
              {
                id: groupId,
                controls: [
                  {
                    id: "Bridge.SummarizeButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.HighlightMissingButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.ValidateButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.AskButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.ExplainButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.AuditButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.TrackButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.PrepareButton",
                    enabled: loggedIn,
                  },
                  {
                    id: "Bridge.SignatureButton",
                    enabled: loggedIn,
                  },
                ],
              },
            ],
          },
        ],
      });
    });
  }
}

/**
 * Wrapper for command functions to check login state
 * @param fn The function to execute if logged in
 * @returns A function that checks login before executing the original function
 */
function requireLogin(fn: (event: Office.AddinCommands.Event) => void) {
  return (event: Office.AddinCommands.Event) => {
    if (isUserLoggedIn()) {
      fn(event);
    } else {
      // If not logged in, show a message
      Word.run(async (context) => {
        const paragraph = context.document.body.insertParagraph(
          "Please log in to use Bridge features.",
          Word.InsertLocation.start
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
  };
}

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

// Register the functions with Office, wrapping each in requireLogin
Office.actions.associate("summarizeDocument", requireLogin(summarizeDocument));
Office.actions.associate("highlightMissingClauses", requireLogin(highlightMissingClauses));
Office.actions.associate("validateClauses", requireLogin(validateClauses));
Office.actions.associate("explainSection", requireLogin(explainSection));
Office.actions.associate("generateAuditLog", requireLogin(generateAuditLog));
Office.actions.associate("trackAIActions", requireLogin(trackAIActions));
Office.actions.associate("prepareReviewPackage", requireLogin(prepareReviewPackage));
Office.actions.associate("sendForSignature", requireLogin(sendForSignature));

// Listen for storage changes to update button states
window.addEventListener("storage", (event) => {
  if (event.key === "isLoggedIn") {
    updateButtonsBasedOnLoginState();
  }
});
