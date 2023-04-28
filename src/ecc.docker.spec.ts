import {GenericContainer, StartedTestContainer} from "testcontainers";
import axios from 'axios';

class ECC {
  serverAddress: string
  constructor(hostname: string, port: number) {
    this.serverAddress = `http://${hostname}:${port}`
  }
  registerUser(username: string, password:string): Promise<string> {
    return axios.post(this.serverAddress + "/register").then(_ => _.data)
  }
}
describe("ECC TestContainer",() => {
  let container: StartedTestContainer;
  let subject: ECC;

  beforeAll(async () => {
    container = await new GenericContainer("ecc")
      .withExposedPorts(8070)
      .start()
    subject = new ECC(container.getHost(), container.getMappedPort(8070))
  }, 40000)
  afterAll(async () => {
    await container.stop()
  }, 40000)

  it("should register an user", async () => {
    // given
    const username = "persona"
    const password = "constrasenia"
    // when
    const response = await subject.registerUser(username, password)
    // then
    expect(response).toBe("ok")
  }, 40000)

})
