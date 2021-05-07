export class ClientFilterUrlMapper {
  public static mapClientFilterToStatisticUrl(filter: {
    [key: string]: string;
  }) {
    return Object.keys(filter).reduce((prev, curr) => {
      if (Date.parse(filter[curr])) {
        prev += '.';
      } else {
        prev += filter[curr] ? `${filter[curr]}.` : '.';
      }
      return prev;
    }, '');
  }

  public static mapClientFilterToQueryUrl(
    clientFilter: Array<string>,
  ): { date: number; clientFilter: string } {
    let date = 2017;
    const dateIndex = clientFilter.findIndex((item: string) =>
      Date.parse(item),
    );

    if (dateIndex > -1) {
      date = +clientFilter[dateIndex];
      clientFilter[dateIndex] = '.';
    }

    return {
      date,
      clientFilter: clientFilter.join(''),
    };
  }
}
