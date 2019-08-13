import { useState, useRef } from 'react'

const useThat = (defaultThat) => useRef(defaultThat).current

const useAsyncState = () => {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return {
        result,
        setResult,
        loading,
        setLoading,
        error,
        setError,
    }
}

const useCurrentPromise = () => {
    const currentRef = useRef(null)
    return {
        set: (p) => { currentRef.current = p },
        get: () => (currentRef.current),
        is: (p) => (p === currentRef.current),
    }

}

// promise with status and cancel function
const useAsync = (asyncCallback) => {
    const returnThat = useThat({})
    const {
        result,
        setResult,
        loading,
        setLoading,
        error,
        setError,
    } = useAsyncState()

    const {
        is: isCurrentPromise,
        set: setCurrentPromise,
        get: getCurrentPromise,
    } = useCurrentPromise()


    returnThat.execute = () => {
        const p = getCurrentPromise()
        )
        if (isCurrentPromise(p)) {
            return
        }

        // 避免重复注册p的then callback
        setCurrentPromise(p)
        setLoading(true)

        Promise.resolve(p)
            .then((result) => {
                setResult(result)
            })
            .catch((e) => {
                setError(e)
            })
            .then(() => {
                setLoading(false)
            })



    }

    returnThat.loading = loading
    returnThat.error = error
    returnThat.result = result

    return returnThat
}
