FROM node:16.20.2-alpine3.18 AS build

WORKDIR /app

COPY package-lock.json package.json ./
COPY public ./public
COPY src ./src

RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM node:16.20.2-alpine3.18 AS serve

WORKDIR /app

COPY --from=build ./app/build ./build

EXPOSE 3000

RUN ["npm", "i", "-g", "serve"]

CMD ["serve", "-s", "build"]