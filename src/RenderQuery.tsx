import { UseQueryResult } from "@tanstack/react-query"
import Error from "./Error";
import Loading from "./Loading";


interface Props {
  result: UseQueryResult,
  children?: React.ReactNode
}
export default function RenderQuery({ result, children }: Props) {
  const { status } = result;
  if (status === "error") {
    return <Error />
  }
  else if (status === "pending") {
    return <Loading />
  }
  else if (status === 'success') {
    return children;
  } else {
    return null;
  }
}
