# Getting Started with Mini Social

Welcome! This guide will help you get the Mini Social frontend up and running in minutes.

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Set Up Firebase

First, create a Firebase project:
1. Go to https://console.firebase.google.com/
2. Create a new project (or use existing)
3. Enable **Authentication** > Email/Password
4. Create a **Firestore Database**

See [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) for detailed instructions.

### 3. Configure Environment

Create a `.env` file:
```bash
cp env.example.txt .env
```

Edit `.env` with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser!

## What You Can Do

### As a Visitor (Not Logged In)
- ✅ View all posts from all users
- ✅ See post titles, content, authors, and timestamps
- ❌ Cannot create, edit, or delete posts

### As a Logged-In User
- ✅ Everything a visitor can do
- ✅ Create new posts
- ✅ Edit your own posts
- ✅ Delete your own posts
- ❌ Cannot edit or delete other users' posts

## First Steps

1. **Register a new account**
   - Click "Register" in the header
   - Enter email and password (min 6 characters)
   - Submit

2. **Create your first post**
   - After logging in, you'll see a "Create a New Post" form
   - Enter a title and content
   - Click "Create Post"

3. **Explore features**
   - Edit your post by clicking the "Edit" button
   - Delete your post by clicking the "Delete" button
   - Watch posts update in real-time as others post

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components (Home, Login, Register)
│   ├── services/       # Firebase services
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React Context (Auth)
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── docs/               # Documentation
├── public/             # Static assets
└── package.json
```

## Key Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Firebase** - Backend (Auth + Firestore)
- **React Router** - Routing

## Common Tasks

### Build for Production
```bash
npm run build
```
Output will be in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

### Deploy
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for deployment guides.

## Troubleshooting

### Port 5173 is already in use
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

### Firebase errors
- Check that all environment variables are set correctly
- Verify Firebase services are enabled in console
- Check browser console for detailed error messages

### Cannot create posts
- Make sure you're logged in
- Check Firestore security rules
- Verify your user is authenticated

## Need Help?

- 📖 [Full Documentation](README.md)
- 🔥 [Firebase Setup Guide](docs/FIREBASE_SETUP.md)
- 🚀 [Deployment Guide](docs/DEPLOYMENT.md)
- 📚 [API Documentation](docs/API.md)

## Next Steps

1. **Customize the design**
   - Edit `tailwind.config.js` for theme colors
   - Modify components in `src/components/`

2. **Add new features**
   - User profiles
   - Post likes/comments
   - Image uploads
   - Search functionality

3. **Deploy your app**
   - Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
   - Set up a custom domain
   - Enable HTTPS

4. **Optimize performance**
   - Enable caching
   - Add service workers
   - Implement lazy loading

Happy coding! 🚀

