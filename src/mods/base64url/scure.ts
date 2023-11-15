import { BytesOrCopiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { base64urlnopad } from "@scure/base"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBufferOrScure() {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure()
}

export function fromScure(): Adapter {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    return base64urlnopad.encode(getBytes(bytes))
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodeUnpaddedOrThrow(bytes)
    }).mapErrSync(EncodeError.from)
  }

  function decodeUnpaddedOrThrow(text: string) {
    return new Copied(base64urlnopad.decode(text))
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return decodeUnpaddedOrThrow(text)
    }).mapErrSync(DecodeError.from)
  }

  return { encodeUnpaddedOrThrow, tryEncodeUnpadded, decodeUnpaddedOrThrow, tryDecodeUnpadded }
}