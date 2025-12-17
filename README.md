# URL Checker (Browser Application)

This is a small browser-based application written in *TypeScript* that allows a user to:

- Enter a URL
- Validate the URL format while typing
- Asynchronously check (mocked) whether the URL exists
- Indicate whether the URL represents a file or a folder
- Avoid excessive “server” calls by debouncing input events

The server-side check is intentionally mocked on the client side, as required by the task.

# Tech Stack

- HTML
- TypeScript
- Browser APIs (no framework, no backend)
- ES modules

# Prerequisites

- Browser (Chrome, Firefox, or Edge)
- TypeScript compiler (tsc) installed globally
- Visual Studio Code with Live Server extension

# How to run the application

 1. Compile typescript
    bash: npm run build
    This will compile typescript app.ts into javascript dist/app.js

 2. Open in the browser
    Because the application uses ES modules, it cannot be opened directly via 
    file:index.html

     - Use Live Server: Open the project folder in Visual Studio Code
     - Right-click index.html
     - Select "Open with Live Server"
     - The app will open in your default browser

    Alternatively, you can serve the folder with any local static server.

# Assumptions

Since no backend is provided, the following assumptions are made for mocking purposes:

 - A URL path ending with / represents a folder
 - A URL path ending with a file extension (e.g. .txt, .png) represents a file
 - All other URLs are treated as non-existing

  These assumptions are intentionally simple and serve only to demonstrate the  required behavior.