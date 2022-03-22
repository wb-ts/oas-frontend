import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader';

import Collections from '../topCollections.json';

const CollectionsView = () => {
    const [listedCollections, setListedCollections] = useState(useSelector(state => state.Collection.collectionState.listedCollections));
    const [listedLength, setListedLength] = useState(listedCollections.length);
    const [isLoading, setIsLoading] = useState(false);


    const scrollPosition = useSelector(state => state.Collection.scrollPosition);
    const cycle = 15;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (listedLength) {
            window.scrollTo(0, scrollPosition);
            return;
        }
        getCollections();
    }, []);

    const getCollections = () => {
        let _listedLength = listedLength + cycle;
        setIsLoading(true);
        setTimeout(() => {
            setListedCollections(Collections.slice(0, _listedLength));
            setListedLength(_listedLength);
            setIsLoading(false);
        }, 500);
    }

    const showAssetsView = (collection) => {
        let data = {
            currentCollection: {
                name: collection.name,
                slug: collection.slug
            },
            listedCollections: listedCollections
        }
        dispatch({ type: "SET_CURRENT_COLLECTION_STATE", payload: data });
        dispatch({ type: "SET_SCROLLPOSITION", payload: window.scrollY });
        navigate("/assetsView");
    }

    return <div className='container collectionsView'>
        <h1 className='d-flex justify-content-center mt-5 mb-3 text-white'>Collections</h1>
        <div className='row'>
            {
                listedCollections.length ? listedCollections.map((collection, index) => {
                    return <div
                        key={index}
                        className='col-lg-4 col-md-6 col-sm-6 col-xs-12 m-auto'
                        onClick={() => showAssetsView(collection)}
                    >
                        <div className='collection d-flex align-items-center'>
                            {collection.logo ?
                                <img
                                    className='image'
                                    src={collection.logo}
                                    alt="Can't file file"
                                />
                                :
                                <div className='image text-center'>No Image</div>
                            }
                            <div>
                                <p>  {collection.name}</p>
                            </div>
                        </div>
                    </div>
                })
                    :
                    ""
            }
        </div>

        <div className='d-flex justify-content-center mt-4'>
            <button
                className='btn btn-primary d-flex justify-content-center'
                onClick={() => getCollections()}
                style={{ minWidth: "150px" }}
                disabled={isLoading ? true : false}
            > {isLoading ? <Loader /> : "Load More"}</button>
        </div>
    </div>
}

export default CollectionsView;