import * as eccrypto from "@toruslabs/eccrypto";
import {decrypt, Ecies} from "@toruslabs/eccrypto";

type PrivateKey = Buffer
type PublicKey = Buffer
type EncryptedMessage = Ecies

export interface User {
  getPublicKey(): PublicKey
  encrypt(pk: PublicKey, message: string): Promise<EncryptedMessage>
  decrypt(message: EncryptedMessage): Promise<string>
}

export class UserWithEcc implements User {
  username: string;
  private password: string
  private readonly privateKey: PrivateKey
  publicKey: PublicKey
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
    this.privateKey = eccrypto.generatePrivate()
    this.publicKey = eccrypto.getPublic(this.privateKey);
  }

  decrypt(message: EncryptedMessage): Promise<string> {
    return eccrypto.decrypt(this.privateKey, message).then(decrypted => decrypted.toString())
  }

  encrypt(pk: PublicKey, message: string): Promise<EncryptedMessage> {
    return eccrypto.encrypt(pk, Buffer.from(message));
  }

  getPublicKey(): PublicKey {
    return this.publicKey
  }

}

export interface ECC {
  publicKey(): PublicKey

  encrypt(pk: Buffer, message: string): Promise<EncryptedMessage>;

  decrypt(message: EncryptedMessage): Promise<string>;
}
export class DefaultECC implements ECC {
  private readonly privateKey: PrivateKey
  _publicKey: PublicKey
  constructor(privateKey = eccrypto.generatePrivate()) {
    this.privateKey = privateKey
    this._publicKey = eccrypto.getPublic(this.privateKey);
  }

  encrypt(pk: Buffer, message: string): Promise<EncryptedMessage> {
        return eccrypto.encrypt(pk, Buffer.from(message))
    }

  publicKey(): PublicKey {
    // @ts-ignore
    return this._publicKey;
  }

  decrypt(message: EncryptedMessage): Promise<string> {
    return decrypt(this.privateKey, message).then(buffer => buffer.toString());
  }
}
export class UserWithCustomECC implements User {
  username: string
  password: string
  ecc: ECC
  constructor(username: string, password: string, ecc: ECC) {
    this.username = username
    this.password = password
    this.ecc = ecc
  }
  decrypt(message: EncryptedMessage): Promise<string> {
    return this.ecc.decrypt(message);
  }

  encrypt(pk: PublicKey, message: string): Promise<EncryptedMessage> {
    return this.ecc.encrypt(pk, message)
  }

  getPublicKey(): PublicKey {
    return this.ecc.publicKey();
  }

}