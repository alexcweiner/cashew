FROM node:16-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

RUN npm install

# Copy the rest of your application code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
