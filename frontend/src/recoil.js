import { atom, selector } from "recoil";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const authState = atom({
  key: "authState",
  default: {
    token: localStorage.getItem("token"),
  },
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    const { token } = get(authState);
    if (!token) return null;
    return jwtDecode(token);
  },
});

export const recordsAtom = atom({
  key: "recordsAtom",
  default: selector({
    key: "recordsAtom/default",
    get: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/records`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data.data;
    },
  }),
});

export const sortAndSearchAtom = atom({
  key: "sortAndSearchAtom",
  default: {
    db: "db1",
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  },
});

export const filteredRecordsSelector = selector({
  key: "filteredRecordsSelector",
  get: ({ get }) => {
    const { search, sortBy, sortOrder, db} = get(sortAndSearchAtom);
    const records = get(recordsAtom)[db];

    const filteredRecords = records.filter((record) => {
      return (
        record.name.toLowerCase().includes(search.toLowerCase()) ||
        record.email.toLowerCase().includes(search.toLowerCase()) ||
        record.phone.toLowerCase().includes(search.toLowerCase())
      );
    });

    return filteredRecords.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  },
});
