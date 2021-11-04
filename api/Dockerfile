FROM node:14 as base

WORKDIR /api
COPY . .
RUN npm install -g nodemon
EXPOSE 8001

FROM base as dev
ENV NODE_ENV=development
RUN npm install && npm run build
CMD ["nodemon", "./dist/index.js"]
