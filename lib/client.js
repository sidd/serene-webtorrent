var WebTorrent = require('webtorrent/webtorrent.min')
var parseTorrent = require('parse-torrent')

function Client (opts) {
  opts = opts || {}
  this._client = new WebTorrent()
}

Client.prototype.addTorrent = function (torrents) {
  var self = this

  return new Promise(function (resolve, reject) {
    var promises = []
    Array.prototype.slice.call(torrents).forEach(function (torrent) {
      promises.push(new Promise(function (resolve, reject) {

        parseTorrent.remote(torrent, function (err, parsedTorrent) {
          self._client.add(parsedTorrent, function (torrent) {
            resolve(torrent)
          })
        })

      }, function (err) {
        console.log(err)
      }))
    })
    console.log(promises)
    resolve(Promise.all(promises))
  })
}

Client.prototype.getTorrents = function () {
  var self = this
  return new Promise(function (resolve, reject) {
    resolve(self._client.torrents)
  })
}

module.exports = Client
