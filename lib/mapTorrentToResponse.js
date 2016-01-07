module.exports = function mapTorrent (torrent) {
  if (!torrent) {
    return {}
  }
  return {
    bytes_downloaded: torrent.downloaded,
    bytes_uploaded: torrent.uploaded,
    bytes_total: torrent.length,
    name: torrent.name,
    infohash: torrent.infoHash,
    download_speed: torrent.downloadSpeed(),
    upload_speed: torrent.uploadSpeed(),
    peers: torrent.numPeers,
    ratio: torrent.ratio,
  }
}
