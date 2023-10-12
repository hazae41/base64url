import { BytesOrCopiable, Copiable } from "@hazae41/box"
import { Option, Some } from "@hazae41/option"
import { Result } from "@hazae41/result"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

let global: Option<Adapter> = new Some(fromBuffer())

export function get() {
  return global.unwrap()
}

export function set(value?: Adapter) {
  global = Option.wrap(value)
}

export interface Adapter {
  tryEncodeUnpadded(bytes: BytesOrCopiable): Result<string, EncodeError>
  tryDecodeUnpadded(text: string): Result<Copiable, DecodeError>
}

