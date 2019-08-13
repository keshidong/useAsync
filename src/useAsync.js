import { useState, useRef } from 'react'

const useThat = (defaultThat) => useRef(defaultThat).current

const useAsyncState = (initState) => {

}

const useAsync = (asyncCallback) => {
    const [loading, setLoading] = useState(false)
    const pList = useThat([])
    const returnRef = useThat({})

    returnRef.execute = () => {
        setLoading(true)
        pList.push(asyncCallback())
    }

    returnRef.loading = loading

    return returnRef
}
