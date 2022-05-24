import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

function InputData(props: any) {
    const { data, setData, textHolder } = props;
    const [inputText, setInputText] = useState<any>(data);

    const onEventChange = useAsyncDebounce((e: any) => {
        setData(e || undefined);
    }, 300);

    return (
        <div className="mt-5">
            <input
                className="width-225 input-custom radius-5 font-size-14"
                type="text"
                placeholder={`${textHolder}`}
                value={inputText}
                onChange={(e) => {
                    setInputText(e.target.value);
                    onEventChange(e.target.value);
                }}
            />
        </div>
    );
}

export default InputData;