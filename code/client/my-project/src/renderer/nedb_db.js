import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'


export default new Datastore({
  

  autoload: true,
  // filename: path.join(remote.app.getPath('userData'), '/data.db')
  filename:path.join(__static,'/order_attribute.db')
})