export const dbModelSql = [
    // user
    `CREATE TABLE IF NOT EXISTS "user"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "name" VARCHAR,
        "email" VARCHAR(255),
        "password" CHAR(60),
        "avatar" VARCHAR,
        "timeCreate" INTEGER
    )`,
    // factory
    `CREATE TABLE IF NOT EXISTS "factory"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "name" VARCHAR,
        "shortName" VARCHAR,
        "company" VARCHAR
    )`,
    // factoryBase
    `CREATE TABLE IF NOT EXISTS "factoryBase"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_factory" CHAR(36)
        "name" VARCHAR,
        "address" TEXT
    )`,
    //factoryBrand
    `CREATE TABLE IF NOT EXISTS "factoryBrand"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_factory" CHAR(36),
        "name" VARCHAR,
        "alias" VARCHAR
    )`,
    // paper
    `CREATE TABLE IF NOT EXISTS "paper"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_factory"
        "id_base"  CHAR(36),
        "id_brand" CHAR(36),
        "id_prop_paper_type" VARCHAR,
        "color" VARCHAR,
        "tag" VARCHAR
    )`,
    // prop
    `CREATE TABLE IF NOT EXISTS "prop"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "prop" VARCHAR,
        "key" VARCHAR,
        "value" VARCHAR
    )`,
    // client
    `CREATE TABLE IF NOT EXISTS "client"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_prop_client_type" CHAR(36),
        "name" VARCHAR,
        "tel" CHAR(11),
        "address" TEXT,
        "timeCreate" INTEGER
    )`,
    // shippingAddress
    `CREATE TABLE IF NOT EXISTS "shippingAddress"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "name" VARCHAR,
        "tel" CHAR(11),
        "address" TEXT
    )`,
    // ordersProc
    `CREATE TABLE IF NOT EXISTS "ordersProc"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_user" CHAR(36),
        "id_paper" CHAR(36),
        "timeCreate" INTEGER,
        "timeLast" INTEGER,
        "done" TINYINT
    )`,
    // ordersProcItem
    `CREATE TABLE IF NOT EXISTS "ordersProcItem"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_paper" CHAR(36),
        "id_prop_paper_color" CHAR(36)
        "id_prop_paper_gsm" CHAR(36),
        "id_prop_paper_type" CHAR(36),
        "weight" INTEGER,
        "done" TINYINT
    )`,
    // paperStore
    `CREATE TABLE IF NOT EXISTS "paperStore"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "timeStoreIn" INTEGER,
        "id_prop_store" CHAR(36),
        "id_factory" CHAR(36),
        "id_factoryBase" CHAR(36),
        "id_factoryBrand" CHAR(36),
        "id_paper" CHAR(36),
        "measure" INTEGER,
        "exhausted" TINYINT
    )`,
    // storeInList
    `CREATE TABLE IF NOT EXISTS "storeInList"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_ordersProc" CHAR(36),

    )`,
    // ordersSales
    `CREATE TABLE IF NOT EXISTS "ordersSales"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,

    )`
    ,
    // storeOut
    `CREATE TABLE IF NOT EXISTS "storeOut"(
        "hidden" TINYINT,
        "id" CHAR(36) NOT NULL PRIMARY KEY,
        "id_ordersProc" CHAR(36),
    )`,
]



// userPower
// new Promise(resolve => db.run(
//     `CREATE TABLE IF NOT EXISTS "userPower"(
//         "id" CHAR(36) NOT NULL PRIMARY KEY,
//         "id_user" CHAR(36),
//         "power" VARCHAR,
//         "boolean" TINYINT
//     )`
// )),

// "" INTEGER,
