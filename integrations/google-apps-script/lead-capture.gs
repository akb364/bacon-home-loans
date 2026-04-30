const NOTIFICATION_EMAIL = "austin@Artemismtg.com";
const SHEET_NAME = "Leads";

function doPost(event) {
  const payload = parsePayload(event);

  if (payload.website) {
    return jsonResponse({ ok: true, skipped: true });
  }

  const sheet = getLeadSheet();
  const submittedAt = payload.submittedAt || new Date().toISOString();

  sheet.appendRow([
    submittedAt,
    payload.fullName || "",
    payload.phone || "",
    payload.email || "",
    payload.city || "",
    payload.purchaseTimeline || "",
    payload.estimatedCreditScore || "",
    payload.loanGoal || "",
    payload.message || "",
    payload.source || "Website"
  ]);

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: "New Bacon Home Loans website lead",
    replyTo: payload.email || NOTIFICATION_EMAIL,
    name: "Bacon Home Loans Website",
    body: [
      "New website lead",
      "",
      `Name: ${payload.fullName || ""}`,
      `Phone: ${payload.phone || ""}`,
      `Email: ${payload.email || ""}`,
      `City: ${payload.city || ""}`,
      `Purchase timeline: ${payload.purchaseTimeline || ""}`,
      `Estimated credit score: ${payload.estimatedCreditScore || ""}`,
      `Loan goal: ${payload.loanGoal || ""}`,
      "",
      "Message:",
      payload.message || "",
      "",
      `Submitted: ${submittedAt}`,
      `Source: ${payload.source || "Website"}`
    ].join("\n")
  });

  return jsonResponse({ ok: true });
}

function parsePayload(event) {
  if (!event || !event.postData || !event.postData.contents) {
    return {};
  }

  try {
    return JSON.parse(event.postData.contents);
  } catch (error) {
    return {};
  }
}

function getLeadSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted At",
      "Full Name",
      "Phone",
      "Email",
      "City",
      "Purchase Timeline",
      "Estimated Credit Score",
      "Loan Goal",
      "Message",
      "Source"
    ]);
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
