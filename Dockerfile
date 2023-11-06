# Installing dependencies:

FROM node:20.9-alpine AS install-dependencies

WORKDIR /user/src/app/server

RUN npm install -g npm@10.2.3

COPY package*.json ./

RUN npm ci

COPY . .

# Creating a build:

FROM node:20.9-alpine AS create-build

WORKDIR /user/src/app/server

RUN npm install -g npm@10.2.3

COPY --from=install-dependencies /user/src/app/server ./

RUN npm run build

# Running the application:

FROM node:20.9-alpine AS run

WORKDIR /user/src/app/server

RUN npm install -g npm@10.2.3

COPY --from=install-dependencies /user/src/app/server/node_modules ./node_modules
COPY --from=create-build /user/src/app/server/dist ./dist
COPY package.json ./

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
