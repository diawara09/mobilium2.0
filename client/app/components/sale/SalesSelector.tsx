import { useEffect } from 'react'
import { useFetcher } from 'react-router'

// eslint-disable-next-line react/prop-types
export default function SalesSelector({ defaultValue, name }) {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/loaders/allSales')
    }
  }, [fetcher])

  return fetcher.data ? (
    <select
      defaultValue={defaultValue || null}
      className="select max-w-sm appearance-none"
      name={name}
    >
      <option value={''}>Pas de promotions</option>
      {fetcher.data.map((item) => (
        <option key={item._id} value={item._id}>
          {' '}
          {item.name} | {item.discount_rate.$numberDecimal}%
        </option>
      ))}
    </select>
  ) : (
    ''
  )
}
