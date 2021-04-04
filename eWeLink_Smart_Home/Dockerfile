# ARG BUILD_FROM
# FROM $BUILD_FROM

FROM node:current-alpine3.13
RUN mkdir -p /workspace/node_modules
COPY ["./dist", "./package.json", "/workspace/"]
WORKDIR /workspace
RUN yarn --production
COPY ["./node_modules", "/workspace/node_modules/"]
EXPOSE 3000
CMD npm start