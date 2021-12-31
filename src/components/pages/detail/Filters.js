import React, { Fragment, useState } from 'react'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button, Checkbox, Collapse, List, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Filters = ({ filtersList }) => {
    const [open, setOpen] = useState('')
    const handleClick = (val) => {
        val === open ? setOpen('') : setOpen(val)
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
                            {filtersList && Object.keys(filtersList)?.map((f, index) =>
                                <div key={index}>
                                    {index < 3 ?
                                        <MenuItem>{f}</MenuItem> :
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
                                                                    disableRipple
                                                                />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </div>
                                    }
                                </div>

                            )
                            }
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
        </div>
    )
}

export default Filters
