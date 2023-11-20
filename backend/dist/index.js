"use strict";
// import { App } from '../src/app';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const application = new App();
// application.start();
// export { application };
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./api/index"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use("/api", index_1.default);
app.use(printer);
app.get('/', (req, res, next) => {
    res.send('Hello Worldddd!');
    console.log(req.body.__id);
    next();
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
function printer(req, res, next) {
    const id = "123";
    req.body.__id = id;
    next();
}
