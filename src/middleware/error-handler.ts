import {Request, Response} from "express";

export const errorHandler = (req: Request, res:Response): void => {
    res.send("<p>Warning Server Error</p>")
}