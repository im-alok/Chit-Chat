import { Response } from "express";

interface ResponseData {
    message: string;
    data?: any;
}

export const Res = (res: Response, { message, data }: ResponseData, statusCode: number) => {
    return res.status(statusCode).json({
        success: statusCode === 200,
        message,
        details: data || null,
    });
};
