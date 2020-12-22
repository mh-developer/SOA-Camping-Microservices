# build environment
FROM node:14.1-alpine AS build 
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@4.0.1 -g
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine

RUN apk update && \
    apk add --no-cache openssl && \
    openssl req -x509 -nodes -days 2000 \
    -subj  "/C=CA/ST=LA/O=CARE IZ OMARE INC/CN=studentdocker.informatika.uni-mb.si" \
    -newkey rsa:2048 -keyout "/etc/ssl/private/nginx-selfsigned.key" \
    -out "/etc/ssl/certs/nginx-selfsigned.crt" && \
    chmod 766 "/etc/ssl/private/nginx-selfsigned.key" && \
    chmod 766 "/etc/ssl/certs/nginx-selfsigned.crt";

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'"]
