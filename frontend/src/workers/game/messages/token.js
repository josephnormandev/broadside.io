export default function token(token)
{
    return {
        receiver: 'token',
        data: {
            token: token,
        },
    };
}
