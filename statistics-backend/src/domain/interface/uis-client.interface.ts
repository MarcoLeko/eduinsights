export interface UisClientInterface {
  getStatisticByClientFilter(filter: { [key: string]: string });

  getUISFilterByClientFilter(filter: Array<string>);
}
