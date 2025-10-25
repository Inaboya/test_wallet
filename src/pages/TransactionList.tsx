import { useEffect, useMemo, useState } from "react";

import { getTransactions } from "../data";
import { formattedDate, todaysPoints } from "../utils/common";
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
    <div className="w-full h-screen bg-[#E5E5EA] p-5">
      <div className="w-full flex gap-2">
        <div className="w-1/2 flex flex-col gap-2">
          <div className="w-full bg-white rounded-md p-5 flex flex-col gap-0.5">
            <h3 className="text-sm text-[#000000ED] font-medium">
              Card Balance
            </h3>
            <p className="text-2xl text-[#000000ED] font-semibold">
              ${cardBalance.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-[#8E8E93] font-medium">
                ${available.toLocaleString()}
              </p>
              <p className="text-xs text-[#8E8E93] font-medium">Available</p>
            </div>
          </div>

          <div className="w-full bg-white rounded-md p-5">
            <h3 className="text-sm text-[#000000ED] font-semibold">
              Daily Points
            </h3>
            <p className="text-xs text-[#8E8E93]">{todaysPoints()}</p>
          </div>
        </div>
        <div className="w-1/2">
          <div className="w-full h-full bg-white rounded-md p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm text-[#000000ED] font-semibold">
                No Payment Due
              </h3>
              <p className="text-xs text-[#8E8E93] font-medium">
                You've paid your September balance
              </p>
            </div>

            <div className="flex justify-end">
              <div className="w-10 h-10 bg-[#E5E5EA] flex justify-center items-center rounded-full p-3">
                <FontAwesomeIcon icon={faCheck} size="1x" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* transaction list */}
      <div className="w-full mt-4">
        <h3 className="text-3xl text-[#000000ED] font-bold">
          Latest Transactions
        </h3>

        <div className="w-full p-3 bg-white rounded-md mt-2 flex flex-col gap-3 hide-scrollbar overflow-y-auto max-h-[60vh]">
          {/* <TransactionListCard transactions={transactions} /> */}
          {transactions.map((tx, index) => (
            <div
              className="w-full flex gap-2 items-start border-b-2 border-[#d6d6d6] p-2"
              key={index}
            >
              <div className="w-1/6 h-15">
                <div className="bg-[#000] rounded-md w-full h-full" />
              </div>
              <div className="w-5/6 flex flex-col gap-0.2 px-2">
                <div className="flex w-full justify-between items-center">
                  <h4 className="text-md text-[#000000ED] font-semibold">
                    {tx.name}
                  </h4>
                  <p className="text-sm text-[#000000ED] font-semibold">
                    {tx.type === "payment" ? "+" : ""}${tx.amount.toFixed(2)}
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <p className="text-sm text-[#8E8E93] whitespace-nowrap overflow-hidden text-ellipsis">
                    {tx.pending ? "Pending - " : ""}
                    {(tx.description?.length ?? 0) > 15
                      ? `${tx?.description?.slice(0, 15)}...`
                      : tx.description || ""}
                  </p>

                  <p className="bg-[#E5E5EA] p-1 rounded-md text-[#8E8E93] text-xxs">
                    3%
                  </p>
                </div>

                <p className="text-sm text-[#8E8E93]">
                  {tx.authorized ? tx.authorizedUser + " - " : ""}
                  {formattedDate(new Date(tx.date))}
                </p>
              </div>
              <div className="justify-end flex">
                <Link
                  to={`/transaction/${tx.id}`}
                  className="text-sm list-none text-[#8E8E93]"
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
