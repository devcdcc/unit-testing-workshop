FROM node:16.19.1

WORKDIR /app
COPY . /app



RUN npm install
RUN npm test

EXPOSE 8070

ENTRYPOINT ["npm", "start"]
