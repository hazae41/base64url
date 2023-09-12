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

```bash
npm i @hazae41/alocer
```

```typescript
import { Base64URL } from "@hazae41/base64url"

Base64URL.set(await Base64URL.fromBufferOrAlocer())
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base64URL } from "@hazae41/base64url"

Base64URL.set(Base64URL.fromBufferOrScure())
```

## Usage

### Direct

```tsx
const encoded: string = Base64URL.get().tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = Base64URL.get().tryDecode(encoded).unwrap().copyAndDispose()
```