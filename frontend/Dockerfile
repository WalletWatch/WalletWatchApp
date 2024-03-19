# FROM node:17.3-alpine

# WORKDIR /frontend
# COPY package.json .
# RUN npm --force install

# COPY . .

# CMD ["npm", "start"]

# Используем базовый образ Node.js
FROM node:14 as build

# Устанавливаем рабочую директорию в контейнере
WORKDIR /frontend

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package.json .

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из текущей директории в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Второй этап сборки
FROM nginx:alpine

# Копируем собранное приложение из предыдущего этапа в директорию Nginx для обслуживания
COPY --from=build /frontend/build /usr/share/nginx/html

# По умолчанию Nginx будет слушать порт 80, поэтому ничего не требуется

# Опционально можно добавить настройки конфигурации Nginx, например, для обработки маршрутов React-приложения
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Команда по умолчанию запускает Nginx при старте контейнера
CMD ["nginx", "-g", "daemon off;"]
