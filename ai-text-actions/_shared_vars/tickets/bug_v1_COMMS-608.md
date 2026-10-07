### Description:

Several employees reported an issue when using checkbox (task) lists inside a table in a work package description. If a checkbox list item has nested sub-items, the parent (top-level) items become invisible after saving the work package.

This happens both when:

*   the sub-items are **checkboxes**, or

*   the sub-items are **bulleted list items** under a parent checkbox item.

*   (I haven&#39;t tested the issue on numbered list items)


In edit mode, the parent items briefly appear when clicking into the description field, but after saving again, the parent checkbox remains without any visible text/description.

### Steps to reproduce

1.  Open any work package and edit the description.

2.  Insert/create a table in the description.

3.  Inside a table cell, create a checkbox list (task list).

4.  Create nested checkbox sub-items under a parent checkbox item (i.e., a parent item with indented sub-items).

5.  Save the work package.


<figure class="table op-uc-figure_align-center op-uc-figure"><table class="op-uc-table"><thead class="op-uc-table--head"><tr class="op-uc-table--row"><th class="op-uc-table--cell op-uc-table--cell_head"><p class="op-uc-p">This is an example table</p></th></tr></thead><tbody><tr class="op-uc-table--row"><td class="op-uc-table--cell"><ul class="todo-list op-uc-list_task-list op-uc-list"><li class="op-uc-list--item"><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description op-uc-p">Parent checkbox</span></label><ul class="todo-list op-uc-list_task-list op-uc-list"><li class="op-uc-list--item"><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description op-uc-p">Nested checkbox</span></label><ul class="todo-list op-uc-list_task-list op-uc-list"><li class="op-uc-list--item"><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description op-uc-p">2nd nested checkbox</span></label></li></ul></li></ul></li></ul></td></tr></tbody></table></figure>

### What is the buggy behavior?

*   After saving, the parent checkbox list items are no longer visible (their text/description disappears).

*   The checkbox may still be present, but the description is invisible.

*   When switching back into edit mode (click into the description), the parent items appear briefly.

*   After saving again, the parent items disappear again.

*   In the “code view” of the description, the list elements inside the table appear to be output/rendered incorrectly by OpenProject.


### What is the expected behavior?

1.  Parent checkbox list items (and their text) should remain visible after saving.

2.  Nested checkbox lists inside tables should render consistently in both view mode and edit mode.


**Additional notes:**

*   This seems specifically related to checkbox/task lists **inside tables** combined with **nested** checkbox items.


### Screenshots and other files

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/918204/content"> and <img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/918203/content">

### Environment information


**OpenProject installation type**

*   Packaged installation

**OpenProject version**

16.6.2

**Browser**

*   [ ] Chrome
*   [x] Firefox
*   [ ] Safari
*   [ ] Mobile Safari
*   [x] Edge

**Operating System**

*   [x] Windows
*   [ ] Mac OS X
*   [ ] Mobile iOS
*   [ ] Mobile Android
*   [ ] Linux (please specify distro)
*   [ ] Chrome OS
*   [ ] Other (please specify)

**Language**

German