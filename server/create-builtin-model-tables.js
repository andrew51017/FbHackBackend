var server = require('./server');
var dataSource = server.dataSources.db;
var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role'];

dataSource.automigrate(lbTables, function(error) {
  if (error) {
    throw error;
  }
  console.log('Looback tables [' + lbTables + '] created in ', dataSource.adapter.name);
  dataSource.disconnect();
});
