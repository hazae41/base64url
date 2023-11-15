import { BytesOrCopiable, Copiable } from "@hazae41/box"
import { Nullable } from "@hazae41/option"
import { Result } from "@hazae41/result"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

let global: Nullable<Adapter> = fromBuffer()

export function get() {
  if (global == null)
    throw new Error("No Base64Url adapter found")
  return global
}

export function set(value?: Nullable<Adapter>) {
  global = value
}

export interface Adapter {
  encodeUnpaddedOrThrow(bytes: BytesOrCopiable): string
  tryEncodeUnpadded(bytes: BytesOrCopiable): Result<string, EncodeError>

  decodeUnpaddedOrThrow(text: string): Copiable
  tryDecodeUnpadded(text: string): Result<Copiable, DecodeError>
}

