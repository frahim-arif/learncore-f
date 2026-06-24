import { Suspense } from "react";
import PaymentStatusClient from "./PaymentStatusClient";

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="card text-center">Loading...</div>}>
      <PaymentStatusClient />
    </Suspense>
  );
}