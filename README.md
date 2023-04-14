# Testing Workshop
This workshop will be divided in two sessions, the first one will cover write first vs test first mode.

In the [src/ecc-example.ts](src/ecc-example.ts) file you'll found an example about using an ECC algorithm to encrypt and decrypt a specific message.

Taking this as example we will cover the next the exercise.

## Exercise
A company is doing a "super secret" research about a new product, they work remotely, and they are scared that some communications services could be intercepted. 
For that reason they want to create a program that allow then to encrypt and decrypt their messages.

This application should store the user information (User and password). This user should have a permanent ecc assigned, and will use that to encrypt/decrypt messages to/from their teammates. 

### First Session
In order to understand the difference between the types of testing, we will to create the previous example multiples times in different ways just to understand:
* How works adding coverage to existing code (write first)
* How works create the test and then writing our code (test first) with TDD.
* How works the property testing.

### And for the second session we are going to check
* How works the integration test
* How works testscontainers
* How to create an application to be containerized
* How to creat an integration test with testscontainers.
