import React from 'react';

function InputData(props: any) {
    const { data, setData } = props;

    return (
        <div className="mt-5">
            <input
                className="width-250 input-custom radius-5"
                type="text"
                placeholder="Enter Search"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
        </div>
    );
}

export default InputData;