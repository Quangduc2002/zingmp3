/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ListMusic from "../ListMusic/ListMusic";
import ListTitleMusic from "../ListTitleMusic/ListTitleMusic";

function ListChill() {
  const { chill } = useSelector((state: any) => state.app);

  return (
    <div className="mt-12">
      <ListTitleMusic item={chill.title} />
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 gap-4">
        {chill?.items?.slice(0, 5)?.map((item: any) => (
          <ListMusic key={item?.encodeId} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListChill;
