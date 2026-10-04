# AI-Assisted Workflow Comparison

## Round 1: Vague Prompt

For Round 1, I intentionally used a minimal prompt: "Build a settings form with validation in this project." I provided no implementation constraints, accessibility requirements, examples, file references, or testing instructions. The AI generated the feature directly, and I reviewed the result manually.

The implementation was functional and required relatively little review because the feature itself was small. However, the vague prompt gave the AI no explicit requirements for how validation should be structured or verified.

## Round 2: Precise Prompt

For Round 2, I started from the main branch using a fresh branch and a fresh AI session. The prompt specified the required fields, validation rules, accessibility requirements, edge cases, implementation constraints, example behavior, and a verification workflow. The AI was instructed to explore the project, create a plan, implement the feature, write tests, run them, and fix failures.

The resulting diff was substantially more structured. Round 2 added `src/settingsValidation.ts`, separating validation logic from the UI. It also added `tests/settingsValidation.test.js` and a `test` script in `package.json`. This provided automated verification that was absent from the first round.

## Correctness and Edge Cases

The precise workflow explicitly defined required fields, minimum display-name length, invalid email handling, error clearing, and successful submission behavior. This made the expected behavior clearer and easier to verify than the vague approach.

## Accessibility

Round 2 explicitly required accessible labels, associated validation messages, keyboard accessibility, and avoiding color-only error communication. These requirements gave the AI concrete accessibility targets to implement and review.

## Review Effort

Round 1 was quicker to prompt and implement, but more of the quality depended on manual inspection. Round 2 required more planning and a longer prompt, but the added tests and separated validation logic made verification easier and reduced uncertainty during review.

## AI Mistake Caught

One important lesson was that a vague prompt does not explicitly require automated verification. Round 1 produced a working feature, but it did not provide the dedicated validation tests that Round 2 produced. This showed me that functional output alone is not enough; the workflow should explicitly require verification.

## Conclusion

The exercise showed that precise AI instructions improve the development workflow by defining expected behavior before implementation and requiring verification afterward. The second workflow was more deliberate, but it produced clearer validation logic and automated tests, making the result easier to review and maintain.