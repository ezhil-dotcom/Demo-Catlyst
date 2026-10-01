# USAM Cloud Requirement Portal

A portfolio project for testing Zoho Catalyst with a practical cloud-engineering use case.

## Features
- Customer cloud requirement form
- Client-side validation
- Serverless Catalyst Advanced I/O function
- Catalyst Data Store persistence
- Requirement ID generation
- Dashboard-style submission counter
- Basic health/test endpoint

## Catalyst components
- Web Client Hosting
- Node.js Advanced I/O Function
- Data Store

## Data Store table
Create a table named `CloudRequirements` with these columns:
- COMPANY_NAME (Text)
- CONTACT_NAME (Text)
- EMAIL (Email/Text)
- PHONE (Text)
- LOCATION (Text)
- INDUSTRY (Text)
- CURRENT_ENVIRONMENT (Text)
- WORKLOAD (Text)
- CPU (Text)
- RAM (Text)
- STORAGE (Text)
- BACKUP_REQUIRED (Text)
- DR_REQUIRED (Text)
- MANAGED_SERVICES (Text)
- REQUIREMENT_ID (Text)

ROWID, CREATEDTIME and MODIFIEDTIME are system fields.

## Setup
1. Create a Catalyst project.
2. Create the Data Store table and columns above.
3. Create an Advanced I/O Node.js function named `submitRequirement`.
4. Replace its generated `index.js` and `catalyst-config.json` with the files in this project.
5. Run `npm install` inside the function directory.
6. Deploy the function.
7. Put the deployed function URL into `client/app.js` as `API_URL`.
8. Host the contents of the `client` folder using Web Client Hosting.

## Important
The backend uses the Catalyst Node.js SDK because it is straightforward for this learning/test project. Current Catalyst documentation says the Node.js SDK is entering deprecation on 1 October 2026 and recommends the newer modular JavaScript SDK. For a production project started after that date, migrate this backend to the JavaScript SDK.
