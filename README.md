# Productivity React App

A modern, responsive productivity dashboard built with React, designed to help users manage tasks, track progress, and stay organized.

## Features

- **Dashboard:** Overview of your tasks and productivity metrics.
- **Stats:** Visualize your productivity trends with charts.
- **Notifications:** Stay informed with alerts for overdue or due-today tasks.
- **Sidebar Navigation:** Easy access to all app sections with real-time notification badges.
- **Authentication:** Secure login and protected routes to keep your data safe.
- **Firestore Integration:** Cloud-based storage with secure access rules.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account and project setup

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd productivity-react-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   - Create a Firebase project.
   - Enable Firestore and Authentication.
   - Update `src/firebase/firebase.js` with your Firebase config.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

## Project Structure

- `src/components/` - Reusable UI components (Sidebar, NotificationsBadge, etc.)
- `src/pages/` - Page components (Dashboard, Notifications, Stats, Profile, Homepage)
- `src/store/` - State management hooks
- `src/firebase/` - Firebase configuration and initialization
- `src/layouts/` - Layout components for app structure
- `src/App.jsx` - Main app component with routing and lazy loading

## Security

- Firestore rules restrict data access to authenticated users.
- Routes are protected to prevent unauthorized access.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.

---

For questions or support, please open an issue or contact the maintainer.
