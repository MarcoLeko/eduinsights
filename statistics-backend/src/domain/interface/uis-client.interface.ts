import { ClientFilterDto } from '../../controller/dto/client-filter.dto';

export interface UisClientInterface {
  getStatisticByClientFilter(filter: ClientFilterDto);

  getFilterStructureByClientFilter(filter: ClientFilterDto);
}
