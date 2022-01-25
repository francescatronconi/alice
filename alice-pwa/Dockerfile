FROM node:10-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
# RUN ng build --configuration production
RUN ng build
CMD ["ng", "serve", "--host", "0.0.0.0", "--configuration", "elabor"]
