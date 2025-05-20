# Central Computers Demo

A demonstration version of the Central Computers Management System, optimized for deployment on Vercel.

## Overview

This is a simplified demo version of the full Central Computers Management System. It includes core functionality showcasing:

- Sales management
- Inventory tracking
- Financial reporting
- Customer management

This demo uses mock data and does not require a real database connection.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

### Quick Setup

The fastest way to set up the project is to use the setup script:

```bash
node setup.js
```

This script will:
1. Install dependencies for the root project
2. Install dependencies for the client
3. Create necessary directory structure
4. Set up sample files for deployment

### Manual Setup

If you prefer to set up manually:

1. Clone this repository:
```bash
git clone https://github.com/yourusername/central-computers-demo.git
cd central-computers-demo
```

2. Install dependencies:
```bash
npm install
cd client && npm install && cd ..
```

3. Start the development server:
```bash
npm run dev
```

### Preparing for Vercel Deployment

To prepare the project for Vercel deployment:

```bash
node prepare-vercel-deploy.js
```

This script will create the necessary directory structure and placeholder files for deployment.

### Deployment to Vercel

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

## Demo Account

For demonstration purposes, you can use these credentials:
- Username: admin@demo.com
- Password: admin123

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Data**: Mock data (no real database required)
- **Deployment**: Vercel

## License

This demo is provided for demonstration purposes only. 