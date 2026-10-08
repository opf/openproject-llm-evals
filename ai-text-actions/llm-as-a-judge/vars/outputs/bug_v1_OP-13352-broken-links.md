### Steps to reproduce

1.  Open Settings
2.  Open custom fields
3.  Choose spent time
4.  Create a new custom field
5.  Choose type float
6.  Set a max or a min value, which is a fraction like 5.5
7.  Try to save

### What is the buggy behavior?

Within custom fields for time spent, a max and a min value can be set. Those can&#39;t be fractions although the fields is of type float.

### What is the expected behavior?

A fraction of a value should be allowed in a float field as a min and max limit.

### Screenshots and other files

<img class="op-uc-image op-uc-image_inline" src="https://community.openproject.com/api/v3/attachments/69897/content">

<img class="op-uc-image op-uc-image_inline" src="/api/v3/attachments/69898/content">

### Environment information

_Please check and fill out the following details to help us identify in what versions and distributions of OpenProject the error occurs_

**OpenProject installation type**

*   [ ] Hosted cloud edition
*   [ ] Packaged installation
*   [x] Docker All-in-one container
*   [ ] Docker-compose installation
*   [ ] Other (please specify)

**OpenProject version**

12.5.8

**Browser**

*   [x] Chrome
*   [x] Firefox
*   [ ] Safari
*   [ ] Mobile Safari
*   [ ] Other (please specify)

**Language**

English &amp; German