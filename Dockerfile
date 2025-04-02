# Используем официальный Node.js образ
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Экспонируем порт, на котором будет работать сервер
EXPOSE 3000

# Указываем команду для запуска приложения
CMD ["node", "app.js"]
