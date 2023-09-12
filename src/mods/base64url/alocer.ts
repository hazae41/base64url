import { Alocer } from "@hazae41/alocer"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

export async function fromBufferOrAlocer() {
  if ("process" in globalThis)
    return fromBuffer()
  return await fromAlocer()
}

export async function fromAlocer(): Promise<Adapter> {
  await Alocer.initBundledOnce()

  function tryEncodeUnpadded(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => Alocer.base64url_encode_unpadded(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => Alocer.base64url_decode_unpadded(text)).mapErrSync(DecodeError.from)
  }

  return { tryEncodeUnpadded, tryDecodeUnpadded }
}