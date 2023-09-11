import type { Alocer } from "@hazae41/alocer"
import { Result } from "@hazae41/result"
import { Adapter } from "./base64url.js"
import { fromBuffer } from "./buffer.js"
import { DecodingError, EncodingError } from "./errors.js"

export function fromBufferOrAlocer(alocer: typeof Alocer) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromAlocer(alocer)
}

export function fromAlocer(alocer: typeof Alocer): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => alocer.base64url_encode(bytes)).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => alocer.base64url_decode(text)).mapErrSync(DecodingError.from)
  }

  return { tryEncode, tryDecode }
}