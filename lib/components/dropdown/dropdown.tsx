'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DropdownProps } from '@/lib/types/componentTypes';

import styles from './dropdown.module.scss';
import arrowIcon from '@/public/images/icons/dropdown-arrow.svg';
import IconButton from '@mui/material/IconButton';
import { ClickAwayListener } from '@mui/base';

import { IoIosClose } from 'react-icons/io';

<<<<<<< Updated upstream

const Dropdown: React.FC<DropdownProps> = ({items, className, icon, headerTitle, defaultSelected,queryPushing}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelected);
  const [windowWidth, setWindowWidth] = useState<any>(0);


      useEffect(() => {
        setWindowWidth(window?.innerWidth);
        if (windowWidth <= 960) {
          setOpen(true);
        }
    }, [windowWidth]);


  return (
    <ClickAwayListener onClickAway={() => setOpen(!isOpen)}>
    <div className={`${styles['dropdown']} ${isOpen && styles['open']} ${className ? styles[className] : ''}`}>
      <div className={styles['header']} onClick={() => setOpen(!isOpen)} >
                <span className='min-w-max ml-2'>
                    {icon && <picture>
                      <img
                        src={icon}
                        alt="button"
                        className={'location h-4 w-4 '}
                      />
                    </picture>}
                  {/*  @ts-ignore */}
                  {selectedItem ? items && items?.find(item => item.id == selectedItem)?.label : headerTitle}
                </span>
        <div className='w-full p-1'>
          <Image src={arrowIcon} alt="arrow" className={`${styles['icon']} ${isOpen && styles["open"]}`}/>
        </div>
        <IconButton
          onClick={() => {
            queryPushing && queryPushing("")
            setSelectedItem(undefined)
            setOpen(!isOpen); //false
          }}
        >
          <IoIosClose />
        </IconButton>
      </div>
      <div className={`${styles['body']} ${isOpen && styles['open']}`}>
        {items?.map((item, idx) => (
          <>
=======
const Dropdown: React.FC<DropdownProps> = ({
  items,
  className,
  icon,
  headerTitle,
  defaultSelected,
  queryPushing,
}) => {
  const [isOpen, setOpen] = useState(false); // Управление открытием/закрытием
  const [selectedItem, setSelectedItem] = useState(defaultSelected);
  const [isSmallScreen, setSmallScreen] = useState(false); // Отслеживание размера экрана

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 960;
      setSmallScreen(smallScreen);
      setOpen(smallScreen); // Авто-открытие на малых экранах
    };

    // Первоначальная проверка и добавление слушателя
    handleResize();
    window.addEventListener('resize', handleResize);

    // Удаление слушателя при размонтировании
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    // Для малых экранов меняем только вручную
    if (!isSmallScreen) {
      setOpen(!isOpen);
    }
  };

  const handleItemClick = (e: any, label: string) => {
    if (selectedItem !== e.target.id) {
      setSelectedItem(e.target.id);
      queryPushing && queryPushing(label);
    }
    if (!isSmallScreen) {
      setOpen(false); // Закрыть после выбора для больших экранов
    }
  };

  return (
    <ClickAwayListener onClickAway={() => !isSmallScreen && setOpen(false)}>
      <div
        className={`${styles['dropdown']} ${
          isOpen && styles['open']
        } ${className ? styles[className] : ''}`}
      >
        <div className={styles['header']} onClick={toggleDropdown}>
          <span className="min-w-max ml-2">
            {icon && (
              <picture>
                <img
                  src={icon}
                  alt="button"
                  className={'location h-4 w-4 '}
                />
              </picture>
            )}
>>>>>>> Stashed changes
            {/*  @ts-ignore */}
            {selectedItem
              ? items &&
                items?.find((item) => item.id == selectedItem)?.label
              : headerTitle}
          </span>
          <div className="w-full p-1">
            <Image
              src={arrowIcon}
              alt="arrow"
              className={`${styles['icon']} ${isOpen && styles['open']}`}
            />
          </div>
          <IconButton
            onClick={() => {
              queryPushing && queryPushing('');
              setSelectedItem(undefined);
              setOpen(false); // Сбросить состояние
            }}
          >
            <IoIosClose />
          </IconButton>
        </div>
        <div className={`${styles['body']} ${isOpen && styles['open']}`}>
          {items?.map((item, idx) => (
            <div
              key={idx}
              className={styles['item']}
              onClick={(e) => handleItemClick(e, item.label)}
              id={item.id}
            >
              <span
                className={`${styles['dot']} ${
                  item.id == selectedItem && styles['selected']
                }`}
              >
                •{' '}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;