import BigQuery from '@/app/components/svg/BigQuery';
import PowerBi from '@/app/components/svg/PowerBi';
import Snowflake from '@/app/components/svg/Snowflake';

export default function getIcon(brand: any) {
    switch (brand) {
        case 'bigquery':
            return <BigQuery />;
        case 'powerbi':
            return <PowerBi />;
        case 'snowflake':
            return <Snowflake />;
    }
}
