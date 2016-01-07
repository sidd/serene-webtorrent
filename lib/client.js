var WebTorrent = require('webtorrent')
var parseTorrent = require('parse-torrent')
var mapTorrentToResponse = require('./mapTorrentToResponse')

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

      }))
    })
    resolve(Promise.all(promises))
  })
}

Client.prototype.getTorrents = function () {
  var self = this
  return new Promise(function (resolve, reject) {
    resolve(self._client.torrents.map(function (torrent) {
      return mapTorrentToResponse(torrent)
    }))
  })
}

Client.prototype.getTorrentDetails = function (infohash) {
  var self = this
  var promises = []
  return new Promise(function (resolve, reject) {
    var torrent = self._client.get(infohash)
    var files = torrent.files

    // If the torrent is completed, queue up promises that resolve
    // with files' respective Blob URLs.
    if (torrent.progress === 1) {
      files.forEach(function (file) {
        promises.push(new Promise(function (resolve, reject) {
          file.getBlobURL(function (err, url) {
            if (err) return reject(err)
            resolve({
              filename: file.name,
              url: url
            })
          })
        }))
      })
    }

    return Promise.all(promises).then(function (urls) {
      var response = {
        infohash: infohash
      }

      if (promises.length) {
        response.downloadUrls = urls
      }

      return resolve(response)
    })
  })
}

Client.prototype.updateTorrentStatus = function (infohash, status) {
  console.log(arguments)
  return new Promise(function (resolve, reject) {
    var torrent = self._client.get(infohash)
    if (!torrent) return reject()
    switch (status) {
      case 'start':
        return resolve(torrent.resume())
      case 'stop':
      case 'pause':
        return resolve(torrent.pause())
    }
  })
}

module.exports = Client
