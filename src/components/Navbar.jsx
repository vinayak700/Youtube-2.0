import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
const Navbar = () =>
(
    <Stack
        direction="row"
        alignItems="center"
        p={2}
        sx={{ position: 'sticky', background: '#434543', top: 0, justifyContent: 'space-between', height:'73px' }}
    >
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src='https://cdn.pixabay.com/photo/2016/10/06/12/49/youtube-1718976__340.png' alt="logo" style={{ height: '50px', width: 'full' }} />
        </Link>
        <SearchBar />
    </Stack>
)


export default Navbar