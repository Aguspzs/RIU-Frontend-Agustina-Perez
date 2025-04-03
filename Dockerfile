FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx ng analytics off
CMD ["npm", "start"]
EXPOSE 4200
