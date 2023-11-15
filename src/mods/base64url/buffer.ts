import { BytesOrCopiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBuffer(): Adapter {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("base64url")
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return Buffers.fromView(getBytes(bytes)).toString("base64url")
    }).mapErrSync(EncodeError.from)
  }

  function decodeUnpaddedOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "base64url")))
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return new Copied(Bytes.fromView(Buffer.from(text, "base64url")))
    }).mapErrSync(DecodeError.from)
  }

  return { encodeUnpaddedOrThrow, tryEncodeUnpadded, decodeUnpaddedOrThrow, tryDecodeUnpadded }
}