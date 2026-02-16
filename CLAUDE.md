# IRO.by - Иудейское Религиозное Объединение в Республике Беларусь

Официальный сайт ИРО. React + Strapi CMS, Docker-деплой.

---

## Архитектура

```
Frontend:  React 18 + TypeScript + Vite + Tailwind + shadcn/ui
Backend:   Strapi 5 (SQLite, headless CMS)
Routing:   HashRouter (/#/path)
i18n:      react-i18next (ru/en)
Data:      TanStack Query v5 + Strapi REST API
Deploy:    Docker Compose (nginx + strapi)
```

### Структура файлов

```
src/
├── components/       # Переиспользуемые компоненты
│   └── ui/          # shadcn/ui примитивы
├── pages/           # Страницы (роутинг)
├── hooks/           # useStrapi.ts — хуки для Strapi данных
├── lib/             # strapi.ts, communities.ts, utils.ts
├── types/           # strapi.ts — типы Strapi-ответов
├── locales/         # en/common.json, ru/common.json
└── assets/
backend/
├── src/api/         # Strapi content types (article, project, community, etc.)
├── src/index.ts     # Bootstrap: permissions, seed data, auto-admin
└── types/generated/ # Auto-generated Strapi types
```

---

## Docker (основной способ работы)

**ВСЕГДА используй Docker для разработки и проверки. НЕ запускай `npm run dev` вручную.**

```bash
# Запуск
docker compose up -d --build

# Пересборка с чистой БД (удаляет volumes)
docker compose down -v && docker compose up -d --build

# Логи
docker compose logs -f strapi
docker compose logs -f frontend

# Перезапуск одного сервиса
docker compose restart frontend
```

### Порты

| Сервис   | Порт | Описание                             |
| -------- | ---- | ------------------------------------ |
| frontend | 80   | nginx: SPA + proxy /api/ и /uploads/ |
| strapi   | 1337 | Внутренний (доступ через nginx proxy) |

### Как работает

1. **Strapi** стартует, bootstrap (`backend/src/index.ts`) создает:
   - Public permissions для API
   - Seed-данные (communities, projects, settings) если БД пустая
   - Admin-пользователя из env vars
   - API-токен для фронтенда
2. **Frontend** собирается с `VITE_STRAPI_URL=` (пусто) и `VITE_STRAPI_TOKEN` из `.env`
3. **Nginx** раздает SPA и проксирует `/api/`, `/uploads/`, `/admin` на strapi:1337

### Важно: VITE_STRAPI_TOKEN

Токен вкомпилируется в frontend Docker image на этапе сборки (ARG в Dockerfile).
После создания нового токена нужно пересобрать frontend:

```bash
docker compose up -d --build frontend
```

---

## Environment (.env)

```bash
# Frontend
FRONTEND_PORT=80
VITE_STRAPI_URL=http://localhost:1337  # Для локальной разработки без Docker
VITE_STRAPI_TOKEN=<token>              # API Token из Strapi Admin

# Strapi admin (auto-create при первом запуске)
STRAPI_ADMIN_EMAIL=admin@iro.by
STRAPI_ADMIN_PASSWORD=Admin123!

# Strapi secrets
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
```

---

## Strapi: особенности

### i18n (нативный плагин)

Все content types используют нативный Strapi 5 i18n plugin (`@strapi/plugin-i18n`).
Локали: `ru` (default), `en`. Конфигурация в `backend/config/plugins.ts`.

Каждый документ имеет связанные локализованные версии (один `documentId` — разные `locale`).
Фильтрация на фронтенде: `?locale=ru` или `?locale=en`.

Seed-данные создают RU-версию через `strapi.documents().create()`, затем EN-перевод через `strapi.documents().update()` на тот же `documentId`.

### Seed-данные

`backend/src/index.ts` — при первом запуске (пустая БД) создает:
- 5 общин (Минск, Брест, Гомель, Бобруйск, Могилев) — RU + EN
- 7 проектов (RU + EN пары): Газета, Лапидарий, Центр наследия, Гуманитарная помощь, Архивы, Виртуальные туры, Еврейские кладбища
- Settings (site_name, hero_title, stats, etc.) — RU + EN
- 3 статьи, 4 Q&A, 5 традиций, 4 события — все RU + EN

### Content Types

| Тип            | API endpoint         | Заметки                              |
| -------------- | -------------------- | ------------------------------------ |
| Article        | /api/articles        | Блог, i18n localized                 |
| Project        | /api/projects        | Проекты, i18n localized              |
| Community      | /api/communities     | Общины с координатами, i18n          |
| Setting        | /api/settings        | SingleType, настройки + stats, i18n  |
| Rabbi QA       | /api/rabbi-qas       | Вопросы-ответы раввину, i18n         |
| Rabbi Question | /api/rabbi-questions | POST, отправка вопроса (NO i18n)     |
| Tradition      | /api/traditions      | Традиции и обычаи, i18n              |
| Poster Event   | /api/poster-events   | Мероприятия, i18n                    |
| Category       | /api/categories      | Категории, i18n                      |

---

## Nginx (nginx.conf)

```
/           → SPA (try_files → /index.html)
/api/       → proxy_pass http://strapi:1337
/admin      → proxy_pass http://strapi:1337
/uploads/   → proxy_pass http://strapi:1337 (^~ — приоритет над regex)
*.js,*.css  → 30d cache
```

`^~` на `/uploads/` обязателен — без него regex-location для статики перехватывает `.jpg/.png` файлы из uploads.

---

## Фронтенд: паттерн Strapi-интеграции

Для каждого content type:

1. **Тип** в `src/types/strapi.ts` — interface с полями из Strapi schema
2. **Fetch-функция** в `src/lib/strapi.ts` — `fetchX(locale)` с `fetchStrapi<StrapiResponse<T>>`
3. **Hook** в `src/hooks/useStrapi.ts` — `useX()` с TanStack Query (`staleTime: 10 min`)
4. **Страница** — вызывает hook, рендерит данные, fallback на i18n если Strapi недоступен

---

## Проверки перед коммитом

```bash
npm run lint        # 0 ошибок
npm run build       # Успешно
npx tsc --noEmit    # 0 ошибок типов
```

## Bug First Policy

Неважно откуда ошибки — pre-existing или новые. Все ошибки нужно чинить.

1. Доделываем текущую задачу
2. Чиним ВСЕ баги (lint, tsc, build) — включая чужие
3. Только потом приступаем к следующей задаче

---

## Context7 MCP

Используй Context7 для получения актуальной документации библиотек при вопросах о React, Strapi, TanStack Query и т.д.
