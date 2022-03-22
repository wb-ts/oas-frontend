import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Event from './event';
import axios from 'axios';

import Loader from './loader';
import EachAsset from './eachAsset';

const AssetsView = () => {

    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const collection = useSelector(state => state.Collection.collectionState.currentCollection);
    const serverUrl = 'http://localhost:8080';

    let unMountValue = false;

    const navigate = useNavigate();


    const gettingAllAssets = async (offset , _assets) => {
        const result = await axios.get(`${serverUrl}/getAssets/${collection.slug}/${offset}`).then(res => res.data);
        _assets = await gettingMoreForAsset(0, result, _assets);
        if (result.length < 50) return _assets;
        else return await gettingAllAssets(offset + result.length , _assets);
    }

    const gettingMoreForAsset = async (index, eachAssetsBlock, _assets) => {
        if (unMountValue) return;

        const listings = await axios.get(`${serverUrl}/getListings/${eachAssetsBlock[index].asset_contract.address}/${eachAssetsBlock[index].token_id}`).then(res => res.data);
        const transactions = await axios.get(`${serverUrl}/getTransactions/${eachAssetsBlock[index].asset_contract.address}/${eachAssetsBlock[index].token_id}`).then(res => res.data);

        let sold_status = "", sale_lastest = 0;

        for (var j = 0; j < transactions.length; j++) {

            const transaction = Number(transactions[j].value);

            if (transaction > 0) {
                if (sale_lastest) {
                    if (transaction > sale_lastest) {
                        sold_status = "loss";
                        break;
                    }
                    else if (transaction < sale_lastest) {
                        sold_status = "profit";
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
        _assets = _assets.concat({ ...eachAssetsBlock[index], listings: listings, sold_status: sold_status });
        setAssets(_assets);
        if(index >= 49) return _assets;
        else return await gettingMoreForAsset(index + 1, eachAssetsBlock, _assets);
    }


    useEffect(async () => {
        if (!collection.name) navigate("/");
        setIsLoading(true);
        const _assets = await gettingAllAssets(0, assets);
        setAssets(_assets);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const callback = (state) => {
            unMountValue = state;
            navigate("/");
        };

        Event.on('stopCallingApi', callback);

        return () => {
            Event.removeListener("stopCallingApi" , callback);
        } 
    }, [])

    return <>
        <div className='container-fluid assets-view'>
            <div className='header pt-3'>

                <h3 className='d-flex align-items-center'>
                    <div
                        className='back-btn'
                        onClick={ () => { Event.emit('stopCallingApi', true) } }
                    >&#11178;
                    </div>
                    {collection.name}
                    &nbsp;&nbsp;&nbsp;
                    {isLoading ? <Loader /> : ""}
                </h3>
                <ul className='mt-3'>
                    <li>
                        <div className='asset listed'></div>
                        <p> Listed</p>
                    </li>
                    <li>
                        <div className='asset'></div>
                        <p> Unlisted</p>
                    </li>
                    <li>
                        <div className='asset loss'>5</div>
                        <p> Price (Sell at loss)</p>
                    </li>
                    <li>
                        <div className='asset profit'>6</div>
                        <p> Price (Sell at profit) </p>
                    </li>
                    <li>
                        <div className='asset same'>3</div>
                        <p> Price bought </p>
                    </li>
                </ul>
            </div>
            <div className='d-flex flex-wrap mb-2 assets-list'>
                {
                    assets.length ?
                        assets.map((asset, index) => {
                            return <EachAsset
                                key={index}
                                asset={asset}
                                index={index}
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