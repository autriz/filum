Перед запуском необходимо создать `.env` файл на примере `.env.example` и указать в нём `DATABASE_URL` и `DATABASE_AUTH_TOKEN`
Например:
```env
DATABASE_URL = "file:local.db"
DATABASE_AUTH_TOKEN = "1"
```
или, если есть настроенная база данных Turso
```env
DATABASE_URL="libsql://db-name-user.turso.io"
DATABASE_AUTH_TOKEN="token"
```

Установка зависимостей
`npm install`

Создание базы данных
`npm run db:push`

Запуск
`npm run dev`

Сборка
`npm run build`

Предпросмотр собранного проекта
`npm run preview`
