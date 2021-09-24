FROM node:14-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm install --silent
RUN npm run build
CMD ["ng", "serve", "--host", "0.0.0.0"]
