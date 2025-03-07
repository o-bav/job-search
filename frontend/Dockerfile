FROM node:18

WORKDIR /app

COPY package.json . 
RUN npm install

# Устанавливаем react-data-grid
RUN npm install react-data-grid

COPY . . 

CMD ["npm", "run", "dev"]
