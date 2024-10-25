'use client'
import React from 'react';
import DetailsContainer from "@/lib/components/detailsContainer/DetailsContainer";
import {useAppSelector} from "@/lib/hooks";
import {selectJobDetails} from "../../../lib/selectors/selectors";

const Preview = () => {
  const jobDetails = useAppSelector(selectJobDetails)
  return (
    <DetailsContainer data={jobDetails}/>
  );
};

export default Preview;