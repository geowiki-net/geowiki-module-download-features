import exportAll from './exportAll'

module.exports = {
  id: 'download-features',
  appInit (app) {
    app.on('layer-selector-layer-actions', (div, leafletGeowikiLayer) => {
      const button = document.createElement('div')
      button.className = 'action'
      button.innerHTML = '<i class="fa-solid fa-download" title="Download map features"></i>'
      div.appendChild(button)

      button.onclick = () => {
        const conf = {
          type: 'OSMXML'
        }

        exportAll(leafletGeowikiLayer, conf, (err) => {
          global.alert('done')
        })
      }
    })
  }
}

/*
register_hook('init', function () {
  formExport = new form('export', formDef())

  let domForm = document.createElement('form')
  tab.content.appendChild(domForm)
  formExport.show(domForm)

  let submit = document.createElement('input')
  submit.type = 'submit'
  submit.value = lang('export-prepare')
  submit.onclick = () => {
    let progressIndicator = document.createElement('div')
    progressIndicator.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i> ' + lang('loading')
    tab.content.appendChild(progressIndicator)
    submit.style.display = 'none'

    prepareDownload((err) => {
      if (err) {
        alert(err)
      }

      submit.style.display = 'block'
      tab.content.removeChild(progressIndicator)
      tab.unselect()
    })
  }
  tab.content.appendChild(submit)

  tab.on('select', () => {
    formExport.resize()
  })
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

function formDef () {
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
*/
