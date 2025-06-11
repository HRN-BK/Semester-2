# 🗂️ Cấu Trúc Dự Án **study-management-app**

Tài liệu này mô tả **chi tiết** (siêu chi tiết) vai trò của **từng** thư mục & tệp nguồn quan trọng trong dự án. Mục tiêu: giúp bạn nhanh chóng định vị code, hiểu luồng dữ liệu, và kiểm soát chất lượng dự án web.

> **Lưu ý**  
> • Các thư mục/tệp sinh ra tự động (ví dụ: `.next`, `node_modules`) **không** đi sâu vào chi tiết.  
> • Những tệp nhỏ kiểu _index re-export_ được mô tả ngắn gọn để tránh lặp.  
> • Các _component UI_ lặp theo mẫu (badge, button …) được gộp nhưng vẫn liệt kê tên file.

---

## 1. Thư mục gốc (root)

| Tên | Loại | Mô tả |
| --- | --- | --- |
| `.env.local` | env | Biến môi trường chạy local (DB_URL, NEXTAUTH_…). **Không commit** bản production. |
| `.gitignore` | config | Khai báo file/thư mục Git sẽ bỏ qua. |
| `.prettierrc` | config | Quy chuẩn format code (Prettier). |
| `eslint.config.mjs` | config | Cấu hình ESLint (lint TypeScript/React, tailwindcss, etc.). |
| `next.config.ts` | config | Cấu hình Next.js (bundle analysis, alias…). |
| `postcss.config.mjs` | config | Thiết lập PostCSS + Tailwind. |
| `tsconfig.json` | config | Cấu hình TypeScript (path alias `@/`). |
| `package.json` | manifest | Danh sách dependencies, script (`dev`, `build`, `lint`, …). |
| `package-lock.json` | lockfile | Ghi lại versions chính xác của npm packages. |
| `README.md` | docs | Giới thiệu dự án, script cơ bản. |
| `PROJECT_STRUCTURE.md` | docs | **Tài liệu bạn đang đọc**. |
| `.git/` | version | Repository history. |
| `.next/` | build | Kết quả build runtime của Next.js. |
| `node_modules/` | deps | Packages cài qua npm. |
| `public/` | static | Ảnh, favicon, font, manifest,… phục vụ tĩnh. |


---

## 2. `src/` – Code Ứng Dụng

```
src
├── app/             # App Router – pages theo file system (Next 13+)
├── components/      # Re-usable React components & feature components
├── contexts/        # React Context cung cấp state toàn cục
├── lib/             # Hàm tiện ích (helpers, utils)
├── providers/       # Component wrap toàn app (Theme, Toaster …)
└── types/           # Khai báo TypeScript global
```

### 2.1  `src/app/` – App Router

| Tên | Mô tả |
| --- | --- |
| `layout.tsx` | Layout gốc (HTML shell, `<ThemeProvider>`, `<Toaster>`). |
| `globals.css` | CSS toàn cục (Tailwind layer base, custom font). |
| `page.tsx` | Trang landing `/` hiển thị Dashboard/Overview. |
| `favicon.ico` | Icon trình duyệt. |
| `dashboard/` | Route nhóm `/dashboard/*`  
&nbsp;• `page.tsx` (nếu có) – Trang chính của dashboard. |
| `sessions/` | Quản lý buổi học (sessions).  
&nbsp;• `[id]/page.tsx` – Trang chi tiết session.  
&nbsp;• `page.tsx` – Danh sách sessions. |
| `subjects/` | Quản lý môn học.  
&nbsp;• `page.tsx` – Danh sách subject.  
&nbsp;• `new/page.tsx` – Form tạo subject. |

> **Tip**: Mỗi `page.tsx` = một route. Sử dụng server components nếu không cần interactivity, client components khi có `"use client"`.

### 2.2 `src/components/`

Phân tách:

- **`ui/`** – UI primitives (button, input …) + headless wrappers (Radix/Tailwind).  
- **`subjects/`** – Component nghiệp vụ cho feature Subject.  
- **`main-nav.tsx`** – Navigation bar.  
- **`site-header.tsx`** – Header cố định (logo, theme-toggle).  
- **`theme-provider.tsx` / `theme-toggle.tsx`** – Đổi Dark/Light mode.  
- **`toaster.tsx`** – Global toast notifications.

#### 2.2.1 `components/ui/`

