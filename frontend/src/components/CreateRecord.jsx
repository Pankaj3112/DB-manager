import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRecoilState } from "recoil";
import { recordsAtom } from "../recoil";

const CreateRecord = () => {
  const [formFeilds, setFormFeilds] = useState({
    name: "",
    email: "",
    phone: "",
    dbName: "1",
  });

  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useRecoilState(recordsAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, dbName } = formFeilds;

    if (!name || !email || !phone || !dbName) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/records/add`,
        formFeilds,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Record added successfully");

      let db = dbName === "1" ? "db1" : dbName === "2" ? "db2" : "db3";

      setRecords({
        ...records,
        [db]: [...records[db], response.data.record],
      });

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-row flex-wrap gap-2" onSubmit={handleSubmit}>
      <input
        className="border-gray-400 p-1 rounded-lg"
        type="text"
        placeholder="Name"
        onChange={(e) => setFormFeilds({ ...formFeilds, name: e.target.value })}
      />
      <input
        className=" border-gray-400 p-1 rounded-lg w-1/2"
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setFormFeilds({ ...formFeilds, email: e.target.value })
        }
      />
      <input
        className=" border-gray-400 p-1 rounded-lg"
        type="text"
        placeholder="Phone"
        onChange={(e) =>
          setFormFeilds({ ...formFeilds, phone: e.target.value })
        }
      />

      <select
        className="border-gray-400 p-1 rounded-lg w-1/2"
        onChange={(e) =>
          setFormFeilds({ ...formFeilds, dbName: e.target.value })
        }
      >
        <option value="1">DB1</option>
        <option value="2">DB2</option>
        <option value="3">DB3</option>
      </select>

      <button
        className="w-full mt-3 bg-blue-500 text-white p-2 rounded-lg "
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Add Record"}
      </button>
    </form>
  );
};

export default CreateRecord;
