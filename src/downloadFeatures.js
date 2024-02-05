import exportAll from './exportAll'
import Window from 'modulekit-window'
import Form from 'modulekit-form'
import modulekitLang from 'modulekit-lang'

module.exports = {
  id: 'download-features',
  appInit (app) {
    app.on('layer-selector-layer-actions', (div, leafletGeowikiLayer) => {
      const button = document.createElement('div')
      button.className = 'action'
      button.innerHTML = '<i class="fa-solid fa-download" title="Download map features"></i>'
      div.appendChild(button)

      button.onclick = () => {
        getConf(leafletGeowikiLayer, (err, conf) => {
          if (err) { global.alert(err.message) }

          exportAll(leafletGeowikiLayer, conf, (err) => {
            global.alert('done')
          })
        })
      }
    })
  }
}

function getConf (leafletGeowikiLayer, callback) {
  const win = new Window({})

  const formExport = new Form('export', formDef(leafletGeowikiLayer))

  let domForm = document.createElement('form')
  win.content.appendChild(domForm)
  formExport.show(domForm)

  let submit = document.createElement('input')
  submit.type = 'submit'
  submit.value = modulekitLang.lang('export-prepare')
  submit.onclick = () => {
    let progressIndicator = document.createElement('div')
    progressIndicator.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i> ' + modulekitLang.lang('loading')
    win.content.appendChild(progressIndicator)
    submit.style.display = 'none'

    win.close()

    callback(null, formExport.get_data())
  }
  win.content.appendChild(submit)

  win.show()
}

function formDef (leafletGeowikiLayer) {
  const types = ['GeoJSON', 'OSMXML', 'OSMJSON']
  let values = {}
  types.forEach(type =>
    values[type] = modulekitLang.lang('export:' + type)
  )

  return {
    type: {
      name: 'Type',
      type: 'radio',
      values,
      default: types[0]
    }
  }
}
