FROM oven/bun:latest

WORKDIR /ws

COPY ./packages ./packages
COPY ./bun.lock ./bun.lock

COPY ./packages.json ./packages.json

COPY ./turbo.json ./turbo.json

COPY ./app/ws-backend ./apps/ws-backend

RUN bun install

RUN bun run prisma

EXPOSE 3000

CMD [ "bun","run","start" ]
