import { http, HttpResponse, passthrough } from "msw";
import { decodeFunctionData, encodeFunctionResult, parseUnits } from "viem";

import { DISTRIBUTOR_ABI, MULTICALL3_ABI } from "@/abi";

import { getConfig } from "@/chainConfig";

const anvilConfig = getConfig(31337);

// TODO: import this from json config
const BLOCKS_PER_CYCLE = 5;
const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

export const handlers = [
  http.post("http://127.0.0.1:8545", async ({ request }) => {
    const body = await parseRpcRequest(request);

    if (body.params?.[0]?.to === MULTICALL_ADDRESS) {
      console.log("\n\nbody.params: ", body.params, "\n\n");

      const fnData = decodeFunctionData({
        abi: MULTICALL3_ABI,
        data: body.params[0].data,
      });
      fnData.args?.forEach((arg: any) => {
        if (arg.target === "0x8ce361602B935680E8DeC218b820ff5056BeB7af") {
          console.log(
            decodeFunctionData({
              abi: DISTRIBUTOR_ABI,
              data: arg.callData,
            })
          );
        }
      });
      console.log(fnData.args);
      // fnData.args?[0].forEach(thing => {
      //   console.log(thing)
      // })

      return passthrough();
    }

    const thing = {
      functionName: "aggregate3",
      args: [
        [
          {
            target: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
            allowFailure: true,
            callData: "0xca092ce8",
          },
          {
            target: "0x8ce361602B935680E8DeC218b820ff5056BeB7af",
            allowFailure: true,
            callData: "0x9e1b78d7",
          },
          {
            target: "0x8ce361602B935680E8DeC218b820ff5056BeB7af",
            allowFailure: true,
            callData: "0x659c1d3a",
          },
          {
            target: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
            allowFailure: true,
            callData:
              "0x70a08231000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
          },
          {
            target: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
            allowFailure: true,
            callData: "0x18160ddd",
          },
        ],
      ],
    };

    // if (body.method === "eth_call" && body.params[0].to === MULTICALL_ADDRESS) {
    //   const fnData = decodeFunctionData({
    //     abi: DISTRIBUTOR_ABI,
    //     data: body.params[0].data,
    //   });
    //   // console.log({ fnData });

    //   if (fnData.functionName !== "getVotingPowerForPeriod")
    //     return passthrough();

    //   const lpTokenAddress = fnData.args[0];

    //   /* calculate vp value returned from contract by multiplying average
    //    balance by the number of blocks per cycle */
    //   const averageBalance =
    //     lpTokenAddress === anvilConfig.BREAD.address ? 800 : 1200;

    //   const votingPower = parseUnits(
    //     (averageBalance * BLOCKS_PER_CYCLE).toString(),
    //     18
    //   );

    //   const data = encodeFunctionResult({
    //     abi: DISTRIBUTOR_ABI,
    //     functionName: "getVotingPowerForPeriod",
    //     result: votingPower,
    //   });

    //   return HttpResponse.json({
    //     jsonrpc: "2.0",
    //     result: data,
    //     id: body.id,
    //   });
    // }

    return passthrough();
  }),
];

async function parseRpcRequest(request: Request): Promise<any> {
  if (!request.body) return null;
  const reader = await request.body.getReader();
  if (!reader) return null;
  const body = await reader.read();
  if (!body) return null;
  const value = body.value;
  const string = new TextDecoder().decode(value);
  const bodyParsed = JSON.parse(string);
  return bodyParsed;
}
