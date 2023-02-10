FROM node:18-alpine3.17 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build \
    && npm audit

CMD ["exit", "0"]

###
# Prodction
###
FROM node:18-alpine3.17 as prod

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production \
    && npm cache clean --force

COPY --from=builder /usr/src/app/dist ./
COPY --from=builder /usr/src/app/doc ./

ENV NODE_ENV production

EXPOSE ${PORT:-4000}

CMD ["node", "dist/main"]

###
# Development
###
FROM builder as dev

VOLUME /usr/src/app/node_modules

ENTRYPOINT docker/app/entrypoint.sh
