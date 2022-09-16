import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles";
import { CATEGORIES } from "../../constants";

const Directory = () => {
  return (
    <DirectoryContainer>
      {CATEGORIES.map(category => {
        return <DirectoryItem key={category.id} category={category} />;
      })}
    </DirectoryContainer>
  );
};

export default Directory;
