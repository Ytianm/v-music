export class Song {
  constructor({
    songname,
    albumname,
    songorig,
    songid,
    songurl,
    interval,
    singername,
    singerid,
    singermid,
    singerimg
  }) {
    this.songname = songname;
    this.albumname = albumname;
    this.songorig = songorig;
    this.songid = songid;
    this.songurl = songurl,
    this.interval = interval,
    this.singername = singername;
    this.singerid = singerid;
    this.singermid = singermid;
    this.singerimg = singerimg;
  }
}

export function createSong(musicData) {
  return new Song({
    songname: musicData.songname,
    albumname: musicData.albumname,
    songorig: musicData.songorig,
    songid: musicData.songid,
    songurl: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`,
    interval:musicData.interval,
    singername: musicData['singer'][0].name,
    singerid: musicData['singer'][0].id,
    singermid: musicData['singer'][0].mid,
    singerimg: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${musicData['singer'][0].mid}.jpg?max_age=2592000`
  })
}