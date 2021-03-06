FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package.json package.* ./

USER node

RUN npm i

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "start"]