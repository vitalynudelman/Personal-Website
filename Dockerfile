FROM node:21 as base

WORKDIR /app

COPY . .

# #JENKINS
# RUN npm set progress=false && npm config set depth 0
RUN npm install && npm cache clean --force

# ---- Test ----
# run linters, setup and tests
FROM base AS test

# RUN  npm run lint && npm run setup && npm run test
RUN npm run test --ci -- --all --reporters=default --reporters=jest-junit
# RUN mkdir -p /tmp/jenkins/workspace && cp junit.xml /tmp/jenkins/workspace/jest-report.xml

# ---- Release ----
FROM base AS release
# install node packages
RUN npm run build

# # Adding consul-template 0.39.0 to final docker
# FROM consul-template:0.39.0 AS consul-template
FROM nginx:1.27.0-alpine
# COPY --from=consul-template /bin/consul-template /bin/consul-template
COPY --from=release /app/public /usr/share/nginx/html
# COPY --from=release . /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d
# COPY config ./config
COPY run.sh /usr/share/nginx/html/run.sh
# USER root
# RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 777 /usr/share/nginx/html
RUN chmod +x /usr/share/nginx/html/run.sh
# USER nginx
EXPOSE 8080
ENTRYPOINT ["/usr/share/nginx/html/run.sh"]
