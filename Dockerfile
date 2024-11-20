####################################################################################################
# Build Discord bot

FROM node:22-alpine as dev

WORKDIR /usr/src/botquote

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

####################################################################################################
# Run in production mode

FROM node:22-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/botquote

COPY package*.json .

RUN npm ci --only=production

COPY .env .
COPY --from=dev /usr/src/botquote/dist ./dist

CMD [ "node", "./dist/index.js" ]

####################################################################################################