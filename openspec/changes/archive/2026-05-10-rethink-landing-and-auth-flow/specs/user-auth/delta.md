# Delta: User Authentication

## MODIFIED Requirements

### Requirement: Entry Point (Landing Page)
The system must provide an informational landing page for unauthenticated users.

#### Scenario: Informational Landing Page
- **GIVEN** a user who is not logged in
- **WHEN** they visit the root application URL
- **THEN** they should see the introductory content (app purpose, how it works).
- **AND** a prominent "Sign In" button should be available to open the authentication form.

#### Scenario: Login Modal/View
- **WHEN** the user clicks "Sign In"
- **THEN** an overlay or dedicated section should display the email/password and OAuth login options.
