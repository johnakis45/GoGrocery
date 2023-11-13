// import { App } from '../src/app';

// const application = new App();
// application.start();

// export { application };
import express, { NextFunction, Request, Response } from "express";
import 'dotenv/config'
import bodyParser from "body-parser";
//import main_router from "./api/index";

const app = express()
const port = process.env.PORT;

app.use(bodyParser.json())

//app.use("/api", main_router)

app.use(printer)

app.get('/', (req, res, next) => {
    res.send('Hello World!')
    console.log(req.body.__id)
    next()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function printer(req: Request, res: Response, next: NextFunction) {

    const id = "123"
    req.body.__id = id;
    next();
}

