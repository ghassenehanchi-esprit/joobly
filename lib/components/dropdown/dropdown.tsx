'use client';
import React, { useState} from 'react';
import Image from 'next/image';
import {DropdownProps} from '@/lib/types/componentTypes';

import styles from './dropdown.module.scss';
import arrowIcon from '@/public/images/icons/dropdown-arrow.svg';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {ClickAwayListener} from "@mui/base";


const Dropdown: React.FC<DropdownProps> = ({items, className, icon, headerTitle, defaultSelected,queryPushing}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelected);
  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (e: any,label:string) => {
    selectedItem !== e.target.id && setSelectedItem(e.target.id);
    queryPushing && queryPushing(label)
    toggleDropdown();
  }

  return (
    <ClickAwayListener onClickAway={()=>setOpen(false)}>
    <div className={`${styles['dropdown']} ${isOpen && styles['open']} ${className ? styles[className] : ''}`}>
      <div className={styles['header']} onClick={toggleDropdown} >
                <span>
                    {icon && <picture>
                      <img
                        src={icon}
                        alt="button"
                        className={'location'}
                      />
                    </picture>}
                  {/*  @ts-ignore */}
                  {selectedItem ? items && items?.find(item => item.id == selectedItem)?.label : headerTitle}
                </span>
        <Image src={arrowIcon} alt="arrow" className={`${styles['icon']} ${isOpen && styles["open"]}`}/>
        <IconButton
          onClick={() => {
            queryPushing && queryPushing("")
            setSelectedItem(undefined)
            setOpen(false);
          }}
        >
          <CloseIcon/>
        </IconButton>
      </div>
      <div className={`${styles['body']} ${isOpen && styles['open']}`}>
        {items.map((item, idx) => (
          <>
            {/*  @ts-ignore */}
            <div key={idx} className={styles["item"]} onClick={e => handleItemClick(e,item.label)} id={item.id}>
              <span className={`${styles['dot']} ${item.id == selectedItem && styles['selected']}`}>• </span>
              {item.label}
            </div>
          </>
        ))}
      </div>
    </div>
    </ClickAwayListener>
  );
};

export default Dropdown;
