import { Response } from "express";
export function sendSuccessResponse<T>({
    res,
    statusCode,
    data = null,
    message = "",
}: {
    res: Response;
    statusCode?: number;
    data?: T | T[] | null;
    message?: string;
}): void {
    res.status(statusCode || 200).send({
        success: true,
        data,
        message,
    });
}
