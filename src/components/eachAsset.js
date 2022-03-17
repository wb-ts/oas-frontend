import React from 'react';

const EachAsset = ({index, asset}) => {

    return <>
        <div className={asset.is_presale ? 'asset is_presale' : 'asset' }  >
        </div>
    </>
}
export default EachAsset;