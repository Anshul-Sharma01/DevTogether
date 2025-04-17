FROM node:18


WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 3000
EXPOSE 5175
EXPOSE 8080

CMD ["node" , "index.js"]