import express, { type Application } from 'express'
import cors from 'cors'
import router from './routes'


export class Server {
  private app: Application
  private port: number

  constructor(port: number) {
    this.port = port
    this.app = express()

    this.configureMiddlewares()
    this.configureRoutes()
  }

  private configureMiddlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private configureRoutes(): void {
    this.app.use('/api', router)
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`)
      console.log(
        `Environment: ${process.env.NODE_ENV || 'development'}`
      )
    })
  }
}
