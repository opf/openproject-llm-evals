**As a** project team member &nbsp;
**I want to** see sequential numbers on each activity/comment entry in the Activity tab (e.g. #1, #2, #3)
**so that** I can easily reference and find specific comments in discussions (e.g. &quot;See comment #12&quot;)

**Acceptance criteria**

*   Each activity entry in the Activity tab displays a visible, sequential number starting at #1

*   The number increments sequentially per work package (not based on internal journal/version IDs)

*   The number functions as a clickable permalink/anchor link (e.g. #activity-12) that can be copied and shared

*   The numbering is consistent regardless of filter settings (show everything / show changes only / show comments only)

*   When a user clicks an activity permalink, the page scrolls to and highlights the referenced activity

*   Existing references to old comment numbers (from before v15.0) should resolve correctly again


**Technical notes**

*   The original spec in <mention class="mention" data-id="54733" data-type="work_package" data-text="#54733">#54733</mention> listed #id as a required meta element (&quot;Current elements must be present&quot;)

*   Bugs <mention class="mention" data-id="58513" data-type="work_package" data-text="#58513">#58513</mention> (numbers were random) and #59157 (number was not a proper link) indicate the previous implementation used internal journal.version rather than a sequential counter — a simple sequential counter per work package would avoid these issues

*   The mobile app (<mention class="mention" data-id="61447" data-type="work_package" data-text="#61447">#61447</mention>) explicitly removed enumeration; this feature should be restored in both web and mobile

*   Consider whether numbering should count all journal entries (changes + comments) or only comments — the old behavior counted all entries


**Permissions and visibility considerations**

*   To whom is this feature visible?

    *   All users who can view the Activity tab of a work package (same visibility as the activity entries themselves).

*   When is it not visible?

    *   When a user does not have permission to view the work package or its activity.

    *   Internal/private comments should still be numbered, but only visible to users who can see internal comments (existing behavior).


**Translation considerations**

*   Key terms and phrases in the key languages:


<figure class="table op-uc-figure_align-center op-uc-figure"><table class="op-uc-table"><tbody><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">English</p></td><td class="op-uc-table--cell"><p class="op-uc-p">German</p></td><td class="op-uc-table--cell"><p class="op-uc-p">French</p></td></tr><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Activity #12</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Aktivität #12</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Activité #12</p></td></tr><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Comment #5</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Kommentar #5</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Commentaire #5</p></td></tr><tr class="op-uc-table--row"><td class="op-uc-table--cell"><p class="op-uc-p">Copy link to activity</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Link zur Aktivität kopieren</p></td><td class="op-uc-table--cell"><p class="op-uc-p">Copier le lien vers l'activité</p></td></tr></tbody></table></figure>

(The # notation is language-agnostic and does not require translation)

**Out of scope**

*   Threading / reply-to-specific-comment functionality (<mention class="mention" data-id="54709" data-type="work_package" data-text="#54709">#54709</mention>)

*   Ability to mention/reference a specific activity number inline in the text editor (e.g. typing #activity-5 to create a link)

*   Changes to the Activity tab layout or Primer timeline design