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

### Alocer (WebAssembly)

```bash
npm i @hazae41/alocer
```

```typescript
import { Base64Url } from "@hazae41/base64url"

Base64Url.set(await Base64Url.fromBufferOrAlocer())
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base64Url } from "@hazae41/base64url"

Base64Url.set(Base64Url.fromBufferOrScure())
```

## Usage

### Direct

```tsx
const encoded: string = Base64Url.get().tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = Base64Url.get().tryDecode(encoded).unwrap().copyAndDispose()
```