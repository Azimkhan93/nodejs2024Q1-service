#!/bin/sh

set -e

cd /app/

echo "Database: $POSTGRES_BASE_URL"
export
ls -la
npx prisma migrate dev
npm run start:dev