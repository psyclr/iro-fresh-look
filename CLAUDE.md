# Claude Code Guidelines - React/TypeScript Project

Четкие правила разработки для этого проекта. Основано на индустриальных стандартах.

---

## 🔴 Обязательные правила перед коммитом

```bash
npm run lint        # Должно быть 0 ошибок
npm run build       # Должно пройти успешно
npx tsc --noEmit    # Проверка типов
```

---

## 🔍 Context7 MCP - Актуальная документация

**ВСЕГДА используй Context7** для получения актуальной документации библиотек.

```
Когда пользователь спрашивает о библиотеке, API или framework:
1. Добавь "use context7" в начало ответа
2. Context7 загрузит актуальную документацию
3. Используй полученную информацию для точного ответа
```

**Примеры использования:**
- Вопросы о React, TypeScript, библиотеках
- Примеры кода из документации
- API reference и актуальные версии
- Best practices из официальных источников

---

## JavaScript/TypeScript

### Переменные

```typescript
// Используй const по умолчанию
const MAX_ITEMS = 100;
const user = { name: 'John' };

// Используй let только если нужно переназначение
let count = 0;
count++;

// НЕ используй var (плохой scope)
```

### Именование

```typescript
// Компоненты - PascalCase
const UserProfile = () => {};

// Функции и переменные - camelCase
const fetchUserData = async () => {};
const isAuthenticated = true;

// Константы - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Boolean - is/has/should префикс
const isLoading = false;
const hasPermission = true;
const shouldRender = true;

// Event handlers - handle* префикс
const handleClick = () => {};
const handleSubmit = () => {};

// Custom hooks - use* префикс
const useAuth = () => {};
const useFetch = () => {};
```

### Функции

```typescript
// Функция делает ОДНУ вещь
function sendEmail(client: Client) {
  const clientRecord = database.lookup(client);
  if (clientRecord.isActive()) {
    email(client);
  }
}

// Максимум 2 параметра, иначе - объект
function createUser({ name, email, age }: UserInput) {
  // ...
}

// Default параметры
function createMenu({ title = 'Menu', body = 'Body' } = {}) {
  return { title, body };
}
```

### Async/Await

```typescript
// Всегда используй async/await вместо callbacks
async function fetchUser(userId: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Параллельные запросы - Promise.all
const [users, posts, comments] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);
```

---

## TypeScript

### Типизация

```typescript
// Type inference где возможно
const name = 'John'; // string автоматически

// Явная типизация для сложных случаев
const user: User = fetchUser();
const items: Item[] = [];

// Union types для ограниченных значений
type Status = 'pending' | 'active' | 'inactive';

// Interface для объектов
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  readonly createdAt: Date;
}

// Утилитарные типы
type PartialUser = Partial<User>;
type UserWithoutEmail = Omit<User, 'email'>;
type UserNameAndEmail = Pick<User, 'name' | 'email'>;
```

### Generic Types

```typescript
// Generic функция
function identity<T>(arg: T): T {
  return arg;
}

// Generic API функция
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

const user = await fetchData<User>('/api/users/1');
```

### Type Guards

```typescript
// Discriminated unions
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
  }
}
```

---

## React Components

### Структура компонента

```typescript
// 1. Импорты
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchUser, type User } from '@/lib/api';

// 2. Интерфейс пропсов
interface UserCardProps {
  userId: string;
  onEdit?: (id: string) => void;
  className?: string;
}

// 3. Компонент
const UserCard = ({ userId, onEdit, className }: UserCardProps) => {
  // Хуки
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });

  // Обработчики
  const handleEdit = () => {
    onEdit?.(userId);
  };

  // Early returns для loading/error
  if (isLoading) return <Spinner />;
  if (!user) return null;

  // Render
  return (
    <div className={className}>
      <h3>{user.name}</h3>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
};

export default UserCard;
```

### Props Best Practices

```typescript
// Типизация props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Деструктуризация с default значениями
const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// Rest props для HTML атрибутов
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...rest }: InputProps) => (
  <div>
    <label>{label}</label>
    <input {...rest} />
    {error && <span className="error">{error}</span>}
  </div>
);
```

### Композиция компонентов

```typescript
// Маленькие, переиспользуемые компоненты
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card">{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div className="card-body">{children}</div>
);

// Использование
<Card>
  <CardHeader><h2>Title</h2></CardHeader>
  <CardBody><p>Content</p></CardBody>
</Card>
```

---

## State Management

### useState

```typescript
// Простые типы - inference
const [count, setCount] = useState(0);
const [name, setName] = useState('');

// Сложные типы - явно
const [user, setUser] = useState<User | null>(null);

// Функциональное обновление для зависимости от prev state
const increment = () => {
  setCount(prevCount => prevCount + 1);
};

// Lazy initialization для дорогих вычислений
const [state, setState] = useState(() => {
  return expensiveComputation();
});
```

### useEffect

```typescript
// Cleanup функция обязательна для subscriptions
useEffect(() => {
  const subscription = subscribeToData();
  return () => subscription.unsubscribe();
}, []);

// Правильные dependencies
useEffect(() => {
  fetchUser(userId);
}, [userId]); // перезапуск когда userId меняется

// Async/await с race condition protection
useEffect(() => {
  let ignore = false;

  async function fetchData() {
    const data = await fetch(`/api/users/${userId}`);
    if (!ignore) {
      setUser(data);
    }
  }

  fetchData();

  return () => {
    ignore = true;
  };
}, [userId]);
```

### useReducer для сложного state

