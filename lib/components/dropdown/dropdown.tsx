"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { DropdownProps, optionItems } from '@/lib/types/componentTypes';

import styles from './dropdown.module.scss';

const Dropdown: React.FC<DropdownProps> = ({
  items,
  className,
  icon,
  headerTitle,
  defaultSelected,
  queryPushing,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | string | undefined>(defaultSelected);
  const [isMobile, setIsMobile] = useState(false);
  const [isBodyVisible, setIsBodyVisible] = useState(true);

  useEffect(() => {
    setSelectedItem(defaultSelected);
  }, [defaultSelected]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const detectDevice = () => {
      setIsMobile(window.innerWidth < 640);
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);

    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsBodyVisible(false);
    } else {
      setIsBodyVisible(true);
    }
  }, [isMobile]);

  const selectedLabel = useMemo(() => {
    const match = items.find((item) => item.id === selectedItem);
    if (!match) {
      return 'All';
    }

    return String(match.label);
  }, [items, selectedItem]);

  const handleItemClick = (item: optionItems) => {
    if (selectedItem === item.id) {
      return;
    }

    setSelectedItem(item.id);
    queryPushing && queryPushing(String(item.label));

    if (isMobile) {
      setIsBodyVisible(false);
    }
  };

  const handleReset = () => {
    setSelectedItem(undefined);
    queryPushing && queryPushing('');

    if (isMobile) {
      setIsBodyVisible(false);
    }
  };

  return (
    <div className={`${styles.dropdown} ${className ? styles[className] : ''}`}>
      <div className={styles.header}>
        <div className={styles.title}>
          {icon && (
            <picture>
              <img src={icon} alt="" className={styles.icon} />
            </picture>
          )}

          <div className={styles.copy}>
            <span className={styles.label}>{headerTitle}</span>
            <span className={styles.value}>{selectedLabel}</span>
          </div>
        </div>

        <div className={styles.actions}>
          {selectedItem !== undefined && (
            <button type="button" className={styles.clearButton} onClick={handleReset}>
              <IoIosClose className={styles.clearIcon} />
              <span>Clear</span>
            </button>
          )}

          {isMobile && (
            <button
              type="button"
              className={`${styles.toggle} ${isBodyVisible ? styles.open : ''}`}
              onClick={() => setIsBodyVisible((prev) => !prev)}
              aria-label={`Toggle ${headerTitle} filter`}
            >
              {isBodyVisible ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </button>
          )}
        </div>
      </div>

      <div className={`${styles.body} ${!isBodyVisible ? styles.hidden : ''}`}>
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`${styles.item} ${selectedItem === item.id ? styles.selected : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;