| File / Folder | Công dụng |
|--------------|-----------|
| `badge.tsx` | Thẻ nhãn nhỏ (status, tag). |
| `button.tsx` | Component Button đa biến thể, tích hợp `VariantProps`. |
| `card.tsx` | Card container. |
| `input.tsx` | `<input>` có style Tailwind & forwardRef. |
| `textarea.tsx` | `<textarea>` styled. |
| `link.tsx` | Liên kết nội bộ sử dụng `next/link` + style. |
| `toast.tsx` | Wrapper Radix Toast + API show/hide. |
| `form.tsx` | **Bridge**: re-export form primitives để tránh breaking import (`import { Form } from "@/components/ui/form"`). |
| `form/` | **Hệ thống form** (đang refactor) tích hợp React-Hook-Form. <ul><li>`form.tsx` – Provider & `<form>` duy nhất.</li><li>`form-field.tsx` – Hook `useController` + context.</li><li>`use-form-field.ts` – Hook tiện ích lấy error, ids.</li><li>`form-label`, `form-control`, `form-item`, `form-description`, `form-message` – DSL markup semantic + style + error state.</li><li>`index.ts` – re-export.</li></ul> |
| `dropdown-menu/` | Bộ component Dropdown (Radix primitives):<ul><li>`dropdown-menu.tsx` – wrapper chính.</li><li>Nhánh con `*-item`, `*-label`, `*-shortcut`, Trigger, Group,… chia nhỏ theo Radix API.</li><li>`index.ts` – re-export.</li></ul> |

#### 2.2.2 `components/subjects/`

| File | Mô tả |
| --- | --- |
| `subject-form.tsx` | Form tạo/cập nhật Subject (sử dụng UI Form ở trên). |
| `subject-card.tsx` *(nếu có)* | Card hiển thị thông tin Subject. |

### 2.3 `src/contexts/`

| Tên | Mô tả |
| --- | --- |
| `session-context.tsx` | React Context lưu session học hiện tại, share cho nhiều component. |

### 2.4 `src/lib/`

| File | Mô tả |
| --- | --- |
| `utils.ts` | Hàm `cn()` merge class (clsx + tailwind-merge). |
| `api.ts` *(ví dụ)* | Wrapper fetch (axios) gọi backend. |

### 2.5 `src/providers/`

| File | Mô tả |
| --- | --- |
| `query-provider.tsx` | Cung cấp React Query client, wrap toàn bộ app. |

### 2.6 `src/types/`

| File | Mô tả |
| --- | --- |
| `index.ts` | Kiểu chung: `Subject`, `Session`, `UserRole`, … dùng xuyên suốt. |

---

## 3. Dòng chảy chính của ứng dụng

1. **Next.js App Router** nhận request -> file tương ứng trong `src/app/.../page.tsx` render.  
2. Trang được bọc bởi `layout.tsx` (ThemeProvider, Toaster).  
3. Trang gọi **components/feature** (vd. `SubjectForm`).  
4. `SubjectForm` dùng **UI primitives** (`Form`, `Input`, `Button`).  
5. Dữ liệu (client) gửi qua fetch ở `lib/api.ts`, state lưu qua **React Query** hoặc Context.

---

## 4. Ghi chú quản lý

- **Import alias**: dùng `@/` => trỏ `src/` (định nghĩa trong `tsconfig.json`, `eslint-import-resolver`).  
- **Style**: Tailwind + class-variance-authority (CVA) cho variant props.  
- **Form**: React-Hook-Form + tự viết layer UI (không Radix Form).  
- **Dark/Light**: `ThemeProvider` đặt class `dark` trên `<html>`; toggle lưu `localStorage`.  
- **Quality**: ESLint + Prettier + TypeScript strict; commit hook (husky) *(nếu đã thiết lập)*.

---

## 5. Cách mở rộng dự án

1. **Thêm route mới**: tạo thư mục trong `src/app/<route>` chứa `page.tsx`.  
2. **Thêm UI primitive**: thêm file trong `src/components/ui/` + export trong `index.ts`.  
3. **Thêm context global**: file trong `src/contexts/` và wrap vào `layout.tsx`.  
4. **Viết test**: thêm `__tests__` + Vitest/React-Testing-Library (chưa cấu hình sẵn).  

> **Pro-Tip**: Luôn export component từ `index.ts` của thư mục để import ngắn gọn & tránh deep path.

---

## 6. Sơ đồ phụ thuộc đơn giản

```
app/page.tsx ──▶ components/(feature) ──▶ components/ui/*
                     ▲                       ▲
                     │                       │
         contexts/*, providers/*       lib/utils.ts
```

---

> Hy vọng file **PROJECT_STRUCTURE.md** giúp bạn **nắm rõ** từng phần của `study-management-app` và tự tin mở rộng / bảo trì.
