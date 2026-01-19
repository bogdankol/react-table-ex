import { useEffect, useRef } from 'react'

export function useDebouncedValue(value: string, delay: number, execFunc: (v: string) => void) {
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			execFunc(value)
		}, delay)

		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [delay, value, execFunc])

}
