"use client";
export default function PendingRequestId({
  params,
}: {
  params: {
    id: String;
  };
}) {
  return (
    <>
      <h1>Pending Requests #{params.id}</h1>
    </>
  );
}
