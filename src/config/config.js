require('dotenv').config()
const Joi = require('joi')

const envVarsSchema = Joi
    .object()
    .keys({
        NODE_ENV: Joi
            .string()
            .valid("production", "development", "test")
            .required(),
        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_DIALECT: Joi.string().required(),
        DB_LOGGING: Joi.boolean().default(false),
        SENDGRID_API_KEY: Joi.string().required(),
    })
    .unknown(true)

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    database: {
        host: envVars.DB_HOST,
        user: envVars.DB_USER,
        name: envVars.DB_NAME,
        password: envVars.DB_PASS,
        dialect: envVars.DB_DIALECT,
        logging: envVars.DB_LOGGING,
    },
    sendgridApiKey: envVars.SENDGRID_API_KEY,
}

