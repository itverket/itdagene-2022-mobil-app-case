import { useEffect, useState } from "react";

interface Employee {
  name: string;
  image: string;
}

interface EmployeeResponse {
  loading: boolean;
  error?: string;
  employees?: Employee[];
}

export const useRetrieveEmployees = (): EmployeeResponse => {
  const [employees, setEmployees] = useState<Employee[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    const url =
      "https://employee-image-provider.azurewebsites.net/api/fetchallemployeeimageurls?code=mKJCxaVuYh7BKL1BPlF6IKnwpWV7OILSBBLftRLa4XRd8m9CZWtBpg==";
    fetch(url)
      .then((response) => {
        console.log({ response });

        response.json().then((json) => setEmployees(json as Employee[]));
      })
      .catch((error) => {
        setError("Kunne ikke laste inn data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    error,
    employees,
  };
};
