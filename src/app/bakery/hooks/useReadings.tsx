import { TUserConnected } from "@/app/core/hooks/useConnectedUser";

function useReadings({user}: {user: TUserConnected}) {

    const { DAI, BREAD } = user.config;

  const breadBalanceReadings = useTokenBalance(BREAD.address, user.address);
  const daiBalanceReadings = useTokenBalance(DAI.address, user.address);

  const {
    value: daiAllowanceValue,
    status: daiAllowanceStatus,
    error: daiAllowanceError,
  } = useTokenAllowance(DAI.address, user.address, BREAD.address);

}

function WithReadings


export {useReadings}