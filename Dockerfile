# Use an official Node base image
FROM node:20-alpine AS builder

# Build-time arguments (you can add many)
ARG NODE_ENV=production
ARG APP_VERSION="0.1.0"
ARG FEATURE_FLAG_X=false

# Set environment variables from ARGs
ENV NODE_ENV=${NODE_ENV}
ENV APP_VERSION=${APP_VERSION}
ENV FEATURE_FLAG_X=${FEATURE_FLAG_X}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

COPY . .

# Final stage
FROM node:20-alpine

# You could re-declare ARG/ENV here if needed
ARG NODE_ENV
ARG APP_VERSION
ARG FEATURE_FLAG_X
ENV NODE_ENV=${NODE_ENV}
ENV APP_VERSION=${APP_VERSION}
ENV FEATURE_FLAG_X=${FEATURE_FLAG_X}

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app

EXPOSE 3000
CMD [ "node", "src/index.js" ]
