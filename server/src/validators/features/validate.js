import checkAPIs from 'express-validator';
const { validationResult } = checkAPIs;

export default async function validate(req, res, next)
{
    var errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    next();
}
