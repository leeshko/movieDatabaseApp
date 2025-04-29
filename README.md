# Movie Database App

A simple, modern Movies Database application built with Next.js, Redux, TailwindCSS, and NextAuth.js.

## 🚀 Setup and Run

### Clone the repository:

```bash
git clone your-repo-url 
cd your-project-folder
```

### Install dependencies:

`npm install`

### Create a .env.local file with the following environment variables:

```bash
AUTH_SECRET=your_secret
MONGO_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
TMDB_ACCESS_TOKEN=your_tmdb_access_token
NEXT_PUBLIC_API_URL=https://your-vercel-app-url.vercel.app
NEXT_PUBLIC_MOVIE_DB_URL=https://api.themoviedb.org/3
```

### Run the development server:

`npm run dev`

### To run Playwright tests:

`npm run test:2e2`

## 🛠 Technologies and Key Decisions

### 1. Framework: Next.js

The application was immediately built with Next.js because:

- It is the modern standard for building React-based applications.

- It provides built-in Server-Side Rendering (SSR), API routes, file-system based routing, and better performance out of the box.

- According to the official React documentation, as of 2024, React does not provide an official standalone way to start a project without additional tools (Vite, etc.).

Thus, choosing Next.js is practical and aligns with current development trends.

### 2. State Management: Redux

Although Redux is somewhat excessive for the current project size, it was intentionally chosen to:

- Ensure easy scalability.

- Maintain predictable and maintainable state management.

- Prepare the project structure for future expansions (e.g., user profiles, multiple lists, reviews, etc.).

### 3. Styling: TailwindCSS

TailwindCSS was chosen because:

- It allows rapid UI development using utility-first classes.

- It enables a consistent responsive design.

- It keeps styles clean, minimal, and scalable without excessive custom CSS.

### 4. Authentication: NextAuth.js

Authentication is handled via NextAuth.js, selected based on:

- Over 1.3 million weekly downloads (compared to 247k for @clerk/nextjs).

- Better community support, customization flexibility, and smaller bundle size.

- Built-in support for OAuth providers like Google, GitHub, etc.

## 💡 Thought Process and Assumptions

During development:

I decided to build a custom MongoDB database to store:

- Registered users.

- Users' favorite movies.

This decision was made sequentially while following the task steps.
However, upon reaching the "User can review movies" requirement, I realized that:
MovieDB API already provides user authentication and review submission functionality.
Thus, integrating direct review functionality was not feasible without major refactoring.

Although this approach complicated the task slightly, it IMHO demonstrates:

- Independent user management.

- Experience with real-world backend integration (MongoDB).

- Full control over the application's authentication and data storage systems.

## The project satisfies the core technical requirements and is designed to be:

- Scalable

- Maintainable

