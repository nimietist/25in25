FROM node:latest

WORKDIR /var/app/
ADD . /var/app
RUN npm install --production

EXPOSE 3000
CMD npm start
