import { UserProfileTypes } from '@/models/User';
import { useState, useEffect } from 'react'

export const useProfile = () => {
    const [data, setData] = useState<UserProfileTypes | false>(false);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            });
        })
    }, []);
  return {loading, data};
}