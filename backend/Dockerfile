FROM node:18.16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run prisma:prod

CMD npm run build && npm run start:prod