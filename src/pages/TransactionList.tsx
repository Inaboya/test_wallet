import { useEffect, useMemo, useState } from "react";

import { getTransactions } from "../data";
import { todaysPoints } from "../utils/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import type { Transaction } from "../data/types";
import { Link } from "react-router-dom";

const MAX_LIMIT = 1500;

function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // simulate fetch
    const data = getTransactions();
    setTransactions(data.slice(0, 10));
  }, []);

  // random card balance
  const cardBalance = useMemo(() => {
    const b = Math.random() * 1400; // keep within limit
    return Math.round(b * 100) / 100;
  }, []);

  const available = Math.round((MAX_LIMIT - cardBalance) * 100) / 100;
  return (
    <div className="w-full h-screen bg-gray-300 p-5">
      <div className="w-full flex items-stretch gap-4">
        <div className="w-1/2 h-full">
          <div className="w-full bg-white rounded-md p-2 flex flex-col gap-0.5">
            <h3 className="text-sm text-[#000000ED] font-medium">
              Card Balance
            </h3>
            <p className="text-2xl text-[#000000ED] font-semibold">
              ${cardBalance.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[#666666]">
                ${available.toLocaleString()}
              </p>
              <p className="text-xs text-[#666666] font-medium">Available</p>
            </div>
          </div>

          <div className="w-full bg-white rounded-md p-4 my-3">
            <h3 className="text-sm text-[#000000ED] font-medium">
              Daily Points
            </h3>
            <p className="text-xs text-[#666666]">{todaysPoints()}</p>
          </div>
        </div>
        <div className="w-1/2">
  <div className="w-full h-full bg-white rounded-md p-2 flex flex-col justify-between">
    <div>
      <h3 className="text-sm text-[#000000ED] font-semibold">
        No Payment Due
      </h3>
      <p className="text-xs text-[#333]">
        You've paid your September balance
      </p>
    </div>

    <div className="flex justify-end">
      <div className="w-10 h-10 bg-[#d6d6d6] flex justify-center items-center rounded-full p-3">
        <FontAwesomeIcon icon={faCheck} size="1x" />
      </div>
    </div>
  </div>
</div>

      </div>

      {/* transaction list */}
      <div className="w-full mt-4">
        <h3 className="text-2xl text-[#000000ED] font-semibold">
          Latest Transactions
        </h3>

        <div className="w-full p-3 bg-white rounded-md mt-2 flex flex-col gap-3">
          {/* <TransactionListCard transactions={transactions} /> */}
          {transactions.map((tx, index) => (
            <div
              className="w-full flex items-start border-b-2 border-[#d6d6d6] p-2"
              key={index}
            >
              <div className="w-1/6 h-15">
                <div className="bg-[#000] rounded-md w-full h-full" />
              </div>
              <div className="w-4/6 flex flex-col gap-0.5 px-2">
                <div className="flex w-full justify-between items-center">
                  <h4 className="text-md text-[#000000ED] font-medium">
                    {tx.name}
                  </h4>
                  <p className="text-sm text-[#333]">
                    {tx.type === "payment" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm text-[#666]">
                  {tx.pending ? "Pending • " : ""}
                  {tx.description || ""}
                </p>
                <p className="text-sm text-[#666]">
                  {tx.authorized ? tx.authorizedUser + " • " : ""}
                  {new Date(tx.date).toDateString()}
                </p>
              </div>
              <div className="w-1/6">
                <Link
                  to={`/transaction/${tx.id}`}
                  className="text-sm list-none"
                >
                  <FontAwesomeIcon icon={faAngleRight} size="1x" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionList;
