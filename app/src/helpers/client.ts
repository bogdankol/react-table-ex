import { Dispatch, RefObject, SetStateAction } from 'react';

export function addOutsideClickEventHandlerToRef(
	ref: RefObject<HTMLDivElement | null>,
	e: MouseEvent,
  setFunc: Dispatch<SetStateAction<boolean>>
) {

  if(!ref) return
	if (ref.current && !ref.current.contains(e.target as Node)) {
		setFunc(false)
	}
}
