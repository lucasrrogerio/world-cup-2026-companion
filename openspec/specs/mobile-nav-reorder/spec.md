# Mobile Navigation Reorder

## Purpose

Define requirements for mobile navigation ordering and content.

## ADDED Requirements

### Requirement: Mobile navigation displays in correct order
The mobile bottom navigation SHALL display items in the order: Progresso, Meu Album, Sobre.

#### Scenario: Mobile nav shows correct order
- **WHEN** user opens the mobile app
- **THEN** bottom navigation shows Progresso first, then Meu Album, then Sobre

### Requirement: User icon removed from mobile navigation
The mobile bottom navigation SHALL NOT display a user profile button.

#### Scenario: User icon not visible in mobile nav
- **WHEN** user is logged in (anonymous or authenticated) on mobile
- **THEN** no user icon appears in the bottom navigation bar
- **AND** user can access profile through the hamburger menu