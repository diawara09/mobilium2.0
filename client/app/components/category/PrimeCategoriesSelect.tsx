import { useEffect } from "react"
import { useFetcher } from "react-router"

export default function PrimeCategoriesSelect({defaultValue, name}) {
    const fetcher = useFetcher()

    useEffect(() => {
         if (fetcher.state === 'idle' && !fetcher.data) {
           fetcher.load('/loaders/allCategories')
         }
    }, [fetcher])
    
    return (fetcher.data ? (
      <select
        defaultValue={defaultValue || null}
        className="select max-w-sm appearance-none"
        aria-label="select"
        name={name}
      >
        <option value={''}>No Category</option>
        {fetcher.data.map((item) => (
          <option key={item._id} value={item._id}>
            {' '}
            {item.name}{' '}
          </option>
        ))}
      </select>
    ) : (
      ''
    ))
}