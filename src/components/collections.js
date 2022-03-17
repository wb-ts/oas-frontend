import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from './loader';


const Collections = () => {
    const [collections , setCollections] = useState(useSelector(state => state.Collection.collectionState.collections));
    const [listedCollections , setListedCollections] = useState(useSelector(state => state.Collection.collectionState.listedCollections));
    const [offset, setOffset] = useState(useSelector(state => state.Collection.collectionState.offset));
    const [listedLength , setListedLength] = useState(listedCollections.length);
    const [isLoading , setIsLoading] = useState(false);
    const limit = 300;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(listedCollections.length) return;
        getCollections();
    }, [])

    const arrayUnique = (array) => {
        var unique_array = array.concat();
        for(var i=0; i<unique_array.length; ++i) {
            for(var j=i+1; j<unique_array.length; ++j) {
                if(unique_array[i] === unique_array[j])
                    unique_array.splice(j--, 1);
            }
        }
        return unique_array;
    }

    const getCollections =  async () => {
        let _collections = collections , _listedLength = listedLength + 15;
        setIsLoading(true);
        const result = await axios.get(`http://localhost:8080/getMoreCollections/${offset}/${limit}`)
        .then(res => res.data);
        _collections = arrayUnique(_collections.concat(result));
        setListedCollections(_collections.slice(0, _listedLength));
        setCollections(_collections);
        setListedLength(_listedLength);
        setOffset( offset + limit );
        setIsLoading(false);
    }

    const showAssetsView = (collection) => {
        let data = {
            currentCollection : {
                name : collection.name,
                slug : collection.slug
            },
            collections : collections,
            listedCollections : listedCollections,
            offset : offset
        }
        dispatch({ type: "SET_CURRENT_COLLECTION_STATE", payload : data });
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
                   {collection.image_url ?
                   <img
                        className='image'
                        src = {collection.image_url} 
                        alt="Can't file Image file"
                    />
                    :
                    <div className='image text-center'>No Image</div>
                    }
                    <div>
                        <h5>  {collection.name}</h5>
                    </div>
                </div>
            })
            :
            ""
        }
        </div>
        {isLoading ? <Loader /> : ""}
        <div className='d-flex justify-content-center mt-2'>
            <button className='btn btn-primary' onClick={ ()=> getCollections() }>Load More</button>
        </div>
        {console.log(collections)}
    </div>
}

export default Collections;