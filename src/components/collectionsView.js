import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './loader';

import Collections from '../topCollections.json';

const CollectionsView = () => {
    const [listedCollections , setListedCollections] = useState(useSelector(state => state.Collection.collectionState.listedCollections));
    const [listedLength , setListedLength] = useState(listedCollections.length);
    const [isLoading , setIsLoading] = useState(false);
    const scrollPosition = useSelector(state => state.Collection.scrollPosition);
    const cycle = 15;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(listedLength) {
            console.log( typeof scrollPosition);
            window.scrollTo(0 , scrollPosition);
            return;
        }
        getCollections();
    }, [])

    const getCollections = () => {
        let _listedLength = listedLength + cycle;
        setIsLoading(true);
        setListedCollections(Collections.slice(0, _listedLength));
        setListedLength(_listedLength);
        setIsLoading(false);
    }

    const showAssetsView = (collection) => {
        let data = {
            currentCollection : {
                name : collection.name,
                slug : collection.slug
            },
            listedCollections : listedCollections
        }
        dispatch({ type: "SET_CURRENT_COLLECTION_STATE", payload : data });
        dispatch({ type: "SET_SCROLLPOSITION", payload : window.scrollY });
        navigate("/assetsView");
    }

    return <div className='container'>
        <h3 className='d-flex justify-content-center mt-2'>Collections</h3>
        <div className='row'>
        {
            listedCollections.length ? listedCollections.map((collection, index)=> {
                return <div 
                            key={index}
                            className='col-lg-4 col-md-4 col-sm-6 col-xs-12 collection d-flex align-items-center'
                            onClick={()=> showAssetsView(collection)}
                        >
                   {collection.logo ?
                   <img
                        className='image'
                        src = {collection.logo} 
                        alt="Can't file file"
                    />
                    :
                    <div className='image text-center'>No Image</div>
                    }
                    <div>
                        <h5>  {collection.name}</h5>
                    </div>
                    {console.log(collection.owned_asset_count)}
                </div>
            })
            :
            ""
        }
        </div>
        
        <div className='d-flex justify-content-center mt-2'>
            {isLoading ? 
            <Loader /> 
            : 
            <button className='btn btn-primary' onClick={ ()=> getCollections() }>Load More</button>
            }
        </div>
    </div>
}

export default CollectionsView;