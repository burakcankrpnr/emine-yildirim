FROM node:lts

ENV NEXT_TELEMETRY_DISABLED=1 
ENV DATABASE_URL="postgresql://neondb_owner:npg_5iyVYn7NFHjU@ep-falling-water-a4azy384-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
ENV PORT 3000

EXPOSE 3000

WORKDIR /app

RUN apt update
RUN apt install -y curl wget
RUN wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
RUN dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb

RUN npm config set loglevel verbose --global && npm set strict-ssl false --global

COPY . .

RUN npm install --force
RUN npm run build --force

# Copy and make entrypoint script executable
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

CMD ["/app/docker-entrypoint.sh"]