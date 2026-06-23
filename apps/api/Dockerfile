# ─── Stage 1: builder ────────────────────────────────────────────────────────
FROM oven/bun:1.1-alpine AS builder
WORKDIR /app

COPY package.json bun.lock* ./
COPY apps/api/package.json ./apps/api/
COPY packages/ ./packages/

RUN bun install --frozen-lockfile

COPY apps/api ./apps/api
COPY tsconfig.json ./

WORKDIR /app/apps/api
RUN bun build src/index.ts --outdir dist --target bun --minify

# ─── Stage 2: runner ─────────────────────────────────────────────────────────
FROM oven/bun:1.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 bunjs
RUN adduser  --system --uid 1001 bunuser --ingroup bunjs

COPY --from=builder --chown=bunuser:bunjs /app/apps/api/dist ./dist

USER bunuser

EXPOSE 5555
ENV PORT=5555

CMD ["bun", "run", "dist/index.js"]
