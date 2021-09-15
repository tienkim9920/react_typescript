import React from 'react';
import './component.css'
import { Link } from 'react-router-dom'

function Home(props: any) {
    return (
        <div className="section-home">
            <div className="layout-home container">
                <div className="banner-home">
                    <h1 className="banner-title-home">Home</h1>
                </div>
                <div className="content-home">
                    <div className="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fuga ullam minima a eligendi tenetur, totam distinctio! Vero distinctio, mollitia asperiores nam dolorum quae impedit, maiores nemo accusantium culpa voluptate.</div>
                    <div className="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt et exercitationem, ratione possimus quasi enim commodi libero praesentium veniam quae quisquam nihil voluptatem perspiciatis doloribus corrupti ipsum dignissimos nulla natus.</div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <Link to='/create' className="btn btn-primary fix-btn-create-home">
                        Create Item
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;