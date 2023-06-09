# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:20-alpine as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@16

COPY package*.json  ./
RUN npm ci
# RUN apk --no-cache add curl

COPY . .

# must use this command to expose the container server to the host machine
CMD ["ng", "serve", "--host", "0.0.0.0"]
# CMD ng serve


# FROM builder as dev-envs

# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /

# CMD ["ng", "serve", "--host", "0.0.0.0"]