const async = require('async')
const FileSaver = require('file-saver')

const chunkSplit = require('./chunkSplit')

const types = {
  GeoJSON: require('./ExportGeoJSON'),
  OSMXML: require('./ExportOSMXML'),
  OSMJSON: require('./ExportOSMJSON')
}

let tab
let formExport

module.exports = function prepareDownload (geowikiLayer, conf, callback) {
  const fun = layerFeatures

  fun(geowikiLayer, conf, (err, data) => {
    if (err) {
      return callback(err)
    }

    createDownload(conf, data, callback)
  })
}

function layerFeatures (geowikiLayer, conf, callback) {
  let list = []

  geowikiLayer.layer.layers.forEach(layer => {
    const l = Object.values(layer.mainlayer.visibleFeatures)

  // list = list.filter(item => !isTrue(item.data.exclude))

    list = list.concat(l)
  })

  callback(null, list)
}

function createDownload (conf, data, callback) {
  let type = types[conf.type]
  let exportFun = new type(conf)

  let chunks = chunkSplit(data, 1000)
  let parentNode

  async.mapLimit(
    chunks,
    1,
    (chunk, done) => {
      async.map(chunk,
        (ob, done) => exportFun.each(ob, done),
        (err, result) => {
          global.setTimeout(() => done(err, result), 0)
        }
      )
    },
    (err, data) => {
      if (err) {
        return callback(err)
      }

      if (data.length !== 0) {
        data = data.reduce((all, chunk) => all.concat(chunk))
      }

      let result = exportFun.finish(data)

      var blob = new Blob([ result.content ], { type: result.fileType + ';charset=utf-8' })
      FileSaver.saveAs(blob, 'openstreetbrowser.' + result.extension)

      callback()
    }
  )
}
