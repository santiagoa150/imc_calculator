
async function requestLogin(username, password, dbClient) {
    const result = await dbClient.query("SELECT identification, password FROM public.users where identification = $1 and password = $2", [username, password]);
    const user = result?.rows?.[0];
    return user;
}

async function getUserData(username, dbClient) {
    const result = await dbClient.query("SELECT identification FROM public.users where identification = $1", [username]);
    const user = result?.rows?.[0];
    return user;
}

module.exports = {
    requestLogin,
    getUserData,
}