
FROM node:16-alpine AS development
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /app

EXPOSE 3000
ENV PORT 3000

COPY package*.json ./

RUN npm ci

COPY . .


FROM development AS builder

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS production


ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "run", "start"]