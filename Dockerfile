#####################
## BASE INSTALL STAGE
FROM node:lts AS install-base
WORKDIR /usr/src/
COPY .yarn ./.yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .

# copy and install all workspace packages
RUN yarn plugin import workspace-tools

#######################
## CLIENT INSTALL STAGE

FROM install-base AS install-client

# copy and install all workspace packages
COPY ./client/package.json ./client/package.json 
RUN yarn workspaces focus client

####################
## CLIENT BUILD STAGE

FROM install-client AS build-client

# copy source
COPY ./client ./client

# build production files
ENV NODE_ENV production
RUN yarn workspace client build


#######################
## SERVER INSTALL STAGE

FROM install-base AS install-server

# copy and install all workspace packages
COPY ./server/package.json ./server/package.json
RUN yarn workspaces focus server

#####################
## SERVER BUILD STAGE

FROM install-server AS build-server

# copy source
COPY ./server ./server
RUN yarn workspace server build


##########################
## PRODUCTION STAGE

FROM build-server AS production
WORKDIR /usr/src
COPY --from=build-client usr/src/client/build/ ./client/build/

# trim dev dependencies
ENV NODE_ENV production
RUN yarn workspaces focus server --production

EXPOSE 8080
CMD ["yarn", "workspace", "server", "start"]