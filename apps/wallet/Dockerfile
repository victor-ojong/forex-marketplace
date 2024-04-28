FROM node:alpine As development

WORKDIR /usr/src/app


RUN npm install -g pnpm

RUN pnpm install -r 

RUN pnpm run build wallet

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/wallet/main"]