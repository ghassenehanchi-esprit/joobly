"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { TiArrowSortedDown } from 'react-icons/ti';

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
  const [isBodyVisible, setIsBodyVisible] = useState(false);

  const panelId = useMemo(
    () => `${headerTitle.toLowerCase().replace(/\s+/g, '-')}-filter-panel`,
    [headerTitle],
  );

  useEffect(() => {
    setSelectedItem(defaultSelected);
  }, [defaultSelected]);
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

    setIsBodyVisible(false);

  };

  const handleReset = () => {
    setSelectedItem(undefined);
    queryPushing && queryPushing('');
    setIsBodyVisible(false);
  };

  return (
    <div className={`${styles.dropdown} ${className ? styles[className] : ''}`}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsBodyVisible((prev) => !prev)}
        aria-expanded={isBodyVisible}
        aria-controls={panelId}
      >
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

        <TiArrowSortedDown className={`${styles.toggle} ${isBodyVisible ? styles.open : ''}`} />
      </button>

      {selectedItem !== undefined && (
        <div className={styles.actions}>
          <button type="button" className={styles.clearButton} onClick={handleReset}>
            <IoIosClose className={styles.clearIcon} />
            <span>Clear</span>
          </button>
        </div>
      )}

      <div id={panelId} className={`${styles.body} ${!isBodyVisible ? styles.hidden : ''}`}>
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



