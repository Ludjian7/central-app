# Vercel Deployment Guide

This guide will walk you through the steps to deploy the Central Computers Demo application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. The project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Steps for Deployment

### 1. Prepare Your Repository

Make sure your project is pushed to a Git repository:

```bash
# Initialize git repository if needed
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin <your-repository-url>

# Push to repository
git push -u origin main
```

### 2. Connect to Vercel

1. Log in to your Vercel account
2. Click on "Add New" → "Project"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Select the repository containing your Central Computers Demo project
5. Click "Import"

### 3. Configure Project Settings

On the configuration screen, set the following:

**Framework Preset**: Node.js

**Build and Output Settings**:
- Build Command: `npm run build`
- Output Directory: `client/build`
- Install Command: `npm install`

### 4. Environment Variables

Add the following environment variables:

- `SESSION_SECRET` - A random string for session encryption
- `NODE_ENV` - Set to `production`
- `DEMO_MODE` - Set to `true`

### 5. Deploy

Click the "Deploy" button and wait for the deployment to complete.

## Post-Deployment

### Testing Your Deployment

Once deployed, Vercel will provide you with a URL to access your application. Click on it to verify the application is working correctly.

### Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your project on Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain and follow the instructions to configure DNS settings

### Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs for errors
2. Verify your environment variables are set correctly

## Continuous Deployment

Vercel automatically redeploys your application whenever you push changes to your repository. To deploy changes:

```bash
git add .
git commit -m "Your changes"
git push
```

## Note on Mock Data

This demo application uses mock data that is generated on startup. No real database connection is required, making deployment simpler and faster. 