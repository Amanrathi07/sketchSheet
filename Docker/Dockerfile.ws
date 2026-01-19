FROM oven/bun:latest

WORKDIR /ws

COPY ./packages ./packages

COPY ./package.json ./package.json

COPY ./bun.lock ./bun.lock

COPY ./turbo.json ./turbo.json

COPY ./apps/ws-backend ./apps/ws-backend

RUN bun install

EXPOSE 8080

CMD [ "bun","run","start" ]
