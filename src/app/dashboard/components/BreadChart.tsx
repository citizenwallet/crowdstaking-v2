// import { useMemo } from "react";
// import { Area, ComposedChart, ResponsiveContainer, Tooltip } from "recharts";
// import type {
//   IWeeklyChartData,
//   IWeeklySnapshot,
// } from "../hooks/useWeeklyBread";

// function Widget({ supply, date }: { supply: number; date: string }) {
//   return (
//     <div className="flex transform flex-col  bg-[#3c3c3c] text-neutral-300 absolute left-0 -top-24">
//       <div className="font-normal">Total $BREAD Supply</div>
//       <div className="text-xl font-bold">
//         {Intl.NumberFormat().format(supply)}
//       </div>
//       <div className="text-[#9EC958] text-xs">+ 1.3% (weekly)</div>
//       <p className=" text-neutral-400 text-xs">{date}</p>
//     </div>
//   );
// }

// function CustomCursor({ payload }: any) {
//   const data = payload[0]?.payload;

//   if (!data) return null;

//   return (
//     <div className="w-64">
//       <Widget supply={data.supply} date={data.date} />
//     </div>
//   );
// }

// function DefaultSupplyDisplay({ supply }: { supply: number }) {
//   const date = useMemo(() => {
//     const today = new Date(Date.now()).toDateString();
//     return today;
//   }, []);

//   return <Widget supply={supply} date={date} />;
// }

// export default function BreadChart({
//   chartData,
// }: {
//   chartData: IWeeklySnapshot[];
// }) {
//   const tokenWeeklySnapshots = chartData;

//   const latestSnapshot = tokenWeeklySnapshots[
//     tokenWeeklySnapshots.length - 1
//   ] as IWeeklySnapshot;

//   return (
//     <div className="relative h-full w-full bg-[#3c3c3c] p-6 rounded-lg pt-28">
//       <section className="relative h-full w-full">
//         <DefaultSupplyDisplay supply={latestSnapshot.supply} />
//         <ResponsiveContainer width="100%" height="100%">
//           <ComposedChart data={tokenWeeklySnapshots}>
//             <defs>
//               <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#A416AD" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#FF99E2" stopOpacity={0.8} />
//               </linearGradient>
//             </defs>
//             {/* <Line dot={false} type="natural" dataKey="supply" stroke="#8884d8" /> */}
//             <Area
//               type="monotone"
//               dataKey="supply"
//               strokeWidth={4}
//               fillOpacity={1}
//               stroke="url(#lineGrad)"
//               fill="url(#areaGrad)"
//             />

//             <Tooltip
//               cursor={{ stroke: "#FF99E2", opacity: 0.6, strokeDasharray: 5 }}
//               position={{ x: 0, y: 0 }}
//               content={<CustomCursor />}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </section>
//     </div>
//   );
// }
