Frontend for 123fakturera Mini App
This document provides instructions for setting up and running the frontend for the 123fakturera mini app, which includes two main components:

Terms Page: A replica of https://online.123fakturera.se/terms/, with text content (English and Swedish) fetched from a PostgreSQL database, a functional hamburger menu, and identical scroll, click, and touch behavior across all browsers.
Price List Page: A simple price list displaying 20 products with editable fields, fetched from and saved to a PostgreSQL database, with responsive design for desktop, tablet, mobile portrait, and landscape.

The frontend is built using Vite.js and React, styled with vanilla CSS, and integrates with a Fastify/Sequelize backend hosted on Supabase.
Table of Contents

Tech Stack
Prerequisites
Project Structure
Setup Instructions
Clone the Repository
Install Dependencies
Environment Variables
Running the Frontend


Pages and Features
Terms Page
Price List Page


Deployment
Notes

Tech Stack

Vite.js: v7.1.4 (build tool)
React: v19.1.1
React DOM: v19.1.1
React Router DOM: v6.30.1
Axios: v1.11.0 (for API requests)
JavaScript: ES2020 (modern JavaScript syntax)
CSS: Vanilla CSS (no CSS frameworks or modules)
ESLint: v9.33.0 (with plugins: eslint-plugin-react-hooks v5.2.0, eslint-plugin-react-refresh v0.4.20)
TypeScript Types:
@types/react: v19.1.10
@types/react-dom: v19.1.7


Globals: v16.3.0 (for ESLint configuration)

Prerequisites

Node.js: Ensure Node.js (v18.16.0 or compatible) is installed. Verify with:node --version


Git: For cloning the repository.
Text Editor: VS Code or any editor for editing code.
Browser: For testing (Chrome, Firefox, Safari, Edge recommended).
Backend: The backend must be running (see backend README for setup) at http://localhost:3001 or a deployed URL.

Project Structure
frontend/
├── public/
│   ├── favicon.ico             # Favicon
├── src/
│   ├── assets/                 # Static assets (if any)
│   ├── components/
│   │   ├── Header.jsx          # Header with hamburger menu and language switcher
│   │   ├── Sidebar.jsx         # Sidebar for desktop and mobile menu
│   ├── pages/
│   │   ├── Terms.jsx           # Terms page component
│   │   ├── PriceList.jsx       # Price List page component
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point for React
│   ├── index.css               # Global vanilla CSS
│   └── App.css                 # App-specific CSS
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file

Setup Instructions
Clone the Repository
Clone the project from GitLab (replace <repository-url> with the actual URL):
git clone <repository-url>
cd frontend

Install Dependencies
Install the required Node.js packages:
npm install

Environment Variables
Create a .env file in the frontend/ directory with the following content:
VITE_API_URL=http://localhost:3001


Replace http://localhost:3001 with the deployed backend URL if applicable.
The VITE_API_URL specifies the backend API endpoint for fetching Terms content and Price List data.

Running the Frontend
Start the Vite development server:
npm run dev

The frontend will run on http://localhost:3000 (default Vite port). Open this URL in a browser to view the app.
Pages and Features
Terms Page

URL: /terms
Description: Replicates https://online.123fakturera.se/terms/ with identical look and behavior:
Content: Fetches text (title and content) from the terms table in the PostgreSQL database based on the selected language (en or sv).
Language Switcher: Flags (SE.png, GB.png) in the header toggle between English and Swedish.
Hamburger Menu: Functional on mobile (portrait and landscape), showing navigation links (Invoices, Customers, etc.).
Assets:
Background: https://storage.123fakturera.se/public/wallpapers/sverige43.jpg
Logo: https://storage.123fakturera.se/public/icons/diamond.png
Flags: https://storage.123fakturera.no/public/flags/SE.png, https://storage.123fakturera.no/public/flags/GB.png


Responsive Design: Matches the original site’s scroll, click, and touch behavior across desktop, tablet, mobile portrait, and landscape.
API: Fetches data from GET /api/terms/:language with a valid JWT token.



Price List Page

URL: /price-list
Description: Displays a table with 20 products, fetched from the products table in the PostgreSQL database. Fields are editable and changes are saved to the database.
Columns by Device:
Desktop (≥1024px): Article No., Product/Service, In Price, Price, Unit, In Stock, Description, ... (options menu).
Tablet (768px ≤ width < 1024px): Article No., Product/Service, Price, Unit, In Stock, ....
Mobile Portrait (≤480px) and Landscape (481px ≤ width < 768px): Product/Service, Price, ....


Features:
Editable Fields: All fields (except id and created_at) are editable directly in the table. Changes are saved via PUT /api/products/:id.
Scrolling: Supports scrolling for 20+ products, tested on all resolutions.
Authentication: Requires a valid JWT token (obtained via login).
API: Fetches products from GET /api/products and updates via PUT /api/products/:id.


Hamburger Menu: Not required for this page.

Deployment
The frontend is deployed on a free provider (e.g., Netlify, Vercel). To deploy:

Build the app:npm run build


Deploy the dist/ folder to Netlify or Vercel (follow provider-specific instructions).
Update .env with the deployed backend URL (e.g., VITE_API_URL=https://your-backend-url).
Test the deployed app at the provided URL (e.g., https://your-app.netlify.app).

The source code is available on GitLab at <repository-url> (replace with actual GitLab URL).
Notes

Authentication: Both pages require a valid JWT token, obtained via the backend’s /api/auth/login endpoint. Ensure you register/login first.
Responsive Design:
Tested on Chrome, Firefox, Safari, and Edge for desktop, tablet, mobile portrait, and landscape.
Use browser DevTools to verify layouts at 320px (portrait), 600px (landscape), 800px (tablet), and 1280px (desktop).


CSS: Uses vanilla CSS in index.css and App.css. No CSS frameworks or modules are used.
API Integration:
Ensure the backend is running (locally or deployed) and the VITE_API_URL is correct.
Test API connectivity with:curl -H "Authorization: Bearer <your-token>" $VITE_API_URL/api/products




Scrolling: The Price List page supports smooth scrolling for 20 products, with table headers fixed on desktop and tablet.
Editable Fields: Changes to Price List fields are saved to the database in real-time. Ensure the backend’s PUT /api/products/:id endpoint is functional.
Assets: All images (background, logo, flags) are linked from the provided URLs to avoid local storage.
ESLint: Run npm run lint to check for code quality issues before deployment.

For issues or questions, contact the developer at <your-email>.