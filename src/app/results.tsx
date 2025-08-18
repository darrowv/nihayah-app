import ResultsList from "@/components/results/ResultsList";
import SearchArea from "@/components/SearchArea";
import ScreenWrapper from "@/components/shared/ScreenWrapper";

export default function Results() {
  return (
    <ScreenWrapper>
      <SearchArea />
      <ResultsList />
    </ScreenWrapper>
  );
}
