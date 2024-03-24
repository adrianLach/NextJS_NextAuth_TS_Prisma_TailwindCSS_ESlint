const checkEnv = (variable: string) => {
    const envVar = process.env[variable] 

    if(!envVar)
        throw `Environment variable '${variable}' is not set!`

    return envVar
}

export {checkEnv}