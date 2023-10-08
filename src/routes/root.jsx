import { Outlet } from 'react-router-dom';
import { useState, useMemo, createContext } from 'react';
import Navbar from '../components/navbar';

export const SearchQueryContext = createContext({
  userName: '',
  setUserName: () => {},
})

export default function Root() {
  const [searchQuery, setSearchQuery] = useState('')
  const value = useMemo(
    () => ({ searchQuery, setSearchQuery }), 
    [searchQuery]
  );

  return (
    <SearchQueryContext.Provider value={value}>
      <Navbar />
      <Outlet />
    </SearchQueryContext.Provider>
  );
}
