import React, { useState, useEffect, useCallback } from 'react'

/**
 * @name 倒计时
 * @param initSeconds <number> 初始化倒计时时间
 * @param onFinish <function> 完成倒计时之后的回调
 * @return { start, pause, reload, seconds } 开始、暂停、重置、当前倒计时时间
*/
export const useCountDown = ({ initSeconds, onFinish }) => {
    let timmer = null
    const [isRuning, setIsRuning] = useState(false)
    const [seconds, setSeconds] = useState(initSeconds)

    const start = useCallback(() => {
        setIsRuning(true)
    }, [seconds])

    const pause = useCallback(() => {
        setIsRuning(false)
        if (timmer) clearTimeout(timmer)
    }, [isRuning])

    const reload = useCallback(() => {
        setIsRuning(false)
        if (timmer) clearTimeout(timmer)
        setSeconds(initSeconds)
    }, [initSeconds])

    useEffect(() => {
        if (seconds > 0 && isRuning) {
            console.log(seconds)
            timmer = setTimeout(() => {
                setSeconds(t => t - 1)
            }, 1000)
        } else if (seconds === 0) {
            setIsRuning(false)
            onFinish && onFinish()
        }

        return () => clearTimeout(timmer)
        
    }, [seconds, isRuning, onFinish])

    return { start, pause, reload, seconds }
}