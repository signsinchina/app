/**
 * Created by shu on 26/6/2017.
 */

const MEDIA_API = 'https://www.instagram.com/signsinchina/media'

/**
 * This class is used for
 *   1. fetching HTTP APIs
 *   2. communication between components:
 *      a. camera background <-> capture tab
 *      b. tabs
 */

export default class API {
  constructor() {
    this.media = []
    this.v = 0

    this.listeners = {}
  }
  async init() {
    let data = await fetch(MEDIA_API)
    data = JSON.parse(data._bodyText)
    this.media = data.items.map(item => {
      try {
        return {
          img_url: {
            low: {uri: item.images.low_resolution.url},
            high: {uri: item.images.standard_resolution.url}
          },
          caption: item.caption.text || ''
        }
      } catch (err) {
        return null
      }
    }).filter(item => item)
  }
  bind(event, listener) {
    if (this.listeners[event]) {
      this.listeners[event].push(listener)
    } else {
      this.listeners[event] = [listener]
    }
  }
  unbind(event, listener) {
    if (this.listeners[event]) {
      let index = this.listeners[event].indexOf(listener)
      this.listeners[event].splice(index, 1)
    }
  }
  send(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => {
        listener(data)
      })
    }
  }
}
