import React from 'react';
import ProductFetcher from './ProductFetcher';
import { getAvailableUserHardware } from '../Api_intergration/userHardwareApi';
import { getAllHardwares } from '../Api_intergration/hardwareApi';

const AvailableHardwareScreen = ({
    categoryIds,
    typeIds,
    weeks,
    searchString,
    startDate
}) => {
    return (
        <ProductFetcher
            fetchMethod={getAvailableUserHardware}
            fetchParams={{
                categoryIds: categoryIds,
                typeIds: typeIds,
                weeks: weeks,
                searchString: searchString,
                startDate: startDate
            }}
        />
    );
};

const AllHardwareScreen = () => {
    return (
        <ProductFetcher
            fetchMethod={getAllHardwares}
            fetchParams={{
                PageNumber: 0,
                IsDecsending: true
            }}
        />
    );
};

export { AvailableHardwareScreen, AllHardwareScreen };
