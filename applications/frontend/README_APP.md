Frontend Guide: App Router in Next.js

This project uses Next.js App Router (src/app/) instead of the traditional pages directory.
Here is a quick guide to get started.

Folder Structure

src/
  app/
    layout.tsx          # Global layout
    page.tsx            # Home route (/)
    os/
      layout.tsx        # Layout for /os routes
      page.tsx          # /os route
      submissions/
        page.tsx        # /os/submissions
      my-colony/
        page.tsx        # /os/my-colony
      profile/
        page.tsx        # /os/profile
    globals.css         # Global styles

Routing Basics

. Folders = Routes
. pages.tsx defines the route content.
. Example:
    . app/page.tsx → /
    . app/os/page.tsx → /os
    . app/os/submissions/page.tsx → /os/submissions

How to Add Routes

1. Create a folder in src/app for the route.
2. Add a page.tsx file inside.
    . Example: For /os/settings:
        src/app/os/settings/page.tsx
    . Content:
        export default function SettingsPage() {
            return <h1>OS Settings</h1>;
        }

Layouts

. layouts.tsx wraps routes in a folder.
. Example: app/os/layout.tsx applies to /os and its subroutes
export default function OSLayout({ children }) {
  return (
    <div>
      <header>OS Header</header>
      <main>{children}</main>
    </div>
  );
}

Commands

. Start Dev Server: npm run dev
. Build for Production: npm run start
. Start Production Server: npm run start

Need Help?

Reder to https://nextjs.org/docs or ask a senior dev.

Happy coding!
Lwin