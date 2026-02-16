# IRO.by - Иудейское Религиозное Объединение в Республике Беларусь

Официальный сайт ИРО. React + Strapi 5 CMS, Docker-деплой.

## Стек технологий

| Компонент | Технология |
|-----------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend / CMS | Strapi 5 (headless CMS, SQLite) |
| i18n | Strapi native i18n (ru/en) + react-i18next |
| Роутинг | React Router (HashRouter `/#/path`) |
| Данные | TanStack Query v5 |
| Деплой | Docker Compose (nginx + strapi) |
| Интернет-доступ | Cloudflare Tunnel (опционально) |

---

## Быстрый старт (Docker)

### Требования

- **Docker Desktop** — [скачать](https://www.docker.com/products/docker-desktop/)
  - Windows: включить WSL 2 при установке
  - macOS / Linux: стандартная установка
- **Git** — для клонирования репозитория

### 1. Клонировать репозиторий

```bash
git clone https://github.com/psyclr/iro-fresh-look.git
cd iro-fresh-look
```

### 2. Создать файл `.env`

Скопировать шаблон и заполнить секреты:

```bash
cp .env.production.example .env
```

Отредактировать `.env`:

```bash
# Frontend
FRONTEND_PORT=80
VITE_STRAPI_TOKEN=                    # Оставить пустым — заполним после первого запуска

# Strapi admin (создается автоматически при первом запуске)
STRAPI_ADMIN_EMAIL=admin@iro.by
STRAPI_ADMIN_PASSWORD=Admin123!
STRAPI_ADMIN_FIRSTNAME=Admin
STRAPI_ADMIN_LASTNAME=IRO

# Strapi secrets — сгенерировать уникальные значения:
#   Linux/macOS: openssl rand -base64 16
#   Windows (PowerShell): [Convert]::ToBase64String((1..16 | ForEach-Object { Get-Random -Max 256 }) -as [byte[]])
APP_KEYS=ключ1,ключ2,ключ3,ключ4
API_TOKEN_SALT=случайная_строка
ADMIN_JWT_SECRET=случайная_строка
TRANSFER_TOKEN_SALT=случайная_строка
JWT_SECRET=случайная_строка
```

> **Для быстрого теста** можно оставить значения из `.env.production.example` как есть, заменив только placeholder-ы реальными base64 строками.

### 3. Запустить

```bash
docker compose up -d --build
```

Первый запуск занимает время — Strapi собирается и инициализирует базу данных.

### 4. Проверить что Strapi запустился

```bash
docker compose logs -f strapi
```

Подождать пока в логах появится:

```
[SEED] ✅ Seed complete
[ADMIN] Admin user created: admin@iro.by
[TOKEN] ✅ Full-access API token created
[TOKEN] Token: 0a1b2c3d4e...
```

### 5. Скопировать API-токен

Из логов Strapi скопировать значение токена (длинная строка после `Token:`).

Вставить его в `.env`:

```bash
VITE_STRAPI_TOKEN=0a1b2c3d4e5f...скопированный_токен...
```

### 6. Пересобрать frontend с токеном

```bash
docker compose up -d --build frontend
```

> Токен вкомпилируется в frontend на этапе сборки (Vite env variable). Поэтому после изменения токена нужна пересборка.

### 7. Открыть сайт

Перейти в браузере: **http://localhost**

Админ-панель Strapi: **http://localhost/admin**
- Логин: значение `STRAPI_ADMIN_EMAIL` из `.env`
- Пароль: значение `STRAPI_ADMIN_PASSWORD` из `.env`

---

## Доступ из интернета (Cloudflare Tunnel)

Сайт можно сделать доступным из интернета прямо с локальной машины — без домена, без белого IP, работает через VPN.

### Вариант 1: Быстрый туннель (без аккаунта)

Генерирует случайный URL вида `https://random-words.trycloudflare.com`.

```bash
docker compose --profile tunnel up -d
```

Посмотреть сгенерированный URL:

```bash
docker compose logs tunnel
```

В логах найти строку:

```
INF +-----------------------------------------------------------+
INF |  https://something-random-words.trycloudflare.com         |
INF +-----------------------------------------------------------+
```

Этот URL доступен из любой точки мира. Работает пока запущен контейнер.

> **Важно:** URL меняется при каждом перезапуске контейнера tunnel.

### Вариант 2: Постоянный туннель (с аккаунтом Cloudflare)

Для постоянного URL нужен бесплатный аккаунт Cloudflare и домен.

1. Зарегистрироваться на [dash.cloudflare.com](https://dash.cloudflare.com)
2. Перейти: **Zero Trust → Networks → Tunnels**
3. Создать туннель, скопировать токен
4. Добавить в `.env`:
   ```
   CLOUDFLARE_TUNNEL_TOKEN=eyJhIjoiNjk...ваш_токен
   ```
5. В `docker-compose.yml` заменить `command` у сервиса `tunnel`:
   ```yaml
   tunnel:
     image: cloudflare/cloudflared:latest
     command: tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL_TOKEN}
   ```
6. Запустить:
   ```bash
   docker compose --profile tunnel up -d
   ```

### Остановить туннель

```bash
docker compose --profile tunnel stop tunnel
```

Основной сайт (`frontend` + `strapi`) продолжит работать локально.

---

## Полезные команды

```bash
# Статус всех сервисов
docker compose ps

# Логи конкретного сервиса
docker compose logs -f strapi
docker compose logs -f frontend
docker compose logs tunnel

# Перезапуск одного сервиса
docker compose restart frontend
docker compose restart strapi

# Остановить всё
docker compose --profile tunnel down     # если tunnel запущен
docker compose down                      # без tunnel

# Полный сброс (удаляет БД и uploads!)
docker compose down -v
docker compose up -d --build

# Пересобрать только frontend (например после обновления токена)
docker compose up -d --build frontend
```

---

## Архитектура

```
┌─────────────────────────────────────────────────┐
│                  Docker Compose                  │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌───────────┐  │
│  │ frontend │    │  strapi  │    │  tunnel   │  │
│  │ (nginx)  │    │ (Node.js)│    │(cloudflare│  │
│  │  :80     │◄───│  :1337   │    │   d)      │  │
│  └──────────┘    └──────────┘    └───────────┘  │
│       │                               │          │
│       └───────────────────────────────┘          │
│         tunnel подключается к frontend:80        │
└─────────────────────────────────────────────────┘
```

### Как работает nginx

| Путь | Назначение |
|------|-----------|
| `/` | SPA (React) — `try_files → /index.html` |
| `/api/*` | Прокси на Strapi :1337 |
| `/admin` | Прокси на Strapi Admin Panel |
| `/uploads/*` | Прокси на Strapi (медиафайлы) |

### Порты

| Сервис | Порт | Описание |
|--------|------|----------|
| frontend | 80 (настраивается через `FRONTEND_PORT`) | Nginx: SPA + reverse proxy |
| strapi | 1337 (внутренний) | Доступен только через nginx |

---

## Strapi i18n

Все content types используют нативный Strapi 5 i18n plugin.

- **Локали:** `ru` (по умолчанию), `en`
- **Фильтрация:** `?locale=ru` или `?locale=en`
- **Админ-панель:** кнопка переключения локали в редакторе каждой записи

### Content Types

| Тип | API endpoint | Описание |
|-----|-------------|----------|
| Article | `/api/articles` | Статьи блога |
| Project | `/api/projects` | Проекты организации |
| Community | `/api/communities` | Общины с координатами на карте |
| Setting | `/api/setting` | Настройки сайта + статистика |
| Rabbi QA | `/api/rabbi-qas` | Вопросы и ответы раввину |
| Rabbi Question | `/api/rabbi-questions` | POST-эндпоинт для отправки вопроса |
| Tradition | `/api/traditions` | Еврейские традиции и обычаи |
| Poster Event | `/api/poster-events` | Афиша мероприятий |
| Category | `/api/categories` | Категории |

---

## Seed-данные

При первом запуске (пустая БД) Strapi автоматически создает:

- 5 общин (Минск, Брест, Гомель, Бобруйск, Могилев) — RU + EN
- 7 проектов с изображениями — RU + EN
- Настройки сайта со статистикой — RU + EN
- 3 статьи, 4 Q&A раввину, 5 традиций, 4 события — всё RU + EN
- Админ-пользователь из `.env`
- API-токен с полным доступом

> При `docker compose down -v` все данные удаляются и пересоздаются при следующем запуске.

---

## Устранение проблем

### Frontend показывает пустые страницы

**Причина:** неправильный или отсутствующий API-токен.

**Решение:**
1. `docker compose logs strapi | grep Token` — найти актуальный токен
2. Вставить в `.env` как `VITE_STRAPI_TOKEN=...`
3. `docker compose up -d --build frontend`

### Strapi не запускается

**Причина:** обычно ошибки в `APP_KEYS` или других секретах.

**Решение:**
1. Проверить `docker compose logs strapi`
2. Убедиться что все переменные в `.env` заполнены (не placeholder-ы)
3. Сгенерировать новые ключи: `openssl rand -base64 16`

### Порт 80 занят

Изменить в `.env`:

```bash
FRONTEND_PORT=8080
```

Сайт будет доступен на `http://localhost:8080`

### Cloudflare Tunnel не подключается

1. Проверить логи: `docker compose logs tunnel`
2. Убедиться что VPN/firewall не блокирует исходящие соединения на порт 7844/443
3. Tunnel использует только исходящие соединения — входящие порты открывать не нужно

### Windows: ошибка "Docker Desktop requires WSL 2"

1. Открыть PowerShell от администратора
2. `wsl --install`
3. Перезагрузить компьютер
4. Запустить Docker Desktop
