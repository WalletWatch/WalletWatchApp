FROM node:17.3-alpine

WORKDIR /frontend
COPY package.json .
RUN npm --force install

COPY . .

