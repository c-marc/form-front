## Front end for experimental mail service

Features:

- Modal experiment:

  - Modals can be a nightmare, in general but especially with accessibility concerns. Here I'm trying to use the Dialog API and aria attributes.
  - Lock background, as asked for the exercise (unsolved issues: setting a height will force to scroll up ; and there might be a bug if the form has a higher height than svh... And still cannot escape modal with a click outside)

- Request to backend:

  - when validated through `html` and `JS`
  - confirmation via alert
  - async/await and try/catch
