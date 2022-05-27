import React from "react";
import { FilterOption } from "../pattern/home.pattern";

function DropDownMenu(props: any) {
    const { statusActive, setStatusFilter, selectList, handleChooseOption, currentItem } = props;

    return (
        <div className="mt-5 group-option" onClick={() => setStatusFilter(!statusActive)}>
            <div className="width-225 input-custom radius-5 color-dark pointer">
                {!currentItem
                ? "Choose Filter"
                : currentItem}
            </div>
            <div
                className={`width-225 box-option radius-5 ${
                    statusActive ? "active" : "inactive"
                }`}
            >
                {selectList.map((item: FilterOption, index: any) => (
                <div
                    key={index}
                    className="input-custom item-option color-dark pointer"
                    onClick={() => handleChooseOption(item)}
                >
                    {item.label}
                </div>
                ))}
            </div>
        </div>
    );
}

export default DropDownMenu;
