# Firebase Setup Guide

This guide will help you set up Firebase for the Mini Social application.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "mini-social")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Your App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Enter an app nickname (e.g., "Mini Social Web")
3. (Optional) Check "Also set up Firebase Hosting"
4. Click "Register app"
5. Copy the Firebase configuration object (you'll need this later)

## Step 3: Enable Authentication

1. In the Firebase Console, go to **Build** > **Authentication**
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"

### Add Authorized Domains

1. Go to Authentication > Settings > Authorized domains
2. Add your deployment domains:
   - `localhost` (for development)
   - Your production domain (e.g., `mini-social.netlify.app`)

## Step 4: Set Up Firestore Database

1. In the Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose a location closest to your users
4. Start in **production mode** (we'll add security rules next)

### Configure Security Rules

1. Go to Firestore Database > Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts collection rules
    match /posts/{postId} {
      // Allow anyone to read posts
      allow read: if true;
      
      // Allow authenticated users to create posts
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.authorId;
      
      // Allow post owners to update and delete their posts
      allow update, delete: if request.auth != null 
                              && request.auth.uid == resource.data.authorId;
    }
  }
}
```

3. Click "Publish"

## Step 5: Create Firestore Indexes (Optional)

If you want to optimize queries, create the following indexes:

1. Go to Firestore Database > Indexes
2. Add a composite index:
   - Collection: `posts`
   - Fields: 
     - `authorId` (Ascending)
     - `createdAt` (Descending)
3. Click "Create index"

## Step 6: Configure Your App

1. Copy the Firebase configuration from Step 2
2. In your project, create a `.env` file in the `frontend` directory:

```bash
cd frontend
cp env.example.txt .env
```

3. Edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## Step 7: Test the Configuration

1. Start the development server:
```bash
npm run dev
```

2. Open `http://localhost:5173`
3. Try to register a new user
4. Try to create a post
5. Check the Firestore Database to see if data is being saved

## Firebase Console Overview

### Authentication Dashboard
- View registered users
- Disable/delete users
- See sign-in methods

### Firestore Database
- View collections and documents
- Manually add/edit/delete data
- Monitor database usage

### Usage & Billing
- Monitor your usage
- Set up billing alerts
- Upgrade to a paid plan if needed

## Firebase Free Tier Limits

The free Spark plan includes:
- **Authentication:** 10,000 monthly active users
- **Firestore:** 
  - 1 GiB storage
  - 50,000 reads per day
  - 20,000 writes per day
  - 20,000 deletes per day
- **Hosting:** 10 GB storage, 360 MB/day transfer

This should be sufficient for development and small projects.

## Best Practices

### Security Rules
- ✅ Always validate that users can only modify their own data
- ✅ Use `request.auth.uid` to check ownership
- ✅ Validate data types and required fields
- ❌ Never use `allow read, write: if true;` in production

### Data Structure
```javascript
// posts collection
{
  id: "auto-generated-id",
  title: "Post Title",
  content: "Post content...",
  author: "user@example.com",
  authorId: "firebase-user-uid",
  createdAt: Timestamp
}
```

### Performance
- Add indexes for frequently queried fields
- Limit query results with `.limit()`
- Use pagination for large datasets
- Cache data when appropriate

## Troubleshooting

### Issue: "Permission denied" errors
**Solution:** Check your Firestore security rules and make sure users are authenticated

### Issue: Firebase not connecting
**Solution:** 
1. Verify all environment variables are correct
2. Check that your domain is authorized in Firebase Console
3. Make sure Firebase services are enabled

### Issue: "Quota exceeded" errors
**Solution:** 
1. Check your Firebase usage in the console
2. Optimize your queries to reduce reads/writes
3. Consider upgrading to a paid plan

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

