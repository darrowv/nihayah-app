import HistoryList from "@/components/history/HistoryList";
import SearchArea from "@/components/SearchArea";
import ScreenWrapper from "@/components/shared/ScreenWrapper";

export default function History() {
  return (
    <ScreenWrapper>
      <SearchArea />
      <HistoryList />
    </ScreenWrapper>
  );
}
