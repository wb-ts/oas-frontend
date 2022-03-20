import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const EachAsset = ({index, asset}) => {

    return <>
        <a 
            href={'https://opensea.io/assets/'+ asset.asset_contract.address + '/' + asset.token_id } 
            className={asset.listings.length ? 'asset listed' : 'asset' } 
            data-toggle="tooltip" 
            data-html="true" 
            title={ index + ". token_id:" + asset.token_id} 
            target="_blank"
        >
            {console.log(asset)}
            { asset.sell_orders ? <p>3</p> : "" }
        </a>
    </>
}
export default EachAsset;