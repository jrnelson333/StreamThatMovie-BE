FROM node:6-slim

COPY . /
# COPY package.json /package.json
# COPY .env /starter/.env

WORKDIR /

ENV NODE_ENV production
RUN ls
RUN yarn install --production

# CMD npm install && nodemon app.js
RUN npm install forever -g
CMD forever app.js

EXPOSE 8888
