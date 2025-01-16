FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
RUN npm install jsonwebtoken
RUN npm install dotenv

COPY ./ ./
CMD [ "node","index.js" ]