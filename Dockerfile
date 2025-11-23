FROM node:lts-alpine

ENV NEXT_TELEMETRY_DISABLED 1 
ENV PORT 3000

EXPOSE 3000

WORKDIR /app

RUN npm config set loglevel verbose --global && npm set strict-ssl false --global

COPY . .

RUN npm install --force
RUN npm run build --force

CMD ["npm", "run", "start"]