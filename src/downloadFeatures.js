module.exports = {
  id: 'download-features',
  appInit (app) {
    app.on('layer-selector-layer-actions', (div, leafletGeowikiLayer) => {
      const button = document.createElement('div')
      button.className = 'action'
      button.innerHTML = '<i class="fa-solid fa-download" title="Download map features"></i>'
      div.appendChild(button)

      button.onclick = () => {
        if (leafletGeowikiLayer.overpassFrontend) {
        }
      }
    })
  }
}
