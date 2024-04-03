export const truncateAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export function formatBalance(value: number, decimals: number) {
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });
  return balanceFormatter.format(value);
}

export function formatSupply(value: number) {
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });
  return balanceFormatter.format(value);
}

export function formatVotePercentage(value: number) {
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 2,
    useGrouping: true,
  });
  return balanceFormatter.format(value);
}
