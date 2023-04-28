import {User, UserWithEcc, ECC, UserWithCustomECC, DefaultECC} from "./tdd";
import {encrypt} from "@toruslabs/eccrypto";

describe('User', () => {
  test('should decrypted equals to original', async () => {
    // given
    const originalMessage = "Hola Maria"
    const sender: User = new UserWithEcc("sender", "1234")
    const receiver: User = new UserWithEcc("receiver", "1234")

    const encrypted = sender.encrypt(Buffer.from(receiver.getPublicKey().toString("hex"), 'hex'), originalMessage)
    const decryted =  await encrypted.then( a => receiver.decrypt(a))

    expect(decryted).toBe(originalMessage)
  });
  test("should decrypt messages with a specific ECC",async () => {
    // given
    const originalMessage = "hola otra vez"
    const eccSender: ECC = new DefaultECC()
    const eccReceiver: ECC = new DefaultECC()
    const sender: User = new UserWithCustomECC("sender", "1234", eccSender)
    const receiver: User = new UserWithCustomECC("receiver", "1234", eccReceiver)

    // when
    const encrypted = sender.encrypt(receiver.getPublicKey(), originalMessage)
    const decryted =  await encrypted.then( a => receiver.decrypt(a))

    // then
    expect(decryted).toBe(originalMessage)
  })
});

describe("ECC", () => {
  test("encrypt", async () => {
    // given
    const ecc: ECC = new DefaultECC()
    const pk = ecc.publicKey()
    const message = "hola"

    // when
    const encryptedData = await ecc.encrypt(pk, message)
    // then
    expect(encryptedData).toBeDefined()
  })
  test("decrypt", async () => {
    // given
    const ecc: ECC = new DefaultECC()
    const pk = ecc.publicKey()
    const message = "hola"

    // when
    const encryptedData = await ecc.encrypt(pk, message)
    const decrypted = await ecc.decrypt(encryptedData)
    // then
    expect(decrypted).toBe(message)
  })
})