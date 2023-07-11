import Tabs from '@mui/material/Tabs';
import {useState} from "react";
import Tab from '@mui/material/Tab';

export const Info = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabOptions = [
        {label: "RECENTS", icon: <i className="fa-solid fa-home"/>},
        {label: "FAVORITES", icon: <i className="fa-solid fa-user"/>},
        {label: "NEARBY", icon: <i className="fa-solid fa-box"/>},
    ]

    return (
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs">
            {
                tabOptions.map(({label, icon}) =>
                    <Tab icon={icon} label={label} iconPosition="start"/>
                )
            }
        </Tabs>
    );
}