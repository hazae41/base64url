import "@hazae41/symbol-dispose-polyfill"

import { assert, test } from "@hazae41/phobos"
import { fromAlocer } from "./alocer.js"
import { fromScure } from "./scure.js"

test("encode and decode", async ({ message }) => {
  const scure = fromScure()
  const encodeda = scure.tryEncodeUnpadded(new Uint8Array([1, 2, 3, 4, 5, 6, 7])).unwrap()
  const decodeda = scure.tryDecodeUnpadded(encodeda).unwrap().copyAndDispose()

  console.log(encodeda, decodeda)

  const alocer = await fromAlocer()
  const encodedb = alocer.tryEncodeUnpadded(new Uint8Array([1, 2, 3, 4, 5, 6, 7])).unwrap()
  const decodedb = alocer.tryDecodeUnpadded(encodedb).unwrap().copyAndDispose()

  console.log(encodedb, decodedb)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda).equals(Buffer.from(decodedb)))
})