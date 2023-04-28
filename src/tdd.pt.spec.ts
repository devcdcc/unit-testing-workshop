import * as fc from "fast-check";
import * as eccrypto from "@toruslabs/eccrypto";
import {DefaultECC, UserWithCustomECC} from "./tdd";

const pKeys = fc.integer().map(_ => eccrypto.generatePrivate())

describe('sum module a', () => {
  test('sum of generator is equals to a + b', () => {
    fc.assert(
      fc.asyncProperty(pKeys, async (pk) => {
        const originalMessage = "Message to be encrypted"
        const ecc = new DefaultECC(pk)
        const user = new UserWithCustomECC("user", "1234", ecc)

        const encryptedMessage = user.encrypt(user.getPublicKey(), originalMessage)
        const decryptedMessage = await encryptedMessage.then(message => user.decrypt(message)).then(_ => _.toString())
        return decryptedMessage == originalMessage
      })
    )
  });
});
