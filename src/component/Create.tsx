import React from 'react';

function Create(props: any) {
    return (
        <div className="section-create">
            <div className="layout-create container">
                <h3 className="text-center">Form New Item</h3>
                <div className="form-input-create mt-5">
                    <input className="input-create" type="text" placeholder="Enter Title Here" />
                </div>
                <div className="form-input-create mt-4">
                    <input className="input-create" type="text" placeholder="Enter Body Here" />
                </div>
                <div className="form-input-create mt-4">
                    <input className="btn btn-primary button-create w-100" type="submit" value="Create Item" />
                </div>
            </div>
        </div>
    );
}

export default Create;