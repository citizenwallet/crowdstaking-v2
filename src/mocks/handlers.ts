import { http, HttpResponse, passthrough } from "msw";
import {
  decodeFunctionData,
  encodeFunctionResult,
  formatUnits,
  Hex,
  parseUnits,
  toHex,
} from "viem";

import { DISTRIBUTOR_ABI } from "@/abi";

import { getConfig } from "@/chainConfig";

const anvilConfig = getConfig(31337);

// TODO: import this from json config
const BLOCKS_PER_CYCLE = 5;

export const handlers = [
  http.post("http://127.0.0.1:8545", async ({ request }) => {
    const body = await parseRpcRequest(request);

    if (
      body.method === "eth_call" &&
      body.params[0].to === anvilConfig.DISBURSER.address
    ) {
      const fnData = decodeFunctionData({
        abi: DISTRIBUTOR_ABI,
        data: body.params[0].data,
      });

      if (fnData.functionName !== "getVotingPowerForPeriod")
        return passthrough();

      const lpTokenAddress = (fnData.args as Array<any>)[0] as Hex;

      /* calculate vp value returned from contract by multiplying average
       balance by the number of blocks per cycle */
      const averageBalance =
        lpTokenAddress === anvilConfig.BREAD.address ? 800 : 1200;

      const votingPower = toHex(
        parseUnits((averageBalance * BLOCKS_PER_CYCLE).toString(), 18)
      );

      const data = encodeFunctionResult({
        abi: DISTRIBUTOR_ABI,
        functionName: "getVotingPowerForPeriod",
        result: [votingPower],
      });

      return HttpResponse.json({
        jsonrpc: "2.0",
        result: data,
        id: body.id,
      });
    }

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
