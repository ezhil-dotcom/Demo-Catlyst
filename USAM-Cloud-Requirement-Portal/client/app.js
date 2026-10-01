// Replace this with the URL shown after deploying the Catalyst function.
const API_URL = "PASTE_YOUR_CATALYST_FUNCTION_URL_HERE";
const form = document.getElementById("requirementForm");
const result = document.getElementById("result");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (API_URL.includes("PASTE_YOUR")) {
    showResult("Please add your deployed Catalyst function URL in client/app.js.", false);
    return;
  }

  submitBtn.disabled = true;
  statusEl.textContent = "Submitting...";

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Submission failed");
    }

    showResult(
      `Requirement submitted successfully. Requirement ID: ${payload.requirementId}`,
      true
    );
    form.reset();
    statusEl.textContent = "Submitted";
  } catch (error) {
    console.error(error);
    showResult(error.message, false);
    statusEl.textContent = "Error";
  } finally {
    submitBtn.disabled = false;
  }
});

function showResult(message, success) {
  result.className = `result ${success ? "success" : "error"}`;
  result.textContent = message;
}
