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
            {asset.sold_status == "loss" ? 
                <small className='loss'>5</small>
                :
                asset.sold_status == "benefit" ? 
                <small className='benefit'>6</small>
                :
                asset.sold_status == "same" ? 
                <small className='same'>3</small>
                :
                <></>
            }
        </a>
    </>
}
export default EachAsset;