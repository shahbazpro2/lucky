import axios from "axios"

const objectToArray = (val) => {
    if (typeof val === 'object')
        return Array.prototype.concat.apply([], Array.from(Object.keys(val), k => val[k]))
    else
        return [val]
}

const API = async (url, method, data) => {

    try {
        const res = await axios({
            method,
            url,
            data,
            headers: { project_id: 'mainnetvZcIcrL2zrpDvdHa47mHR6ah7fcx9SnN' }
        })

        if (res?.data)
            return { error: false, data: res.data }
    } catch (err) {
        let data
        if (err.response?.status === 404 || err.response?.status === 500) {
            data = { status: err.response?.status, data: ['Something went wrong.'] }
        }
        else if (err.message === "Network Error") {
            data = { status: 408, data: ['Server is not responding.'] }
        } else
            data = { status: err.response?.status, data: objectToArray(err.response?.data) }


        return { error: true, ...data }
    }

}

export default API