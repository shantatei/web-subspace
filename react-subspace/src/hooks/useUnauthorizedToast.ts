export default function useUnauthorizedToast(toast: any) {

  toast({
    title: "Unauthorized",
    description: "Please login to continue ",
    status: "error",
    duration: 5000,
    isClosable: true,
  });

}
