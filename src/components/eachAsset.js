import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const EachAsset = ({index, asset}) => {

    return <>
        <a 
            href={'https://opensea.io/assets/'+ asset.asset_contract.address + '/' + asset.token_id } 
            className={asset.listings.length ? 'asset listed' : 'asset' }
            target="_blank"
        >
            {asset.sold_status == "loss" ? 
                <p className='loss'>5</p>
                :
                asset.sold_status == "profit" ? 
                <p className='profit'>6</p>
                :
                asset.sold_status == "same" ? 
                <p className='same'>3</p>
                :
                <></>
            }
        </a>
    </>
}
export default EachAsset;