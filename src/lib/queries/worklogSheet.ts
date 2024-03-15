import { useQuery } from "@tanstack/react-query"

const WORKLOG_SHEET_URL = import.meta.env.VITE_GOOGLE_SCRIPT_API;

const fetchSheetData = async () => {
  const response = await fetch(WORKLOG_SHEET_URL);

  if (response.ok) {
    return await response.json();
  }

  return [];

}

export const useWorklogSheet = () => {
  return useQuery({ queryKey: ['WorklogSheet'], queryFn: fetchSheetData })
}
