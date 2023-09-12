import { Result } from "@hazae41/result"
import { base64urlnopad } from "@scure/base"
import { Adapter, Copied } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBufferOrScure() {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure()
}

export function fromScure(): Adapter {

  function tryEncodeUnpadded(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => base64urlnopad.encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => base64urlnopad.decode(text)).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncodeUnpadded, tryDecodeUnpadded }
}