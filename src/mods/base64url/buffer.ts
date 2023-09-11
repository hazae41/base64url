import { Result } from "@hazae41/result"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter, Copied } from "./base64url.js"
import { DecodingError, EncodingError } from "./errors.js"

export function fromBuffer(): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => {
      return Buffers.fromView(bytes).toString("base64url")
    }).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => {
      return Bytes.fromView(Buffer.from(text, "base64url"))
    }).mapSync(Copied.new).mapErrSync(DecodingError.from)
  }

  return { tryEncode, tryDecode }
}