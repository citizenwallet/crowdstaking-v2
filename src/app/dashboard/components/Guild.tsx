import { useEffect, useState } from "react";

export default function Guild() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://api.guild.xyz/v1/guild/breadchain")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setData(data);
      });
  }, []);
  return (
    <section>
      guild
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
