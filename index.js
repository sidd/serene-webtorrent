var Client = require('./lib/client')

function SereneWebtorrentPlugin (opts) {
  this._client = new Client(opts)
}

SereneWebtorrentPlugin.nameIdentifier = SereneWebtorrentPlugin.prototype.nameIdentifier = 'webtorrent'
SereneWebtorrentPlugin.prettyName = SereneWebtorrentPlugin.prototype.prettyName = 'WebTorrent'
SereneWebtorrentPlugin.description = SereneWebtorrentPlugin.prototype.description = 'Spawns a WebTorrent instance which is interfaced with'
SereneWebtorrentPlugin.build = SereneWebtorrentPlugin.prototype.build = SereneWebtorrentPlugin

SereneWebtorrentPlugin.prototype.getTorrents = function () {
  return {
    type: 'PROVIDER_TORRENTS',
    payload: {
      promise: this._client.getTorrents()
    }
  }
}

SereneWebtorrentPlugin.prototype.addTorrent = function (torrent) {
  return {
    type: 'PROVIDER_TORRENTS_ADD',
    payload: {
      promise: this._client.addTorrent(torrent)
    }
  }
}

SereneWebtorrentPlugin.prototype.getStats = function () {
  return {
    type: 'PROVIDER_STATS',
    payload: {
      promise: Promise.resolve({})
    }
  }
}

module.exports = SereneWebtorrentPlugin
