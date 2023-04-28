import {User} from "./unit-test";

describe('User', () => {
  test('should encrypt', async () => {
    // given
    const originalMessage = "Hola Maria"
    const pedro = new User("pedro", "1234")
    const maria = new User("maria", "1234")
    // when
    const encryptedMessage = pedro.encrypt(maria.publicKey, originalMessage)
    const decryptedMessage = await maria.decrypt(maria.privateKey, encryptedMessage)
    // then
    expect(decryptedMessage).toBe(originalMessage)
  });
});
