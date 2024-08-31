import { Nullable, Option, Some } from "@hazae41/option"
import { BytesOrCopiable, Copiable } from "libs/copiable/index.js"
import { fromBuffer } from "./buffer.js"

let global: Option<Adapter> = new Some(fromBuffer())

export function get() {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export interface Adapter {
  encodePaddedOrThrow(bytes: BytesOrCopiable): string
  encodeUnpaddedOrThrow(bytes: BytesOrCopiable): string

  decodePaddedOrThrow(text: string): Copiable
  decodeUnpaddedOrThrow(text: string): Copiable
}

