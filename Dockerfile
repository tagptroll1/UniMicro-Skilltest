# Dockerfile
FROM mhart/alpine-node:12 as build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM mhart/alpine-node:12 as prod

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

FROM mhart/alpine-node:slim-12

# Set required environment where app will run
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /app
COPY --from=build /app/__sapper__/build __sapper__/build
COPY --from=build /app/static static
COPY --from=prod /app .

CMD ["node", "__sapper__/build"]