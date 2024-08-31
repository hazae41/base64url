import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { BytesOrCopiable, Copied } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"

export function fromBuffer() {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("base64url")
  }

  function encodePaddedOrThrow(bytes: BytesOrCopiable) {
    const unpadded = Buffers.fromView(getBytes(bytes)).toString("base64url")
    const padded = unpadded + "=".repeat((4 - unpadded.length % 4) % 4)

    return padded
  }

  function decodeUnpaddedOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "base64url")))
  }

  function decodePaddedOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "base64url")))
  }

  return { encodePaddedOrThrow, decodePaddedOrThrow, encodeUnpaddedOrThrow, decodeUnpaddedOrThrow } satisfies Adapter
}