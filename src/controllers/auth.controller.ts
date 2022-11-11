
import { Request, Response } from "express";

class AuthController {

    public ping = (req: Request, res: Response) => {

        res.status(200).json({
            message: 'Hello strange!'
        })

    };

}

export default new AuthController();
