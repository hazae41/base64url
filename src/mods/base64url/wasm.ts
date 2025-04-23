import { type Base64Wasm } from "@hazae41/base64.wasm"
import { Box } from "@hazae41/box"
import { BytesOrCopiable } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"

export function fromBufferOrWasm(wasm: typeof Base64Wasm) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromWasm(wasm)
}

export function fromWasm(wasm: typeof Base64Wasm) {
  const { Memory, base64url_encode_padded, base64url_decode_padded, base64url_encode_unpadded, base64url_decode_unpadded } = wasm

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Memory)
      return Box.createAsDropped(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.create(new Memory(bytesOrCopiable))
    return Box.create(new Memory(bytesOrCopiable.bytes))
  }

  function encodePaddedOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return base64url_encode_padded(memory.value)
  }

  function decodePaddedOrThrow(text: string) {
    return base64url_decode_padded(text)
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return base64url_encode_unpadded(memory.value)
  }

  function decodeUnpaddedOrThrow(text: string) {
    return base64url_decode_unpadded(text)
  }

  return { encodePaddedOrThrow, decodePaddedOrThrow, encodeUnpaddedOrThrow, decodeUnpaddedOrThrow } satisfies Adapter
}