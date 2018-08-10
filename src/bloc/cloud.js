import uuid from 'uuid'
import Store from 'electron-store'
import axios from 'axios'
import qs from 'querystring'

const store = new Store()

export default class Cloud {
  constructor () {
    this.clientKey = null

    this.init()
  }

  init () {
    if (store.get('clientKey') === null) {
      const generatedKey = uuid.v4()
      this.clientKey = generatedKey
      // Save clientKey in localStorage
      store.set('clientKey', generatedKey)
    }

    this.clientKey = store.get('clientKey')
  }

  // Save data on server
  async save (a, b, operator, result) {
    // Prepare data format
    const data = { a, b, operator, result }
    // Connect to API
    try {
      const { status } = await axios.post(`${process.env.SERVER_PATH}`, qs.stringify(data))

      if (status === 201) {
        return true
      }

      return false
    } catch (error) {
      return error
    }
  }

  // Load data from server
  async load () {
    // Connect to API
    try {
      const { data } = await axios.get(`${process.env.SERVER_PATH}/${this.clientKey}`)

      return data
    } catch (error) {
      return error
    }
  }
}
