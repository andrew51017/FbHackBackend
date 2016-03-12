module.exports = function(app) {
  var path = require('path');
  var models = require(path.resolve(__dirname, '../model-config.json'));
  var datasources = require(path.resolve(__dirname, '../datasources.json'));

  function autoUpdateAll() {
    var modelKeys = Object.keys(models);
    console.log(modelKeys);

    app.datasources.db.autoupdate(modelKeys, function(error) {

        console.log("Update completed!");
        app.datasources.db.disconnect();

    })

  }

  function update(key){
    app.dataSources[models[key].dataSource].autoupdate(key, function (error) {
      if (error) {
        throw error;
      }

      console.log('Model ' + key + ' updated');

      app.dataSources[models[key].dataSource].disconnect();
    });
  }

  function autoMigrateAll() {
    Object.keys(models).forEach(function(key) {
      if (isValidKey(key)) {
        migrate(key);
      }
    });
  }

  function migrate(key){
    app.dataSources[models[key].dataSource].automigrate(key, function (error) {
      if (error) {
        throw error;
      }
      console.log('Model ' + key + ' migrated');

      app.dataSources[models[key].dataSource].disconnect();
    });
  }

  function isValidKey(key) {
    return !isUndefined(models[key].dataSource) && !isUndefined(datasources[models[key].dataSource]);
  }

  function isUndefined(typeToCheck) {
    return typeof typeToCheck === 'undefined';
  }

  //TODO: change to autoUpdateAll when ready for CI deployment to production
  //autoMigrateAll();
  autoUpdateAll();

};
