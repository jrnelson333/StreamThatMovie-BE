FROM node:6-slim

COPY . /starter
COPY package.json /starter/package.json
# COPY .env /starter/.env

WORKDIR /starter

ENV NODE_ENV production
RUN yarn install --production

# CMD npm install && nodemon app.js
CMD npm install && forver start app.js

EXPOSE 8888
