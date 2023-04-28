import {GenericContainer, StartedTestContainer, Network} from "testcontainers";
import { createClient, RedisClientType } from "redis";


describe("Redis", () => {
  let container: StartedTestContainer;
  let redisClient: RedisClientType;

  beforeAll(async () => {
    container = await new GenericContainer("redis")
      .withExposedPorts(6379)
      .start();
    const redisUrl = `redis://${container.getHost()}:${container.getMappedPort(6379)}`
    redisClient = createClient({url: redisUrl})
    await redisClient.connect()
  })

  afterAll(async () => {
    await redisClient.quit();
    await container.stop();
  });

  it("works", async () => {
    const port = container.getMappedPort(6379)
    const host = container.getHost()
    await redisClient.set("key", "val");
    expect(await redisClient.get("key")).toBe("val");
  }, 60000);
});
