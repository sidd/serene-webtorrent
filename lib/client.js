var WebTorrent = require('webtorrent/webtorrent.min')

function Client (opts) {
  opts = opts || {}
  this._client = new WebTorrent()
}

Client.prototype.addTorrent = function (torrent) {
  var self = this
  return new Promise(function (resolve, reject) {
    self._client.add(torrent, function (torrent) {
      resolve(torrent)
    })
  })
}

Client.prototype.getTorrents = function () {
  var self = this
  return new Promise(function (resolve, reject) {
    resolve(self._client.torrents)
  })
}

module.exports = Client
