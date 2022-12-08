FROM node
WORKDIR /server/
COPY package*.json /server/
RUN npm install
COPY . /server/
EXPOSE 8888
# RUN npm run start.dev
CMD ["npm", "run", "start.dev"]