```typescript
type State = {
  user: User | null;
  loading: boolean;
  error: Error | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User }
  | { type: 'FETCH_ERROR'; payload: Error };

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(userReducer, {
  user: null,
  loading: false,
  error: null
});
```

---

## Custom Hooks

```typescript
// Переиспользуемая логика в кастомном хуке
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (!ignore) setData(json);
      } catch (e) {
        if (!ignore) setError(e as Error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();
    return () => { ignore = true; };
  }, [url]);

  return { data, loading, error };
}

// Использование
const { data: users, loading, error } = useFetch<User[]>('/api/users');
```

---

## Performance

### Мемоизация

```typescript
// useMemo для дорогих вычислений
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// useCallback для стабильных функций
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// React.memo для компонентов
const ExpensiveComponent = memo(({ data }: Props) => {
  return <div>{/* expensive render */}</div>;
});
```

### Code Splitting

```typescript
// Lazy loading компонентов
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}

// Code splitting по роутам
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### Images

```typescript
// Lazy loading и responsive images
<img
  srcSet="
    /image-small.jpg 400w,
    /image-medium.jpg 800w,
    /image-large.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  src="/image-medium.jpg"
  alt="Description"
  loading="lazy"
  width={800}
  height={600}
/>
```

---

## Testing

### Testing Library

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Приоритет queries:
// 1. getByRole - лучший выбор
// 2. getByLabelText - для форм
// 3. getByText - для текста
// 4. getByTestId - последний вариант

test('user can submit form', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  // getByRole с accessible name
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // user-event вместо fireEvent
  await user.type(emailInput, 'test@example.com');
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com'
  });
});

// Async тестирование
test('shows user data after loading', async () => {
  render(<UserProfile userId="123" />);

  // findBy* для async элементов
  const userName = await screen.findByText('John Doe');
  expect(userName).toBeInTheDocument();
});

// Проверка отсутствия - queryBy*
expect(screen.queryByText('Error')).not.toBeInTheDocument();
```

### AAA Pattern

```typescript
test('increments counter', async () => {
  // Arrange - подготовка
  const user = userEvent.setup();
  render(<Counter initialCount={0} />);

  // Act - действие
  const button = screen.getByRole('button', { name: /increment/i });
  await user.click(button);

  // Assert - проверка
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

---

## Error Handling

### Try-Catch

```typescript
async function fetchUser(userId: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new UserNotFoundError(userId);
      }
      throw new ApiError(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error; // re-throw для верхнего уровня
  }
}

// Кастомные Error классы
class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class UserNotFoundError extends ApplicationError {
  constructor(public userId: string) {
    super(`User ${userId} not found`);
  }
}
```

### Error Boundary

```typescript
class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Использование
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## Security

### XSS Protection

```typescript
// React автоматически экранирует
const userInput = '<script>alert("XSS")</script>';
<div>{userInput}</div> // Безопасно

// Если НУЖЕН HTML - санитизируй
import DOMPurify from 'dompurify';

const cleanHTML = DOMPurify.sanitize(userHTML);
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
```

### Input Validation

```typescript
import { z } from 'zod';

// Валидация на клиенте И сервере
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)
});

type User = z.infer<typeof userSchema>;

const validData = userSchema.parse(formData); // throws если невалидно
```

### Environment Variables

```typescript
// Проверка обязательных переменных
const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('VITE_API_URL is required');
}

// Типизация
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}
```

---

## Accessibility

### Семантический HTML и ARIA

```typescript
// Используй семантические теги
<header>
  <nav role="navigation" aria-label="Main navigation">
    {/* nav items */}
  </nav>
</header>

<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

// Loading states
<div role="status" aria-live="polite">
  <Loader2 className="animate-spin" />
  <span className="sr-only">Loading...</span>
</div>

// Buttons
<button
  onClick={toggleMenu}
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={isOpen}
>
  {isOpen ? <X /> : <Menu />}
</button>

// Form errors
<input
  id="email"
  aria-invalid={!!error}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && (
  <p id="email-error" role="alert" aria-live="polite">
    {error}
  </p>
)}
```

---

## Организация кода

### Структура файлов

```
src/
├── components/       # Переиспользуемые компоненты
│   └── ui/          # UI примитивы (shadcn)
├── pages/           # Страницы (роутинг)
├── hooks/           # Кастомные хуки
├── lib/             # Утилиты, типы, API
├── assets/          # Статика
└── locales/         # i18n переводы
```

### Порядок импортов

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. Внешние библиотеки
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';

// 3. Внутренние компоненты
import Header from '@/components/Header';

// 4. UI компоненты
import { Button } from '@/components/ui/button';

// 5. Хуки
import { useAuth } from '@/hooks/use-auth';

// 6. Утилиты и типы
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';
```

---

## Чек-лист перед коммитом

- [ ] `npm run lint` - 0 ошибок
- [ ] `npm run build` - успешно
- [ ] `npx tsc --noEmit` - 0 ошибок
- [ ] Тесты написаны для новой функциональности
- [ ] Нет `console.log` для дебага
- [ ] Компоненты < 300 строк
- [ ] Функции делают одну вещь
- [ ] Нет дублирования кода
- [ ] Доступность проверена
- [ ] Типы строгие (нет `any`)

---

## Полезные команды

```bash
# Разработка
npm run dev

# Проверка качества
npm run lint
npm run build
npx tsc --noEmit

# Тестирование
npm test
npm run test:coverage

# Обновление зависимостей
npm outdated
npm update
npm audit fix
```

---

**Версия**: 1.0 | **Дата**: 2025-11-06
