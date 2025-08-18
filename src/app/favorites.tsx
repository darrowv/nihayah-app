import FavoritesList from "@/components/favorites/FavoritesList";
import SearchArea from "@/components/SearchArea";
import ScreenWrapper from "@/components/shared/ScreenWrapper";

export default function Favorites() {
  return (
    <ScreenWrapper>
      <SearchArea />
      <FavoritesList />
    </ScreenWrapper>
  );
}
