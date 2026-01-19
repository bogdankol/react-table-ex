import { RefObject, useCallback, useEffect } from 'react'

export function useOutsideRefClick(
	ref: RefObject<HTMLElement | null>,
	onOutsideClick: () => void,
	isOpened: boolean,
) {
	const clickHandler = useCallback(
		(e: PointerEvent) => {

      const composedPath = e?.composedPath() ?? []

			if (ref.current && !composedPath.includes(ref.current)) {
				return onOutsideClick()
			}
		},
		[ref, onOutsideClick],
	)

	useEffect(() => {
		if (!isOpened) return
		document.addEventListener('pointerdown', clickHandler, { capture: true })

		return () => {
			document.removeEventListener('pointerdown', clickHandler, { capture: true })
		}
	}, [clickHandler, isOpened])
}
