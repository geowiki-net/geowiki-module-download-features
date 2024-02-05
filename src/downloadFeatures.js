import exportAll from './exportAll'
import Window from 'modulekit-window'
import Form from 'modulekit-form'

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

function getConf (leafletGeowikiLayer, callback) 
  const win = new Window()

  const formExport = new form('export', formDef(leafletGeowikiLayer))

  let domForm = document.createElement('form')
  win.content.appendChild(domForm)
  formExport.show(domForm)

  let submit = document.createElement('input')
  submit.type = 'submit'
  submit.value = lang('export-prepare')
  submit.onclick = () => {
    let progressIndicator = document.createElement('div')
    progressIndicator.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i> ' + lang('loading')
    tab.content.appendChild(progressIndicator)
    submit.style.display = 'none'

    win.hide()

    callback(null, conf)
  }
  win.content.appendChild(submit)

  win.show()
})

 (data) => {
  const div = document.createElement('div')

  let formExport = new form('exportOne', formDef())

  let domForm = document.createElement('form')
  div.appendChild(domForm)
  formExport.show(domForm)

  let submit = document.createElement('input')
  submit.type = 'submit'
  submit.value = lang('export-prepare')
  submit.onclick = () => {
    let progressIndicator = document.createElement('div')
    progressIndicator.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i> ' + lang('loading')
    div.appendChild(progressIndicator)
    submit.style.display = 'none'

    let conf = formExport.get_data()

    conf.singleFeature = true

    createDownload(conf, [ data ], (err) => {
      if (err) {
        alert(err)
      }

      submit.style.display = 'block'
      div.removeChild(progressIndicator)
    })
  }
  div.appendChild(submit)

  global.setTimeout(() => formExport.resize(), 0)

  return div
}

function formDef (leafletGeowikiLayer) {
  let values = {}
  Object.keys(types).forEach(type =>
    values[type] = lang('export:' + type)
  )

  return {
    type: {
      name: 'Type',
      type: 'radio',
      values,
      default: Object.keys(types)[0]
    }
  }
}
