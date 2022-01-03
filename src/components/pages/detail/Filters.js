import React, { Fragment, useState } from 'react'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button, Checkbox, Collapse, List, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Filters = ({ filtersList, selectedFilters, setSelectedFilters, applyFilter }) => {
    const [open, setOpen] = useState('')
    const handleClick = (val) => {
        val === open ? setOpen('') : setOpen(val)
    }

    const byValue = () => {
        switch (selectedFilters?.value) {
            case 'up':
                setSelectedFilters({ ...selectedFilters, value: 'down' })
                break;
            case 'down':
                setSelectedFilters({ ...selectedFilters, value: '' })
                break;

            default:
                setSelectedFilters({ ...selectedFilters, value: 'up' })
                break;
        }
    }

    const listSelect = (parent, child) => {
        if (selectedFilters[parent]) {
            let arr = [...selectedFilters[parent]]
            const check = selectedFilters[parent].includes(child)
            if (check) {
                arr = arr.filter(f => f !== child)
            } else arr.push(child)

            setSelectedFilters({ ...selectedFilters, [parent]: arr })
        } else {
            setSelectedFilters({ ...selectedFilters, [parent]: selectedFilters[parent] = [child] })
        }

    }

    return (
        <div>
            <PopupState variant="popover">
                {(popupState) => (
                    <React.Fragment>
                        <Button variant="contained" {...bindTrigger(popupState)}>
                            <FilterListIcon />
                        </Button>
                        <Menu {...bindMenu(popupState)} anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}>
                            <MenuItem onClick={byValue}>
                                <div className="flex justify-between items-center w-full">
                                    <div>By Value</div>
                                    {selectedFilters?.value === 'up' && <ArrowDropUpIcon />}
                                    {selectedFilters?.value === 'down' && <ArrowDropDownIcon />}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => setSelectedFilters({ ...selectedFilters, 'sold': !selectedFilters.sold })}>
                                <div className="flex justify-between items-center w-full">
                                    <div>Sold</div>
                                    {selectedFilters?.sold ? <VisibilityIcon /> : <VisibilityOffIcon />}

                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => setSelectedFilters({ ...selectedFilters, 'liked': !selectedFilters.liked })}>
                                <div className="flex justify-between items-center w-full">
                                    <div>Liked</div>
                                    {selectedFilters?.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}

                                </div>
                            </MenuItem>
                            {filtersList && Object.keys(filtersList)?.map((f, index) =>
                                <div key={index}>
                                    <div>
                                        <ListItemButton onClick={() => handleClick(f)}>
                                            <ListItemText primary={f} />
                                            {open === f ? <ExpandLess /> : <ExpandMore />}

                                        </ListItemButton>
                                        <Collapse in={open === f} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {filtersList[f].map((l, index) => (
                                                    <ListItemButton key={index} sx={{ pl: 4 }}>
                                                        <ListItemText primary={l} />
                                                        <ListItemIcon>
                                                            <Checkbox
                                                                checked={selectedFilters[f]?.includes(l) ? true : false}
                                                                onClick={() => listSelect(f, l)}
                                                                disableRipple
                                                            />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </div>
                                </div>

                            )
                            }
                            <div className="flex justify-between mx-7 mt-5">
                                <Button variant='outlined' onClick={() => setSelectedFilters({})}>Clear</Button>
                                <Button variant="outlined" onClick={applyFilter}>Apply</Button>
                            </div>
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
        </div>
    )
}

export default Filters
