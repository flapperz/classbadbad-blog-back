FROM node:12.19.1-alpine3.10
WORKDIR /classbadbad-backend
COPY ./package*.json /classbadbad-backend
RUN npm install
RUN npm build

EXPOSE 4000
CMD ["npm", "run", "start:prod"]