FROM node:6-slim

COPY . /starter
COPY package.json /starter/package.json
# COPY .env /starter/.env

WORKDIR /starter

ENV NODE_ENV production
RUN yarn install --production

# use nodemon for development
RUN npm install --global nodemon

# CMD ["npm","start"]
# CMD ["nodemon", "app.js"]
CMD npm install && nodemon app.js

EXPOSE 8888
