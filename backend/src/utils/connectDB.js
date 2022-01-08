const pgp = require('pg-promise')({});

const cn = `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const db = pgp(cn);

module.exports = { db };