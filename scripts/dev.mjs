#!/usr/bin/env zx
await $`concurrently \"pnpm -F example-main start\" \"pnpm -F view-react start\"`;
