FROM node:lts

COPY ./ /app/

RUN chown -R node:node /app

USER node

WORKDIR /app

RUN yarn install
RUN yarn build

ENTRYPOINT ["yarn"]

CMD ["start:prod"]
