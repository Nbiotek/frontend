import HyperLink from '@/atoms/Hyperlink';
import { Paragraph, SubTitle, Title } from '@/atoms/typographys';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';
import ROUTES from '@/constants/routes';

interface IIventoryprops {
  inventoryOverview?: TInventoryOverview;
}

const inventoryData = [
  {
    title: 'Total stocks',
    tag: 'totalStocks',
    value: 0
  },

  {
    title: 'Low stocks',
    tag: 'lowStocks',
    value: 0
  },

  {
    title: 'Expiring soon',
    tag: 'expiringSoon',
    value: 0
  },

  {
    title: 'Calibration due',
    tag: 'calibrationDue',
    value: 0
  },

  {
    title: 'Maintenance due',
    tag: 'maintenanceDue',
    value: 0
  }
];

const Inventory = ({ inventoryOverview }: IIventoryprops) => {
  return (
    <div className="flex h-fit w-full flex-col space-y-2">
      <div className="flex w-full items-center justify-between border-b pb-2">
        <SubTitle text="Inventory Overview" />
        <HyperLink href={ROUTES.LAB_COORD_INVENTORY_MANAGEMENT.path} hrefText="View all" />
      </div>

      {inventoryOverview && (
        <OverviewContainer>
          {inventoryData.map((el) => (
            <div
              key={el.tag}
              className="flex h-24 w-full flex-col items-stretch justify-between border-r p-3"
            >
              <Paragraph className="!font-medium !text-neutral-400" text={el.title} />
              <Title
                className="!font-bold"
                text={inventoryOverview[el.tag as keyof TInventoryOverview].toString()}
              />
            </div>
          ))}
        </OverviewContainer>
      )}
    </div>
  );
};

export default Inventory;
