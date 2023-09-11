# Base64URL

Base64URL adapter for WebAssembly and JS implementations

```bash
npm i @hazae41/base64url
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/base64url)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Getting started

### Alocer (WebAssembly)

```typescript
import { Base64URL } from "@hazae41/base64url"
import { Alocer } from "@hazae41/alocer"

await Alocer.initBundledOnce()
const base64url = Base64URL.fromAlocer(Alocer)

/**
 * Set it globally (optional)
 **/
Base64URL.set(base64url)
```

### Scure (JavaScript)

```typescript
import { Base64URL } from "@hazae41/base64url"
import * as scure from "@scure/base"

const base64url = Base64URL.fromScure(scure.base64urlnopad)

/**
 * Set it globally (optional)
 **/
Base64URL.set(base64url)
```

## Usage

### Direct

```tsx
const encoded: string = base64url.tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = base64url.tryDecode(encoded).unwrap().copy()
```