# Mini Social - Frontend

A modern React + TypeScript social platform where users can share messages with the community.

## Features

- 🔐 **User Authentication**: Register and login with email/password via Firebase
- 📝 **Post Management**: Create, view, edit, and delete posts
- 🎨 **Modern UI**: Beautiful card-based layout with Tailwind CSS
- 🔄 **Real-time Updates**: Posts update automatically using Firestore real-time listeners
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Form Validation**: Client-side validation for all forms
- 🔒 **Permission Control**: Users can only edit/delete their own posts

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Firebase** - Authentication & Database (Firestore)
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## Project Structure

```
frontend/
├── public/
│   └── _redirects           # Deployment redirect rules
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Common components (Loading, Error)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── posts/          # Post-related components
│   │   └── ui/             # Reusable UI components
│   ├── context/            # React Context (Auth)
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Page components
│   ├── services/           # API services (Firebase)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .env.example            # Environment variables template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Firebase project (see Firebase Setup below)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mini_social/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication** > **Email/Password** sign-in method
4. Create a **Firestore Database** in production mode
5. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all posts
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                              request.auth.uid == resource.data.authorId;
    }
  }
}
```

6. Go to **Project Settings** and copy your Firebase config
7. Add the credentials to your `.env` file

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` directory to Netlify
3. The `_redirects` file will handle client-side routing

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm i -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase init hosting
```

3. Deploy:
```bash
npm run build
firebase deploy
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

## Features in Detail

### Authentication
- Users can register with email and password
- Users can login with their credentials
- Users can logout
- Auth state persists across page refreshes
- Protected routes redirect unauthenticated users

### Posts
- All users can view all posts
- Logged-in users can create posts
- Users can edit and delete their own posts
- Posts display author and timestamp
- Real-time updates when posts are added/edited/deleted

### UI/UX
- Responsive design for all screen sizes
- Loading states for async operations
- Error messages for failed operations
- Success messages for completed actions
- Form validation with helpful error messages
- Accessible components with proper ARIA labels

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please open an issue on GitHub.

