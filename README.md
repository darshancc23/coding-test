# SimpliSmart Frontend Coding Test

[![Netlify Status](https://api.netlify.com/api/v1/badges/a5189341-a254-49ce-be78-2850b586dec1/deploy-status)](https://app.netlify.com/sites/effervescent-longma-a5bdda/deploys)

**Demo Link:** [SimpliSmart Demo](https://effervescent-longma-a5bdda.netlify.app/)

## Tech Stack

- **Next.js**: Chosen for its powerful features for server-side rendering, static site generation, and API routes, which help in building a performant and SEO-friendly application.
- **TypeScript**: Used to provide static typing, enhancing code quality and maintainability. It helps catch errors early during development and improves the overall developer experience.
- **Tailwind CSS**: Selected for its utility-first approach, allowing for rapid UI development and easy customization. It promotes a clean and consistent design across the application.
- **Axios**: Utilized for making HTTP requests to the backend API. It simplifies the process of handling requests and responses and provides a robust way to manage API interactions.

## Folder Structure

- **`config`**: Contains configuration files for the application.
- **`src`**: The main source folder for code.
  - **`api`**: Includes functions related to API interactions.
  - **`app`**: Manages the application router and page components.
  - **`components`**: Houses reusable pure components.
  - **`composites`**: Contains feature-specific components, often grouping multiple components together.
  - **`types`**: Defines TypeScript interfaces and types used throughout the application.

## Features

1. **Responsive Design**: The application is designed to be responsive across all screen sizes.
2. **Enhanced UI**: Emphasis on a polished UI with loaders added where needed and comprehensive error handling.
3. **Search Functionality**: A search bar is implemented to facilitate easy searching within the application.
4. **Dynamic Forms**: Forms are dynamically generated based on the input type, offering flexibility in form creation.
5. **Tooltips**: Tooltips provide additional information for each input field, improving user guidance and experience.

## Note

The audio and image input components are intended to showcase the functionality for handling these file types. However, with the current mock API, these components receive and handle string values instead of actual files.
