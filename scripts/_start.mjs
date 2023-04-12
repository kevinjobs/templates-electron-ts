#!/usr/bin/env zx
export function startView() {
  $`pnpm -F view-react start`;
}

export function startMain() {
  $`pnpm -F example-main start`
}
