// import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
// import { useToast } from "@/app/core/hooks/useToast";
// import { useEffect, useState } from "react";
// import { useTokenBalance } from "./useTokenBalance";

// export function useDAIAllowance() {
//   const { dispatch: dispatchToast } = useToast();
//   const { user } = useConnectedUser();

//   const { DAI, BREAD } = user.config;

//    const breadBalanceReadings = useTokenBalance(BREAD.address, user.address);
//   const daiBalanceReadings = useTokenBalance(DAI.address, user.address);

//   const {
//     value: daiAllowanceValue,
//     status: daiAllowanceStatus,
//     error: daiAllowanceError,
//   } = useTokenAllowance(DAI.address, user.address, BREAD.address);

//   const [data, setData] = useState();

//   useEffect(() => {
//     if (daiAllowanceError) {
//       dispatchToast({
//         type: "SET_TOAST",
//         payload: {
//           type: "ERROR",
//           message: "Failed to check contract approval",
//         },
//       });
//       return;
//     }

//     if (daiAllowanceValue) {
//       setSwapState((state) => ({
//         ...state,
//         isContractApproved: parseFloat(daiAllowanceValue) > 0,
//       }));
//     }
//   }, [daiAllowanceStatus, daiAllowanceValue, daiAllowanceError, dispatchToast]);
// }
