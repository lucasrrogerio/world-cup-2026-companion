# Capability: Album Sorting Navigation State

## Purpose
Definir o comportamento de estado da navegação do álbum ao alternar entre ordenação por grupos e alfabética.

## Requirements

### Requirement: Mode-specific active navigation state
The system MUST maintain independent active navigation selections for group and alphabetical sorting modes.

#### Scenario: Preserving active item per mode
- **WHEN** the user selects an item in group mode, switches to alphabetical mode, selects another item, and switches back to group mode
- **THEN** the previously selected group-mode item MUST be restored as the active navigation item.

### Requirement: Deterministic fallback for invalid active item
The system MUST apply a deterministic fallback when the stored active item is not available in the current mode list.

#### Scenario: Group mode fallback
- **WHEN** group mode is active and the stored group-mode active item is missing from the current group list
- **THEN** the system MUST set the active navigation item to `FWC`, or to the first available group item if `FWC` is unavailable.

#### Scenario: Alphabetical mode fallback
- **WHEN** alphabetical mode is active and the stored alphabetical active item is missing from the current alphabetical list
- **THEN** the system MUST set the active navigation item to the first item according to the current alphabetical sort direction.

### Requirement: Consistent list-anchor synchronization on mode switch
After changing sorting mode, the active navigation highlight MUST represent an item that exists in the newly active list context.

#### Scenario: Switching from group to alphabetical
- **WHEN** the user switches sorting from group mode to alphabetical mode
- **THEN** the highlighted navigation item MUST belong to the alphabetical item list.

#### Scenario: Switching from alphabetical to group
- **WHEN** the user switches sorting from alphabetical mode to group mode
- **THEN** the highlighted navigation item MUST belong to the group item list.
