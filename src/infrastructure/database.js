'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { database } = require('../config/config')
const db = {};

const sequelize = new Sequelize(database.name, database.user, database.password, database);

const files = []
const sortDir = (mainDir) => {
  const folders = [];
  const CheckFile = filePath => (fs.statSync(filePath).isFile());
  const sortPath = (dir) => {
    fs.readdirSync(dir)
    .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
    .forEach((res) => {
      const filePath = path.join(dir, res);
      if (CheckFile(filePath)) {
        files.push(filePath);
      } else {
        folders.push(filePath);
      }
    });
  };
  folders.push(mainDir);
  let i = 0;
  do {
    sortPath(folders[i]);
    i += 1;
  } while (i < folders.length);

};
sortDir(__dirname + '/../app')

files.forEach(file => {
  if (file.indexOf('.model') !== -1) {
    const model = require(path.join(file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  }
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
