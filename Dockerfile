FROM node:10
expose 3000

COPY . /srv/
WORKDIR /srv

RUN npm install

CMD node app.js