import React from "react";
import { filteredRecordsSelector, sortAndSearchAtom } from "../recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateRecord from "./CreateRecord";

const Dashboard = () => {
  const records = useRecoilValue(filteredRecordsSelector);
  const [sortAndSearch, setSortAndSearch] = useRecoilState(sortAndSearchAtom);

  const handleSorting = (sortBy) => {
    if (sortAndSearch.sortBy === sortBy) {
      setSortAndSearch({
        ...sortAndSearch,
        sortOrder: sortAndSearch.sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      setSortAndSearch({ ...sortAndSearch, sortBy, sortOrder: "asc" });
    }
  };

  const handleKeyDown = (e) => {
    const { db } = sortAndSearch;
    console.log(e.key);

    if (e.key === "Tab") {
      e.preventDefault();

      if (db === "db1") {
        setSortAndSearch({ ...sortAndSearch, db: "db2" });
      } else if (db === "db2") {
        setSortAndSearch({ ...sortAndSearch, db: "db3" });
      } else {
        setSortAndSearch({ ...sortAndSearch, db: "db1" });
      }
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="w-full flex flex-col items-center p-2 min-h-screen focus:outline-none"
    >
      <div className="w-1/3 min-w-72 border-2 p-5 rounded-xl bg-gray-200">
        <CreateRecord />
      </div>

      <div className="w-1/2 min-w-96 flex justify-center p-4 gap-4">
        <button
          className={
            "text-white px-4 py-2 rounded-lg" +
            (sortAndSearch.db === "db1" ? " bg-blue-500" : " bg-gray-400")
          }
          onClick={() => setSortAndSearch({ ...sortAndSearch, db: "db1" })}
        >
          DB1
        </button>
        <button
          className={
            "text-white px-4 py-2 rounded-lg" +
            (sortAndSearch.db === "db2" ? " bg-blue-500" : " bg-gray-400")
          }
          onClick={() => setSortAndSearch({ ...sortAndSearch, db: "db2" })}
        >
          DB2
        </button>
        <button
          className={
            "text-white px-4 py-2 rounded-lg" +
            (sortAndSearch.db === "db3" ? " bg-blue-500" : " bg-gray-400")
          }
          onClick={() => setSortAndSearch({ ...sortAndSearch, db: "db3" })}
        >
          DB3
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-full min-w-60"
          onChange={(e) =>
            setSortAndSearch({ ...sortAndSearch, search: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col items-center gap-4 p-4 w-1/2 min-w-96">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr className="text-left text-lg">
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSorting("name")}
              >
                Name &nbsp;
                {sortAndSearch.sortBy == "name"
                  ? sortAndSearch.sortOrder == "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSorting("email")}
              >
                Email &nbsp;
                {sortAndSearch.sortBy == "email"
                  ? sortAndSearch.sortOrder == "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSorting("phone")}
              >
                Phone &nbsp;
                {sortAndSearch.sortBy == "phone"
                  ? sortAndSearch.sortOrder == "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {records.map((record, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-1 ">{record.name}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
