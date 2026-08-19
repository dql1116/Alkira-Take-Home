# Alkira Take-Home: Login + MFA

David Lee


## Objective:

A simple authentication experience that demonstrates login, MFA, form validation, and role-based access control. Built for Alkira's Software Engineer - UI Developer take-home exercise.


## Demo Video:

**Google Drive Video:**: https://drive.google.com/file/d/1WlNF1lA8sA90STC3SxUxkUpS8Uo7_2ms/view?usp=sharing


## Technologies Used:

- **React** (JavaScript)

- **Vite** - Build tool and dev server

- **React Router** - Client-side routing (Login -> MFA -> Dashboard, plus Sign Up)

- **TailwindCSS** - Styling

- **Vitest + React Testing Library** - Unit and Component testing

- **React Context API** - Auth state management


## Setup/Install Instructions:

```bash
git clone <this-repo-url>
cd <repo-name>
npm install
```


## Local Run Instructions:

```bash
npm run dev
```

Then open the localhost URL (e.g., http://localhost:5173) in browser.

To run the tests:
```bash
npx vitest run
```


## Mock User Credentials/Roles:

No real backend or user database as stated in requirements. Authentication is handled using hardcoded mock user list (src/data/mockUsers.js).

| Email | Password | Role |
| :--- | :--- | :--- |
| admin@alkira.com | Test123! | Read/write |
| viewer@alkira.com | Test123! | Read-only |
	
**Mock MFA code (for all users):** 123456


## How to Test the Login/MFA Flow:

1. Go to `/login` and fill in the form using either one of the mock credentials above.
2. On the MFA screen, enter `123456` as the verification code ("Resend code" will re-display the demo code on screen).
3. Once on `/dashboard`, it will show the segment list scoped to the role.
4. Log out and log back in as the other mock user to compare the read-only vs. read/write experience.
5. Try submitting the login form empty, or with a malformed email, to see field validation errors.
6. Try navigating to `/mfa` or `/dashboard` in the URL bar without logging in. You'll be redirected to `/login`.


## Key Design Decisions and Assumptions:

- **Vite:** Instead of using Next.js, I used Vite because this project is client-side only (no real backend). Next.js's main advantages like, SSR and API routes, weren't relevant here.

- **JavaScript:** JavaScript was chosen over TypeScript because the focus is on the auth/RBAC logic, rather than focusing on type annotations.

- **Explicit three-stage auth state machine:** `login`, `mfa`, and `authenticated` rather than a simple boolean like `isLoggedIn` represents the real states of "passed credentials, but not yet passed MFA". This is what `ProtectedRoute` and `MfaPage` both use to guard access.

- **login()/verifyMFA():** Throws on failure rather than returning a result object to keep the success path in each component clean. No custom error codes were added since nothing in the app currently needs to branch on error type, only needs to display the message.

- **Both RBAC UI patterns are demonstrated on the dashboard, using mock "network segment" data to reflect Alkira's CSX product domain:** Per the requirements' "hidden or disabled" wording, the "+ Add segment" button is fully hidden for read-only users, while per-row "Edit" buttons are rendered but disabled.

- **ProtectedRoute:** Only gates on auth stage, not role. both roles can reach `/dashboard` but the access control is enforced inside the page (which UI elements render/are enabled), not at the routing layer. This decision was chosen because both roles are meant to see the dashboard, just with different capabilities.

- **Sign UP is intentionally minimal:** Per the requirements' "full registration is not required" wording, the Sign Up page validates input and shows a confirmation, but does not create a real account or modify the mock user list.

- **Sidebar layout:** Reflects the pattern of an admin/network console rather than a generic top-nav layout, with user info and logout anchored in the sidebar. The segment list is the primary focus of the main content area.

- **Mobile responsive:** The dashboard page is mobile responsive with the sidebar collapsing on mobile screens to a hamburger button that triggers a right-side drawer.

- **Alkira branding (logo):** Included as a visual touch to make the demo feel closer to a real CSX experience.


## Known Limitations:

- **Auth state is in-memory only:** React state with no localStorage, cookies, or session tokens. Refreshing the page resets the session back to the login screen. A real and live production app would use a session token.

- **MFA uses one static, shared demo code:** Rather than a randomly generated per-login code that expires, hardcoded `123456`. A real implementation would generate and validate a unique, time-limited code per attempt.

- **No password strength enforcement:** On Sign Up or Login, using the scope's "full registration is not required", made the assumption that a password strength enforcement is not required. If needed, the addition would be straightforward, such as `validateSignupPassword` function.

- **No persisted/dynamic user creation:** Sign Up does not add a user to the mock list.

- **Test coverage focuses on the most evaluation-relevant logic:** Form validation, RBAC, and login interaction is focused rather than covering every screen (e.g., `MfaPage` and `SignUpPage` aren't directly unit tested, though they share the same validated `FormField` pattern as `LoginPage`).
