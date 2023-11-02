FROM node:14

WORKDIR /app

RUN npm install -g serve

COPY package.json package-lock.json /app/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]
