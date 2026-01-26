import { Server } from "./infra/http/server"


const port = Number(process.env.PORT) || 3000

const server = new Server(port)
server.start()
