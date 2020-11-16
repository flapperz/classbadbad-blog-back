FROM node:12.14
WORKDIR /classbadbad-backend
COPY ./package*.json /classbadbad-backend
RUN npm install

COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]