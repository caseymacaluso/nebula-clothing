// import { Link } from "react-router-dom";
import { FC } from "react";
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./category-preview.styles";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../spinner/spinner.component";
import ProductCard from "../product-card/product-card-component";
import { CategoryItem } from "../../store/categories/categories.types";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  const isLoading = useSelector(selectIsLoading);

  const categoryPreviewContent = (
    <Preview>
      {products
        .filter((_, idx) => idx < 4)
        .map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Preview>
  );
  return (
    <CategoryPreviewContainer>
      <Title to={title}>{title.toUpperCase()}</Title>
      {isLoading ? <Spinner /> : categoryPreviewContent}
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
