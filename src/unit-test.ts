import * as eccrypto from "@toruslabs/eccrypto";
import {Ecies} from "@toruslabs/eccrypto";

export class User {
  user: string;
  pass: string;
  privateKey: Buffer;
  publicKey: Buffer;

  constructor(user: string, pass: string) {
    this.user = user
    this.pass = pass
    this.privateKey = eccrypto.generatePrivate()
    this.publicKey = eccrypto.getPublic(this.privateKey)
  }

  getPublicKey(): Buffer {
    return this.publicKey
  }

  encrypt(publicKey: Buffer, message: string): Promise<Ecies> {
    return eccrypto.encrypt(publicKey, Buffer.from(message));
  }

  decrypt(privateKey: Buffer, messageEncrypted: Promise<Ecies>) {
    return messageEncrypted.then(message => eccrypto.decrypt(privateKey, message)).then(message => message.toString())
  }
}

// const pedro = new User("pedro", "1234")
//
// const maria = new User("maria", "1234")
//
// const encryptedMessage = pedro.encrypt(maria.getPublicKey(), "hola")
//
// maria.decrypt(maria.privateKey, encryptedMessage).then(message => console.log(message))
