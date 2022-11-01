###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine As development

EXPOSE 8080

ENV PORT=8080

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm ci

COPY  . .

###################
# BUILD FOR PRODUCTION
###################dd

FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY  package*.json ./

COPY  --from=development /usr/src/app/node_modules ./node_modules

COPY  . .


RUN npm run build



RUN npm ci --omit=dev

###################
# PRODUCTION
###################

FROM node:16-alpine As production

ENV NODE_ENV production

COPY  --from=build /usr/src/app/node_modules ./node_modules
COPY  --from=build /usr/src/app/dist ./dist



# Start the server using the production build
CMD [ "node", "dist/main" ]
