# Dockerfile
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./src /app/src

EXPOSE 3000

CMD ["npm", "start"]
