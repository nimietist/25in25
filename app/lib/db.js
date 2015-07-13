import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL);

fs.readdirSync(path.join(__dirname, '..', 'models'))
  .filter(function(file) {
    return (file.indexOf('.') !== 0);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') { return; }
    require(path.join('..', 'models', file));
  });


export default mongoose.models;
