FROM mhart/alpine-node:14

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]