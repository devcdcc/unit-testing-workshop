import express, {Express, Request, Response} from 'express';
import {User, UserWithEcc} from "./tdd";


const app: Express = express();
const port = 8070;
const repository: any = {}
app.use(express.json());

app.post('/register', (req: Request, res: Response) => {
  const username = req.body['username']
  repository[username] = new UserWithEcc(username, req.body['password'])
  res.send('ok')
});

app.post("/user/:username/encrypt", async (req: Request, res: Response) => {
    const username = req.params['username']
    const user: User = repository[username]
    if (user) {
      const encrypted = await user.encrypt(user.getPublicKey(), req.body["data"])
      // const body = await user.decrypt(encrypted)
      res.send(encrypted)
    } else res.send("error").status(400)
})

app.post("/user/:username/decrypt", async (req: Request, res: Response) => {
  const username = req.params['username']
    const user: User = repository[username]
    if (user) {
      const b = req.body
      const body = await user.decrypt(b)
      res.send(body)
    } else res.send("error").status(400)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
