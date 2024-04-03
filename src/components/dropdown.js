import React from "react";
import "../styles/dropdown.css"

const DropdownProfile = () => {
    return (
        <div className="flex flex-col dropDownProfile">
            <ul className="flex flex-col gap-4">
                <li>My Portfolio</li>
                <li>Balance</li>
                <li>History</li>
            </ul>
        </div>
    )
}

export default DropdownProfile;