#!/bin/sh
set -e

echo "Generating Prisma Client..."
npx prisma generate || true

echo "Running database migrations..."
npm run db:push || true

echo "Running database seed..."
npm run db:seed || true

echo "Starting application..."
exec npm run start

