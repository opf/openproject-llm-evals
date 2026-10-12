**As** an open project designer
**I want to** have an improved project overview style
**so that** so that it is more consistent with patterns users are familiar with from other tools. 


**16.3**

<img class="image_resized op-uc-image op-uc-image_inline" style="width:685px;" src="/api/v3/attachments/778261/content">

**16.4 RC (2025-08-29)**

<img class="image_resized op-uc-image op-uc-image_inline" style="width:649px;" src="/api/v3/attachments/778262/content">

**Examples**

<img class="image_resized op-uc-image op-uc-image_inline" style="width:626px;" src="/api/v3/attachments/778263/content">

<br>

<img class="image_resized op-uc-image op-uc-image_inline" style="width:603px;" src="/api/v3/attachments/778264/content">

**Acceptance critiera (revisited)**

*   Project overview:

    *   Make the background white in Light mode: `bgColor-default`

    *   Make the font color in the widget header: `--fgColor-default`

    *   Style the existing widgets to look as close to GitHub home as possible (while keeping the current overall style).

        *   Rounded corners

        *   Keep the current inline editing functionality

        *   The more button (three dots) should always appear (not on hover)

    *   Style the &quot;add widgets&quot; placeholder so that it&#39;s a click zone.

        *   Ideally, always visible in blank spaces (not only on hover)


**Out of scope**

*   Adding an &#39;+ Widget&#39; subheader will be implemented separately: <mention class="mention" data-id="66426" data-type="work_package" data-text="##66426">##66426</mention>