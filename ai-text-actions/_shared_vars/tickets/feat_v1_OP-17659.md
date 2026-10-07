**As** a user
**I want to** see parent hierarchy levels when filtering hierarchical custom fields,
**so that** I know which sub item I am actually selecting.

**Acceptance criteria**

*   When filtering a hierarchical custom field with a search term, parent level are still recognizable even if they are not matching the filter


**Examples / Problem statement**

Given a hierarchy like the following:

*   Accounting

    *   Managers

*   Sales

    *   Managers

*   HR

    *   Managers

*   ...


When I try to fill such a custom field in a work package and filter using the term &quot;manag&quot;, this is what I see:

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/755675/content">

We also practically have this problem on community.openproject.org with the modules field, when searching for &quot;auth&quot;:

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/755677/content">

Here, I have no clue what the top-most &quot;Authentication&quot; belongs to.