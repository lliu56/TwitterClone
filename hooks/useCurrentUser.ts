import useSWR from 'swr';    
import fetcher from '@/libs/fetcher';


const useCurrentUser = () => {

    // SWR is going to fetch '/api/current' user the axios fetcher and store it in global store,
    // we can resuse the useCurrentUser hook, it's not going to refetch every time, it's going to see
    // if data already exists or it needs to be revalidated agian

    // const { data, error,  isLoading, mutate} = useSWR ('../pages/api/current',fetcher);
    const { data, error,  isLoading, mutate} = useSWR ('/api/current',fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser; 