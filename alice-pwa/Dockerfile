FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
#COPY package.json ./
#COPY package-lock.json ./
COPY . ./
RUN npm install
RUN npm run build
RUN npm install serve
CMD ["serve", "-s", "build", "--configuration", "daniele"]

