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

<figure class="table op-uc-figure_align-center op-uc-figure"><table class="op-uc-table"><thead class="op-uc-table--head"><tr class="op-uc-table--row"><th class="op-uc-table--cell op-uc-table--cell_head"><p class="op-uc-p">EN</p></th><th class="op-uc-table--cell op-uc-table--cell_head"><p class="op-uc-p">DE</p></th><th class="op-uc-table--cell op-uc-table--cell_head"><p class="op-uc-p">FR</p></th><th class="op-uc-table--cell op-uc-table--cell_head"><p class="op-uc-p">ES</p></th></tr></thead><tbody><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Risk</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Risiko</p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td></tr><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Likelihood</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Eintrittswahrscheinlichkeit</p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td></tr><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Impact</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Auswirkung</p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td></tr><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Owner</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Verantwortlich(?)</p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td></tr><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Residual risk</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Restrisiko(-Level?)</p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td><td class="op-uc-table--cell"><p class="op-uc-p"><br data-cke-filler="true"></p></td></tr></tbody></table></figure><br>

### Out of scope

Modeling risks as anything but 5x5 levels