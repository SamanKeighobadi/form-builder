# فرم‌بیلدر (Form Builder)

پلتفرم ساخت و مدیریت فرم با React، TypeScript، Tailwind، shadcn/ui و ذخیره در localStorage.

## راه‌اندازی

این پروژه با **pnpm** مدیریت می‌شود.

```bash
pnpm install
pnpm dev
```

پس از نصب وابستگی‌ها، اپ در آدرس مشخص‌شده توسط Vite (معمولاً `http://localhost:5173`) اجرا می‌شود.

- نصب پکیج جدید: `pnpm add <پکیج>` یا برای dev: `pnpm add -D <پکیج>`
- ساخت پروداکشن: `pnpm build`
- پیش‌نمایش پروداکشن: `pnpm preview`

## ساختار و Layout (مرحلهٔ اول)

- **سایدبار (راست، RTL):** داشبورد، لیست فرم‌های من، ساخت فرم جدید
- **صفحات:** Dashboard، FormList، FormCreate، FormEdit (placeholder)
- **روتینگ:** React Router با مسیرهای `/`, `/forms`, `/forms/new`, `/forms/:id/edit`
- **استایل:** Tailwind CSS با متغیرهای تم (دارک مود با کلاس `dark` روی `html`)
- **وابستگی‌های اضافه‌شده:** react-router-dom، zod، react-hook-form، @hookform/resolvers، react-dnd، react-dnd-html5-backend، clsx، tailwind-merge

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
