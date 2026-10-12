**As** a user
**I want to** be able to create views with flexible filter rules
**so that** I may create even more versatile views

### **More details / Use case**

Currently, the filtering feature is limited to one instance of each filter type linked by an _AND_ logical operation, e.g. `Filter = "type=TASK _AND_ status=TODO _AND_ Assignee=(empty)"`. The filters already support value lists with _OR_ logic such as `type=(TASK OR STORY)`. Users should be able to create flexible filters formulas such as `Filter = "type=TASK _AND_ ( (status=TODO _AND_ Assignee=empty) _OR_ (status=DOING _AND_ End-date=past) )"`.

### **Acceptance criteria**

* Being able to use both _AND_ and _OR_ logical operators between filter terms

* Being able to use any filter types multiple times (e.g. status, assignee etc.)

* Being able to create hierarchical conditions (i.e. `A and (B or C)` instead of `(A and B) or (A and C)`. If this is too complex/heavy to implement, a single sub-level of logical groups may be sufficient (`(sub-group) or (sub-group) or (sub-group)...`)


### **Technical notes**

*   The current feature is a single logical group linked by _AND_ logical operators. I believe a simple and user-friendly way to do this would be to add a `Add filter group` button to instantiate new groups:

    *   by default, the filter view would be similar to existing, just with this new button

    *   upon creating a new filter group, a new sub-division is created with the same layout as the existing


    
Example for single sub-level logical groups :&nbsp;

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/358434/content">

Example for multiple sub-level logical groups (add `+ Add filter group` inside groups):

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/358443/content">

### **Permissions and visibility considerations**

*   Anyone with modification right for views

