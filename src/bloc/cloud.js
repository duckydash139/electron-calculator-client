import uuid from 'uuid'
import Store from 'electron-store'
import axios from 'axios'
import qs from 'querystring'

const store = new Store()

export default class Cloud {
  constructor() {
    this.clientKey = null

    this.init()
  }

  init() {
    if (!store.get('clientKey')) {
      const generatedKey = uuid.v4()
      this.clientKey = generatedKey
      // Save clientKey in localStorage
      store.set('clientKey', generatedKey)
    }

    this.clientKey = store.get('clientKey')
  }

  // Save data on server
  async save(file) {
    // Prepare data format
    const payload = {
      client_id: this.clientKey,
      file: {
        a: file.a.toString(),
        b: file.b.toString(),
        operator: file.operator,
        result: file.result.toString()
      }
    }
    // Connect to API
    try {
      // sign up new client
      const { status } = await axios.post(
        `${process.env.SERVER_PATH}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (status === 201) {
        return true
      } else if (status === 202) {
        const { status } = await axios.put(
          `${process.env.SERVER_PATH}/${this.clientKey}`,
          { file },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (status === 200) {
          return true
        }
      }

      return false
    } catch (error) {
      return false
    }
  }

  // Load data from server
  async load() {
    // Connect to API
    try {
      const { data } = await axios.get(
        `${process.env.SERVER_PATH}/${this.clientKey}`
      )

      return data
    } catch (error) {
      return false
    }
  }
}
