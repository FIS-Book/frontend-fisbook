FROM node:20-alpine as dev

WORKDIR /src

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY public ./public
COPY src ./src

RUN npm run build

FROM nginx:alpine
COPY --from=dev /src/build /usr/share/nginx/html
EXPOSE 80