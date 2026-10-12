**As** an agile user
**I want to** have an easy to understand burndown graph
**so that** I can quickly understand the sprint progress

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/923223/content">

**Acceptance criteria**

*   The y-axis of the burndown graph is the sum of story points (this unit needs to be flexible later -&nbsp;<mention class="mention" data-id="74098" data-type="work_package" data-text="###AGILE-198" data-display-id="AGILE-198">###AGILE-198</mention>)

*   The x-axis of the burndown graph is the days between the sprint start and finish date

    *   \[open\] format of the dates - what&#x27;s consistent with the Dashboard charts?

*   Three data series exist

    *   &quot;Remaining story points&quot; represents the actual reduction of work

        *   The series represents the sum of story points per hour of the work packages associated to the sprint in the project that are not closed (according to the backlogs settings for the project).

            *   The story point value factored in for a work package is the value at the end of each hour (local time for the user), or the current time depending on which is earlier.

        *   The series stops at the current date if that is earlier than the sprint&#x27;s finish date

    *   &quot;Guideline&quot; represents the ideal reduction of work

        *   The series starts from the sum of story points at the sprint&#x27;s start date and finishes at 0 at the sprint&#x27;s planned finish date. Between those two, the series declines with a constant reduction. On non-working days, there is no reduction as no work is expected to take place.

        *   Story points added/removed after the sprint&#x27;s start date (e.g. by removing/adding work packages or changing the work packages&#x27;s story points) do not affect the Guideline-dataset

        *   If the sprint runs longer than anticipated (complete button not pressed after finish date), the Guideline series still points to the planned date as this is what was planned with.

    *   &quot;Remaining story points (projection)&quot; is similar to &quot;Guideline&quot; but starts from the point where &quot;Remaining story points&quot; ends. From there, the data series decreases in a straight line to 0 (only non working days stop the decrease).

        *   This series only exist if the sprint is ongoing (started but not finished). It is also not existing if the current time exceeds the planned end of the sprint.

*   The non-working days are displayed as a gray bar with lower opacity (see if it&#x27;s implementable this way)

*   Chart.js can display specific data points on hover, so the user can see the number at each point the value changes

    *   open: what could we include here? just the number, or also links and IDs to the WPs?

*   A blankslate is displayed instead of a graph [(mockup link)](https://www.figma.com/design/owpxg3fdqZONIGL6SBSG8M/Agile--Sprint-reports?node-id=2454-19983&t=mOl1xRIFT1sxRayJ-1)

    *   If the sprint doesn&#x27;t have a start and an end date

        *   If the user has the &quot;create sprint&quot; permission, the blankslate includes the ability to set the date

    *   If the current date is before the sprint&#x27;s start date

    *   If no work package has had any story point set throughout the sprint&#x27;s interval

*   The start/finish dates of the graph are determined as specified by  <mention class="mention" data-id="78631" data-type="work_package" data-text="###AGILE-399" data-display-id="AGILE-399">###AGILE-399</mention>


**Permissions and visibility considerations**

*   If the user is able to see the sprint, the graph is visible.
