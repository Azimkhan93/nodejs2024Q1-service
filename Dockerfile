FROM node:20-alpine as build

WORKDIR /app

COPY package.json /app

COPY prisma /app/prisma/

RUN npx prisma generate

RUN npm install --omit-dev && npm cache clean --force

COPY . .

FROM node:20-alpine as app

WORKDIR /app

COPY --from=build /app /app/

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]