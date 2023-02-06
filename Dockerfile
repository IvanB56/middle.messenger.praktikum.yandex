FROM node:16
WORKDIR /appackage*.json ./
RUN n
COPY ppm install
COPY . .
EXPOSE 3000
CMD npm start
