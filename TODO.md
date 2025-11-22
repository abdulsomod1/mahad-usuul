# TODO List for Next.js Migration and Setup

- Remove all PHP files and references from the project.
- Remove legacy static HTML files related to contact and admin pages (contact.html, admin-contacts.html).
- Move or refactor lib/supabase.js to be compatible with Next.js environment (e.g. use environment variables for URL/keys).
- Add environment variables for SUPABASE_URL and SUPABASE_KEY to Next.js (.env.local).
- Update lib/supabase.js to read config from env variables.
- Test Next.js API routes (/api/contacts) for POST and GET in local environment.
- Test Next.js frontend pages (/contact and /admin-contacts).
- Remove any unused legacy JS files like js/script.js.
- Document setup instructions for running Next.js app.

Next Steps:
- After these steps, run Next.js development server (`npm run dev` or `yarn dev`) to test full flow.
- Confirm data is correctly inserted into Supabase and shown in admin page.
