import Image from 'next/image';
import React from 'react';

import './headerBackground.scss';
interface HeaderBackgroundProps{
  topHeaderTitle?:string,
  bottomHeaderTitle?:string,
  extraBottomHeader?:string | undefined
}
const HeaderBackground: React.FC<HeaderBackgroundProps>= ({topHeaderTitle, bottomHeaderTitle,extraBottomHeader }) => {
    return (
      <div className='header-background'>
        <p className='page-desc'>{topHeaderTitle ?? ""}</p>
        <h1 className='page-title'>{bottomHeaderTitle ?? "Find work you'll love, fast."}</h1>
        {extraBottomHeader && <p className='page-desc'>{extraBottomHeader}</p>}

      </div>
    );
};

export default HeaderBackground;
