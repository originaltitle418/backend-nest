FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk update && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

RUN npm install -g pnpm@9.7.0

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY ./dist /usr/src/app

EXPOSE 3000

ENV NODE_ENV=production
ENV STAGE_ENV=prod

CMD ["node", "./main.js"]