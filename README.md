# Base64Url

Base64Url adapter for WebAssembly and JS implementations

```bash
npm i @hazae41/base64url
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/base64url)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Getting started

### Buffer (NodeJS)

```typescript
import { Base64Url } from "@hazae41/base64url"

Base64Url.set(Base64Url.fromBuffer())
```

### WebAssembly

```bash
npm i @hazae41/base64.wasm"
```

```typescript
import { Base64Url } from "@hazae41/base64url"
import { Base64Wasm } from "@hazae41/base64.wasm"

await Base64Wasm.initBundled()

Base64Url.set(Base64Url.fromBufferOrWasm(Base64Wasm))
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base64Url } from "@hazae41/base64url"
import * as Scure from "@scure/base"

Base64Url.set(Base64Url.fromBufferOrScure(Scure))
```

## Usage

```tsx
const encoded: string = Base64Url.get().getOrThrow().encodeUnpaddeOrThrow(new Uint8Array([1,2,3,4,5]))
using decoded: Copiable = Base64Url.get().getOrThrow().decodeUnpaddedOrThrow(encoded)
const decoded2: Uint8Array = decoded.bytes.slice()
```