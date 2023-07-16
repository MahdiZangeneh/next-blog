# Blog Website

This is a blog website built using Next.js 12+, TypeScript, MongoDB, and Tailwind CSS. The website includes an admin panel that allows administrators to create, update, and delete posts. Users also have the ability to add, update, like and delete comments/posts. To log in and add comments, users are required to have a GitHub account.

## Features

- Next.js 12+ for server-side rendering and enhanced performance.
- TypeScript for type-checking and better code maintainability.
- MongoDB for storing blog posts, comments, and user data.
- Tailwind CSS for a responsive and modern design.
- Admin Panel:
  - Create, update, like and delete posts.
- User Features:
  - Add, update, and delete comments.
  - Like posts and comments.
  - Login using GitHub account.

## Prerequisites

Before running the blog website, make sure you have the following installed:

1. Node.js (version X.X.X)
2. MongoDB (version X.X.X)

## Getting Started

1. Clone the repository:

   - Run the following command in your terminal:
     ```bash
     git clone https://github.com/MahdiZangeneh/next-blog.git
     ```

2. Navigate to the project directory:

   - Use the following command:
     ```bash
     cd blog-website
     ```

3. Install the dependencies:

   - Run the following command:
     ```bash
     npm install
     ```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```plaintext
     MONGODB_URI=<your-mongodb-uri>
     GITHUB_CLIENT_ID=<your-github-client-id>
     GITHUB_CLIENT_SECRET=<your-github-client-secret>
     ```

5. Start the development server:

   - Run the following command:
     ```bash
     npm run dev
     ```

6. Open your browser and visit `http://localhost:3000` to access the blog website.

## View Online

You can view the online project [here](https://next-blog-mu-mauve.vercel.app/).

## Acknowledgements

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Utilizes [MongoDB](https://www.mongodb.com) for data storage
- Uses [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps) for authentication
