import React from 'react'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Filters = ({ filtersList }) => {

    filtersList && Object.keys(filtersList)?.forEach(f => console.log(f))
    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-menu" placement="center">
                {(popupState) => (
                    <React.Fragment>
                        <Button variant="contained" {...bindTrigger(popupState)}>
                            <FilterListIcon />
                        </Button>
                        <Menu {...bindMenu(popupState)} transformOrigin="left">
                            {filtersList && Object.keys(filtersList)?.map((f, index) =>
                                <MenuItem key={index}>{f}</MenuItem>
                            )
                            }
                            <MenuItem onClick={popupState.close}>Logout</MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
        </div>
    )
}

export default Filters
