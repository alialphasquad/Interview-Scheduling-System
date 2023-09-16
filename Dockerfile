FROM node:lts
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydb?schema=public&connect_timeout=300"

CMD ["npm", "start"]
