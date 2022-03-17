import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Loader from './loader';
import EachAsset from './eachAsset';

const AssetsView = () => {

    const [assets, setAssets] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const collection = useSelector(state => state.Collection.collectionState.currentCollection);

    const navigate = useNavigate();

    useEffect( async() => {
        if(!collection.name) navigate("/");
        setIsLoading(true);

        let _assets = assets , offset = 0;
        while(true){
            const result = await axios.get(`http://localhost:8080/getAssets/${collection.slug}/${offset}`).then(res => res.data );
            offset += 50;
            _assets = _assets.concat(result);
            setAssets(_assets);
            if(result.length < 50) break;
        }

        setIsLoading(false);
    }, [])

    return <>
        <div className='container-fluid assets-view'>
            <div className='header pt-3'>
            
                <h3 className='d-flex align-items-center'><small onClick={() => {navigate("/");}}>&#11178;</small>{collection.name} { isLoading ? <Loader /> : "" }</h3>
                <ul className='mt-3'>
                    <li>
                        <div className='asset'></div>
                        <p> Listed</p>
                    </li>
                    <li>
                        <div className='asset is_presale'></div>
                        <p> Unlisted</p>
                    </li>
                </ul>
            </div>
            {console.log("assets",assets)}
            <div className='d-flex flex-wrap mb-2 assets-list'>
                {
                assets.length ?
                assets.map((asset, index)=> {
                    return <EachAsset 
                                key = {index}
                                asset = {asset} 
                                index = {index}
                            />
                }) 
                : 
                ""
                }
            </div>
        </div>
    </>
}

export default AssetsView;