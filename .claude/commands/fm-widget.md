# FM Widget Builder

You are helping a FileMaker developer build a self-contained JavaScript widget that runs inside a FileMaker web viewer. The developer may not know React, JavaScript, or modern web tooling — handle all of that automatically.

## What you need from the user before starting

If any of these are missing, ask for them before writing any code:

1. **FileMaker file name** — the `.fmp12` file the widget will live in (no extension needed)
2. **Widget name** — a short camelCase name (e.g. `coursesList`, `invoiceDetail`)
3. **FM script name** — the FileMaker script that will return data to the widget
4. **Sample JSON** — the output of that script. Ask them to paste it directly into the chat.

## Setup steps (do these first, in order)

1. Update `widget.config.js`:
   ```js
   module.exports = {
     widgetName: "<widgetName>",
     server: "$",
     file: "<FileMakerFileName>",
     uploadScript: "UploadToHTML",
   };
   ```

2. Run `npm install`

3. Install data fetching libraries:
   ```
   npm install @tanstack/react-query fm-gofer
   ```

## Architecture rules (always follow these)

- **Never use `window.loadApp`** — fetch data reactively with TanStack Query + FMGofer instead
- **Always use real FM fetch** — the widget runs inside FileMaker's web viewer even during development, so FMGofer works. Do not add dev-mode sample data fallbacks in the queryFn.
- **FMGofer call pattern**: `FMGofer.PerformScript("Script Name", "").json()` — the `.json()` parses the result
- **Wrap the app in QueryClientProvider** in `index.jsx`
- **Title renders immediately** — show skeleton pulse cards while loading, an error callout on failure, then the real data

## File structure to create

```
src/
  index.jsx              # QueryClientProvider entry, no loadApp
  App.jsx                # Layout: title, loading skeletons, error, data list
  style.css              # @import "tailwindcss" (already present)
  sampleData.js          # Shape reference only — not wired into queryFn
  hooks/
    use<Entity>.js       # TanStack Query + FMGofer hook
  components/
    <Entity>Card.jsx     # Card component for each record
```

## Hook pattern

```js
import { useQuery } from "@tanstack/react-query";
import FMGofer from "fm-gofer";

export function use<Entity>() {
  return useQuery({
    queryKey: ["<entity>"],
    queryFn: () => FMGofer.PerformScript("<FM Script Name>", "").json(),
  });
}
```

## index.jsx pattern

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

## Styling

Tailwind v4 is already configured. `src/style.css` only needs `@import "tailwindcss"`. No config file needed.

## Deploy commands

| Command | What it does |
|---|---|
| `npm start` | Dev server at http://localhost:1234/ |
| `npm run deploy-to-fm` | Build + upload to FileMaker |
| `npm run upload` | Upload only, no rebuild |
| `npm run generate-script-steps` | Outputs FM script steps to paste into FileMaker |

## Feature discussion rule

When the sample JSON reveals fields or portal data beyond what the user explicitly asked to display, **surface 2-3 feature ideas and ask before building**. Do not implement features speculatively.

## What the user needs to do in FileMaker

The FM script (`<script name>`) must exit with a JSON script result in this shape:
```json
{
  "data": [
    {
      "recordId": "1",
      "fieldData": { "FieldName": "value" },
      "portalData": {
        "PortalName": [{ "Portal::Field": "value" }]
      }
    }
  ]
}
```

Run `npm run generate-script-steps` to get the exact FileMaker script steps to build this.
