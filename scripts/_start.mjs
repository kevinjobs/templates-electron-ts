#!/usr/bin/env zx
export function startView() {
  $`pnpm -F view-react start`;
  $`pnpm -F view-vue start`;
}

export function startMain() {
  $`pnpm -F example-main start`
}
