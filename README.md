# Instagram Clone - Web Application

เว็บแอปพลิเคชันแบบ Instagram ที่สร้างด้วย React, TypeScript, Redux Toolkit และ Material-UI

![React](https://img.shields.io/badge/React-19+-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat-square)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?style=flat-square)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3+-cyan?style=flat-square)

## 📋 สารบัญ

- [✨ คุณสมบัติ](#-คุณสมบัติ)
- [🛠️ เทคโนโลยี](#️-เทคโนโลยี)
- [📁 โครงสร้างโปรเจค](#-โครงสร้างโปรเจค)
- [🚀 การติดตั้ง](#-การติดตั้ง)
- [💻 คำสั่งที่ใช้งาน](#-คำสั่งที่ใช้งาน)

## ✨ คุณสมบัติ

- 🔐 **Authentication** - Login & Register
- 📰 **Feed** - ดูโพสต์จากผู้ติดตาม
- ❤️ **Like/Unlike** - ชื่นชอบโพสต์
- 👤 **Profile** - ดูโปรไฟล์ผู้ใช้
- 👥 **Follow/Unfollow** - ติดตามผู้ใช้
- 🔍 **Search** - ค้นหาผู้ใช้
- 💬 **Notifications** - notifications system
- 📱 **Responsive Design** - ทำงานได้บนทุกอุปกรณ์
- 📲 **Mobile Navigation** - navigation bar สำหรับมือถือ
- 🎨 **Modern UI** - Material-UI components

## 🛠️ เทคโนโลยี

### Frontend
- **React 19.2** - UI Library
- **TypeScript 5.9** - Type Safety
- **Redux Toolkit 2.11** - State Management
- **React Redux 9.2** - Redux Bindings
- **React Router v7.12** - Routing
- **Material-UI 7.3** - Component Library
- **Axios 1.13** - HTTP Client
- **Ant Design 6.1** - UI Components
- **Vite 7.2** - Build Tool & Dev Server
- **ESLint 9.39** - Code Quality

## 📁 โครงสร้างโปรเจค

```
src/
├── components/              # Reusable Components
│   ├── SideBar.tsx          # Navigation sidebar
│   ├── Post.tsx             # Individual post component
│   ├── PostItem.tsx         # Post item in feed
│   ├── Feed.tsx             # Feed container
│   ├── Login.tsx            # Login page
│   ├── Register.tsx         # Register page
│   ├── LayoutContain.tsx    # Layout container
│   ├── SearchContain.tsx    # Search modal container
│   ├── SearchBar.tsx        # Search bar component
│   ├── NotificationsContain.tsx  # Notifications modal
│   ├── MessageContain.tsx   # Messages container
│   ├── StorySlide.tsx       # Story slider
│   ├── AvatarUI.tsx         # Avatar UI component
│   ├── AvatarPost.tsx       # Avatar in post
│   ├── AvatarStory.tsx      # Avatar in story
│   ├── AvatarContain.tsx    # Avatar container
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
│       ├── auth/            # Auth state (modular structure)
│       │   ├── index.ts     # Auth slice export
│       │   ├── types.ts     # Auth types & interfaces
│       │   ├── initialState.ts # Initial auth state
│       │   └── thunks.ts    # Auth async thunks
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
├── index.css                # Global styles
└── vite.config.ts           # Vite configuration
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

# 3. ตั้งค่า environment variables (ถ้าจำเป็น)
echo "VITE_API_URL=http://localhost:3000/api/v1" > .env

# 4. เริ่มต้น development server
npm run dev
# หรือ
yarn dev
```

Development server จะเริ่มที่ `http://localhost:5173`

## 💻 คำสั่งที่ใช้งาน

```bash
npm run dev      # เริ่ม development server
npm run build    # สร้าง production build
npm run preview  # ดูตัวอย่าง production build
npm run lint     # ตรวจสอบโค้ด
```

## 🏗️ Architecture

### Component Tree
```
App (Redux Provider)
├── Router
│   ├── SideBar (Navigation)
│   └── Routes
│       ├── Home (Feed → PostItem[])
│       ├── Profile
│       ├── Explore
│       ├── Messages
│       ├── Notifications
│       ├── Login
│       └── Register
```

### Redux State Structure
```
Store
├── auth
│   ├── user: User | null
│   ├── token: string | null
│   ├── status: 'idle' | 'pending' | 'success' | 'error'
│   ├── error: string | null
│   └── isAuthenticated: boolean
├── posts
│   ├── feed: Post[]
│   ├── userPosts: Post[]
│   ├── status: 'idle' | 'pending' | 'success' | 'error'
│   ├── error: string | null
│   └── pagination: { page, limit, hasMore, total }
└── user
    ├── currentProfile: User | null
    ├── searchResults: User[]
    ├── status: 'idle' | 'pending' | 'success' | 'error'
    └── error: string | null
```

## 📝 Type Definitions

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
}

interface Post {
  id: string;
  userId: string;
  author: User;
  caption: string;
  images: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  postId: string;
  userId: string;
  author: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#86A1FF` - Main actions, buttons, links
- **Dark Blue**: `#0b6fbf` - Hover states
- **Like Red**: `#ed4956` - Liked/favorite state
- **Dark Gray**: `#8e8e8e` - Secondary text
- **Border Gray**: `#262626` - Borders, dividers
- **Light Gray**: `#f0f0f0` - Input backgrounds
- **Page Background**: `#fafafa`
- **Text**: `#000000`
- **White**: `#ffffff`

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Base Font Size**: 14px
- **Heading Sizes**: 24px - 32px
- **Font Weights**: 400 (normal), 600 (semi-bold), 700 (bold)

## 🔐 Authentication Flow

```
1. User submits login/register form
   ↓
2. Dispatch loginUser/registerUser thunk
   ↓
3. API call to /auth/login or /auth/register
   ↓
4. Token stored in localStorage & Redux state
   ↓
5. Auto-redirect to home page
   ↓
6. Auth token sent in all subsequent requests via interceptor
```

## 🏗️ Modular Structure

The auth slice is organized modularly for better maintainability:

```
src/store/slices/auth/
├── index.ts           # Slice definition & exports
├── types.ts          # TypeScript interfaces & types
├── initialState.ts   # Initial state configuration
└── thunks.ts         # Async thunks (API calls)
```

This approach allows:
- Easy scaling and maintenance
- Reusable type definitions across the app
- Clear separation of concerns
- Better code organization

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

## 📲 Responsive Breakpoints

- **Mobile**: 0px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

Mobile navigation is hidden on desktop, and sidebar layout changes for mobile devices.

## 🐛 Troubleshooting

### Node modules not found
```bash
npm install
```

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Clear Cache
```bash
rm -rf node_modules .vite dist
npm install
```

### TypeScript Errors
```bash
tsc -b
```

### CORS Errors
- Check API server CORS settings
- Verify `VITE_API_URL` in `.env`

## 📚 Best Practices

✅ **Components**
- Keep components focused and single-responsibility
- Use React.memo for performance optimization
- Lift state up when multiple components need it
- Properly document components with JSDoc comments

✅ **State Management**
- Use Redux Toolkit for global state
- Keep local component state minimal
- Write pure reducer functions
- Use async thunks for API calls with error handling

✅ **TypeScript**
- Define all types in `types/index.ts`
- Use interfaces for object types
- Avoid `any` type
- Export reusable types from dedicated files

✅ **API Integration**
- Centralize API calls in `services/api.ts`
- Use axios interceptors for auth tokens
- Handle errors and loading states gracefully
- Provide meaningful error messages

✅ **Code Organization**
- Modular folder structure (auth/, slices/, etc.)
- Separation of concerns
- Reusable utilities and helpers
- Clear import paths and file organization

✅ **Styling**
- Use Material-UI components and theming
- Keep component-specific styles organized
- Mobile-first responsive design
- Consistent color palette and typography

## 🚀 Future Enhancements

- [ ] Comments system
- [ ] Direct messaging with real-time updates
- [ ] Stories feature
- [ ] Image optimization and compression
- [ ] Dark mode support
- [ ] Advanced search filters
- [ ] User recommendations
- [ ] Analytics dashboard

## 📄 License

MIT License - ใช้งานได้อย่างอิสระสำหรับการใช้งานส่วนตัวและเชิงพาณิชย์

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ using React, TypeScript, and Redux**

For questions or issues, please open an issue on GitHub.
