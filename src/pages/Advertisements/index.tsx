import { Button } from 'common/components/ui';
import { SearchInput } from 'common/components/ui/SearchInput';
import { ReactElement } from 'react';
import { AdvertisementsList } from 'widgets/AdvertisementList';

export const AdvertisementsPage = (): ReactElement => {
    return (
        <div>
            ds
            <AdvertisementsList />
            <SearchInput />
            <Button variant='empty' label='Button' />
        </div>
    );
};
