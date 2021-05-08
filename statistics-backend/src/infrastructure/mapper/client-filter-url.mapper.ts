import { ClientFilterDto } from '../../controller/dto/client-filter.dto';

export class ClientFilterUrlMapper {
  public static mapClientFilterToQueryUrl(
    clientFilter: ClientFilterDto,
  ): string {
    const date = clientFilter?.TIME_PERIOD?.value ?? 2018;
    const filterUrl = new Array(23)
      .fill('.', 0)
      .map((defaultValue, index) => {
        const clientFilterItem = Object.values(clientFilter).find(
          (item) => item.position - 1 === index,
        );
        return clientFilterItem ? `${clientFilterItem.value}.` : defaultValue;
      })
      .join('');

    return `${filterUrl}?format=sdmx-json&startPeriod=${date}&endPeriod=${date}`;
  }
}
