# Instagram Clone - Web Application

เว็บแอปพลิเคชันแบบ Instagram ที่สร้างด้วย React, TypeScript, Redux Toolkit และ Material-UI

![React](https://img.shields.io/badge/React-19+-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat-square)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?style=flat-square)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3+-cyan?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7.2+-green?style=flat-square)

## 📋 สารบัญ

- [✨ คุณสมบัติ](#-คุณสมบัติ)
- [🛠️ เทคโนโลยี](#️-เทคโนโลยี)
- [📁 โครงสร้างโปรเจค](#-โครงสร้างโปรเจค)
- [🚀 การติดตั้ง](#-การติดตั้ง)
- [💻 คำสั่งที่ใช้งาน](#-คำสั่งที่ใช้งาน)
- [🏗️ Architecture](#-architecture)
- [📚 Best Practices](#-best-practices)

## ✨ คุณสมบัติ

- 🔐 **Authentication** - Login & Register
- 📰 **Feed** - ดูโพสต์จากผู้ติดตาม
- ❤️ **Like/Unlike** - ชื่นชอบโพสต์พร้อมแอนิเมชัน
- 👤 **Profile** - ดูโปรไฟล์ผู้ใช้
- 👥 **Follow/Unfollow** - ติดตามผู้ใช้
- 🔍 **Search** - ค้นหาผู้ใช้
- 💬 **Notifications** - ระบบการแจ้งเตือน
- 📱 **Responsive Design** - ทำงานได้บนทุกอุปกรณ์
- 🎨 **Modern UI** - Material-UI components
- ⚡ **High Performance** - Optimized with React.memo & useMemo

## 🛠️ เทคโนโลยี

### Frontend
- **React 19.2** - UI Library
- **TypeScript 5.9** - Type Safety
- **Redux Toolkit 2.11** - State Management
- **React Redux 9.2** - Redux Bindings
- **React Router v7.12** - Client-side Routing
- **Material-UI 7.3** - Component Library
- **Axios 1.13** - HTTP Client
- **Vite 7.2** - Build Tool & Dev Server
- **ESLint 9.39** - Code Quality

## 📁 โครงสร้างโปรเจค

```
src/
├── components/              # Reusable Components
│   ├── SideBar.tsx          # Navigation sidebar
│   ├── Post.tsx             # Individual post component with animation
│   ├── PostItem.tsx         # Post item in feed
│   ├── Login.tsx            # Login page
│   ├── Register.tsx         # Register page
│   ├── LayoutContain.tsx    # Layout container
│   ├── SearchBar.tsx        # Search bar component
│   ├── StorySlide.tsx       # Story slider
│   ├── AvatarPost.tsx       # Avatar in post
│   ├── Loading.tsx          # Loading component
│   └── Responsive.tsx       # Responsive helper
├── pages/                   # Page Components
│   ├── Home.tsx             # Home page with feed
│   ├── Profile.tsx          # User profile page
│   ├── Explore.tsx          # Explore/discover page
│   ├── Messages.tsx         # Messages page
│   └── Notifications.tsx    # Notifications page
├── store/                   # Redux Store
│   ├── index.ts             # Store configuration
│   └── slices/
│       ├── auth/            # Auth slice
│       │   ├── index.ts
│       │   ├── types.ts
│       │   ├── initialState.ts
│       │   └── thunks.ts
│       ├── post/            # Post slice
│       │   ├── index.ts
│       │   ├── types.ts
│       │   ├── initialState.ts
│       │   └── thunks.ts
│       └── user/            # User slice
│           ├── index.ts
│           ├── types.ts
│           ├── initialState.ts
│           └── thunks.ts
├── services/                # API Services
│   └── api.ts               # Axios instance & API calls
├── types/                   # TypeScript Types
│   └── index.ts             # Type definitions
├── constants/               # Application Constants
│   └── index.ts             # Constant values
├── utils/                   # Utility Functions
│   └── helpers.ts           # Helper functions
├── hooks/                   # Custom React Hooks
│   └── index.ts             # Custom hooks
├── theme/                   # Theme Configuration
│   └── theme.ts             # Material-UI theme
├── assets/                  # Static Assets
├── App.tsx                  # Root component
├── App.css                  # App styles
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## 🚀 การติดตั้ง

### ข้อกำหนด
- Node.js >= 18.0.0
- npm >= 8.0.0 หรือ yarn >= 1.22.0

### ขั้นตอนการติดตั้ง

```bash
# 1. Clone repository
git clone <repository-url>
cd instagram

# 2. ติดตั้ง dependencies
npm install
# หรือ
yarn install

# 3. ตั้งค่า environment variables
cp .env.example .env
# แล้วแก้ไขตามที่จำเป็น

# 4. เริ่มต้น development server
npm run dev
# หรือ
yarn dev
```

Development server จะเริ่มที่ `http://localhost:5173`

## 💻 คำสั่งที่ใช้งาน

```bash
# Development
npm run dev          # เริ่ม development server

# Build & Preview
npm run build        # สร้าง production build
npm run preview      # ดูตัวอย่าง production build

# Code Quality
npm run lint         # ตรวจสอบโค้ด
```

## 🏗️ Architecture

### Redux State Structure
```
Store
├── auth
│   ├── user: User | null
│   ├── token: string | null
│   ├── status: 'idle' | 'pending' | 'success' | 'error'
│   ├── error: string | null
│   └── isAuthenticated: boolean
│
├── posts
│   ├── feed: Post[]
│   ├── status: 'idle' | 'pending' | 'success' | 'error'
│   ├── error: string | null
│   └── pagination: { skip, limit, hasMore }
│
└── user
    ├── currentProfile: User | null
    ├── searchResults: User[]
    ├── status: 'idle' | 'pending' | 'success' | 'error'
    └── error: string | null
```

### Component Structure
```
App (Redux Provider)
├── Router
│   ├── SideBar (Navigation)
│   └── Routes
│       ├── Home (Feed with infinite scroll)
│       ├── Profile (User profile)
│       ├── Explore (Discover posts)
│       ├── Messages (Direct messages)
│       ├── Notifications (Activity feed)
│       ├── Login
│       └── Register
```

## 📝 Features Details

### Like Animation
- Keyframe-based heart beat animation เมื่อคลิกปุ่ม like
- Smooth color transition from white to red
- 500ms animation duration

### Infinite Scroll
- Auto-load posts เมื่อเลื่อนถึงด้านล่าง
- Pagination support with skip/limit

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly UI

## 🎨 Design System

### Color Palette
- **Primary**: `#86A1FF` - Main actions
- **Dark Blue**: `#0b6fbf` - Hover states
- **Like Red**: `#ed4956` - Liked state
- **Text**: `#000000`
- **Background**: `#fafafa`

### Typography
- **Font Family**: System fonts
- **Base Size**: 14px
- **Weights**: 400, 600, 700

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI Library |
| react-dom | ^19.2.0 | DOM Rendering |
| react-router-dom | ^7.12.0 | Routing |
| @reduxjs/toolkit | ^2.11.2 | State Management |
| react-redux | ^9.2.0 | Redux Integration |
| @mui/material | ^7.3.7 | Component Library |
| @mui/icons-material | ^7.3.7 | Icons |
| axios | ^1.13.2 | HTTP Client |
| typescript | ~5.9.3 | Type Checking |

## 📚 Best Practices

✅ **Components**
- Keep components focused and single-responsibility
- Use React.memo for performance optimization
- Document with JSDoc comments

✅ **State Management**
- Use Redux Toolkit for global state
- Keep local component state minimal
- Handle errors gracefully

✅ **TypeScript**
- Define all types in dedicated files
- Avoid `any` type
- Export reusable types

✅ **Styling**
- Use Material-UI theming
- Mobile-first responsive design
- Consistent color palette

✅ **Code Organization**
- Modular folder structure
- Clear separation of concerns
- Meaningful file names

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=https://dummyjson.com
```

### Vite Config
- Optimized for production builds
- Dev server with HMR enabled
- TypeScript support enabled

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Clear Cache
```bash
rm -rf node_modules .vite dist
npm install
```

### Build Errors
```bash
npm run lint        # Check for linting errors
tsc -b              # Check TypeScript errors
```

## 🚀 Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Image upload and compression
- [ ] Dark mode support
- [ ] Comments system
- [ ] Direct messaging
- [ ] Stories feature
- [ ] User recommendations
- [ ] Advanced search filters

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Redux**

**Links:**
- GitHub: https://github.com/bussakorn033/instagram
- Demo: https://instagram-webapp.vercel.app/
