FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV VITE_API_URL = http://localhost:9000

EXPOSE 5174
CMD ["npm", "run", "dev"]