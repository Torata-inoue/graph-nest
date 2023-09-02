import {
  DocumentNode,
  FetchResult,
  InternalRefetchQueriesInclude,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { useNavigate } from "react-router-dom";

export function useMutationApi<TResponse>(
  mutation: DocumentNode,
  redirectSignIn: boolean = true,
): (
  variables: OperationVariables,
  refetchQueries?: InternalRefetchQueriesInclude,
) => Promise<FetchResult<TResponse>> | undefined {
  const [gql] = useMutation<TResponse>(mutation);
  const navigate = useNavigate();

  return (variables, refetchQueries) => {
    try {
      return gql({
        variables,
        refetchQueries,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } catch (error: never) {
      if (error.message === "Unauthorized") {
        if (redirectSignIn) {
          alert("ログイントークンが切れました。再度ログインしてください");
          localStorage.removeItem("token");
          navigate("/signIn");
          return;
        }
        alert("ログインに失敗しました。emailとpasswordを確認してください");
        return;
      }
      console.log(error.message);
      alert("予期せぬエラーが発生しました。");
    }
  };
}
