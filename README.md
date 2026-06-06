# Insights

A modern blogging platform built with Next.js that allows users to create, manage, and organize stories with series functionality.

## 🚀 Live Demo

[Visit Insights](https://insightsarticle.in/user/explore)

## 📖 Overview

Insights is a full-stack content publishing platform where users can create accounts, write stories, organize content into series, and manage their publishing workflow through an intuitive dashboard.

The platform is designed to provide a seamless writing experience while maintaining scalability and performance and easy Navigation.

## ✨ Features

### Authentication
- Secure user authentication
- OAuth integration
- Session management
- Protected routes

### Story Management
- Create stories
- Edit stories
- Delete stories
- Draft support
- Publish stories

### Series Management
- Create story series
- Organize multiple stories
- Manage content structure

### User Dashboard
- Manage published content
- View drafts
- Track authored stories

### Modern UI
- Responsive design
- Optimized user experience
- Mobile-friendly interface

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Shadcn
- React Hook Form

### Backend
- Next.js API Routes

### Database
- MongoDB
- Mongoose

### Authentication
- OAuth
- NextAuth 

### Deployment
- Hostinger

## 📂 Project Structure

```bash
src/
├── app/
├── components/
├── helpers/
├── hooks/
├── lib/
├── models/
├── services/
├── types/
└── utils/


⚡ Installation

# Clone Repository

git clone https://github.com/Devansh1010/insights.git

# Navigate to Project
cd insights

# Install Dependencies
npm install

# Configure Environment Variables

AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
MONGODB_URI=
MONGO_DB_USERNAME=
MONGO_DB_PASSWORD=
RESEND_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_PUBLIC_KEY=
AUTH_URL=
NEXTAUTH_URL=
AUTH_TRUST_HOST=
INTERNAL_API_SECRET=
ADMIN_SECRET_KEY=

# Start Development Server
npm run dev