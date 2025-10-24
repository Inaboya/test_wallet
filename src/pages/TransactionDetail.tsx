import React, { useEffect } from "react";
import { getTransactionById } from "../data";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import type { Transaction } from "../data/types";
import { formatDate } from "../utils/common";

function TransactionDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = React.useState<Transaction | undefined>(
    undefined
  );
  useEffect(() => {
    if (id) {
      const transactionData = getTransactionById(id);
      setTransaction(transactionData);
    }
  }, []);

  return (
    <div className="w-full h-screen bg-[#E5E5EA] p-5">
      <div className="w-full">
        <Link to="/" className="text-sm text-blue-600 list-none">
          <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        </Link>

        <div className="w-full mt-8 flex flex-col justify-center items-center">
          <h3 className="text-7xl text-[#000000ED] font-semibold">
            ${transaction?.amount.toFixed(2)}
          </h3>
          <p className="text-md text-[#8E8E93] font-medium">
            {transaction?.authorized ? transaction.authorizedUser : ""}
          </p>
          <p className="text-md text-[#8E8E93] font-medium">
            {formatDate(new Date(transaction?.date as string))}
          </p>
        </div>

        <div className="w-full bg-white rounded-md p-4 mt-8">
          <div className="flex flex-col border-b-2 border-[#E5E5EA] gap-3 pb-4">
            <p className="text-lg text-[#000000ED] font-semibold">
              Status: {transaction?.pending ? "Pending" : "Approved"}
            </p>
            <p className="text-md text-[#8E8E93]">RBC Bank Debit Card</p>
          </div>

          <div className="w-full flex justify-between items-center mt-4">
            <p className="text-lg text-[#000000ED] font-semibold">Total</p>
            <p className="text-lg text-[#000000ED] font-semibold">
              ${transaction?.amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetail;
