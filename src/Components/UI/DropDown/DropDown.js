import React from 'react';
import './DropDown.css'
import ItemPreview from "../../ItemPreview/ItemPreview";

const Rooms = props => {

    return (
        <div className={ "dropdownWrapper" } >
            <ul className="dropdown" >
                { props.items.map(item =>
                    <ItemPreview
                        key={ `${ item.id }` }
                        id={ item.id }
                        setSelected={ props.setSelected }
                        title={ item.name }
                        subTitle={ item.lastMessage }
                    />
                ) }
            </ul >
        </div >
    )
};

export default Rooms;
