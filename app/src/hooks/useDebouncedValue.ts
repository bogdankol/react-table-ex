import { useEffect, useRef } from 'react'

export function useDebouncedValue(value: string, delay: number, setFunc: (v: string) => void) {
	let timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			setFunc(value)
		}, delay)

		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [delay, value])

}
