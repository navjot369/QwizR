"use client"

import ResponseDetail from "./../components/response-detail.jsx"
import { useParams } from "next/navigation";

export default function ResponsePage() {

    const params = useParams();
    const response_id = params.response_id;

  return (
    <div className="container mx-auto py-8">
      <ResponseDetail responseId={response_id} />
    </div>
  )
}
