export const success = (res, data) => res.status(200).json({message: 'Success', data})
export const error = (res, message) => res.status(500).json({message})
export const notFound = (res, message) => res.status(404).json({message})
export const badRequest = (res, message) => res.status(400).json({message})
export const unauthorized = (res, message) => res.status(401).json({message})
export const forbidden = (res, message) => res.status(403).json({message})
export const conflict = (res, message) => res.status(409).json({message})
export const tooManyRequests = (res, message) => res.status(429).json({message})
export const internalServerError = (res, message) => res.status(500).json({message})

const handleServiceError = (err, res) => {
    switch (err.statusCode) {
        case 400:
            return badRequest(res, err.message);
        case 401:
            return unauthorized(res, err.message);
        case 403:
            return forbidden(res, err.message);
        case 404:
            return notFound(res, err.message);
        case 409:
            return conflict(res, err.message);
        case 429:
            return tooManyRequests(res, err.message);
        default:
            return internalServerError(res, err.message);
    }
}

export default handleServiceError;