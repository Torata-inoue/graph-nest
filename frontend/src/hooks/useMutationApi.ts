import {
  DocumentNode,
  FetchResult,
  InternalRefetchQueriesInclude,
  OperationVariables,
  useMutation,
} from "@apollo/client";

export function useMutationApi<TResponse>(
  mutation: DocumentNode,
): (
  variables: OperationVariables,
  refetchQueries?: InternalRefetchQueriesInclude,
) => Promise<FetchResult<TResponse>> | undefined {
  const [gql] = useMutation<TResponse>(mutation);

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
        alert("ログインに失敗しました。emailとpasswordを確認してください");
        return;
      }
      console.log(error.message);
      alert("予期せぬエラーが発生しました。");
    }
  };
}
