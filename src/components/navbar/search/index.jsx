import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button'
import { styled, alpha } from '@mui/material/styles';
import { useContext } from 'react';
import {SearchQueryContext} from 'src/routes/root'
import { Link } from 'react-router-dom'
import './index.css'

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

export default function NavSearch () {
  const {searchQuery, setSearchQuery} = useContext(SearchQueryContext)

  return (
    <Search>
      <Button component={Link} to={'/search'}  >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </Button>
      <StyledInputBase
        onChange={(e)=>setSearchQuery(e.target.value.toLowerCase())}
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
      >{searchQuery}</StyledInputBase>
    </Search>
  )
}
