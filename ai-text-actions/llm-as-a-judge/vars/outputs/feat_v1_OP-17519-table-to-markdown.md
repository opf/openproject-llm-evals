**As a** project team member or risk manager
**I want to** create and register a new risk with likelihood and impact
**so that** the project can proactively assess and monitor potential threats

### Acceptance criteria

*   Risk can be created with:

    *   Title (mandatory)
    
    *   description

    *   Owner

    *   Category (An admin-configurable Enumeration)

    *   Likelihood (1–5) (mandatory)

    *   Impact (1–5) (mandatory)

    *   A level is defined as `Likelihood x Impact`

*   Risks can have a residual likelihood and impact

    *   For now, assumed to be updated manually

    *   Later, derived from action items (e.g. treatments)

*   Risks can have custom fields, sorted by their custom order


### Technical notes

*   Risks are a new data type

*   Journalizing enabled for all attributes


### Permissions and visibility considerations

To whom is this feature visible?

*   Project members with create/edit permissions for risks


### Translation considerations

Key terms and phrases:

| EN            | DE                          | FR | ES |
|---------------|-----------------------------|----|----|
| Risk          | Risiko                      |    |    |
| Likelihood    | Eintrittswahrscheinlichkeit |    |    |
| Impact        | Auswirkung                  |    |    |
| Owner         | Verantwortlich(?)           |    |    |
| Residual risk | Restrisiko(-Level?)         |    |    |

### Out of scope

Modeling risks as anything but 5x5 levels