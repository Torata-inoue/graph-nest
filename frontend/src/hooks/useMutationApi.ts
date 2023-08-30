import {
  DocumentNode,
  FetchResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";

export function useMutationApi<TResponse>(
  mutation: DocumentNode,
): (input: OperationVariables) => Promise<FetchResult<TResponse>> | undefined {
  const [gql] = useMutation<TResponse>(mutation);

  return (input: OperationVariables) => {
    try {
      return gql({
        variables: input,
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
