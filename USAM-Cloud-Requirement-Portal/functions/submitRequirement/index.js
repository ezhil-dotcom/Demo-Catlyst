const catalyst = require("zcatalyst-sdk-node");

function send(res, status, body) {
  res.status(status);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      return send(res, 200, {
        success: true,
        service: "USAM Cloud Requirement API",
        status: "healthy"
      });
    }

    if (req.method !== "POST") {
      return send(res, 405, { success: false, message: "Method not allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});

    const required = ["companyName", "contactName", "email", "location", "currentEnvironment"];
    const missing = required.filter((field) => !clean(body[field]));

    if (missing.length) {
      return send(res, 400, {
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`
      });
    }

    const email = clean(body.email, 200);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValid) {
      return send(res, 400, { success: false, message: "Please enter a valid email address." });
    }

    const requirementId =
      "USAM-" +
      new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14) +
      "-" +
      Math.floor(100 + Math.random() * 900);

    const rowData = {
      COMPANY_NAME: clean(body.companyName),
      CONTACT_NAME: clean(body.contactName),
      EMAIL: email,
      PHONE: clean(body.phone, 50),
      LOCATION: clean(body.location, 200),
      INDUSTRY: clean(body.industry, 150),
      CURRENT_ENVIRONMENT: clean(body.currentEnvironment, 50),
      WORKLOAD: clean(body.workload, 500),
      CPU: clean(body.cpu, 100),
      RAM: clean(body.ram, 100),
      STORAGE: clean(body.storage, 100),
      BACKUP_REQUIRED: clean(body.backupRequired, 50),
      DR_REQUIRED: clean(body.drRequired, 50),
      MANAGED_SERVICES: clean(body.managedServices, 50),
      REQUIREMENT_ID: requirementId
    };

    const app = catalyst.initialize(req);
    const datastore = app.datastore();
    const table = datastore.table("CloudRequirements");

    const insertedRow = await table.insertRow(rowData);

    return send(res, 201, {
      success: true,
      message: "Cloud requirement saved successfully.",
      requirementId,
      rowId: insertedRow.ROWID || insertedRow.rowId || null
    });
  } catch (error) {
    console.error("Requirement submission error:", error);
    return send(res, 500, {
      success: false,
      message: "Unable to save requirement. Check the Catalyst function logs.",
      error: error.message
    });
  }
};
