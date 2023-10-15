import useSWR from 'swr';    
import fetcher from '@/libs/fetcher';


const usePosts = (userId:string) => {

    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';

    // SWR is going to fetch '/api/current' user the axios fetcher and store it in global store,
    // we can resuse the useCurrentUser hook, it's not going to refetch every time, it's going to see
    // if data already exists or it needs to be revalidated agian
    const { data, error,  isLoading, mutate} = useSWR (url,fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default usePosts; 