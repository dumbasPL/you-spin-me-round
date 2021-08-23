FROM node:14-alpine

ENV PREFIX=s!

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npm", "start" ]