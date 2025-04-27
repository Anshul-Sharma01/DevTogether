FROM node:18
WORKDIR /app

VOLUME ["/app/user"]

COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 9000
CMD ["npm","run","start"]
