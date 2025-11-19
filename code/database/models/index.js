/**
 * @version 1.0.0
 * @author Anderson Alzate Idárraga
 * @email anderson.alzate@newinntech.com
 * @copyright 2021 newinntech S.A.S Todos los derechos reservados.
 */
/**
 * @description index bases de datos
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { dbConfig } = require('../../config/config');
const db = {};
  
 
connect();

async function connect() {
  console.log(dbConfig)
  const sequelize = new Sequelize(dbConfig.connection.dbname, dbConfig.connection.user, dbConfig.connection.pass, {
    host: dbConfig.configOptions.host,
    port: dbConfig.configOptions.port,
    dialect: dbConfig.configOptions.dialect,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000 //Tiempo que dura la conexion, buena practica
    },
    logging: false
  });

  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      if (typeof model === 'object') {
        for (const m of model) {
          db[m.name] = m;
        }
      } else {
        db[model.name] = model;
      }
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
  // console.log("Conexion Exitosa")
  // await db.sequelize.sync({ alter: true });
  // console.log("Sincronizacion Exitosa")

  const blogRecords = await db.post.findAll({raw:true});
  console.log(blogRecords)

  return db;
}


module.exports = db;
