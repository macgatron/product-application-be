import { Request, Response } from "express";

const Home = (req: Request, res: Response) => {
    return res.send('App is running');
}

export { Home }
