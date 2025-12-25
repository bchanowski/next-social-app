import InfoTab from "./InfoTab";

export default async function SearchTab() {
  return (
    <div>
      <input type="text" />
      <InfoTab heading="Popular Topics">popular topics</InfoTab>
      <InfoTab heading="Trending People">popular people</InfoTab>
    </div>
  );
}
