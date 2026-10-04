# Project Rules

1. Form validation logic must be kept separate from the UI component when
   it can be reused or independently tested.

2. Every form feature must include automated tests covering required-field
   validation, invalid input, and successful validation.

3. Every form input must have an explicit accessible label, and validation
   messages must be associated with their corresponding fields.

4. User-facing validation behavior must be tested after implementation
   instead of relying only on visual inspection.

5. Do not modify unrelated project files when implementing a feature.