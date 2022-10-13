import { Key } from "react";
import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles";
import { CATEGORIES } from "../../constants";

export type DirectoryCategory = {
  id: Key;
  title: string;
  imageUrl: string;
  route: string;
};

const Directory = () => {
  return (
    <DirectoryContainer>
      {(CATEGORIES as DirectoryCategory[]).map(category => {
        return <DirectoryItem key={category.id} category={category} />;
      })}
    </DirectoryContainer>
  );
};

export default Directory;
