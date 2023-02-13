import { Stack } from '@mui/material'
import { categories } from '../utils/constants'

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {

    return (
        <Stack
            direction='row'
            sx={{
                overflowY: 'auto',
                height: { sx: 'auto', md: '95%' },
                flexDirection: { md: 'column' },
                paddingTop: '10px'

            }}
        >
            {categories.map((category) => (
                <button className='category-btn' onClick={() => setSelectedCategory(category.name)} style={{ background: category.name === selectedCategory && 'cyan', color: 'white', alignItems: 'center' }}
                    key={category.name} >
                    <span style={{ color: category.name === selectedCategory ? 'white' : 'cyan', marginRight: '15px' }}>{category.icon}</span>
                    <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8', marginBottom: '5px' }}>{category.name}</span>
                </button>
            ))}

        </Stack>
    )
}

export default Sidebar