import * as crypto from "crypto";
import * as eccrypto from "@toruslabs/eccrypto";
var privateKey = eccrypto.generatePrivate();

// Corresponding uncompressed (65-byte) public key.
var publicKey = eccrypto.getPublic(privateKey);

// create hash method
const hashMethod = crypto.createHash("sha256")

// basic message
var str = "message to be encrypted";

// encrypt message
const encrypted = eccrypto.encrypt(publicKey, Buffer.from(str));

// decrypt
const original = encrypted.then(a => eccrypto.decrypt(privateKey, a)).then(a => a.toString())
original.then(value =>  console.log(value))
