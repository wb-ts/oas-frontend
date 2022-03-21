import React, { useEffect, useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Loader from './loader';
import EachAsset from './eachAsset';

const AssetsView = () => {

    const [assets, setAssets] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [changedLocation , setChangedLocation] = useState(false);
    const collection = useSelector(state => state.Collection.collectionState.currentCollection);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect( async() => {
        if(!collection.name) navigate("/");
        setIsLoading(true);

        let _assets = assets , offset = 0;
        while(true){
            const result = await axios.get(`http://localhost:8080/getAssets/${collection.slug}/${offset}`).then(res => res.data );
            offset += 50;
            for( let i = 0; i < result.length && !changedLocation ; i ++ ) {
                const listings = await axios.get(`http://localhost:8080/getListings/${result[i].asset_contract.address}/${result[i].token_id}`).then(res => res.data);
                const transactions = await axios.get(`http://localhost:8080/getTransactions/${result[i].asset_contract.address}/${result[i].token_id}`).then(res => res.data);
                const sold_status = "" , sale_lastest = 0;
                for(var j = 0; j < transactions.length ; j++) {
                    const transaction = Number(transactions[j].value);
                    console.log(transaction);
                    if(transaction > 0 ){
                        if(sale_lastest) {
                            if (transaction > sale_lastest){
                                sold_status = "loss";
                                break;
                            } 
                            else if ( transaction < sale_lastest){
                                sold_status = "benefit";
                                break;
                            }
                            else {
                                sold_status = "same";
                                break;
                            }
                        }
                        else sale_lastest = transaction;
                    } 
                }
                _assets = _assets.concat({...result[i] , listings : listings , sold_status : sold_status});
                setAssets(_assets);
            }
            if(result.length < 50) break;
        }

        setIsLoading(false);
    }, [])

    return <>
        <div className='container-fluid assets-view'>
            <div className='header pt-3'>
            
                <h3 className='d-flex align-items-center'><small onClick={() => { setChangedLocation(true); navigate("/");}}>&#11178;</small>{collection.name} { isLoading ? <Loader /> : "" }</h3>
                <ul className='mt-3'>
                    <li>
                        <div className='asset listed'></div>
                        <p> Listed</p>
                    </li>
                    <li>
                        <div className='asset'></div>
                        <p> Unlisted</p>
                    </li>
                </ul>
            </div>
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