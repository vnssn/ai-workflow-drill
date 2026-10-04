import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateSettingsSubmission,
  validateSettings,
} from "../src/settingsValidation.ts";

const validSettings = {
  displayName: "Taylor Morgan",
  email: "taylor@example.com",
  theme: "Light",
};

test("requires a display name and email", () => {
  assert.deepEqual(
    validateSettings({ ...validSettings, displayName: "", email: "" }),
    {
      displayName: "Display name is required",
      email: "Email is required",
    },
  );
});

test("requires at least two display-name characters", () => {
  assert.equal(
    validateSettings({ ...validSettings, displayName: "A" }).displayName,
    "Display name must contain at least 2 characters",
  );
});

test("rejects malformed email addresses", () => {
  assert.equal(
    validateSettings({ ...validSettings, email: "not-an-email" }).email,
    "Please enter a valid email",
  );
});

test("clears validation errors when values become valid", () => {
  const correctedValues = {
    ...validSettings,
    displayName: "Jo",
    email: "jo@example.org",
  };

  assert.deepEqual(validateSettings(correctedValues), {});
});

test("does not submit invalid settings", () => {
  const result = evaluateSettingsSubmission({ ...validSettings, email: "bad" });

  assert.equal(result.success, false);
  assert.equal(result.errors.email, "Please enter a valid email");
});

test("returns the success message for valid settings", () => {
  assert.deepEqual(evaluateSettingsSubmission(validSettings), {
    success: true,
    errors: {},
    message: "Settings saved successfully",
  });
});
