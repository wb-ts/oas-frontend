import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const EachAsset = ({index, asset}) => {

    return <>
        <div className={asset.listings.length ? 'asset listed' : 'asset' } data-toggle="tooltip" data-html="true" title={ index + ". token_id:" + asset.token_id} >
            {console.log(asset)}
        </div>
    </>
}
export default EachAsset;