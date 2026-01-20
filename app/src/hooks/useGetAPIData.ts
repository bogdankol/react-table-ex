import { useQuery } from '@tanstack/react-query'
import { IItemData } from '@/app/src/types'
import { doRequest } from '../helpers/doRequest'
import axios, { AxiosError } from 'axios'

export default function useGetAPIData(
  selectedCountry: string,
  nameInput: string,
	retryTimes: number = 5,
	refetchIfErrorOnFocusLost: boolean = false,
) {

	const { data, isPending, error } = useQuery<IItemData[], AxiosError>({
		queryKey: ['rows', selectedCountry, nameInput],
		queryFn: () =>
			doRequest
				.get(
					`/search?countryy=${encodeURIComponent(selectedCountry)}` +
						`${nameInput ? `&name=${nameInput}` : ''}`,
				)
				.then(({ data }) => (!!data?.length ? data : [])),
		staleTime: 5 * 60 * 1000,
		enabled: !!selectedCountry,
		retry: (failureCount, error) => {
			console.log({ failureCount })
			if (axios.isAxiosError(error)) {
				console.log(error.response)
				if (error.response?.status && error.response.status < 500) {
					return false
				}
			}
			return failureCount < retryTimes
		},
		refetchOnWindowFocus: refetchIfErrorOnFocusLost,
	})

	return {
		isPending,
		error,
		data,
		selectedCountry,
	}
}
