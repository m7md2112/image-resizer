import express from "express";
import dotenv from "dotenv";
import {errorHandler} from "./middleware/error-handler";

dotenv.config();

const app = express();
const port = <string> process.env.PORT;

app.use(express.static("images"))

app.get('/', (req, res: express.Response<string>) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(errorHandler)