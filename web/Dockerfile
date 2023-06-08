# Installing dependencies:

FROM node:18.16-alpine AS install-dependencies

WORKDIR /user/src/app/web

RUN npm install -g npm@9.7.1

COPY package*.json ./

RUN npm install

COPY . .

# Creating a build:

FROM node:18.16-alpine AS create-build

WORKDIR /user/src/app/web

RUN npm install -g npm@9.7.1

COPY --from=install-dependencies /user/src/app/web ./

RUN npm run build

USER node

# Running the application:

FROM node:18.16-alpine AS run

WORKDIR /user/src/app/web

RUN npm install -g npm@9.7.1

RUN npm install -g serve

COPY --from=install-dependencies /user/src/app/web/node_modules ./node_modules
COPY --from=create-build /user/src/app/web/build ./build
COPY package.json ./

RUN npm prune --production

EXPOSE 4000

CMD ["serve" "-s" "build" "-l" "4000"]
