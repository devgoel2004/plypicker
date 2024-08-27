export default function RequestDetails({
  params,
}: {
  params: {
    requestId: String;
  };
}) {
  return (
    <>
      <h1>Request #{params.requestId}</h1>
    </>
  );
}
