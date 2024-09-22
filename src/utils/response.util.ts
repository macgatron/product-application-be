import { Response } from "express";

const ResponseSuccess = (res: Response, data = {}, message = 'OK') => {
    return res.json({
        data,
        message,
    });
}

export { ResponseSuccess };
